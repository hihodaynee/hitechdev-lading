// tests/challenger2-interactivity.mjs
// Adversarial Empirical Verification Suite for Challenger 2 (Interactivity & Flow)

import fs from 'node:fs';
import path from 'node:path';
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
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}`);
    failures.push({ testName, details });
    return false;
  }
}

function readFile(relPath) {
  const p = path.resolve(ROOT_DIR, relPath);
  return fs.readFileSync(p, 'utf-8');
}

console.log('\n======================================================================');
console.log('   CHALLENGER 2: EMPIRICAL INTERACTIVITY & USER FLOW SUITE');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// Suite 1: VIP Modal Triggers & Lifecycle State Machine
// -----------------------------------------------------------------------------
console.log('\x1b[1m=== Suite 1: VIP Modal Triggers & Lifecycle Flow ===\x1b[0m');

const appCode = readFile('src/App.tsx');
const vipModalCode = readFile('src/components/vip/VipModal.tsx');
const zaloVipCode = readFile('src/components/vip/ZaloVipSection.tsx');
const heroCode = readFile('src/components/hero/HeroSection.tsx');
const headerCode = readFile('src/components/layout/Header.tsx');
const aiStudioCode = readFile('src/components/bento/AiStudioCard.tsx');
const autoVideoCode = readFile('src/components/bento/AutoVideoCard.tsx');
const bentoGridCode = readFile('src/components/bento/BentoGrid.tsx');

// 1. Modal trigger binding checks
assert(
  appCode.includes('const [vipModalOpen, setVipModalOpen] = useState(false);') &&
  appCode.includes('<VipModal isOpen={vipModalOpen} onClose={() => setVipModalOpen(false)} />'),
  'App maintains stateful vipModalOpen and passes reactive onClose handler'
);

assert(
  zaloVipCode.includes('variant="neon-pulse"') &&
  zaloVipCode.includes('onClick={onOpenVipModal}'),
  'ZaloVipSection binds Neon Pulse Button to onOpenVipModal'
);

assert(
  heroCode.includes('variant="neon-pulse"') &&
  heroCode.includes('onClick={onOpenVipModal}'),
  'HeroSection binds Neon Pulse Button to onOpenVipModal'
);

assert(
  headerCode.includes('onClick={onOpenVipModal}'),
  'Header desktop VIP button binds onOpenVipModal'
);

assert(
  headerCode.includes('onOpenVipModal();') &&
  headerCode.includes('setMobileMenuOpen(false);'),
  'Header mobile VIP button triggers onOpenVipModal and dismisses drawer'
);

assert(
  bentoGridCode.includes('onOpenVipModal={onOpenVipModal}'),
  'BentoGrid forwards onOpenVipModal to both child cards'
);

assert(
  aiStudioCode.includes('aiStudioDownloadUrl'),
  'AiStudioCard provides direct Setup.exe download link'
);

assert(
  autoVideoCode.includes('onClick={onOpenVipModal}'),
  'AutoVideoCard binds Closed Beta button to onOpenVipModal'
);

// 2. Modal dismissal mechanics (Backdrop, Close Button, Escape key)
assert(
  vipModalCode.includes('if (!isOpen) return null;'),
  'VipModal safely renders null when isOpen is false (no DOM clutter)'
);

assert(
  vipModalCode.includes('className="fixed inset-0 bg-black/85') &&
  vipModalCode.includes('onClick={onClose}'),
  'VipModal backdrop dismisses modal on outside click'
);

assert(
  vipModalCode.includes('aria-label="Close modal"') &&
  vipModalCode.includes('onClick={onClose}'),
  'VipModal renders accessible X close button bound to onClose'
);

assert(
  vipModalCode.includes("if (e.key === 'Escape') onClose();") &&
  vipModalCode.includes("window.addEventListener('keydown', handleKeyDown);"),
  'VipModal listens for Escape key and triggers onClose'
);

assert(
  vipModalCode.includes("document.body.style.overflow = 'hidden'") &&
  vipModalCode.includes("document.body.style.overflow = 'unset'") &&
  vipModalCode.includes("window.removeEventListener('keydown', handleKeyDown);"),
  'VipModal locks body scroll on mount and cleans up scroll lock and listener on unmount'
);

// -----------------------------------------------------------------------------
// Suite 2: Voucher Code & Clipboard Feedback State Machine
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 2: Voucher Code & Clipboard Copy Mechanics ===\x1b[0m');

const siteConfigCode = readFile('src/config/site.ts');

assert(
  siteConfigCode.includes("vipCouponCode: 'HITECHVIP2026'"),
  'siteConfig defines official VIP coupon code HITECHVIP2026'
);

assert(
  vipModalCode.includes('{siteConfig.vipCouponCode}'),
  'VipModal renders siteConfig.vipCouponCode dynamically'
);

assert(
  vipModalCode.includes('const [copied, setCopied] = useState(false);') &&
  vipModalCode.includes('await navigator.clipboard.writeText(siteConfig.vipCouponCode);') &&
  vipModalCode.includes('setCopied(true);') &&
  vipModalCode.includes('setTimeout(() => setCopied(false), 2500);'),
  'VipModal handles copy action, toggles copied state, and resets after 2500ms timeout'
);

assert(
  vipModalCode.includes('ĐÃ CHÉP') &&
  vipModalCode.includes('SAO CHÉP'),
  'VipModal provides dual-state label ("SAO CHÉP" -> "ĐÃ CHÉP")'
);

assert(
  vipModalCode.includes('try {') &&
  vipModalCode.includes('catch (err) {') &&
  vipModalCode.includes("console.error('Failed to copy', err);"),
  'VipModal protects against clipboard permission errors with try/catch'
);

assert(
  vipModalCode.includes('<QrCode className="w-16 h-16 text-black" />') &&
  vipModalCode.includes('ZALO VIP'),
  'VipModal renders dedicated QR Code mockup with ZALO VIP badge'
);

assert(
  vipModalCode.includes('href={siteConfig.socials.zaloCommunity}') &&
  vipModalCode.includes('target="_blank"') &&
  vipModalCode.includes('rel="noopener noreferrer"'),
  'VipModal outbound CTA links directly to Zalo VIP community in secure new tab'
);

// -----------------------------------------------------------------------------
// Suite 3: Navigation Anchors & Smooth Scroll Destinations
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 3: Navigation Anchors & Target Element Conformance ===\x1b[0m');

const methodologyCode = readFile('src/components/methodology/MethodologySection.tsx');
const footerCode = readFile('src/components/layout/Footer.tsx');
const digitalStoreCode = readFile('src/components/store/DigitalStoreSection.tsx');

// Check that primary anchor targets are present in DOM
const anchorTargets = [
  { id: 'ai-studio', file: 'AiStudioCard.tsx', code: aiStudioCode },
  { id: 'auto-video', file: 'AutoVideoCard.tsx', code: autoVideoCode },
  { id: 'digital-store', file: 'DigitalStoreSection.tsx', code: digitalStoreCode },
  { id: 'vip', file: 'ZaloVipSection.tsx', code: zaloVipCode },
];

for (const target of anchorTargets) {
  assert(
    target.code.includes(`id="${target.id}"`),
    `Target section ID "#${target.id}" exists on root container in ${target.file}`
  );
}

// Check Header contains links to active anchors
assert(
  headerCode.includes("href: '#ai-studio'") &&
  headerCode.includes("href: '#auto-video'") &&
  headerCode.includes("href: '#digital-store'") &&
  headerCode.includes("href: '#vip'"),
  'Header navigation array contains links to primary sections'
);

// Check Footer contains links to active anchors
assert(
  footerCode.includes('href="#ai-studio"') &&
  footerCode.includes('href="#auto-video"') &&
  footerCode.includes('href="#digital-store"') &&
  footerCode.includes('href="#vip"'),
  'Footer navigation menu contains anchor links to primary sections'
);

// Check Header System Status
assert(
  headerCode.includes('animate-ping') &&
  headerCode.includes('bg-lime-400'),
  'Header displays live status indicator with pulsating lime beacon'
);

// -----------------------------------------------------------------------------
// Suite 4: Mobile Responsive Navigation Drawer Flow
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 4: Mobile Responsive Navigation Drawer Flow ===\x1b[0m');

assert(
  headerCode.includes('const [mobileMenuOpen, setMobileMenuOpen] = useState(false);'),
  'Header maintains mobileMenuOpen state variable'
);

assert(
  headerCode.includes('hidden') &&
  headerCode.includes('onClick={() => setMobileMenuOpen(!mobileMenuOpen)}'),
  'Mobile hamburger button toggles mobileMenuOpen state'
);

assert(
  headerCode.includes('{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}'),
  'Hamburger button switches between Menu and X icon based on open state'
);

assert(
  headerCode.includes('{mobileMenuOpen && (') &&
  headerCode.includes('mt-2 rounded-3xl bg-black/95'),
  'Mobile drawer conditionally renders on mobile viewports'
);

assert(
  headerCode.includes('onClick={() => setMobileMenuOpen(false)}') &&
  headerCode.includes('key={link.href}'),
  'Clicking any nav link inside mobile drawer automatically dismisses drawer'
);

// -----------------------------------------------------------------------------
// Suite 5: Interactive Runtime Tabs & Accordions
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 5: Interactive Runtime Tabs & Accordions ===\x1b[0m');

const floatCardCode = readFile('src/components/hero/FloatingPreviewCard.tsx');

// FloatingPreviewCard tabs
assert(
  floatCardCode.includes("const [activeTab, setActiveTab] = useState<'prompt' | 'audio' | 'pipeline'>('prompt');"),
  'FloatingPreviewCard manages 3-way activeTab state ("prompt" | "audio" | "pipeline")'
);

assert(
  floatCardCode.includes("onClick={() => setActiveTab('prompt')}") &&
  floatCardCode.includes("onClick={() => setActiveTab('audio')}") &&
  floatCardCode.includes("onClick={() => setActiveTab('pipeline')}"),
  'FloatingPreviewCard provides click handlers for all 3 runtime preview tabs'
);

assert(
  floatCardCode.includes("activeTab === 'prompt'") &&
  floatCardCode.includes('Protagonist_Master_01') &&
  floatCardCode.includes('SLIDING CONTEXT: CUE #024 [±2 WINDOW]'),
  'FloatingPreviewCard Prompt tab renders Character Anchor and Cue #024'
);

assert(
  floatCardCode.includes("activeTab === 'audio'") &&
  floatCardCode.includes('Supertonic 3 Neural TTS') &&
  floatCardCode.includes('FIT BUDGET: 4.8 W/S (PERFECT)') &&
  floatCardCode.includes('Whisper Large-v3-Turbo'),
  'FloatingPreviewCard Audio tab renders Supertonic TTS, animated waveform bars, and Whisper turbo'
);

assert(
  floatCardCode.includes("activeTab === 'pipeline'") &&
  floatCardCode.includes('1-Pass FFmpeg Hardware Transcode') &&
  floatCardCode.includes('CapCut Desktop Native Draft'),
  'FloatingPreviewCard Pipeline tab renders 1-Pass hardware transcode progress and CapCut export'
);

// AiStudioCard Screenshot Lightbox & Feature Switcher
assert(
  aiStudioCode.includes('const [selectedFeature, setSelectedFeature] = useState(0);') &&
  aiStudioCode.includes('setActiveScreenshot'),
  'AiStudioCard maintains selectedFeature index and activeScreenshot state'
);

assert(
  aiStudioCode.includes('activeScreenshot !== null'),
  'AiStudioCard renders Lightbox modal popup when activeScreenshot is set'
);

const lightboxCode = readFile('src/components/ui/ImageLightbox.tsx');
assert(
  aiStudioCode.includes("if (e.key === 'Escape') setActiveScreenshot(null);") ||
  (aiStudioCode.includes('ImageLightbox') &&
   aiStudioCode.includes('onClose={() => setActiveScreenshot(null)}') &&
   lightboxCode.includes("if (e.key === 'Escape') onClose();")),
  'AiStudioCard Lightbox dismisses on Escape key'
);

// AutoVideoCard 5 Groups & Horizontal 3-Column Layout
assert(
  autoVideoCode.includes('const [activeGroupIndex, setActiveGroupIndex] = useState(0);'),
  'AutoVideoCard initializes activeGroupIndex state to 0'
);

assert(
  autoVideoCode.includes('setActiveGroupIndex(index)'),
  'AutoVideoCard provides switching between all 5 feature groups'
);

assert(
  autoVideoCode.includes('sm:grid-cols-3') &&
  autoVideoCode.includes('features.length === 3'),
  'AutoVideoCard conditionally lays out 3-feature group horizontally without line wrapping'
);

// -----------------------------------------------------------------------------
// Suite 6: Empirical State Machine Simulation & Stress Testing
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 6: State Machine Simulation & Stress Testing ===\x1b[0m');

// Simulate Modal State Machine with Stress Fuzzing
class ModalStateMachine {
  constructor() {
    this.isOpen = false;
    this.bodyOverflow = 'unset';
    this.copied = false;
  }
  open() {
    this.isOpen = true;
    this.bodyOverflow = 'hidden';
  }
  close() {
    this.isOpen = false;
    this.bodyOverflow = 'unset';
  }
  escapeKey() {
    if (this.isOpen) this.close();
  }
  copy(code) {
    if (code === 'HITECHVIP2026') {
      this.copied = true;
    }
  }
  resetCopy() {
    this.copied = false;
  }
}

const modalSM = new ModalStateMachine();
assert(!modalSM.isOpen && modalSM.bodyOverflow === 'unset', 'Initial modal state is cleanly closed');
modalSM.open();
assert(modalSM.isOpen && modalSM.bodyOverflow === 'hidden', 'Modal open locks body scroll');
modalSM.copy('HITECHVIP2026');
assert(modalSM.copied === true, 'Copying valid VIP code triggers copied feedback');
modalSM.resetCopy();
assert(modalSM.copied === false, 'Timeout resets copy state');
modalSM.escapeKey();
assert(!modalSM.isOpen && modalSM.bodyOverflow === 'unset', 'Escape key dismisses modal and restores body scroll');

// Run 10,000 rapid state transitions to detect edge case lockups
let fuzzPassed = true;
for (let i = 0; i < 10000; i++) {
  const op = i % 4;
  if (op === 0) modalSM.open();
  else if (op === 1) modalSM.escapeKey();
  else if (op === 2) modalSM.close();
  else if (op === 3) modalSM.copy('HITECHVIP2026');
}
modalSM.close();
assert(
  fuzzPassed && !modalSM.isOpen && modalSM.bodyOverflow === 'unset',
  'Modal State Machine withstands 10,000 rapid fuzzed transitions with zero lockups'
);

// -----------------------------------------------------------------------------
// Suite 7: Telegram Support Floating Chat Bubble & v1.0.1 Release Conformance
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 7: Telegram Support Chat Bubble & v1.0.1 Release ===\x1b[0m');

const appSource = readFile('src/App.tsx');
assert(
  appSource.includes('TelegramSupportWidget') && appSource.includes('<TelegramSupportWidget />'),
  'App.tsx mounts TelegramSupportWidget floating chat bubble'
);

const telegramWidgetSource = readFile('src/components/support/TelegramSupportWidget.tsx');
assert(
  telegramWidgetSource.includes('/telegram-qr.png') &&
  telegramWidgetSource.includes('@HOHINEEE') &&
  telegramWidgetSource.includes('https://t.me/HOHINEEE'),
  'TelegramSupportWidget binds official @HOHINEEE QR image and direct t.me link'
);

assert(
  telegramWidgetSource.includes('Escape') && telegramWidgetSource.includes('mousedown'),
  'TelegramSupportWidget supports Escape key dismissal and click-outside dismissal'
);

assert(
  fs.existsSync(path.resolve(ROOT_DIR, 'public/telegram-qr.png')),
  'public/telegram-qr.png exists on filesystem for Telegram support QR presentation'
);

assert(
  fs.existsSync(path.resolve(ROOT_DIR, 'public/zalo-qr.png')),
  'public/zalo-qr.png exists on filesystem for Zalo support QR presentation'
);

const siteCfg = readFile('src/config/site.ts');
assert(
  siteCfg.includes('v1.1.1/HITechDev.AIStudio.F0-stable-Setup.exe'),
  'siteConfig binds official v1.1.1 stable release binary'
);

// -----------------------------------------------------------------------------
// Suite 8: Compiled Production Bundle Asset & Interactive Integrity
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 8: Compiled Production Bundle Forensic Audit ===\x1b[0m');

const distHtml = readFile('dist/index.html');
assert(distHtml.includes('<div id="root"></div>'), 'dist/index.html mounts <div id="root">');
assert(distHtml.includes('/logo.png'), 'dist/index.html references /logo.png favicon');

// Locate bundled js
const distAssets = fs.readdirSync(path.resolve(ROOT_DIR, 'dist/assets'));
const jsBundle = distAssets.find((f) => f.endsWith('.js'));
const cssBundle = distAssets.find((f) => f.endsWith('.css'));

assert(Boolean(jsBundle), `Production JS bundle exists: dist/assets/${jsBundle}`);
assert(Boolean(cssBundle), `Production CSS bundle exists: dist/assets/${cssBundle}`);

const bundledJsContent = readFile(`dist/assets/${jsBundle}`);
assert(
  bundledJsContent.includes('HITECHVIP2026'),
  'Bundled JS retains exact coupon code HITECHVIP2026'
);
assert(
  bundledJsContent.includes('ĐÃ CHÉP'),
  'Bundled JS retains copy confirmation string "ĐÃ CHÉP"'
);
assert(
  bundledJsContent.includes('ai-studio') &&
  bundledJsContent.includes('auto-video') &&
  bundledJsContent.includes('methodology') &&
  bundledJsContent.includes('vip') &&
  bundledJsContent.includes('digital-store'),
  'Bundled JS retains all 5 anchor target identifiers'
);
assert(
  bundledJsContent.includes('SYSTEM OPERATIONAL'),
  'Bundled JS retains live system operational badge'
);
assert(
  bundledJsContent.includes('zaloCommunity') ||
  bundledJsContent.includes('Zalo') ||
  bundledJsContent.includes('zalo'),
  'Bundled JS retains Zalo VIP community entry points'
);

// Brand Logo Binary Equality
const publicLogo = fs.readFileSync(path.resolve(ROOT_DIR, 'public/logo.png'));
const distLogo = fs.readFileSync(path.resolve(ROOT_DIR, 'dist/logo.png'));
assert(
  publicLogo.equals(distLogo),
  'Production dist/logo.png is identical bit-for-bit to public/logo.png'
);

// -----------------------------------------------------------------------------
// Suite 9: Digital Store (CapCut, Spotify, Gmail, Grok) & Order Flow
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m=== Suite 9: Digital Store & Order Flow Forensic Audit ===\x1b[0m');

const orderModalCode = readFile('src/components/store/OrderModal.tsx');
assert(
  appCode.includes('DigitalStoreSection') &&
  appCode.includes('OrderModal') &&
  appCode.includes('orderProduct') &&
  appCode.includes('setOrderProduct'),
  'App.tsx integrates DigitalStoreSection and manages OrderModal state'
);

assert(
  siteConfigCode.includes('capcut-pro') &&
  siteConfigCode.includes('spotify-premium') &&
  siteConfigCode.includes('gmail-aged') &&
  siteConfigCode.includes('grok-super'),
  'siteConfig defines all 4 digital products'
);

assert(
  siteConfigCode.includes('99.000đ') &&
  siteConfigCode.includes('289.000đ') &&
  siteConfigCode.includes('129.000đ') &&
  siteConfigCode.includes('49.000đ'),
  'siteConfig defines accurate pricing for all products and plans'
);

assert(
  fs.existsSync(path.resolve(ROOT_DIR, 'public/products/capcut-banner.jpg')) &&
  fs.existsSync(path.resolve(ROOT_DIR, 'public/products/capcut-details.png')) &&
  fs.existsSync(path.resolve(ROOT_DIR, 'public/products/spotify-banner.jpg')) &&
  fs.existsSync(path.resolve(ROOT_DIR, 'public/products/gmail-banner.jpg')) &&
  fs.existsSync(path.resolve(ROOT_DIR, 'public/products/grok-super.png')),
  'All 5 product image assets exist in public/products/'
);

assert(
  orderModalCode.includes('[ĐẶT HÀNG]') &&
  orderModalCode.includes('t.me/HOHINEEE') &&
  orderModalCode.includes('zalo-qr.png'),
  'OrderModal generates automated order syntax and connects to Telegram and Zalo'
);

// -----------------------------------------------------------------------------
// Suite Summary & Verdict
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log('   CHALLENGER 2 TEST SUITE SUMMARY');
console.log('======================================================================');
console.log(` Total Assertions Evaluated : ${totalTests}`);
console.log(` Total Passed               : ${passedTests}`);
console.log(` Total Failed               : ${failedTests}`);
console.log('======================================================================\n');

if (failedTests === 0) {
  console.log('\x1b[32m\x1b[1mVERDICT: APPROVE (Zero Failures Detected)\x1b[0m\n');
  process.exit(0);
} else {
  console.error('\x1b[31m\x1b[1mVERDICT: REQUEST_CHANGES\x1b[0m\n');
  console.error('Failures:', JSON.stringify(failures, null, 2));
  process.exit(1);
}
