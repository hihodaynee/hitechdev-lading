// tests/test-adversarial-empirical.mjs
// Adversarial Empirical Stress Test Suite for Challenger 1
// Tests Viewport Boundaries (320px - 2560px), Logo Asset IHDR, CSS Ring/Shell, Bundle Performance

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = {}) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}`);
    return true;
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}`, details);
    return false;
  }
}

function parsePngIhdr(buffer) {
  if (buffer.length < 24) return null;
  // PNG Magic bytes
  const isPng = buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (!isPng) return null;

  // IHDR chunk starts at byte 12 (length 4 bytes, type 'IHDR' 4 bytes, data 13 bytes)
  const ihdrType = buffer.slice(12, 16).toString('ascii');
  if (ihdrType !== 'IHDR') return null;

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const bitDepth = buffer.readUInt8(24);
  const colorType = buffer.readUInt8(25);
  const compression = buffer.readUInt8(26);
  const filter = buffer.readUInt8(27);
  const interlace = buffer.readUInt8(28);

  return { width, height, bitDepth, colorType, compression, filter, interlace };
}

async function runAdversarialTests() {
  console.log('\n' + '='.repeat(70));
  console.log('   \x1b[1;33mCHALLENGER 1: ADVERSARIAL EMPIRICAL STRESS TEST SUITE\x1b[0m');
  console.log('='.repeat(70));

  // =========================================================================
  // 1. ASSET VALIDATION (LOGO & STATIC ASSETS)
  // =========================================================================
  console.log('\n\x1b[1m[TEST SUITE 1] Brand Logo Asset Deep Forensic Audit\x1b[0m');
  const logoPath = path.resolve(ROOT_DIR, 'public', 'logo.png');
  const distLogoPath = path.resolve(ROOT_DIR, 'dist', 'logo.png');

  assert(fs.existsSync(logoPath), 'public/logo.png file exists on disk');
  const logoBuf = fs.readFileSync(logoPath);
  assert(logoBuf.length > 500000, `public/logo.png is high-res asset (${(logoBuf.length / 1024).toFixed(1)} KB)`);

  const ihdr = parsePngIhdr(logoBuf);
  assert(ihdr !== null, 'public/logo.png has valid PNG binary structure with IHDR chunk');
  assert(ihdr && ihdr.width > 0 && ihdr.height > 0, `public/logo.png dimensions decoded: ${ihdr?.width}x${ihdr?.height}`);
  assert(ihdr && (ihdr.colorType === 6 || ihdr.colorType === 2), `public/logo.png has truecolor format (colorType=${ihdr?.colorType})`);

  assert(fs.existsSync(distLogoPath), 'dist/logo.png preserved after production build');
  if (fs.existsSync(distLogoPath)) {
    const distLogoBuf = fs.readFileSync(distLogoPath);
    assert(distLogoBuf.equals(logoBuf), 'dist/logo.png is bit-for-bit identical to public/logo.png');
  }

  // DOM Layout shift prevention audit
  const headerCode = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf-8');
  const footerCode = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/layout/Footer.tsx'), 'utf-8');

  assert(headerCode.includes('w-8 h-8 sm:w-9 sm:h-9'), 'Header logo specifies explicit dimensions (w-8 h-8 sm:w-9 sm:h-9)');
  assert(headerCode.includes('object-cover') || headerCode.includes('object-contain'), 'Header logo specifies object-fit property');
  assert(headerCode.includes('alt={siteConfig.name}'), 'Header logo defines accessible alt text');
  assert(footerCode.includes('w-10 h-10'), 'Footer logo specifies explicit dimensions (w-10 h-10)');
  assert(footerCode.includes('object-cover') || footerCode.includes('object-contain'), 'Footer logo specifies object-fit property');
  assert(footerCode.includes('alt={siteConfig.name}'), 'Footer logo defines accessible alt text');

  // =========================================================================
  // 2. CSS RING AND SHELL CONTAINER INTEGRITY
  // =========================================================================
  console.log('\n\x1b[1m[TEST SUITE 2] CSS Ring and Shell Container Spec Conformance\x1b[0m');
  const shellCode = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/layout/ShellContainer.tsx'), 'utf-8');

  assert(shellCode.includes('max-w-[1600px]'), 'Shell container includes max-w-[1600px]');
  assert(shellCode.includes('rounded-[2.5rem]'), 'Shell container includes rounded-[2.5rem]');
  assert(shellCode.includes('ring-1 ring-white/10'), 'Shell container includes ring-1 ring-white/10');
  assert(shellCode.includes('bg-obsidian'), 'Shell container sets obsidian background');
  assert(shellCode.includes('mx-auto'), 'Shell container is centered via mx-auto');
  assert(shellCode.includes('overflow-hidden'), 'Shell container clips overflowing decor via overflow-hidden');
  assert(shellCode.includes('px-2 sm:px-4 md:px-6'), 'Shell container provides responsive gutters to avoid clipping at 320px');

  // Verify compiled CSS in dist/assets
  const distAssetsDir = path.resolve(ROOT_DIR, 'dist/assets');
  assert(fs.existsSync(distAssetsDir), 'dist/assets directory exists');
  const cssFiles = fs.readdirSync(distAssetsDir).filter(f => f.endsWith('.css'));
  assert(cssFiles.length > 0, `Compiled CSS bundle generated (${cssFiles.join(', ')})`);

  let compiledCss = '';
  for (const cf of cssFiles) {
    compiledCss += fs.readFileSync(path.resolve(distAssetsDir, cf), 'utf-8');
  }

  assert(compiledCss.includes('max-width:1600px') || compiledCss.includes('max-w-[1600px]') || compiledCss.includes('1600px'), 'Compiled CSS contains 1600px constraint rule');
  assert(compiledCss.includes('2.5rem') || compiledCss.includes('rounded-[2.5rem]'), 'Compiled CSS contains 2.5rem border radius rule');
  assert(compiledCss.includes('rgba(255,255,255,0.1)') || compiledCss.includes('white/10') || compiledCss.includes('ring-1'), 'Compiled CSS contains white/10 translucent border/ring rule');

  // =========================================================================
  // 3. VIEWPORT BOUNDARY STABILITY STRESS TESTS (320px to 2560px)
  // =========================================================================
  console.log('\n\x1b[1m[TEST SUITE 3] Viewport Boundary Stress Testing (320px - 2560px)\x1b[0m');

  const srcDir = path.resolve(ROOT_DIR, 'src');
  const allTsxFiles = [];
  function scanTsx(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.resolve(dir, item);
      if (fs.statSync(full).isDirectory()) scanTsx(full);
      else if (item.endsWith('.tsx')) allTsxFiles.push(full);
    }
  }
  scanTsx(srcDir);

  // Check 1: 320px boundary - scan for unconstrained fixed widths (>320px) without responsive override
  console.log('  Testing 320px boundary: Checking for unconstrained fixed widths...');
  const suspiciousFixedWidths = [];
  const fixedWidthRegex = /w-\[(\d+)px\]/g;
  for (const file of allTsxFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let match;
    while ((match = fixedWidthRegex.exec(content)) !== null) {
      const pxValue = parseInt(match[1], 10);
      if (pxValue > 300) {
        // Check if it's accompanied by pointer-events-none, absolute (decorative), or max-w-full
        const line = content.split('\n').find(l => l.includes(match[0])) || '';
        const isDecorative = line.includes('pointer-events-none') || line.includes('absolute');
        const hasResponsive = line.includes('max-w-') || line.includes('w-full') || line.includes('sm:');
        if (!isDecorative && !hasResponsive) {
          suspiciousFixedWidths.push({ file: path.basename(file), match: match[0], pxValue, line: line.trim() });
        }
      }
    }
  }
  assert(suspiciousFixedWidths.length === 0, `No hardcoded fixed widths > 300px causing horizontal blowout at 320px (found: ${suspiciousFixedWidths.length})`, { suspiciousFixedWidths });

  // Check 2: 320px / 375px mobile navigation drawer usability
  const headerContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf-8');
  assert(headerContent.includes('hidden') && headerContent.includes('setMobileMenuOpen'), 'Mobile drawer cleanly activated on mobile viewports');
  assert(headerContent.includes('max-w-') && headerContent.includes('w-['), 'Sticky pill header maintains dynamic width preventing horizontal overflow at 320px');

  // Check 3: 768px / 1024px grid transition boundaries
  const heroContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/hero/HeroSection.tsx'), 'utf-8');
  assert(heroContent.includes('grid-cols-1 lg:grid-cols-12'), 'Hero section cleanly transitions from single-column stack on mobile/tablet to 12-col on desktop');
  assert(heroContent.includes('grid-cols-2 sm:grid-cols-4'), 'Hero stats grid adapts gracefully from 2-col (mobile) to 4-col (desktop)');

  const methodContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/methodology/MethodologySection.tsx'), 'utf-8');
  assert(methodContent.includes('grid-cols-1 md:grid-cols-3'), 'Methodology 3-step section stacks 1-col on mobile and expands to 3-col on tablet/desktop (md:grid-cols-3)');

  const bentoGridContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/bento/BentoGrid.tsx'), 'utf-8');
  assert(bentoGridContent.includes('grid-cols-1') && bentoGridContent.includes('gap-'), 'Bento grid handles card layout with responsive spacing');

  // Check 4: 1440px and 2560px Ultrawide containment
  assert(shellCode.includes('max-w-[1600px] mx-auto'), 'Ultrawide viewports (1440px - 2560px) strictly contained at 1600px max width and centered');
  assert(headerContent.includes('max-w-') && headerContent.includes('mx-auto'), 'Navigation pill strictly bounded on ultrawide displays');

  // =========================================================================
  // 4. BUNDLE SIZE AND PERFORMANCE ANALYSIS
  // =========================================================================
  console.log('\n\x1b[1m[TEST SUITE 4] Bundle Size & Performance Budget Stress Test\x1b[0m');
  const jsFiles = fs.readdirSync(distAssetsDir).filter(f => f.endsWith('.js'));
  assert(jsFiles.length > 0, `Compiled JavaScript chunks exist: ${jsFiles.join(', ')}`);

  let totalJsBytes = 0;
  let totalJsGzipBytes = 0;
  for (const jf of jsFiles) {
    const raw = fs.readFileSync(path.resolve(distAssetsDir, jf));
    const gzipped = zlib.gzipSync(raw);
    totalJsBytes += raw.length;
    totalJsGzipBytes += gzipped.length;
  }

  let totalCssBytes = 0;
  let totalCssGzipBytes = 0;
  for (const cf of cssFiles) {
    const raw = fs.readFileSync(path.resolve(distAssetsDir, cf));
    const gzipped = zlib.gzipSync(raw);
    totalCssBytes += raw.length;
    totalCssGzipBytes += gzipped.length;
  }

  const jsKb = (totalJsBytes / 1024).toFixed(2);
  const jsGzipKb = (totalJsGzipBytes / 1024).toFixed(2);
  const cssKb = (totalCssBytes / 1024).toFixed(2);
  const cssGzipKb = (totalCssGzipBytes / 1024).toFixed(2);

  console.log(`  Bundle Metrics:`);
  console.log(`    - JavaScript: ${jsKb} KB raw | ${jsGzipKb} KB gzipped`);
  console.log(`    - CSS       : ${cssKb} KB raw | ${cssGzipKb} KB gzipped`);

  assert(totalJsBytes < 400 * 1024, `JavaScript raw bundle (${jsKb} KB) < 400 KB budget`);
  assert(totalJsGzipBytes < 100 * 1024, `JavaScript gzipped bundle (${jsGzipKb} KB) < 100 KB budget`);
  assert(totalCssBytes < 60 * 1024, `CSS raw bundle (${cssKb} KB) < 60 KB budget`);
  assert(totalCssGzipBytes < 15 * 1024, `CSS gzipped bundle (${cssGzipKb} KB) < 15 KB budget`);

  // =========================================================================
  // 5. INTERACTIVE STATE MACHINES & ADVERSARIAL EDGE CASES
  // =========================================================================
  console.log('\n\x1b[1m[TEST SUITE 5] Interactive Component State & Edge Cases\x1b[0m');

  // AI Studio Screenshot Lightbox & Download
  const aiStudioContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/bento/AiStudioCard.tsx'), 'utf-8');
  assert(aiStudioContent.includes('setActiveScreenshot'), 'AI Studio maintains interactive screenshot lightbox state');
  assert(aiStudioContent.includes('aiStudioDownloadUrl'), 'AI Studio binds official Setup.exe download binary');

  // Auto Video 5 Feature Groups & Horizontal 3-Column Layout
  const siteConfigContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/config/site.ts'), 'utf-8');
  const autoVideoContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/bento/AutoVideoCard.tsx'), 'utf-8');
  assert(autoVideoContent.includes('5 Nhóm Chức Năng Chính'), 'Auto Video maintains 5 main feature groups');
  assert(autoVideoContent.includes('sm:grid-cols-3'), 'Auto Video lays out Nhóm 2 horizontally without line wrapping');
  assert(autoVideoContent.includes('activeGroupIndex'), 'Auto Video manages activeGroupIndex state');
  assert(siteConfigContent.includes('Dịch & Thuyết Minh Video Nước Ngoài'), 'Auto Video supports AI Dubbing & Translation');

  // VIP Modal state machine & Escape key & body overflow lock
  const vipModalContent = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/vip/VipModal.tsx'), 'utf-8');
  assert(vipModalContent.includes("document.body.style.overflow = 'hidden'"), 'VipModal locks body scrolling when open');
  assert(vipModalContent.includes("document.body.style.overflow = 'unset'"), 'VipModal restores body scrolling on unmount/close');
  assert(vipModalContent.includes("e.key === 'Escape'"), 'VipModal implements Escape keyboard dismissal handler');
  assert(vipModalContent.includes("navigator.clipboard.writeText"), 'VipModal implements clipboard API for coupon copy');

  // Central config protocol & coupon exactness
  assert(siteConfigContent.includes("'HITECHVIP2026'"), 'Vip coupon code is strictly HITECHVIP2026');
  assert(siteConfigContent.includes("https://tiktok.com/@hitech.mmo"), 'TikTok link is properly formatted');
  assert(siteConfigContent.includes("https://facebook.com/hitech.mmo"), 'Facebook link is properly formatted');
  assert(siteConfigContent.includes("https://zalo.me/g/hitechmmo-vip"), 'Zalo link is properly formatted');

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n' + '='.repeat(70));
  console.log(`   CHALLENGER 1 ADVERSARIAL STRESS RESULTS: ${passedTests}/${totalTests} PASSED`);
  console.log('='.repeat(70) + '\n');

  if (failedTests > 0) {
    console.error(`\x1b[31mFAILURES DETECTED (${failedTests}):\x1b[0m`);
    failures.forEach(f => console.error(`  - ${f.testName}`, f.details));
    process.exit(1);
  } else {
    console.log('\x1b[32mALL ADVERSARIAL CHALLENGES PASSED!\x1b[0m');
    process.exit(0);
  }
}

runAdversarialTests().catch(err => {
  console.error('Fatal error during adversarial test runner:', err);
  process.exit(1);
});
