# Spec & UI/UX Requirements Handoff Report

## 1. Observation

- **Task Dispatch & Mandate**:
  - Source: `d:\code\tool\hitechdev-landing\.agents\teamwork\explorer_spec_1\DISPATCH.md:8-20`
  - Required Explorer 1 to formulate the complete functional, UI/UX, and technical specification for the HITech MMO landing page.

- **Original Request Analysis**:
  - Source: `d:\code\tool\hitechdev-landing\.agents\teamwork\ORIGINAL_REQUEST.md:5-81`
  - Mandates an Obsidian & Lime glassmorphism landing page for "HITech MMO (Tech • Digital • MMO)".
  - Core products to highlight:
    1. **HITech AI Studio**: Status `LIVE / HOÀN THIỆN` (Script & Ideas, Image Prompt Studio V2 with Character Anchors and 12 Quality Gates N1-N12, AI Voice & Dubbing, Multi-Account Browser Pool, Composer Studio).
    2. **HITech Auto Video**: Status `COMING SOON / SỚM RA MẮT` (Auto Scraper Douyin without watermark, AI Demucs & Faster-Whisper, Contextual Translation 14 languages & TTS Fitting, 3 Workflows: Reup, Visual Commentary, Movie Recap, 1-Pass FFmpeg Render Shorts 9:16 / Long 16:9 & Scheduler).
  - Conversion Funnel: TikTok, Facebook, Zalo Community VIP with Neon Pulse Button & Modal with perks/voucher.
  - Central config: `src/config/site.ts` holding all external links and customizable parameters.

- **Brand Logo Asset**:
  - Verified source path: `C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png`
  - Image verified via `view_file`: High-resolution dark circular badge displaying a stylized circuit "H" icon with text "HITECH MMO" and tagline "TECH • DIGITAL • MMO".
  - Destination requirement: Must be copied to `public/logo.png`.

- **Existing Repository State**:
  - Target directory: `d:\code\tool\hitechdev-landing`
  - Output of `list_dir`: Contains `.agents/` and `ORIGINAL_REQUEST.md`. No Node.js / Vite project has been created yet.
  - Sibling reference codebases verified: `d:\code\tool\ai-studio-source` (19 directories, 24 files) and `d:\code\tool\automation_video` (19 directories, 15 files).

---

## 2. Logic Chain

1. **Brand & Visual Language Deduction**:
   - The brand is positioned at the intersection of "Tech • Digital • MMO", requiring a cybernetic, dark-mode-first aesthetic with high performance appeal.
   - Primary background color: Obsidian `#0a0a0a` (`bg-[#0a0a0a]`), supplemented by deeper `#050505` and glassmorphic card surfaces (`bg-white/[0.03]`, `bg-[#121212]/80`, `backdrop-blur-xl`, `border border-white/10`).
   - Accent & Glow: Electric Lime `#ccff00` with subtle glows (`shadow-[0_0_25px_rgba(204,255,0,0.35)]`), providing high visual hierarchy and instant eye-catching contrast against dark obsidian.
   - Contrast Section: Inverting visual weight using a titanium/silver high-contrast card (`bg-zinc-100 text-zinc-950` with black accents) to break monotonous dark scrolling and emphasize the 3-step automation methodology.

2. **Typography Architecture**:
   - Headings & Punchy Copy: Google Font `Space Grotesk` (`weights: 500, 600, 700`) with tight letter spacing (`tracking-tight`) for futuristic and authoritative headers.
   - System Indicators, Technical Tags, & Metrics: Google Font `JetBrains Mono` (`weights: 400, 500, 700`) for terminal badges, status tags, and code tags.
   - Font Delivery: Import via Google Fonts in `index.html` or `src/index.css`, configured in `tailwind.config.js` under `fontFamily: { sans: ['"Space Grotesk"', 'sans-serif'], mono: ['"JetBrains Mono"', 'monospace'] }`.

