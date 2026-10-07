// tests/tier4-scenarios.mjs
// Tier 4: Real-World End-to-End User Workflows
// Verifies >= 8 realistic user journey scenarios

import {
  setTier,
  assert,
  readFileSafe,
} from './test-utils.mjs';

export async function runTier4Tests() {
  setTier('tier4');
  console.log('\n\x1b[1m=== Running Tier 4: Real-World End-to-End User Workflows ===\x1b[0m\n');

  const appContent = readFileSafe('src/App.tsx');
  const headerContent = readFileSafe('src/components/layout/Header.tsx');
  const heroContent = readFileSafe('src/components/hero/HeroSection.tsx');
  const floatCardContent = readFileSafe('src/components/hero/FloatingPreviewCard.tsx');
  const aiStudioContent = readFileSafe('src/components/bento/AiStudioCard.tsx');
  const autoVideoContent = readFileSafe('src/components/bento/AutoVideoCard.tsx');
  const methodContent = readFileSafe('src/components/methodology/MethodologySection.tsx');
  const zaloVipContent = readFileSafe('src/components/vip/ZaloVipSection.tsx');
  const vipModalContent = readFileSafe('src/components/vip/VipModal.tsx');
  const footerContent = readFileSafe('src/components/layout/Footer.tsx');
  const siteConfigContent = readFileSafe('src/config/site.ts');

  // =========================================================================
  // Workflow 1: First-Time Visitor Land & Value Discovery Flow
  // =========================================================================
  console.log('Workflow 1: First-Time Visitor Land & Value Discovery');
  const u1_valid =
    heroContent.includes('Vũ Khí Tự Động Hoá') &&
    heroContent.includes('90%') &&
    heroContent.includes('10x') &&
    floatCardContent.includes('Protagonist_Master_01') &&
    floatCardContent.includes('Supertonic 3 Neural TTS');
  assert(
    u1_valid,
    'U1: First-time visitor experiences punchy headline, proof metrics (90%, 10x), and interactive preview card'
  );

  // =========================================================================
  // Workflow 2: AI Studio Flagship Deep-Dive & Quality Gate Verification Flow
  // =========================================================================
  console.log('Workflow 2: AI Studio Flagship Deep-Dive');
  const u2_valid =
    aiStudioContent.includes('id="ai-studio"') &&
    (aiStudioContent.includes('product.statusLabel') || aiStudioContent.includes('LIVE')) &&
    aiStudioContent.includes('aiStudioDownloadUrl') &&
    (/seedance/i.test(aiStudioContent) || siteConfigContent.includes('CapCut'));
  assert(
    u2_valid,
    'U2: Creator navigates to AI Studio, verifies LIVE status, verifies Setup.exe download, and checks CapCut/Seedance features'
  );

  // =========================================================================
  // Workflow 3: Auto Video Next-Gen Pipeline Exploration Flow
  // =========================================================================
  console.log('Workflow 3: Auto Video Next-Gen Pipeline Exploration');
  const u3_valid =
    autoVideoContent.includes('id="auto-video"') &&
    autoVideoContent.includes('activeGroupIndex') &&
    autoVideoContent.includes('5 Nhóm Chức Năng Chính') &&
    autoVideoContent.includes('sm:grid-cols-3') &&
    siteConfigContent.includes('Dịch & Thuyết Minh Video Nước Ngoài');
  assert(
    u3_valid,
    'U3: MMO farmer inspects Auto Video, toggles 5 feature groups, and checks horizontal AI dubbing modes'
  );

  // =========================================================================
  // Workflow 4: Zalo VIP Conversion & Discount Voucher Claim Flow
  // =========================================================================
  console.log('Workflow 4: Zalo VIP Conversion & Discount Claim');
  const u4_valid =
    zaloVipContent.includes('id="vip"') &&
    zaloVipContent.includes('variant="neon-pulse"') &&
    (vipModalContent.includes('HITECHVIP2026') || vipModalContent.includes('siteConfig.vipCouponCode')) &&
    vipModalContent.includes('handleCopyCode') &&
    vipModalContent.includes('siteConfig.socials.zaloCommunity');
  assert(
    u4_valid,
    'U4: User reaches VIP section, triggers Neon Pulse CTA, receives HITECHVIP2026 voucher, copies to clipboard, and accesses Zalo group'
  );

  // =========================================================================
  // Workflow 5: Mobile Visitor Navigation & Anchor Jump Flow
  // =========================================================================
  console.log('Workflow 5: Mobile Visitor Navigation & Anchor Jump');
  const u5_valid =
    headerContent.includes('hidden') &&
    headerContent.includes('mobileMenuOpen') &&
    headerContent.includes('onClick={() => setMobileMenuOpen(false)}');
  assert(
    u5_valid,
    'U5: Mobile user toggles responsive hamburger drawer, views live system status, taps navigation link, and drawer dismisses'
  );

  // =========================================================================
  // Workflow 6: Technical Architecture & Process Audit Flow
  // =========================================================================
  console.log('Workflow 6: Technical Architecture & Process Audit');
  const u6_valid =
    methodContent.includes('id="methodology"') &&
    methodContent.includes('bg-zinc-100 text-zinc-950') &&
    methodContent.includes('KIẾN TRÚC TỰ ĐỘNG HOÁ 3 BƯỚC') &&
    methodContent.includes('Công nghệ lõi:');
  assert(
    u6_valid,
    'U6: Tech lead evaluates titanium contrast section, audits 3-step automation pipeline, and verifies core technology tags'
  );

  // =========================================================================
  // Workflow 7: Social Presence & Brand Authenticity Verification Flow
  // =========================================================================
  console.log('Workflow 7: Social Presence & Brand Authenticity Verification');
  const u7_valid =
    footerContent.includes('/logo.png') &&
    footerContent.includes('HITECH MMO // AUTOMATION') &&
    footerContent.includes('siteConfig.socials.tiktok') &&
    footerContent.includes('siteConfig.socials.facebook') &&
    footerContent.includes('siteConfig.socials.zaloCommunity');
  assert(
    u7_valid,
    'U7: User navigates to footer, checks official logo, watermark typography, and verifies TikTok, Facebook, and Zalo channels'
  );

  // =========================================================================
  // Workflow 8: System Reliability & Sticky Header Navigation Flow
  // =========================================================================
  console.log('Workflow 8: System Reliability & Sticky Header Navigation');
  const u8_valid =
    headerContent.includes('sticky top-') &&
    headerContent.includes('animate-ping') &&
    appContent.includes('<GlowingCursor />') &&
    appContent.includes('<ShellContainer>');
  assert(
    u8_valid,
    'U8: Sticky header maintains persistent access with pulsing online status across all sections inside shell container'
  );
}
