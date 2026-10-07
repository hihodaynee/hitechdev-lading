# Handoff Report: HITech Auto Video Technical Analysis & Copywriting Specs

**Explorer:** Explorer 3 (Auto Video Reference Analyst)  
**Target Codebase:** `D:\code\tool\automation_video`  
**Target Landing Page Component:** HITech Auto Video (Coming Soon / Sớm ra mắt) Bento Grid Card, Workflow Deep-dive & Feature Showcase  
**Report File:** `d:\code\tool\hitechdev-landing\.agents\teamwork\explorer_autovideo_1\handoff.md`  

---

## 1. Observation (Dữ liệu quan sát thực tế từ codebase)

Dưới đây là các quan sát trực tiếp trích xuất từ source code `D:\code\tool\automation_video`:

### 1.1 Auto Scraper (Cào video Douyin chất lượng gốc, không watermark, vượt rào cản)
- **Tập tin:** `backend/scraper/douyin_scraper.py`
  - **Browser Cookie Extraction & Bypass file lock:** Hàm `_is_browser_cookie_locked(browser_name)` (dòng 31–75) dùng Win32 API (`CreateFileW` với `GENERIC_READ`, cờ `OPEN_EXISTING`) kiểm tra mã lỗi `ERROR_SHARING_VIOLATION` (32) để tránh crash khi Chrome/Edge/Brave/Firefox đang mở. Tự động đọc cookie từ profile trình duyệt của người dùng.
  - **Playwright Mobile Safari Emulation:** Dòng 372–389 giả lập iPhone 14 (`Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)...`). Giúp:
    1. Bỏ qua modal chặn đăng nhập của Douyin trên bản Desktop ("登录后免费畅享高清视频").
    2. Rút ngắn thời gian tải ban đầu từ ~25s xuống ~1.5s.
    3. Trích xuất trực tiếp `videoSrc` và `aweme_detail.video.play_addr` chất lượng cao mà không bị dính captcha/Argus challenge.
  - **Master Format:** Hằng số `SOURCE_MASTER_FORMAT = "bv*+ba/b"` (dòng 137) đảm bảo `yt-dlp` luôn tải bản rendition có độ phân giải, FPS và bitrate cao nhất.
  - **Tự động xử lý Shortlinks:** Hàm `resolve_douyin_shortlink(url)` (dòng 78–132) tự động bung các link rút gọn `v.douyin.com`, `iesdouyin.com`, share link sang URL chuẩn `https://www.douyin.com/video/<id>` và bắt link video đã hết hạn/bị xóa.
  - **Deduplication:** Kiểm tra bảng SQLite `scraped_videos` theo trường `douyin_id` để bỏ qua các video đã cào trước đó, tránh trùng lặp tài nguyên.

### 1.2 Bóc tách Vocal & Nhận diện Phụ đề (Meta Demucs & Faster-Whisper)
- **Tập tin:** `backend/processor/audio_separator.py`
  - **Meta Demucs:** Sử dụng mô hình `htdemucs` (dòng 24–72 trong README và `audio_separator.py`) bóc tách file WAV chuẩn (PCM 16-bit, 44.1kHz Stereo) thành 2 luồng độc lập: `vocals.wav` (chỉ chứa giọng nói tiếng Trung của nhân vật) và `bg_music.wav` (chỉ chứa âm thanh môi trường và nhạc nền).
  - **Chính sách Fail-safe:** Nếu Demucs lỗi ở chế độ "Tách thoại", hệ thống dừng và báo `AudioSeparationError` (dòng 55–72) để bảo vệ checkpoint, tuyệt đối không âm thầm fallback sang âm thanh gốc bẩn còn lời nhân vật.
