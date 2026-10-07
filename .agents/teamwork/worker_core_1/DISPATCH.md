# Task Assignment: Core Landing Page Implementation Worker

You are Worker 1 (Core Implementation Worker).
Working Directory: d:\code\tool\hitechdev-landing\.agents\teamwork\worker_core_1\
Original Request: d:\code\tool\hitechdev-landing\.agents\teamwork\ORIGINAL_REQUEST.md
Master Architecture: d:\code\tool\hitechdev-landing\PROJECT.md
Spec Report: d:\code\tool\hitechdev-landing\.agents\teamwork\explorer_spec_1\handoff.md
AI Studio Spec: d:\code\tool\hitechdev-landing\.agents\teamwork\explorer_aistudio_1\handoff.md
Auto Video Spec: d:\code\tool\hitechdev-landing\.agents\teamwork\explorer_autovideo_1\handoff.md
Parent: Orchestrator (59b9cea2-a9f4-4c95-b5c0-b9f413f02d4d)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Owned Files:
- You exclusively own: `package.json`, `tsconfig*.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `public/`, `src/`.
- Do NOT modify `tests/` or files in `.agents/teamwork/` belonging to other agents.

Tasks:
1. Scaffold Vite + React + TypeScript + Tailwind CSS in `d:\code\tool\hitechdev-landing` (install `lucide-react`, `clsx`, `tailwind-merge`).
2. Copy Brand Logo from `C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png` to `public/logo.png`.
3. Configure Google Fonts (`Space Grotesk` & `JetBrains Mono`) and custom Tailwind palette (Obsidian `#0a0a0a`, Surface Deep `#050505`, Lime `#ccff00`, glassmorphism styles).
4. Implement `src/config/site.ts` with complete data schema, social links (`tiktok`, `facebook`, `zaloCommunity`), VIP coupon code (`HITECHVIP2026`), and deep feature lists extracted from AI Studio and Auto Video reports.
5. Implement `ShellContainer` (`max-w-[1600px] rounded-[2.5rem] ring-1 ring-white/10`).
6. Implement `Header` (floating pill, logo, links, pulsating `SYSTEM OPERATIONAL` tag, mobile responsive drawer).
7. Implement `HeroSection` (split grid, punchy headline, stats, dual CTAs, animated `FloatingPreviewCard`).
8. Implement `MethodologySection` (Contrast section with titanium light background `bg-zinc-100 text-zinc-950` with 3 steps).
9. Implement `BentoGrid`:
   - `AiStudioCard` (LIVE): 12 Quality Gates N1-N12, ±2 cues context, Character Anchors, Supertonic TTS, Whisper Large-v3-Turbo, Multi-Account Browser Pool, 1-click CapCut Drafts.
   - `AutoVideoCard` (COMING SOON): Douyin auto scraper, Meta Demucs & Faster-Whisper, 14-lang translation & zero-desync TTS budget fitting, 3 workflows (Reup, Visual Commentary, Movie Recap), 1-pass FFmpeg render, proof metrics.
10. Implement `ZaloVipSection` (VIP card, Neon Pulse Button) and `VipModal` (interactive dialog with coupon code, copy button, QR mockup, Zalo link).
11. Implement `Footer` (watermark `HITECH MMO // AUTOMATION`, social icons, copyright).
12. Implement ambient cursor glow and micro-interactions (`float-anim`, `pulse-glow`, hover lime borders).
13. Execute `npm run build` and ensure clean compile with exit code 0.
14. Document all implementation details, commands run, and build outputs in `d:\code\tool\hitechdev-landing\.agents\teamwork\worker_core_1\handoff.md`.
15. Send a message to parent when completed.


## 2026-10-06T18:59:21Z
Received execution dispatch from parent (59b9cea2-a9f4-4c95-b5c0-b9f413f02d4d):
Execute full core implementation for HITech MMO Landing Page (Obsidian & Lime), including Vite+React+TS+Tailwind scaffold, asset copying, site config, all components (Shell, Header, Hero, Methodology, BentoGrid with AI Studio & Auto Video, Zalo VIP + Modal, Footer, Cursor glow/animations), and verified build.