3. **Layout & Component Decomposition**:
   - **Outer Shell Container**:
     - `max-w-[1600px]`, `rounded-[2.5rem]`, `ring-1 ring-white/10`, `bg-[#0a0a0a]`, `shadow-2xl`, with responsive padding (`p-4 sm:p-6 md:p-12`).
   - **Component 1: Floating Pill Header with System Status**:
     - Sticky floating pill (`sticky top-6 inset-x-0 mx-auto w-[92%] max-w-5xl z-50 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 px-6 py-3`).
     - Logo (`public/logo.png`) + "HITech MMO".
     - Navigation anchors: `#ai-studio`, `#auto-video`, `#methodology`, `#vip`.
     - System Status pill: `● SYSTEM OPERATIONAL` / `AI CLOUD ONLINE` with pulsating lime dot.
     - Mobile menu dropdown sheet for responsive screens (<768px).
   - **Component 2: Hero Section (Split-Grid)**:
     - Left Column: Headline ("Vũ Khí Tự Động Hoá MMO & Sản Xuất Nội Dung Bằng AI"), punchy sub-copy (90% time saved, 10x output speed), dual CTAs ("Khám Phá AI Studio" & "Auto Video"), and 4 technical stat badges.
     - Right Column: Floating glass preview cards with `float-anim` CSS animation illustrating prompt generation, character anchor lock, and audio waveform synchronization.
   - **Component 3: Bento Grid Showcase**:
     - Card A: **HITech AI Studio (LIVE)**
       - Badge: `LIVE / SẴN SÀNG` (Lime glow).
       - Features: Script & Ideas, Image Prompt Studio V2 (with SRT context ±2 cues, Character Anchors, 12 Quality Gates N1-N12), AI Voice & Dubbing, Multi-Account Browser Pool, Composer Studio.
     - Card B: **HITech Auto Video (COMING SOON)**
       - Badge: `COMING SOON / SỚM RA MẮT` (Amber/radar badge).
       - Features: Douyin Auto Scraper (no watermark, cookie bypass), Meta Demucs & Faster-Whisper, Contextual Translation (14 languages) & TTS Budget Fitting, 3 Workflows (Reup, Visual Commentary, Movie Recap), 1-Pass FFmpeg Render (Shorts 9:16 / Long 16:9).
       - Waitlist CTA triggering Zalo VIP modal.
   - **Component 4: Contrast Section (Methodology - 3 Bước)**:
     - High-contrast visual break (`bg-zinc-100 text-zinc-950`).
     - 3 Steps:
       1. *Bước 1: Thu Thập & Phân Tích (Ingest & Analyze)* - Douyin scrape, Demucs vocal split, Faster-Whisper timestamping.
       2. *Bước 2: Xử Lý AI Chuyên Sâu (Contextual AI & Quality Gates)* - 14-lang translation, TTS duration fitting, character-consistent prompt generation.
       3. *Bước 3: Xuất Bản Tự Động 1-Pass (1-Pass Render & Multi-Schedule)* - FFmpeg composite render, ASS styling, multi-channel automated posting.
   - **Component 5: Zalo VIP CTA & Neon Pulse Modal**:
     - Gradient Obsidian Card with glowing lime border and ambient aura.
     - Headline & 4 VIP privileges (20% discount voucher, Closed Beta access, weekly prompt pack, 1-on-1 support).
     - **Neon Pulse Button**: Heavy lime button with pulsing glow ring and hover scaling.
     - Interactive Modal: Shows Zalo group link, direct join button, QR code mockup, and copyable VIP coupon code (`HITECHVIP2026`).
   - **Component 6: Footer**:
     - Logo + Slogan ("Tech • Digital • MMO").
     - Background typography watermark (`HITECH MMO // AUTOMATION`).
     - Social Icons (TikTok, Facebook, Zalo) dynamically driven from `src/config/site.ts`.
     - Copyright and architecture badge.