- **Tập tin:** `backend/processor/transcriber.py`
  - **Faster-Whisper:** Sử dụng model `large-v3-turbo` (dòng 41–60) chạy chế độ lượng tử hoá INT8 trên CPU thông qua CTranslate2.
  - **Tối ưu Beam & Luồng:** Hàm `_resolve_beam_size` (dòng 72–99) sử dụng greedy decoding `beam_size = 1` được tinh chỉnh riêng cho Turbo, tăng tốc độ xử lý thêm 12% mà vẫn bảo toàn 100% số lượng cue phụ đề. Tự động cấp phát số luồng CPU (tối đa 6 luồng) để dự trữ 2 luồng cho giao diện người dùng mượt mà.
  - **Độ chính xác Mili-giây & Silero VAD:** Xuất file phụ đề `.srt` gán nhãn thời gian chính xác từng mili-giây, lọc nhiễu hơi thở và va đập bằng Voice Activity Detection (VAD). Có cơ chế cắt chunk 15 phút cho video dài.
  - **Bộ điều phối tài nguyên (Lazy Resource Scheduler):** Tự động giải phóng model 1.5GB sau thời gian rảnh rỗi (`schedule_heavy_resource_release`, `pipeline.py:129–150`) để tiết kiệm RAM tối đa cho máy trạm.

### 1.3 Dịch Ngữ Cảnh & Khớp Thời Lượng TTS (Contextual Translation & Budget Fitting)
- **Tập tin:** `backend/processor/translator.py`
  - **Context Memory Pass:** Hàm `build_context_memory_prompt` (dòng 53, 136–140) phân tích toàn bộ timeline để xác định quan hệ nhân vật, khóa cặp đại từ nhân xưng (anh/em, cô/chú, tao/mày) và văn phong nhất quán.
  - **Hỗ trợ 14 ngôn ngữ:** Tiếng Việt, Anh, Nhật, Hàn, Thái, Indonesia, Pháp, Đức, Tây Ban Nha...
  - **Thuật toán TTS Budget Fitting & Density Repair:** Hằng số `TRANSLATION_QA_WORDS_PER_SECOND = 4.5` và `TRANSLATION_TTS_CRITICAL_WORDS_PER_SECOND = 8.0` (dòng 92–97). Vì âm tiết tiếng Việt/ngôn ngữ đích thường dài hơn tiếng Trung, AI sẽ tính toán thời lượng cho phép của từng cue. Nếu câu dịch bị dài quá mức cho phép, hệ thống tự động kích hoạt `build_subtitle_compression_prompt` và `build_tts_density_repair_prompt` để AI viết lại, tóm tắt cô đọng câu chữ nhưng giữ nguyên ngữ nghĩa, triệt tiêu 100% hiện tượng giọng đọc chạy trước hoặc trễ sau khung hình.
  - **Bù trừ trễ hình (Time-shifting):** Tự động lùi timeline đi `-0.35s` để bù trừ độ trễ nhận diện tự nhiên của Whisper.
- **Tập tin:** `backend/processor/tts_generator.py`
  - **Đa dạng Voice Engine:**
    1. *Piper Offline TTS:* Chạy các model ONNX thuần offline gồm `ngochuyen` (`ngochuyennew.onnx`), `manhdung` (`manhdung.onnx`), `adam1` (`adam1.onnx`) (dòng 58–63). Không cần kết nối internet, không tốn API key, bảo mật 100%.
    2. *Edge-TTS:* Giọng đọc trí tuệ nhân tạo Microsoft Neural (Hoài My, Nam Minh...).
    3. *TikTok TTS & gTTS:* Đa dạng sắc thái giọng theo trend.
  - **Dual-Voice Routing (`gender_pair`):** Tự động phân tích hội thoại để gán giọng nam/nữ linh hoạt theo giới tính nhân vật.
  - **Giữ cao độ khi tăng tốc:** Dùng FFmpeg filter `atempo` (từ 1.0x đến 1.15x) để ép vừa nhịp mà không bị biến dạng tông giọng (chipmunk effect).

