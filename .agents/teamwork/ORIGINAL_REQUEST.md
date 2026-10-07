# Original User Request

## 2026-10-06T18:47:35Z

Build a high-converting, minimalist 'Obsidian & Lime' glassmorphism landing page for HITech MMO showcasing its two flagship automation tools: HITech AI Studio (Completed / Live) and HITech Auto Video (Coming Soon), with social integration (TikTok, Facebook) and special perks for joining the Zalo community.

Working directory: d:\code\tool\hitechdev-landing
Integrity mode: development

## Assets & References
- Brand Logo Source: C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png (copy to public/logo.png)
- AI Studio Codebase Reference: D:\code\tool\ai-studio-source
- Auto Video Codebase Reference: D:\code\tool\automation_video

## Product Knowledge & Copywriting Data

### Brand: HITech MMO (Tech • Digital • MMO)
- Cung cấp các giải pháp công cụ (tools) tự động hoá quy trình MMO và tài nguyên số chuyên sâu.
- Phong cách: Hiện đại, tối giản, ít chữ nhưng thông tin sắc bén, tập trung vào hiệu suất và chuyển đổi.

### Product 1: HITech AI Studio (Status: LIVE / HOÀN THIỆN)
- **Định vị**: All-in-One AI Content Creation Workbench cho Content Creator & MMO.
- **Tính năng trọng tâm**:
  1. *Script & Ideas Studio*: Lên kịch bản AI, tiêu đề & hook triệu view tối ưu giữ chân khán giả.
  2. *Image Prompt Studio V2*: Trích xuất phong cách từ ảnh mẫu, phân tích kịch bản SRT theo ngữ cảnh (±2 cues), quản lý Character Anchors & Role Entities chống sai lệch nhân vật, 12 cổng kiểm soát chất lượng (Quality Gates N1-N12).
  3. *AI Voice & Dubbing*: Lồng tiếng tự nhiên với nhiều giọng đọc tiếng Việt/quốc tế, tự động khớp timing từng câu thoại.
  4. *Multi-Account Browser Pool*: Quản lý nhiều profile trình duyệt, tự động xoay vòng tài khoản (session rotation), tạo ảnh/video ổn định với API chuẩn.
  5. *Composer Studio*: Ghép kịch bản, phụ đề SRT, giọng đọc và hình ảnh/video thành sản phẩm hoàn chỉnh một chạm.

### Product 2: HITech Auto Video (Status: COMING SOON / SỚM RA MẮT)
- **Định vị**: Cỗ máy tự động hoá sản xuất video đa kênh từ Douyin sang YouTube, TikTok, Facebook.
- **Tính năng trọng tâm**:
  1. *Auto Scraper*: Quét kênh Douyin, tải hàng loạt video chất lượng gốc không watermark, tự động vượt cookie, chống trùng lặp.
  2. *AI Demucs & Whisper*: Bóc tách vocal khỏi nhạc nền bằng Meta Demucs AI; nhận diện giọng nói và xuất phụ đề tiếng Trung chính xác từng mili-giây bằng Faster-Whisper.
  3. *Contextual Translation & TTS Fitting*: Dịch ngữ cảnh sâu sắc (14 ngôn ngữ), tự động viết gọn câu chữ để vừa vặn thời lượng nói (TTS budget fitting), loại bỏ lệch hình.
  4. *3 Workflow Độc Lập*: Reup chéo nền tảng, Bình luận trực quan (Visual Commentary - AI Vision bóc tách frame cho nấu ăn/unboxing/crafting), Review & Tóm tắt phim thông minh.
  5. *1-Pass FFmpeg Render & Multi-Platform Scheduler*: Tự động tạo bản Shorts (9:16 blur nền) hoặc Long (16:9), burn sub ASS, watermark, auto-hook thumbnail và hẹn giờ đăng đa kênh.

### Conversion Funnel & Socials
- Kênh liên kết: TikTok, Facebook (cấu hình trong file hằng số `src/config/site.ts` để người dùng dễ thay đổi).
- Zalo Community VIP: Khối kêu gọi tham gia nhóm Zalo để nhận voucher giảm giá độc quyền, tài nguyên MMO và quyền ưu tiên trải nghiệm tool sớm.

---

## Requirements

### R1. Project Setup & Tooling
Khởi tạo dự án Vite + React + TypeScript + Tailwind CSS tại `d:\code\tool\hitechdev-landing`, cài đặt Lucide Icons và cấu hình font Google (`Space Grotesk` và `JetBrains Mono`). Sao chép logo từ `C:/Users/Huy/.gemini/antigravity/brain/3f4fc8f6-d276-4517-acf6-30a5512a8ea9/.user_uploaded/media_1791311926152.png` vào `public/logo.png`.

### R2. Cấu trúc Giao diện Chuẩn Template Obsidian & Lime
Thực thi đầy đủ các thành phần theo đặc tả:
- Floating Shell Container max-w 1600px, rounded-[2.5rem].
- Header dạng Floating Pill với Logo, navigation và System Status Tag.
- Hero Section split-grid với typography ấn tượng và Floating Glass Cards.
- Bento Grid giới thiệu sản phẩm: HITech AI Studio (LIVE) & HITech Auto Video (COMING SOON).
- Contrast Section (Methodology) nền sáng tương phản với quy trình 3 bước triển khai.
- Zalo Community CTA với Neon Pulse Button và modal/thông tin ưu đãi.
- Footer với Watermark, social icons và chính sách.

### R3. Tối Giản, Đủ Thông Tin, Tối Ưu Chuyển Đổi
Nội dung ngắn gọn, súc tích (punchy copywriting), làm nổi bật giá trị cốt lõi của HITech: Tự động hoá MMO, tiết kiệm 90% thời gian sáng tạo nội dung và sản xuất video. Đặt file cấu hình `src/config/site.ts` chứa link TikTok, Facebook, Zalo để dễ thay đổi.

### R4. Tương Tác & Hiệu Ứng Chuyển Động
Tích hợp animation lơ lửng (`float-anim`), hiệu ứng hover border sáng lime (`#ccff00/40`), glowing cursor, và responsive hoàn toàn từ mobile đến desktop lớn.

---

## Acceptance Criteria

### [Kiểm tra Kỹ thuật & Build]
- [ ] Lệnh `npm run build` hoàn thành thành công với mã thoát 0, không có lỗi TypeScript hoặc cú pháp Tailwind CSS.
- [ ] File logo `public/logo.png` tồn tại và hiển thị chính xác trên Header và Footer.
- [ ] Font chữ Space Grotesk và JetBrains Mono được nạp và áp dụng đúng theo các class CSS.

### [Kiểm tra Thiết kế & Tính Năng]
- [ ] Container chính có class `max-w-[1600px] rounded-[2.5rem]` và viền `ring-1 ring-white/10`.
- [ ] Có đầy đủ 2 sản phẩm trong Bento Grid: HITech AI Studio với nhãn Live/Sẵn sàng và HITech Auto Video với nhãn Coming Soon.
- [ ] Có liên kết mạng xã hội (TikTok, Facebook, Zalo) được định nghĩa tập trung trong `src/config/site.ts`.
- [ ] Nút CTA Zalo có hiệu ứng Neon Pulse Button và mở modal/chuyển hướng nhận ưu đãi.
- [ ] Giao diện responsive trên cả Mobile (< 768px) và Desktop (>= 1024px).
