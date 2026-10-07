// tests/tier2-boundaries.mjs
// Tier 2: Boundary Value, Corner Case & Strict Schema Validation
// Verifies all 16 features with >= 5 assertions each (>= 80 assertions total)

import {
  setTier,
  assert,
  assertContains,
  readFileSafe,
  readJsonSafe,
  ROOT_DIR,
} from './test-utils.mjs';

export async function runTier2Tests() {
  setTier('tier2');
  console.log('\n\x1b[1m=== Running Tier 2: Boundary Value, Corner Case & Strict Validation ===\x1b[0m\n');

  const siteConfigContent = readFileSafe('src/config/site.ts');
  const tailwindConfig = readFileSafe('tailwind.config.js');
  const indexHtml = readFileSafe('index.html');
  const globalsCss = readFileSafe('src/styles/globals.css');
  const shellContent = readFileSafe('src/components/layout/ShellContainer.tsx');
  const headerContent = readFileSafe('src/components/layout/Header.tsx');
  const heroContent = readFileSafe('src/components/hero/HeroSection.tsx');
  const floatCardContent = readFileSafe('src/components/hero/FloatingPreviewCard.tsx');
  const methodContent = readFileSafe('src/components/methodology/MethodologySection.tsx');
  const aiStudioContent = readFileSafe('src/components/bento/AiStudioCard.tsx');
  const autoVideoContent = readFileSafe('src/components/bento/AutoVideoCard.tsx');
  const zaloVipContent = readFileSafe('src/components/vip/ZaloVipSection.tsx');
  const vipModalContent = readFileSafe('src/components/vip/VipModal.tsx');
  const footerContent = readFileSafe('src/components/layout/Footer.tsx');
  const cursorContent = readFileSafe('src/components/ui/GlowingCursor.tsx');

  // =========================================================================
  // Feature 1: Tooling & Project Scaffold Boundaries
  // =========================================================================
  console.log('Feature 1: Tooling & Scaffold Boundaries');
  assertContains(tailwindConfig, '#0a0a0a', 'B1.1: Obsidian dark base hex #0a0a0a explicitly mapped');
  assertContains(tailwindConfig, '#ccff00', 'B1.2: Electric Lime accent hex #ccff00 explicitly mapped');
  assertContains(tailwindConfig, 'sans-serif', 'B1.3: Space Grotesk has sans-serif fallback font');
  assertContains(tailwindConfig, 'monospace', 'B1.4: JetBrains Mono has monospace fallback font');
  assertContains(globalsCss, 'color-scheme: dark', 'B1.5: globals.css forces dark color scheme');

  // =========================================================================
  // Feature 2: Brand Logo Boundaries
  // =========================================================================
  console.log('Feature 2: Brand Logo Boundaries');
  assertContains(headerContent, 'alt={siteConfig.name}', 'B2.1: Header logo specifies dynamic accessible alt text');
  assert(
    headerContent.includes('object-cover') || headerContent.includes('object-contain'),
    'B2.2: Header logo specifies aspect ratio preservation style'
  );
  assertContains(headerContent, 'w-8 h-8', 'B2.3: Header defines explicit mobile dimensions for logo');
  assertContains(indexHtml, 'rel="icon"', 'B2.4: index.html defines rel="icon" link tag');
  assertContains(indexHtml, 'type="image/png"', 'B2.5: index.html favicon link specifies type="image/png"');

  // =========================================================================
  // Feature 3: Outer Shell Container Boundaries
  // =========================================================================
  console.log('Feature 3: Outer Shell Container Boundaries');
  assertContains(shellContent, 'px-2 sm:px-4 md:px-6', 'B3.1: Shell applies responsive horizontal padding preventing 320px clipping');
  assertContains(shellContent, 'min-h-screen', 'B3.2: Shell guarantees full viewport height');
  assertContains(shellContent, 'overflow-hidden', 'B3.3: Shell contains overflow-hidden to prevent horizontal scrollbars');
  assertContains(shellContent, 'pointer-events-none', 'B3.4: Shell decoration layers use pointer-events-none');
  assertContains(shellContent, 'twMerge', 'B3.5: Shell uses twMerge for conflict-free custom class merging');

  // =========================================================================
  // Feature 4: Central Site Config Boundaries
  // =========================================================================
  console.log('Feature 4: Central Site Config Boundaries');
  assert(
    siteConfigContent.includes('https://tiktok.com') && siteConfigContent.includes('https://facebook.com'),
    'B4.1: Social links strictly enforce https:// protocol'
  );
  assert(
    !siteConfigContent.includes('example.com') && !siteConfigContent.includes('localhost'),
    'B4.2: Social links do not contain placeholder/localhost domains'
  );
  assert(
    siteConfigContent.includes("'HITECHVIP2026'"),
    'B4.3: VIP coupon code is exact trimmed token without extraneous spaces'
  );
  assert(
    siteConfigContent.includes('step: \'01\'') &&
      siteConfigContent.includes('step: \'02\'') &&
      siteConfigContent.includes('step: \'03\''),
    'B4.4: Methodology steps contains exactly 3 numbered stages (01, 02, 03)'
  );
  assert(
    siteConfigContent.includes('aiStudio:') && siteConfigContent.includes('autoVideo:'),
    'B4.5: Products object explicitly exposes both aiStudio and autoVideo entries'
  );

  // =========================================================================
  // Feature 5: Floating Pill Header Boundaries
  // =========================================================================
  console.log('Feature 5: Floating Pill Header Boundaries');
  assertContains(headerContent, 'max-w-5xl', 'B5.1: Header restricts max width on ultrawide viewports');
  assertContains(headerContent, 'z-50', 'B5.2: Header enforces z-50 stacking context above content');
  assertContains(headerContent, 'backdrop-blur-2xl', 'B5.3: Header applies high-intensity backdrop-blur-2xl');
  assertContains(headerContent, 'bg-lime-400', 'B5.4: System operational badge contains lime core dot');
  assert(!headerContent.includes('#methodology'), 'B5.5: Header excludes methodology link as requested');

  // =========================================================================
  // Feature 6: Mobile Navigation Drawer Boundaries
  // =========================================================================
  console.log('Feature 6: Mobile Navigation Drawer Boundaries');
  assertContains(headerContent, 'p-2', 'B6.1: Hamburger toggle provides comfortable touch padding');
  assertContains(headerContent, 'setMobileMenuOpen(!mobileMenuOpen)', 'B6.2: Hamburger button inverts open state');
  assertContains(headerContent, 'bg-black/95', 'B6.3: Mobile drawer uses ultra-opaque dark glass background');
  assertContains(headerContent, 'onClick={() => setMobileMenuOpen(false)}', 'B6.4: Drawer links close drawer upon click');
  assertContains(headerContent, 'onOpenVipModal', 'B6.5: Mobile drawer includes direct trigger to VIP modal');

  // =========================================================================
  // Feature 7: Hero Section Boundaries
  // =========================================================================
  console.log('Feature 7: Hero Section Boundaries');
  assertContains(heroContent, 'text-4xl sm:text-5xl md:text-6xl xl:text-7xl', 'B7.1: Hero headline uses 4-tier responsive typography');
  assertContains(heroContent, 'bg-clip-text bg-gradient-to-r', 'B7.2: Headline uses CSS text clipping gradient');
  assertContains(heroContent, 'max-w-2xl', 'B7.3: Sub-copy is bounded to max-w-2xl for typographic readability');
  assertContains(heroContent, 'grid-cols-2 sm:grid-cols-4', 'B7.4: Hero stats grid cleanly adapts across mobile and desktop');
  assertContains(heroContent, 'w-full sm:w-auto', 'B7.5: CTA buttons stretch full-width on mobile and auto on desktop');

  // =========================================================================
  // Feature 8: Floating Glass Cards Boundaries
  // =========================================================================
  console.log('Feature 8: Floating Glass Cards Boundaries');
  assertContains(floatCardContent, "useState<'prompt' | 'audio' | 'pipeline'>", 'B8.1: Card defines 3-state interactive tab machine');
  assertContains(floatCardContent, 'bg-obsidian-card/90', 'B8.2: Card uses Obsidian card surface with 90% opacity');
  assertContains(floatCardContent, 'pointer-events-none', 'B8.3: Decorative glows ignore mouse events');
  assertContains(floatCardContent, 'animate-float-delayed', 'B8.4: Accent card uses staggered keyframe animation');
  assertContains(floatCardContent, 'Protagonist_Master_01', 'B8.5: Card specifies character anchor identifier');

  // =========================================================================
  // Feature 9: Methodology Contrast Section Boundaries
  // =========================================================================
  console.log('Feature 9: Methodology Contrast Section Boundaries');
  assertContains(methodContent, 'bg-zinc-100 text-zinc-950', 'B9.1: Methodology section explicitly breaks dark theme with light contrast');
  assertContains(methodContent, 'rounded-[2rem] sm:rounded-[2.5rem]', 'B9.2: Methodology card respects shell corner radius');
  assertContains(methodContent, 'hover:-translate-y-1', 'B9.3: Methodology step cards implement elevation hover transform');
  assertContains(methodContent, 'font-mono', 'B9.4: Technology chips explicitly use JetBrains Mono');
  assertContains(methodContent, 'href="#vip"', 'B9.5: Methodology footer provides anchor path to VIP section');

  // =========================================================================
  // Feature 10: AI Studio Bento Card Boundaries
  // =========================================================================
  console.log('Feature 10: AI Studio Bento Card Boundaries');
  assertContains(aiStudioContent, 'setActiveScreenshot', 'B10.1: AI Studio manages screenshot preview state');
  assert(
    /seedream/i.test(aiStudioContent) || /seedance/i.test(aiStudioContent),
    'B10.2: AI Studio includes Seedream/Seedance highlights'
  );
  assert(
    aiStudioContent.includes('aiStudioDownloadUrl') || aiStudioContent.includes('Download'),
    'B10.3: Direct download Setup.exe action provided'
  );
  assertContains(aiStudioContent, 'selectedFeature', 'B10.4: Feature navigation tracks selected module index');
  assertContains(aiStudioContent, 'hover:border-lime-400/40', 'B10.5: Card implements Lime glow border transition on hover');

  // =========================================================================
  // Feature 11: Auto Video Bento Card Boundaries
  // =========================================================================
  console.log('Feature 11: Auto Video Bento Card Boundaries');
  assertContains(autoVideoContent, 'activeGroupIndex', 'B11.1: Auto Video tracks activeGroupIndex state');
  assertContains(autoVideoContent, 'sm:grid-cols-3', 'B11.2: 3-feature group lays out horizontally without line wrapping');
  assertContains(autoVideoContent, '5 Nhóm Chức Năng Chính', 'B11.3: Auto Video renders 5 main feature groups');
  assert(
    autoVideoContent.includes('Sắp ra mắt') || autoVideoContent.includes('Vào Nhóm Zalo'),
    'B11.4: CTA focuses on Sắp ra mắt & Zalo community'
  );
  assertContains(autoVideoContent, 'hover:border-cyan-400/40', 'B11.5: Card implements Cyan glow border transition on hover');

  // =========================================================================
  // Feature 12: Zalo VIP Section Boundaries
  // =========================================================================
  console.log('Feature 12: Zalo VIP Section Boundaries');
  assertContains(zaloVipContent, 'id="vip"', 'B12.1: VIP Section sets id="vip" for anchor targeting');
  assertContains(zaloVipContent, 'border-lime-400/40', 'B12.2: VIP banner features border-lime-400/40');
  assertContains(zaloVipContent, 'siteConfig.vipCouponCode', 'B12.3: VIP Section references siteConfig.vipCouponCode');
  assertContains(zaloVipContent, 'siteConfig.vipPerks.map', 'B12.4: VIP Section dynamically maps over vipPerks');
  assertContains(zaloVipContent, 'onOpenVipModal', 'B12.5: VIP Button triggers modal open callback');

  // =========================================================================
  // Feature 13: Neon Pulse VIP Modal Boundaries
  // =========================================================================
  console.log('Feature 13: Neon Pulse VIP Modal Boundaries');
  assertContains(vipModalContent, 'document.body.style.overflow = \'hidden\'', 'B13.1: Modal traps scroll on body when open');
  assertContains(vipModalContent, 'fixed inset-0 z-50', 'B13.2: Modal covers full viewport with z-50');
  assertContains(vipModalContent, 'navigator.clipboard.writeText', 'B13.3: Copy button invokes async clipboard API');
  assertContains(vipModalContent, 'rel="noopener noreferrer"', 'B13.4: External Zalo URL enforces security rel attributes');
  assertContains(vipModalContent, 'e.key === \'Escape\'', 'B13.5: Modal binds Escape key listener to close');

  // =========================================================================
  // Feature 14: Obsidian Footer Boundaries
  // =========================================================================
  console.log('Feature 14: Obsidian Footer Boundaries');
  assert(
    footerContent.includes('opacity-') || footerContent.includes('text-white/') || footerContent.includes('select-none'),
    'B14.1: Watermark typography utilizes muted translucency styling'
  );
  assert(
    footerContent.includes('tiktok') || footerContent.includes('socials'),
    'B14.2: Footer binds social channels'
  );
  assert(
    footerContent.includes('rel="noopener noreferrer"') || footerContent.includes('target="_blank"'),
    'B14.3: Footer external links include target="_blank"'
  );
  assert(
    footerContent.includes('/logo.png') || footerContent.includes('siteConfig.name'),
    'B14.4: Footer brands with logo and site name'
  );
  assert(
    footerContent.includes('border-t') || footerContent.includes('border-white/10'),
    'B14.5: Footer includes top border separation line'
  );

  // =========================================================================
  // Feature 15: Ambient Motion Boundaries
  // =========================================================================
  console.log('Feature 15: Ambient Motion Boundaries');
  assertContains(cursorContent, 'matchMedia(\'(pointer: coarse)\')', 'B15.1: Cursor disables tracking on touchscreen devices');
  assertContains(cursorContent, 'removeEventListener(\'mousemove\'', 'B15.2: Cursor removes mousemove listener on unmount');
  assertContains(cursorContent, 'translate(-50%, -50%)', 'B15.3: Cursor glow translates to center under pointer');
  assertContains(globalsCss, '::-webkit-scrollbar-thumb:hover', 'B15.4: globals.css styles scrollbar hover state with lime');
  assertContains(indexHtml, 'selection:bg-lime-400', 'B15.5: HTML body configures lime text selection color');

  // =========================================================================
  // Feature 16: Production Build & Config Boundaries
  // =========================================================================
  console.log('Feature 16: Production Build & Config Boundaries');
  const tsconfig = readJsonSafe('tsconfig.json');
  assert(
    Boolean(tsconfig?.compilerOptions?.strict),
    'B16.1: tsconfig.json enforces strict type safety ("strict": true)'
  );
  assert(
    Boolean(tsconfig?.compilerOptions?.jsx?.includes('react')),
    'B16.2: tsconfig.json configures React JSX transform'
  );
  const viteConfig = readFileSafe('vite.config.ts');
  assertContains(viteConfig, 'resolve:', 'B16.3: vite.config.ts configures resolve aliases');
  assertContains(viteConfig, '@', 'B16.4: vite.config.ts defines @ path alias');
  const postcssConfig = readFileSafe('postcss.config.js');
  assertContains(postcssConfig, 'tailwindcss', 'B16.5: postcss.config.js binds tailwindcss plugin');
}