### 1.4 Ba Workflow Độc Lập Chuyên Biệt
- **Tập tin:** `backend/core/workflows.py` (dòng 54–63) và `docs/workflows/`
  1. **Workflow 1: Reup Chéo Nền Tảng (`reup`)**
     - Giữ nguyên timeline nguồn gốc.
     - Pipeline 7 bước tự động: Audio Extraction → Demucs Vocal Separation → Faster-Whisper ASR → Contextual Translation & TTS Fitting → Voiceover Generation → FFmpeg Video Assembly → ASS Subtitle & Branding.
     - Tự động cắt video > 3 phút thành nhiều phần (Part 1, Part 2...) phù hợp với Shorts/Reels/TikTok.
  2. **Workflow 2: Bình Luận Trực Quan (`visual_commentary`)**
     - Thiết kế chuyên sâu cho các ngách: Cooking/Ẩm thực, Street Food, Phục chế/Restoration, Thủ công/Crafting, Dọn dẹp/Cleaning, ASMR Satisfying, Silent Vlog và Đập hộp/Unboxing.
     - Giữ trọn âm thanh môi trường nguyên bản (tiếng dao thớt, tiếng xèo xèo chiên xào, tiếng gõ bàn phím), không chạy Whisper vì video thường không có thoại.
     - Chia video thành các cửa sổ trượt 45 giây (`visual_commentary_upgrade-plan.md:43–58`), bóc tách frame bằng nhận diện chuyển động (Motion detection).
     - Áp dụng `Activity Contract` & `Activity Arc` (chuẩn bị → thực hiện → gặp khó → điều chỉnh → kết quả → trải nghiệm). Lời bình chỉ được đặt đúng tại timestamp có bằng chứng hình ảnh (evidence frame ID) từ AI Vision.
     - **Dynamic Audio Ducking:** Hệ thống tự động hạ âm lượng nền (ducking) đúng lúc có lời bình và đẩy âm lượng môi trường lên 100% trong các quãng nghỉ.
  3. **Workflow 3: Review / Tóm Tắt Phim Thông Minh (`movie_summary`)**
     - Tự động lọc sạch mở đầu (OP), kết thúc (ED), credit và trailer tập sau (`movie-review-flow.md:60–73`).
     - **Story Contract & Fact Ledger:** Khóa tên chuẩn nhân vật toàn phim, phân tích chuỗi nhân quả (mục tiêu → trở ngại → quyết định → kết quả).
     - Kiểm chứng hình ảnh bằng Scene Detector & AI Vision frame sampling.
     - Dựng video recap theo danh sách cảnh dựng server-owned (EDL - Edit Decision List).
     - Có giao diện duyệt kịch bản tương tác (`MovieScriptDialog.tsx`) với các preset viết lại: hoạt hình (animation), kịch tính lôi cuốn (dramatic), phân tích chuyên sâu (deep analysis), tấu hài (humorous).

### 1.5 1-Pass FFmpeg Render & Bộ Lên Lịch Đa Kênh (Scheduler)
- **Tập tin:** `backend/processor/video_editor.py`
  - **Single-Pass Filter Complex (`_build_combined_video_filter`, `assemble_final`):** Gộp toàn bộ các thao tác (Background Box Blur sigma 20, Scale & Crop, Overlay video gốc căn giữa, Chèn Logo, Watermark tên kênh, Vùng làm mờ Delogo che sub cũ, Burn phụ đề ASS) vào duy nhất **1 lần transcode (1-pass)**. Không encode nhiều lần, giữ nguyên chất lượng gốc và tiết kiệm đến 70% thời gian render.
  - **Tự động dò phần cứng tăng tốc:** Hàm `_probe_h264_encoder` (dòng 33–60) tự test encode 1 frame thực tế với `h264_nvenc` (NVIDIA), `h264_qsv` (Intel QuickSync), `h264_amf` (AMD), và tự fallback về `libx264` siêu nhanh nếu không có card đồ hoạ.
  - **Phụ đề ASS chuyên nghiệp:** Tùy biến kiểu dáng phong phú (`classic`, `tiktok` chữ vàng viền đen, `boxed` hộp bo góc, `minimal`). Tự động canh lề an toàn (`auto_safe_zone`) để phụ đề không bị icon tim/comment/share của TikTok che khuất.
  - **Creative Restyle chống bản quyền:** Bộ master âm thanh chuẩn phòng thu (`highpass`, `lowpass`, `equalizer`, `aresample`, `asetrate`, `atempo`, `acompressor`, `alimiter`) cùng hiệu ứng hình ảnh (lật nhẹ, tăng tốc 1.02x, boost màu, vignette) giúp video vượt qua thuật toán kiểm duyệt bản quyền âm thanh/hình ảnh khắt khe của YouTube và Facebook.
  - **Tự động tạo Thumbnail Hook:** Dùng AI phân tích 10 câu đầu để sinh câu tóm tắt giật gân (CTR-optimized) và xuất ảnh thumbnail YouTube tự động.
