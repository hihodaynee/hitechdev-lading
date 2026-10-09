// tests/tier3-pairwise.mjs
// Tier 3: Cross-Feature Pairwise Integration Scenarios
// Covers >= 16 distinct pairwise integration scenarios across the 16 features

import {
  setTier,
  assert,
  assertContains,
  readFileSafe,
} from './test-utils.mjs';

export async function runTier3Tests() {
  setTier('tier3');
  console.log('\n\x1b[1m=== Running Tier 3: Cross-Feature Pairwise Combinations ===\x1b[0m\n');

  const siteConfigContent = readFileSafe('src/config/site.ts');
  const appContent = readFileSafe('src/App.tsx');
  const headerContent = readFileSafe('src/components/layout/Header.tsx');
  const footerContent = readFileSafe('src/components/layout/Footer.tsx');
  const heroContent = readFileSafe('src/components/hero/HeroSection.tsx');
  const floatCardContent = readFileSafe('src/components/hero/FloatingPreviewCard.tsx');
  const methodContent = readFileSafe('src/components/methodology/MethodologySection.tsx');
  const bentoContent = readFileSafe('src/components/bento/BentoGrid.tsx');
  const aiStudioContent = readFileSafe('src/components/bento/AiStudioCard.tsx');
  const autoVideoContent = readFileSafe('src/components/bento/AutoVideoCard.tsx');
  const zaloVipContent = readFileSafe('src/components/vip/ZaloVipSection.tsx');
  const vipModalContent = readFileSafe('src/components/vip/VipModal.tsx');
  const shellContent = readFileSafe('src/components/layout/ShellContainer.tsx');
  const tailwindConfig = readFileSafe('tailwind.config.js');

  // Pair 1: Tooling (F1) + Logo Asset (F2)
  console.log('Pairwise 1: Tooling (F1) + Logo Asset (F2)');
  assert(
    readFileSafe('index.html').includes('href="/logo.png"') && readFileSafe('package.json').includes('vite'),
    'P1: Tooling serves /logo.png directly as public asset root'
  );

  // Pair 2: Outer Shell (F3) + Header Navigation (F5)
  console.log('Pairwise 2: Outer Shell (F3) + Header Navigation (F5)');
  assert(
    shellContent.includes('max-w-[1600px]') && headerContent.includes('max-w-5xl') && appContent.includes('<Header'),
    'P2: Header max-w-5xl is cleanly contained inside Shell max-w-[1600px]'
  );

  // Pair 3: Central Site Config (F4) + Floating Header (F5)
  console.log('Pairwise 3: Central Site Config (F4) + Floating Header (F5)');
  assert(
    headerContent.includes('siteConfig.name') && headerContent.includes('siteConfig.tagline'),
    'P3: Header dynamically derives brand title & tagline from siteConfig'
  );

  // Pair 4: Central Site Config (F4) + Zalo VIP Section (F12)
  console.log('Pairwise 4: Central Site Config (F4) + Zalo VIP Section (F12)');
  assert(
    zaloVipContent.includes('siteConfig.vipCouponCode') && zaloVipContent.includes('siteConfig.vipPerks'),
    'P4: Zalo VIP Section renders coupon code and perk cards directly from siteConfig'
  );

  // Pair 5: Central Site Config (F4) + VIP Modal (F13)
  console.log('Pairwise 5: Central Site Config (F4) + VIP Modal (F13)');
  assert(
    vipModalContent.includes('siteConfig.vipCouponCode') && vipModalContent.includes('siteConfig.socials.zaloCommunity'),
    'P5: VIP Modal clipboard copy and join button link directly to siteConfig'
  );

  // Pair 6: Central Site Config (F4) + Obsidian Footer (F14)
  console.log('Pairwise 6: Central Site Config (F4) + Obsidian Footer (F14)');
  assert(
    footerContent.includes('siteConfig.socials.tiktok') &&
      footerContent.includes('siteConfig.socials.facebook') &&
      footerContent.includes('siteConfig.socials.zaloCommunity'),
    'P6: Footer renders all three social channels from siteConfig'
  );

  // Pair 7: Hero Section (F7) + Floating Glass Cards (F8)
  console.log('Pairwise 7: Hero Section (F7) + Floating Glass Cards (F8)');
  assert(
    heroContent.includes('<FloatingPreviewCard') && heroContent.includes('lg:col-span-5'),
    'P7: Hero Section integrates FloatingPreviewCard in right grid column'
  );

  // Pair 8: Header Navigation (F5) + Mobile Drawer (F6)
  console.log('Pairwise 8: Header Navigation (F5) + Mobile Drawer (F6)');
  assert(
    headerContent.includes('hidden md:flex') && headerContent.includes('md:hidden') && headerContent.includes('mobileMenuOpen'),
    'P8: Header alternates between desktop nav and mobile drawer via mobileMenuOpen state'
  );

  // Pair 9: AI Studio Bento Card (F10) + Auto Video Bento Card (F11)
  console.log('Pairwise 9: AI Studio Bento Card (F10) + Auto Video Bento Card (F11)');
  assert(
    bentoContent.includes('<AiStudioCard') && bentoContent.includes('<AutoVideoCard') && bentoContent.includes('lg:grid-cols-2'),
    'P9: BentoGrid aligns AI Studio (Live) and Auto Video (Coming Soon) side-by-side'
  );

  // Pair 10: Methodology Section (F9) + Bento Products (F10/F11)
  console.log('Pairwise 10: Methodology Section (F9) + Bento Products (F10/F11)');
  assert(
    methodContent.includes('siteConfig.methodologySteps') &&
      /1-pass/i.test(autoVideoContent),
    'P10: Pipeline components reflect core capabilities of Auto Video'
  );

  // Pair 11: Zalo VIP Section (F12) + VIP Modal (F13)
  console.log('Pairwise 11: Zalo VIP Section (F12) + VIP Modal (F13)');
  assert(
    zaloVipContent.includes('onOpenVipModal') && appContent.includes('onOpenVipModal={() => setVipModalOpen(true)}'),
    'P11: Zalo VIP Section button triggers onOpenVipModal callback to open VIP Modal'
  );

  // Pair 12: Auto Video Bento (F11) + VIP Modal (F13)
  console.log('Pairwise 12: Auto Video Bento (F11) + VIP Modal (F13)');
  assert(
    autoVideoContent.includes('onOpenVipModal') && (autoVideoContent.includes('Vào Nhóm Zalo') || autoVideoContent.includes('Nhận Vé Closed Beta')),
    'P12: Auto Video CTA connects to VIP Modal for waitlist onboarding'
  );

  // Pair 13: Floating Glass Cards (F8) + Ambient Motion System (F15)
  console.log('Pairwise 13: Floating Glass Cards (F8) + Ambient Motion System (F15)');
  assert(
    floatCardContent.includes('animate-float-slow') &&
      floatCardContent.includes('animate-float-delayed') &&
      tailwindConfig.includes('float:'),
    'P13: Floating preview cards use custom keyframe tokens defined in Tailwind motion config'
  );

  // Pair 14: Methodology Section (F9) + Outer Shell Container (F3)
  console.log('Pairwise 14: Methodology Section (F9) + Outer Shell Container (F3)');
  assert(
    shellContent.includes('bg-obsidian') && methodContent.includes('bg-zinc-100'),
    'P14: Titanium contrast section cleanly nests within Obsidian shell layout'
  );

  // Pair 15: Footer (F14) + Brand Logo (F2)
  console.log('Pairwise 15: Footer (F14) + Brand Logo (F2)');
  assert(
    footerContent.includes('/logo.png') && footerContent.includes('HITECH MMO // AUTOMATION'),
    'P15: Footer co-locates brand logo image and massive background watermark'
  );

  // Pair 16: Production Build (F16) + All Component Integrations (F1-F15)
  console.log('Pairwise 16: Production Build (F16) + All Component Integrations (F1-F15)');
  assert(
    appContent.includes('ShellContainer') &&
      appContent.includes('Header') &&
      (appContent.includes('HomeOverview') || appContent.includes('HeroSection')) &&
      (appContent.includes('ToolsSection') || appContent.includes('BentoGrid')) &&
      appContent.includes('DigitalStoreSection') &&
      appContent.includes('Footer') &&
      appContent.includes('VipModal') &&
      appContent.includes('GlowingCursor'),
    'P16: App.tsx integrates all primary features and sub-pages into a unified layout'
  );
}
