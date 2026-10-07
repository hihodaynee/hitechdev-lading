# Project: HITech MMO Landing Page (Obsidian & Lime)

## Architecture
- **Framework**: Vite + React 18 + TypeScript + Tailwind CSS.
- **Styling Architecture**: Obsidian & Lime glassmorphism design system.
  - Backgrounds: Obsidian `#0a0a0a`, Surface Deep `#050505`, Glass Card `bg-white/[0.03]` with `backdrop-blur-xl` and `border-white/10`.
  - Accent & Highlights: Electric Lime `#ccff00`, `shadow-[0_0_25px_rgba(204,255,0,0.35)]`, pulse-glow animations.
  - High Contrast Section: Titanium Light `bg-zinc-100 text-zinc-950` with stark typography.
- **Typography**: Google Fonts loaded via CDN:
  - Display/Headings: `Space Grotesk` (weights 500, 600, 700).
  - Terminal/Code/Badges: `JetBrains Mono` (weights 400, 500, 700).
- **Icons**: `lucide-react`.
- **Configuration Hub**: `src/config/site.ts` exporting `siteConfig` containing social URLs (TikTok, Facebook, Zalo), contact details, VIP coupon code (`HITECHVIP2026`), and feature lists.
- **Responsive Layout**: Outer container `max-w-[1600px] rounded-[2.5rem] ring-1 ring-white/10 mx-auto my-4 sm:my-8`, fully responsive across Mobile (<768px), Tablet, Desktop (>=1024px), and Ultrawide.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Tooling & Project Scaffold | Vite + React + TypeScript + Tailwind CSS + Lucide Icons + Google Fonts | M1 | Survey / R1 |
| 2 | Brand Logo Integration | Copy high-res logo from brain directory to `public/logo.png`, integrate in Header & Footer | M1 | Survey / R1 |
| 3 | Outer Shell Container | Container `max-w-[1600px] rounded-[2.5rem] ring-1 ring-white/10` with obsidian glass styling | M1 | Survey / R2 |
| 4 | Central Site Config | `src/config/site.ts` centralizing TikTok, Facebook, Zalo links, copy & VIP perks | M2 | Survey / R3 |
| 5 | Floating Pill Header | Sticky pill navbar with logo, navigation links, and animated `SYSTEM OPERATIONAL` status badge | M2 | Survey / R2 |
| 6 | Mobile Responsive Navigation | Mobile hamburger drawer / dropdown sheet for clean navigation on small screens | M2 | Survey / R2 |
| 7 | Hero Section (Split-Grid) | High-impact headline, punchy value prop (90% time saved, 10x speed), dual CTAs | M3 | Survey / R2 |
| 8 | Floating Glass Cards | Animated interactive glass cards in Hero (`float-anim`) illustrating prompt & audio waveforms | M3 | Survey / R2, R4 |
| 9 | Methodology Contrast Section | High-contrast titanium 3-step process section (Ingest, AI Processing & Quality Gates, 1-Pass Render) | M3 | Survey / R2 |
| 10 | AI Studio Bento Card (LIVE) | Showcase HITech AI Studio with 12 Quality Gates N1-N12, ±2 cues context, Character Anchors, Supertonic TTS, Browser Pool, CapCut Drafts | M4 | Survey / R2 |
| 11 | Auto Video Bento Card (COMING SOON) | Showcase HITech Auto Video with Douyin scraper, Demucs & Whisper, 14-lang translation, 3 workflows, 1-Pass FFmpeg render | M4 | Survey / R2 |
| 12 | Zalo VIP Community Section | Exclusive VIP perks card with glow border, voucher `HITECHVIP2026`, and Neon Pulse Button | M5 | Survey / R2 |
| 13 | Neon Pulse VIP Modal | Interactive modal triggered by Neon Pulse Button with copyable voucher, QR mockup, direct Zalo link | M5 | Survey / R2 |
| 14 | Obsidian & Lime Footer | Watermark typography `HITECH MMO // AUTOMATION`, social icons, copyright & architecture tags | M5 | Survey / R2 |
| 15 | Ambient Motion & Micro-interactions | Glowing cursor, `float-anim`, `pulse-glow`, hover border transitions `#ccff00/40` | M5 | Survey / R4 |
| 16 | E2E Opaque-Box Test Suite | Automated test suite verifying build exit code 0, DOM structure, responsiveness, config integrity | M6 | Survey / AC |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Foundation & Shell Setup | Vite/React/TS/Tailwind scaffold, font setup, logo copying, theme tokens, Shell container | None | DONE |
| 2 | M2: Site Config & Floating Navigation | `src/config/site.ts`, Header with System Status pill, responsive mobile drawer | M1 | DONE |
| 3 | M3: Hero Section & Contrast Methodology | Hero split-grid, dual CTAs, animated floating glass cards, 3-step Methodology section | M2 | DONE |
| 4 | M4: Flagship Bento Grid Showcase | Deep showcase of AI Studio (LIVE) & Auto Video (COMING SOON) with interactive tabs & proof metrics | M3 | DONE |
| 5 | M5: VIP Conversion, Modal & Footer | Neon Pulse Zalo CTA, VIP modal dialog, Footer with watermark & socials, micro-interactions | M4 | DONE |
| 6 | M6: E2E Verification & Hardening | Full build test, automated test suite, mobile/desktop responsiveness, forensic audit | M1-M5 | DONE |