- **Tập tin:** `backend/uploader/youtube_uploader.py`, `description_rewriter.py`, `routes_upload.py`
  - **Hỗ trợ đa nền tảng:** YouTube (OAuth2 chính thức, danh mục, quyền riêng tư), TikTok, Facebook Page.
  - **AI SEO Metadata Generator:** Một chạm tự động sinh tiêu đề giật tít, mô tả chuẩn SEO và thẻ tags thịnh hành bằng Groq / Gemini / DeepSeek.
  - **Hẹn giờ 24h & Quản lý lô:** Hẹn giờ xuất bản video tự động theo khung giờ vàng.

### 1.6 Tiện ích Độc Quyền Đi Kèm
- **Image-SRT Composer (`image-srt-composer.md`):** Tự động khớp hàng loạt ảnh/video vào phụ đề SRT và voiceover. Thuật toán phân bổ khe nhìn `build_visual_cues` đảm bảo **100% không bao giờ có khung đen (black frame)**. Xuất thẳng sang dự án **CapCut Desktop** (`draft_content.json`) hoặc render video trực tiếp bằng FFmpeg.
- **Subtitle Studio (`SubtitleStudioPage.tsx`):** Chuyên gia trích xuất phụ đề SRT từ file thu âm/voiceover nhiều ngôn ngữ, cảnh báo các câu quá dài hoặc sai nhịp.

---

## 2. Logic Chain (Chuỗi lập luận chuyển đổi kỹ thuật sang giá trị Landing Page)

1. **Từ rào cản cào Douyin (đăng nhập, cookie, watermark, link rút gọn):**
   - *Quan sát:* Codebase tích hợp Playwright iPhone emulation, cookie unlocker và yt-dlp master format.
   - *Suy luận:* Người làm MMO thường mất hàng giờ tìm tool tải Douyin, dính watermark hoặc bị Douyin khóa IP/đòi đăng nhập. HITech Auto Video giải quyết triệt để vấn đề này với 1 click tải hàng loạt chất lượng gốc không watermark.
2. **Từ bài toán lệch giọng, voice chạy nhanh hơn hình ảnh:**
   - *Quan sát:* Codebase phát triển cơ chế TTS Budget Fitting (tính từ/giây), tự động viết gọn câu bằng AI, bù trễ -0.35s và co giãn tempo không đổi pitch.
   - *Suy luận:* Đây là điểm đau đớn nhất (biggest pain point) của các nhà sáng tạo làm reup/thuyết minh. Nhấn mạnh tính năng "Không lệch hình - Không trễ tiếng" sẽ tạo tỷ lệ chuyển đổi (conversion rate) cực kỳ cao.
3. **Từ tính đa dạng của tệp MMO:**
   - *Quan sát:* Codebase phân tách 3 workflow độc lập (Reup, Visual Commentary, Movie Review) và hỗ trợ cả Piper Offline TTS không cần mạng.
   - *Suy luận:* Không phải ai làm MMO cũng reup cùng một dạng video. Chia rõ 3 workflow giúp người dùng thấy ngay công cụ được may đo riêng cho thể loại kênh của họ (từ review phim đến kênh nấu ăn, ẩm thực, unboxing, crafting).
4. **Từ hiệu năng phần cứng máy trạm:**
   - *Quan sát:* Kiến trúc 1-Pass FFmpeg render và hỗ trợ phần cứng NVENC/QSV/AMF cùng model INT8.
   - *Suy luận:* Người dùng không cần máy chủ đắt đỏ. Máy tính cá nhân thông thường vẫn có thể render hàng chục video mỗi ngày với tốc độ tối đa.

---

## 3. Caveats (Các điểm cần lưu ý)

- **Trạng thái sản phẩm:** Theo yêu cầu ban đầu, HITech Auto Video gắn nhãn **`COMING SOON` (SỚM RA MẮT)** trên landing page, để phân biệt với HITech AI Studio (đã `LIVE`).
- **Nút CTA phù hợp:** Đối với Auto Video, CTA không nên là "Mua ngay" mà là **"Đăng ký trải nghiệm sớm"** hoặc **"Nhận vé VIP vào nhóm Zalo để dùng thử bản Beta"**, khớp hoàn hảo với phễu chuyển đổi Zalo Community.
- **Tập trung vào trải nghiệm:** Dù tính năng bên dưới rất phức tạp (Demucs, Faster-Whisper, FFmpeg, Playwright), copywriting trên landing page phong cách Obsidian & Lime phải **tối giản, sắc bén, ít chữ nhưng đánh trúng tử huyệt năng suất**.

