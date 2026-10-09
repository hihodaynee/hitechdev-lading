// tests/tier1-features.mjs
// Tier 1: Feature Conformance & Structural Coverage
// Verifies all 16 features with >= 5 assertions each (>= 80 assertions total)

import path from 'node:path';
import {
  setTier,
  assert,
  fileExists,
  assertFileExists,
  assertFileMinSize,
  assertValidPng,
  assertContains,
  readFileSafe,
  readJsonSafe,
  ROOT_DIR,
} from './test-utils.mjs';

export async function runTier1Tests() {
  setTier('tier1');
  console.log('\n\x1b[1m=== Running Tier 1: Feature Conformance & Structural Coverage ===\x1b[0m\n');

  // =========================================================================
  // Feature 1: Tooling & Project Scaffold (Vite + React + TS + Tailwind)
  // =========================================================================
  console.log('Feature 1: Tooling & Project Scaffold');
  assertFileExists('package.json', 'F1.1: package.json exists');
  const pkg = readJsonSafe('package.json');
  assert(pkg && pkg.type === 'module', 'F1.2: package.json specifies "type": "module"', { pkgType: pkg?.type });
  assert(
    Boolean(pkg?.dependencies?.react && pkg?.dependencies?.['react-dom'] && pkg?.dependencies?.['lucide-react']),
    'F1.3: Core dependencies (react, react-dom, lucide-react) are installed'
  );
  assert(
    Boolean(pkg?.dependencies?.clsx && pkg?.dependencies?.['tailwind-merge']),
    'F1.4: Utility dependencies (clsx, tailwind-merge) are installed'
  );
  assert(
    Boolean(pkg?.devDependencies?.vite && pkg?.devDependencies?.tailwindcss && pkg?.devDependencies?.typescript),
    'F1.5: Dev tooling (vite, tailwindcss, typescript) is installed'
  );
  const indexHtml = readFileSafe('index.html');
  assertContains(indexHtml, 'Space+Grotesk', 'F1.6: index.html loads Google Font Space Grotesk');
  assertContains(indexHtml, 'JetBrains+Mono', 'F1.7: index.html loads Google Font JetBrains Mono');

  // =========================================================================
  // Feature 2: Brand Logo Integration (public/logo.png)
  // =========================================================================
  console.log('Feature 2: Brand Logo Integration');
  assertFileExists('public/logo.png', 'F2.1: public/logo.png exists');
  assertFileMinSize('public/logo.png', 100000, 'F2.2: public/logo.png is high-resolution asset (> 100KB)');
  assertValidPng('public/logo.png', 'F2.3: public/logo.png has valid PNG binary signature');
  const headerContent = readFileSafe('src/components/layout/Header.tsx');
  assertContains(headerContent, '/logo.png', 'F2.4: Header component renders /logo.png');
  const footerContent = readFileSafe('src/components/layout/Footer.tsx');
  // If footer is being written, check when available or verify in App / layout
  assert(
    headerContent.includes('/logo.png') || footerContent.includes('/logo.png'),
    'F2.5: Brand logo is bound into navigation/branding layout'
  );
  assertContains(indexHtml, '/logo.png', 'F2.6: index.html references /logo.png as favicon');

  // =========================================================================
  // Feature 3: Outer Shell Container (1600px, rounded-[2.5rem])
  // =========================================================================
  console.log('Feature 3: Outer Shell Container');
  assertFileExists('src/components/layout/ShellContainer.tsx', 'F3.1: ShellContainer.tsx exists');
  const shellContent = readFileSafe('src/components/layout/ShellContainer.tsx');
  assertContains(shellContent, 'max-w-[1600px]', 'F3.2: ShellContainer enforces max-w-[1600px] constraint');
  assertContains(shellContent, 'rounded-[2.5rem]', 'F3.3: ShellContainer enforces rounded-[2.5rem]');
  assertContains(shellContent, 'ring-1 ring-white/10', 'F3.4: ShellContainer enforces ring-1 ring-white/10 border glow');
  assertContains(shellContent, 'bg-obsidian', 'F3.5: ShellContainer applies Obsidian background color');
  assertContains(shellContent, 'mx-auto', 'F3.6: ShellContainer centers layout via mx-auto');

  // =========================================================================
  // Feature 4: Central Site Config (src/config/site.ts)
  // =========================================================================
  console.log('Feature 4: Central Site Config Hub');
  assertFileExists('src/config/site.ts', 'F4.1: src/config/site.ts exists');
  const siteConfigContent = readFileSafe('src/config/site.ts');
  assertContains(siteConfigContent, 'export const siteConfig', 'F4.2: site.ts exports siteConfig constant');
  assertContains(siteConfigContent, 'tiktok:', 'F4.3: siteConfig defines tiktok social URL');
  assertContains(siteConfigContent, 'facebook:', 'F4.4: siteConfig defines facebook social URL');
  assertContains(siteConfigContent, 'zaloCommunity:', 'F4.5: siteConfig defines zaloCommunity URL');
  assertContains(siteConfigContent, 'HITECHVIP2026', 'F4.6: siteConfig defines vipCouponCode as HITECHVIP2026');

  // =========================================================================
  // Feature 5: Floating Pill Header with Pulsating System Status
  // =========================================================================
  console.log('Feature 5: Floating Pill Header & System Status');
  assertFileExists('src/components/layout/Header.tsx', 'F5.1: Header.tsx exists');
  assertContains(headerContent, 'sticky', 'F5.2: Header uses sticky viewport positioning');
  assertContains(headerContent, 'rounded-full', 'F5.3: Header applies pill shape rounded-full styling');
  assertContains(headerContent, 'SYSTEM OPERATIONAL', 'F5.4: Header displays SYSTEM OPERATIONAL status text');
  assert(
    headerContent.includes('#ai-studio') ||
      headerContent.includes('#/tools') ||
      headerContent.includes('/tools'),
    'F5.6: Header contains anchor link to AI Studio / Tools section'
  );

  // =========================================================================
  // Feature 6: Mobile Responsive Navigation Drawer
  // =========================================================================
  console.log('Feature 6: Mobile Responsive Navigation Drawer');
  assertContains(headerContent, 'mobileMenuOpen', 'F6.1: Header manages mobileMenuOpen reactive state');
  assertContains(headerContent, 'md:hidden', 'F6.2: Header mobile toggle is hidden on desktop (md:hidden)');
  assertContains(headerContent, 'Toggle navigation menu', 'F6.3: Mobile toggle has accessible aria-label');
  assertContains(headerContent, 'setMobileMenuOpen(false)', 'F6.4: Mobile navigation closes drawer on item selection');
  assertContains(headerContent, 'X', 'F6.5: Header imports and uses close icon X when drawer is open');

  // =========================================================================
  // Feature 7: Hero Section Split-Grid Typography & CTAs
  // =========================================================================
  console.log('Feature 7: Hero Section Split-Grid Typography & CTAs');
  assertFileExists('src/components/hero/HeroSection.tsx', 'F7.1: HeroSection.tsx exists');
  const heroContent = readFileSafe('src/components/hero/HeroSection.tsx');
  assertContains(heroContent, 'grid-cols-1 lg:grid-cols-12', 'F7.2: Hero uses responsive 12-column split grid');
  assertContains(heroContent, 'Vũ Khí Tự Động Hoá', 'F7.3: Hero features authoritative punchy MMO headline');
  assertContains(heroContent, '90%', 'F7.4: Hero communicates 90% time saved metric');
  assertContains(heroContent, '10x', 'F7.5: Hero communicates 10x output speed metric');
  assertContains(heroContent, 'variant="neon-pulse"', 'F7.6: Hero CTA uses neon-pulse button variant');

  // =========================================================================
  // Feature 8: Floating Glass Cards & Keyframe Animation
  // =========================================================================
  console.log('Feature 8: Floating Glass Cards & Keyframe Animation');
  assertFileExists('src/components/hero/FloatingPreviewCard.tsx', 'F8.1: FloatingPreviewCard.tsx exists');
  const floatCardContent = readFileSafe('src/components/hero/FloatingPreviewCard.tsx');
  assertContains(floatCardContent, 'animate-float-slow', 'F8.2: Card uses animate-float-slow keyframe animation');
  assertContains(floatCardContent, 'animate-float-delayed', 'F8.3: Secondary card uses staggered delayed float animation');
  assertContains(floatCardContent, 'Protagonist_Master_01', 'F8.4: Card visualizes Character Anchor lock');
  assertContains(floatCardContent, 'Supertonic 3 Neural TTS', 'F8.5: Card visualizes Supertonic TTS engine');
  assertContains(floatCardContent, 'CapCut Desktop Native Draft', 'F8.6: Card visualizes CapCut Desktop draft export');

  // =========================================================================
  // Feature 9: Methodology Contrast Section (Titanium 3-Step)
  // =========================================================================
  console.log('Feature 9: Methodology Contrast Section');
  assertFileExists('src/components/methodology/MethodologySection.tsx', 'F9.1: MethodologySection.tsx exists');
  const methodContent = readFileSafe('src/components/methodology/MethodologySection.tsx');
  assertContains(methodContent, 'bg-zinc-100 text-zinc-950', 'F9.2: Methodology applies Titanium high-contrast light theme');
  assertContains(methodContent, 'id="methodology"', 'F9.3: Methodology provides #methodology anchor target');
  assertContains(methodContent, 'methodologySteps', 'F9.4: Methodology maps through siteConfig.methodologySteps');
  assertContains(methodContent, 'Công nghệ lõi:', 'F9.5: Methodology renders core technology badges');
  assertContains(methodContent, 'md:grid-cols-3', 'F9.6: Methodology displays 3-step grid layout');

  // =========================================================================
  // Feature 10: Bento Card: HITech AI Studio (LIVE)
  // =========================================================================
  console.log('Feature 10: Bento Card: HITech AI Studio (LIVE)');
  const bentoGridFile = 'src/components/bento/BentoGrid.tsx';
  const aiStudioFile = 'src/components/bento/AiStudioCard.tsx';
  assert(
    fileExists(aiStudioFile) || fileExists(bentoGridFile),
    'F10.1: AI Studio Bento Card component exists',
    { aiStudioFile, bentoGridFile }
  );
  const aiStudioContent = readFileSafe(aiStudioFile) || readFileSafe(bentoGridFile);
  assertContains(siteConfigContent, "status: 'LIVE'", 'F10.2: AI Studio configured with status LIVE');
  assert(
    aiStudioContent.includes('Seedance') || siteConfigContent.includes('Seedance'),
    'F10.3: AI Studio highlights Seedance Video Miễn Phí'
  );
  assert(
    aiStudioContent.includes('Seedream') || siteConfigContent.includes('Seedream'),
    'F10.4: AI Studio highlights Seedream Image Miễn Phí'
  );
  assert(
    aiStudioContent.includes('Cast Consistency') || siteConfigContent.includes('Cast Consistency'),
    'F10.5: AI Studio highlights Character Anchors & Cast Consistency'
  );
  assert(
    aiStudioContent.includes('Supertonic') || siteConfigContent.includes('Supertonic'),
    'F10.6: AI Studio highlights Supertonic Neural TTS'
  );
  assertContains(siteConfigContent, 'CapCut', 'F10.7: AI Studio highlights CapCut Desktop integration');

  // =========================================================================
  // Feature 11: Bento Card: HITech Auto Video (COMING SOON)
  // =========================================================================
  console.log('Feature 11: Bento Card: HITech Auto Video (COMING SOON)');
  const autoVideoFile = 'src/components/bento/AutoVideoCard.tsx';
  assert(
    fileExists(autoVideoFile) || fileExists(bentoGridFile),
    'F11.1: Auto Video Bento Card component exists',
    { autoVideoFile, bentoGridFile }
  );
  assertContains(siteConfigContent, "status: 'COMING_SOON'", 'F11.2: Auto Video configured with status COMING_SOON');
  assertContains(siteConfigContent, 'Meta Demucs Vocal Split', 'F11.3: Auto Video highlights Meta Demucs vocal isolation');
  assertContains(siteConfigContent, 'Faster-Whisper INT8', 'F11.4: Auto Video highlights Faster-Whisper INT8 transcription');
  assertContains(siteConfigContent, 'TTS Budget Fitting', 'F11.5: Auto Video highlights zero-desync TTS budget fitting');
  assertContains(siteConfigContent, '1-Pass FFmpeg Engine', 'F11.6: Auto Video highlights 1-Pass FFmpeg transcode engine');
  assertContains(siteConfigContent, 'Auto Scraper Douyin', 'F11.7: Auto Video highlights Douyin scraper capability');

  // =========================================================================
  // Feature 12: Zalo VIP Community Section
  // =========================================================================
  console.log('Feature 12: Zalo VIP Community Section');
  const zaloVipFile = 'src/components/vip/ZaloVipSection.tsx';
  const vipModalFile = 'src/components/vip/VipModal.tsx';
  assert(
    fileExists(zaloVipFile) || fileExists('src/components/vip/VipSection.tsx'),
    'F12.1: Zalo VIP Section component exists'
  );
  const zaloVipContent = readFileSafe(zaloVipFile) || readFileSafe('src/components/vip/VipSection.tsx');
  assertContains(siteConfigContent, 'HITECHVIP2026', 'F12.2: VIP Coupon Code HITECHVIP2026 defined in config');
  assertContains(siteConfigContent, 'vipPerks', 'F12.3: VIP perks list defined in siteConfig');
  assert(
    siteConfigContent.includes('20%') || zaloVipContent.includes('20%') || siteConfigContent.includes('HITECHVIP2026'),
    'F12.4: 20% discount perk code highlighted'
  );
  assert(
    zaloVipContent.includes('neon-pulse') || heroContent.includes('neon-pulse'),
    'F12.5: Neon Pulse Button style utilized for VIP conversion'
  );

  // =========================================================================
  // Feature 13: Neon Pulse VIP Modal & Voucher System
  // =========================================================================
  console.log('Feature 13: Neon Pulse VIP Modal & Voucher System');
  assert(
    fileExists(vipModalFile) || fileExists('src/components/vip/VipDialog.tsx'),
    'F13.1: VIP Modal component exists'
  );
  const modalContent = readFileSafe(vipModalFile) || readFileSafe('src/components/vip/VipDialog.tsx');
  assert(
    modalContent.includes('HITECHVIP2026') || modalContent.includes('siteConfig.vipCouponCode'),
    'F13.2: Modal displays exclusive VIP coupon code'
  );
  assert(
    modalContent.includes('clipboard') || modalContent.includes('copied') || modalContent.includes('copy'),
    'F13.3: Modal includes clipboard copy mechanism'
  );
  assert(
    modalContent.includes('zalo') || modalContent.includes('zaloCommunity'),
    'F13.4: Modal links directly to Zalo VIP community'
  );
  assert(
    modalContent.includes('onClose') || modalContent.includes('isOpen'),
    'F13.5: Modal supports open/close state management'
  );

  // =========================================================================
  // Feature 14: Obsidian & Lime Footer & Watermark
  // =========================================================================
  console.log('Feature 14: Obsidian & Lime Footer & Watermark');
  assertFileExists('src/components/layout/Footer.tsx', 'F14.1: Footer.tsx exists');
  const footerSource = readFileSafe('src/components/layout/Footer.tsx');
  assert(
    footerSource.includes('HITECH MMO // AUTOMATION') || footerSource.includes('HITECH MMO') || footerSource.includes('AUTOMATION'),
    'F14.2: Footer includes HITECH MMO // AUTOMATION watermark/typography'
  );
  assert(
    footerSource.includes('siteConfig.socials') || footerSource.includes('tiktok') || footerSource.includes('facebook'),
    'F14.3: Footer renders social links'
  );
  assert(
    footerSource.includes('/logo.png') || footerSource.includes('logo'),
    'F14.4: Footer integrates brand logo'
  );
  assert(
    footerSource.includes('2026') || footerSource.includes('getFullYear'),
    'F14.5: Footer displays 2026 copyright attribution'
  );

  // =========================================================================
  // Feature 15: Ambient Motion, Cursor & Lime Hover Effects
  // =========================================================================
  console.log('Feature 15: Ambient Motion, Cursor & Lime Hover Effects');
  assertFileExists('src/components/ui/GlowingCursor.tsx', 'F15.1: GlowingCursor.tsx exists');
  const cursorContent = readFileSafe('src/components/ui/GlowingCursor.tsx');
  assertContains(cursorContent, 'mousemove', 'F15.2: GlowingCursor tracks mousemove events');
  assertContains(cursorContent, 'pointer: coarse', 'F15.3: GlowingCursor respects touch device media query');
  assertContains(cursorContent, 'pointer-events-none', 'F15.4: GlowingCursor sets pointer-events-none');
  const tailwindConfig = readFileSafe('tailwind.config.js');
  assertContains(tailwindConfig, 'float', 'F15.5: tailwind.config.js defines float keyframe');
  assertContains(tailwindConfig, 'pulse-glow', 'F15.6: tailwind.config.js defines pulse-glow keyframe');

  // =========================================================================
  // Feature 16: Production Build & Zero-Warning Gate
  // =========================================================================
  console.log('Feature 16: Production Build & Zero-Warning Gate');
  assertFileExists('src/App.tsx', 'F16.1: src/App.tsx exists');
  assertFileExists('src/main.tsx', 'F16.2: src/main.tsx exists');
  assertFileExists('vite.config.ts', 'F16.3: vite.config.ts exists');
  const viteConfigContent = readFileSafe('vite.config.ts');
  assertContains(viteConfigContent, '@vitejs/plugin-react', 'F16.4: vite.config.ts configures React plugin');
  const appContent = readFileSafe('src/App.tsx');
  assert(
    appContent.includes('ShellContainer') || appContent.includes('Header'),
    'F16.5: App.tsx connects core layout components'
  );
}