## Interface Contracts
### `src/config/site.ts` ↔ All UI Components
```typescript
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface VipPerk {
  title: string;
  description: string;
  icon: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  tag?: string;
}

export interface ProductInfo {
  name: string;
  tagline: string;
  status: 'LIVE' | 'COMING_SOON';
  statusLabel: string;
  description: string;
  features: ProductFeature[];
  badges: string[];
  metrics: { value: string; label: string }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  socials: {
    tiktok: string;
    facebook: string;
    zaloCommunity: string;
  };
  vipCouponCode: string;
  vipPerks: VipPerk[];
  products: {
    aiStudio: ProductInfo;
    autoVideo: ProductInfo;
  };
  methodologySteps: {
    step: string;
    title: string;
    description: string;
    tech: string[];
  }[];
}
```

## Code Layout
```
d:/code/tool/hitechdev-landing/
├── public/
│   ├── logo.png                       # Copied from user-provided brain asset (533,643 bytes)
│   └── favicon.ico
├── src/
│   ├── config/
│   │   └── site.ts                    # Central configuration for links, copy, perks
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ShellContainer.tsx     # 1600px rounded-2.5rem ring-1 ring-white/10 wrapper
│   │   │   ├── Header.tsx             # Floating pill header with system status
│   │   │   └── Footer.tsx             # Obsidian footer with watermark and socials
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx        # Split grid hero
│   │   │   └── FloatingPreviewCard.tsx# Animated glass card with waveforms & prompts
│   │   ├── bento/
│   │   │   ├── BentoGrid.tsx          # Main Bento container
│   │   │   ├── AiStudioCard.tsx       # Live product card (Quality gates, ±2 cues)
│   │   │   └── AutoVideoCard.tsx      # Coming soon card (Demucs, 1-pass FFmpeg)
│   │   ├── methodology/
│   │   │   └── MethodologySection.tsx # High contrast titanium 3-step section
│   │   ├── vip/
│   │   │   ├── ZaloVipSection.tsx     # Neon pulse CTA card
│   │   │   └── VipModal.tsx           # Interactive dialog with coupon & QR
│   │   └── ui/
│   │       ├── Badge.tsx              # JetBrains Mono tag badges
│   │       ├── Button.tsx             # Lime and outline button variants
│   │       └── GlowingCursor.tsx      # Ambient cursor glow tracker
│   ├── styles/
│   │   └── globals.css                # Custom glassmorphism, animations, scrollbars
│   ├── App.tsx                        # Root application layout
│   └── main.tsx                       # React DOM entrypoint
├── index.html                         # Google Fonts link & page title
├── tailwind.config.js                 # Obsidian #0a0a0a, Lime #ccff00, fonts
├── package.json
└── tsconfig.json
```