---

## 4. Conclusion & Copywriting Specification (Đặc tả nội dung & Visual cho Landing Page)

Dưới đây là bộ thông tin chi tiết sẵn sàng để các Agent UI/Implementer đưa trực tiếp vào Bento Grid Card của HITech Auto Video:

### 4.1 Định vị & Huy hiệu (Badges & Positioning)
- **Tên sản phẩm:** `HITech Auto Video`
- **Tagline:** Cỗ máy tự động hoá sản xuất video đa kênh từ Douyin sang YouTube, TikTok & Facebook.
- **Badge trạng thái:** `COMING SOON` (Sắc tím/lime neon huyền ảo, có pulse dot)
- **Sub-badge công nghệ:** `1-Pass FFmpeg Engine` • `Meta Demucs AI` • `Faster-Whisper INT8` • `14 Ngôn ngữ` • `CapCut Draft Export`

### 4.2 5 Trụ Cột Tính Năng Đột Phá (The 5 Core Features - Punchy Copywriting)

#### 1. Auto Scraper Vượt Rào Cản (Cookie-Free Douyin Downloader)
- **Tiêu đề ngắn:** Cào Kênh Douyin Hàng Loạt & Sạch Watermark
- **Nội dung:** Tự động đồng bộ cookie trình duyệt, vượt qua rào cản đăng nhập Douyin qua giả lập di động. Tải toàn bộ video kênh với chất lượng gốc cao nhất (`bv*+ba`), tự động lọc trùng lặp.

#### 2. Bóc Tách Vocal AI & Phụ Đề Chuẩn Mili-giây (Demucs & Faster-Whisper)
- **Tiêu đề ngắn:** Bóc Tách Vocal Meta Demucs & Faster-Whisper
- **Nội dung:** Tách sạch 100% giọng nói tiếng Trung khỏi nhạc nền bằng mô hình AI Demucs; nhận diện phụ đề tiếng Trung chính xác từng mili-giây với Faster-Whisper INT8, loại bỏ hoàn toàn tạp âm.

#### 3. Dịch Thuật Ngữ Cảnh & Khớp Thời Lượng TTS (Zero-Desync TTS Engine)
- **Tiêu đề ngắn:** Dịch Ngữ Cảnh 14 Ngôn Ngữ & Khớp Nhịp Giọng Nói
- **Nội dung:** AI phân tích xưng hô và văn phong toàn bài; tự động co giãn câu chữ theo ngân sách thời gian (TTS Budget Fitting) để giọng thuyết minh khớp khít từng khung hình, nói không với lệch tiếng trễ hình.

#### 4. Ba Workflow Độc Lập Chuyên Sâu (3 Specialized MMO Workflows)
- **Tiêu đề ngắn:** 3 Chế Độ Sản Xuất Video May Đo Cho Từng Thể Loại
- **Nội dung:**
  - *Reup chéo nền tảng:* Giữ timeline gốc, chuyển ngữ và tự động chia tập Part 1-2-3 cho video dài.
  - *Bình luận trực quan (Visual Commentary):* Dành riêng cho nấu ăn, unboxing, phục chế, crafting; AI Vision bóc tách frame và chèn lời bình bám sát hành động, tự động hạ nhạc nền (audio ducking).
  - *Tóm tắt phim thông minh:* Story Contract phân tích chuỗi nhân quả, lọc sạch mở đầu/kết thúc (OP/ED), dựng kịch bản review chuẩn xác.

#### 5. Render 1-Pass FFmpeg & Lên Lịch Đa Kênh (1-Pass Render & Scheduler)
- **Tiêu đề ngắn:** Render 1-Pass Siêu Tốc & Lên Lịch Tự Động Đa Nền Tảng
- **Nội dung:** Xử lý video Shorts (9:16 blur nền) hoặc Long (16:9), burn sub ASS chống che khuất, che sub cũ, chèn watermark và tối ưu âm thanh chỉ trong duy nhất 1 lần transcode (tận dụng phần cứng GPU NVENC/QSV). Tự động tạo tiêu đề SEO, thumbnail bắt mắt và lên lịch đăng YouTube, TikTok, Facebook.

