# E2E Test Infra: HITech MMO Landing Page

## Test Philosophy
- Opaque-box, requirement-driven. Derives from ORIGINAL_REQUEST.md and user-facing specs.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.
- Test runner: Vitest / Playwright / automated Node validation scripts verifying build output, DOM contract, CSS classes, responsiveness, and interactivity.

## Feature Inventory (16 Features)
| # | Feature | Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|--------|:------:|:------:|:------:|:------:|
| 1 | Tooling & Project Setup (Vite+React+TS) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Brand Logo Asset (public/logo.png) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | Outer Shell Container (1600px, rounded-[2.5rem]) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 4 | Site Config Hub (src/config/site.ts) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 5 | Floating Pill Header & System Status | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 6 | Mobile Responsive Navigation Drawer | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 7 | Hero Section Split-Grid Typography & CTAs | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 8 | Floating Glass Cards & Keyframe Animation | ORIGINAL_REQUEST §R2, §R4 | 5 | 5 | ✓ | ✓ |
| 9 | Methodology Contrast Section (Titanium 3-step) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 10 | Bento Card: HITech AI Studio (LIVE) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 11 | Bento Card: HITech Auto Video (COMING SOON) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 12 | Zalo VIP Community Section | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 13 | Neon Pulse VIP Modal & Voucher System | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 14 | Obsidian & Lime Footer & Watermark | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 15 | Ambient Motion, Cursor & Lime Hover Effects | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 16 | Production Build & Zero-Warning Gate | ORIGINAL_REQUEST §AC | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test Runner: Node.js test script / Vitest executing opaque-box DOM & bundle verifications.
- Exit code 0 on all tests passing.
- Test categories:
  - Tier 1: Static file & export checks, component rendering, config schema conformance.
  - Tier 2: Boundary value checks (missing configs, extreme viewport widths, empty fields, dark/light contrast).
  - Tier 3: Pairwise checks (Header navigation click -> scroll anchor target; Neon pulse button click -> modal open -> copy coupon -> close modal).
  - Tier 4: Real-world user flows (mobile view browsing, social redirection URLs, Zalo VIP onboarding flow).

## Coverage Thresholds
- Tier 1: 5 * 16 = 80 test assertions
- Tier 2: 5 * 16 = 80 test assertions
- Tier 3: 16 pairwise integration scenarios
- Tier 4: 8 realistic user journey scenarios
- Total Target: ~184 test assertions / checks.