4. **Configuration File Architecture (`src/config/site.ts`)**:
   - Central source of truth for socials, URLs, coupon codes, and feature lists.
   - Allows users to easily modify social URLs (`tiktok`, `facebook`, `zalo`) without editing component JSX.

5. **Interactions & CSS Animations**:
   - `@keyframes float`: Smooth floating motion for hero mockups.
   - `@keyframes pulse-glow`: Breathing glow for lime badges and CTA.
   - Glassmorphic backdrop utility styles.
   - Responsive glowing ambient cursor tracker (lightweight effect).

---

## 3. Caveats

- **Existing Project State**: The directory currently has no Vite boilerplate (`package.json`, `tsconfig.json`, `vite.config.ts`). The initialization worker must scaffold the project cleanly using standard Vite React TypeScript templates without overriding `.agents/`.
- **Image Copying**: The logo source file at `C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png` must be copied to `public/logo.png` during the setup milestone.
- **External Network Dependency**: Google fonts should be imported via standard CDN `<link>` tags in `index.html` with safe fallback font stacks (`sans-serif` and `monospace`) so the page renders even if offline.

---

## 4. Conclusion

All specifications, UI/UX designs, component breakdowns, brand assets, and configuration structures are fully mapped and detailed.

### Recommended Implementation Roadmap for Orchestrator:
- **Milestone 1: Project Setup & Shell**:
  - Scaffold Vite + React + TypeScript + Tailwind CSS in `d:\code\tool\hitechdev-landing`.
  - Install dependencies: `lucide-react`, `clsx`, `tailwind-merge`.
  - Copy Brand Logo from `C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png` to `public/logo.png`.
  - Configure Google Fonts (`Space Grotesk` & `JetBrains Mono`) and custom Tailwind color palette (`obsidian #0a0a0a`, `lime #ccff00`).
  - Implement Shell Container (`max-w-[1600px] rounded-[2.5rem] ring-1 ring-white/10`).
- **Milestone 2: Configuration & Navigation Shell**:
  - Implement `src/config/site.ts` with complete data schema, social links, VIP perks, and product details.
  - Implement Floating Pill Header with live status pulse and mobile responsive navigation.
- **Milestone 3: Core Content Sections**:
  - Implement Hero Section (split-grid with punchy copy and floating glass preview cards).
  - Implement Bento Grid for HITech AI Studio (LIVE) and HITech Auto Video (COMING SOON).
  - Implement Contrast Section (Methodology 3 steps with high-contrast titanium styling).
- **Milestone 4: Conversion & Polish**:
  - Implement Zalo VIP CTA Section with Neon Pulse Button.
  - Implement Zalo VIP interactive Modal (copy code, QR mockup, Zalo link).
  - Implement Footer with watermark and social icons.
  - Add ambient glow and animations (`float-anim`, `pulse-glow`).
- **Milestone 5: Verification & Quality Assurance**:
  - Execute `npm run build` to confirm exit code 0.
  - Verify layout responsiveness (375px, 768px, 1280px, 1600px+).

---

## 5. Verification Method

- **Build Verification**:
  - Command: `npm run build`
  - Expected: Clean compilation, zero TypeScript errors, zero Tailwind warnings, exit code 0.
- **Asset Verification**:
  - Command: `ls public/logo.png` or inspect `public/logo.png` file size (>0 bytes).
- **DOM & Style Invariants**:
  - Main container has classes `max-w-[1600px] rounded-[2.5rem] ring-1 ring-white/10`.
  - Font families `Space Grotesk` and `JetBrains Mono` are defined in `index.html` / `tailwind.config.js`.
  - `src/config/site.ts` exports `siteConfig` containing `tiktok`, `facebook`, and `zalo`.
  - Both products (HITech AI Studio and HITech Auto Video) render in the Bento Grid.
  - Neon pulse button activates the VIP modal on click.