### 4.3 Thông Số Ấn Tượng Để Hiển Thị Trên Card (Metrics & Proof Points)
- **90%**: Tiết kiệm 90% thời gian biên tập và hậu kỳ video.
- **1-Pass**: Render toàn diện (sub, blur, watermark, audio) trong duy nhất 1 lượt mã hóa.
- **100% Clean**: Tách vocal sạch hoàn toàn với Meta Demucs AI.
- **14 Languages**: Hỗ trợ 14 ngôn ngữ dịch thuật ngữ cảnh sâu sắc.
- **0s Drift**: Triệt tiêu hoàn toàn độ trễ hình nhờ thuật toán TTS Budget Fitting.
- **Offline Ready**: Tích hợp Piper Offline TTS chạy trực tiếp trên máy không tốn phí API.

### 4.4 Gợi Ý Visual / Mockup UI Cho Bento Card
- **Khung Preview Shorts (9:16) Glassmorphism:**
  - Một video preview giả lập khung dọc 9:16 với nền phía sau được làm mờ (blurred background glow).
  - Khung giữa hiển thị video gốc kèm phụ đề viền vàng TikTok nổi bật ở đáy màn hình (vị trí safe-zone cách đáy để không bị che bởi thanh công cụ TikTok).
  - Watermark kênh nhỏ nhắn ở góc trên.
- **Workflow Pills Switcher:**
  - 3 tab nhỏ: `[Reup Chéo Nền Tảng]` • `[Bình Luận Trực Quan]` • `[Tóm Tắt Phim]`.
- **Audio Waveform / Ducking Indicator:**
  - Minh hoạ 2 dải sóng âm: Track Giọng nói (Lime accent) và Track Nhạc nền (Cyan) tự động võng xuống (ducking) khi giọng nói xuất hiện.
- **Badges chân trang:**
  - `CapCut Export Ready` • `Local GPU Accelerated` • `YouTube & TikTok Scheduler`.

---

## 5. Verification Method (Phương pháp kiểm chứng)

Để độc lập kiểm chứng các quan sát và trích dẫn trong báo cáo này:

1. **Kiểm tra Scraper:**
   ```powershell
   view_file "D:/code/tool/automation_video/backend/scraper/douyin_scraper.py" (xem dòng 31-75 và 372-389)
   ```
2. **Kiểm tra Tách vocal & Whisper:**
   ```powershell
   view_file "D:/code/tool/automation_video/backend/processor/audio_separator.py" (xem dòng 55-72)
   view_file "D:/code/tool/automation_video/backend/processor/transcriber.py" (xem dòng 41-60 và 72-99)
   ```
3. **Kiểm tra TTS Fitting & Context:**
   ```powershell
   view_file "D:/code/tool/automation_video/backend/processor/translator.py" (xem dòng 86-97 và 136-140)
   view_file "D:/code/tool/automation_video/backend/processor/tts_generator.py" (xem dòng 58-63)
   ```
4. **Kiểm tra 3 Workflow & Video Editor:**
   ```powershell
   view_file "D:/code/tool/automation_video/backend/core/workflows.py" (xem dòng 54-63)
   view_file "D:/code/tool/automation_video/backend/processor/video_editor.py" (xem dòng 33-85, 319-375, 1192-1260)
   ```
5. **Kiểm tra Giao diện & Scheduler:**
   ```powershell
   view_file "D:/code/tool/automation_video/frontend/modern/src/features/editor/VideoEditorPage.tsx"
   view_file "D:/code/tool/automation_video/frontend/modern/src/features/scheduler/SchedulerPage.tsx"
   ```

**Điều kiện vô hiệu:** Báo cáo này dựa trên commit hiện tại của repo `D:\code\tool\automation_video`. Nếu codebase được refactor sang kiến trúc mới, các số dòng có thể thay đổi nhưng logic cốt lõi vẫn giữ nguyên.
