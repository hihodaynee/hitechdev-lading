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
  group?: string;
  tag?: string;
  highlight?: boolean;
}

export interface ProductInfo {
  name: string;
  tagline: string;
  status: 'LIVE' | 'COMING_SOON';
  statusLabel: string;
  description: string;
  targetAudience?: string;
  problemSolved?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  features: ProductFeature[];
  badges: string[];
  metrics: { value: string; label: string }[];
  screenshots?: {
    title: string;
    description: string;
    image: string;
  }[];
}

export interface FeatureGroup {
  id: string;
  number: string;
  title: string;
  icon: string;
  features: ProductFeature[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  socials: {
    tiktok: string;
    facebook: string;
    zaloCommunity: string;
    telegram?: string;
    zaloQrImage?: string;
  };
  vipCouponCode: string;
  aiStudioDownloadUrl: string;
  downloadLabel: string;
  vipPerks: VipPerk[];
  aiStudioGroups: FeatureGroup[];
  autoVideoGroups: FeatureGroup[];
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
  digitalProducts: DigitalProduct[];
}

export interface DigitalProductPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNumeric: number;
  highlight?: boolean;
  warranty: string;
  description?: string;
  rules?: string[];
  features?: string[];
  format: string;
}

export interface DigitalProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'design' | 'mmo' | 'audio';
  categoryLabel: string;
  badge: string;
  accentColor: 'lime' | 'cyan' | 'purple' | 'green' | 'blue';
  image: string;
  detailImage?: string;
  format: string;
  priceDisplay: string;
  durationDisplay: string;
  tagHighlights: string[];
  plans: DigitalProductPlan[];
  features: string[];
  warranty: string;
  rules?: string[];
  descriptionFull?: string[];
}

export const siteConfig: SiteConfig = {
  name: 'HITech MMO',
  tagline: 'TECH • DIGITAL • MMO',
  description:
    'Tự động hoá sản xuất video MMO bằng AI. Tạo video Seedance & ảnh Seedream Miễn Phí, bắt trend YouTube chuyên sâu và xuất thẳng CapCut Desktop.',
  socials: {
    tiktok: 'https://www.tiktok.com/@hi.tech.mmo',
    facebook: 'https://www.facebook.com/profile.php?id=61594632656414',
    zaloCommunity: '',
    telegram: 'https://t.me/HOHINEEE',
    zaloQrImage: '/zalo-qr.png',
  },
  vipCouponCode: 'HITECHVIP2026',
  aiStudioDownloadUrl:
    'https://github.com/hihodaynee/ai-studio-releases/releases/download/v1.1.4/HITechDev.AIStudio.F0-stable-Setup.exe',
  downloadLabel: 'Tải AI Studio',
  vipPerks: [
    {
      title: 'Giao Lưu & Trao Đổi Làm YouTube',
      description: 'Cộng đồng Creator chia sẻ kinh nghiệm thực chiến, mẹo giữ chân người xem và bắt trend YouTube.',
      icon: 'Users',
    },
    {
      title: 'Cập Nhật Tool & Tính Năng Sớm Nhất',
      description: 'Nhận thông báo cập nhật các bản build mới và tiến độ ra mắt Auto Video trực tiếp từ dev.',
      icon: 'Flame',
    },
    {
      title: 'Kho Prompt & Kịch Bản Triệu View',
      description: 'Tặng bộ Style Prompts V2 và cấu trúc kịch bản phân bổ nhịp chuẩn cho video dài & Shorts.',
      icon: 'BookOpenCheck',
    },
    {
      title: 'Hỗ Trợ Kỹ Thuật Trực Tiếp',
      description: 'Giải đáp thắc mắc về cài đặt, cấu hình tài khoản và tối ưu workflow làm video.',
      icon: 'Headset',
    },
  ],
  aiStudioGroups: [
    {
      id: 'group-1',
      number: 'NHÓM 1',
      title: 'Sáng Tạo Nội Dung & Ý Tưởng',
      icon: 'PenTool',
      features: [
        {
          title: '✍️ Xưởng Kịch Bản (Script Studio)',
          description:
            'Quy trình 6 bước: Ý tưởng → Dữ kiện → Dàn ý → Viết nháp → Biên tập → Hoàn chỉnh. Lọc sạch văn mẫu AI (Humanize), câu từ chia nhịp thở tự nhiên. Xuất chuẩn 100% tiếng Anh hoặc tiếng Việt.',
          group: 'NHÓM 1',
          tag: 'Kịch Bản 6 Bước',
          highlight: false,
        },
        {
          title: '🎨 Tiêu Đề & Thumbnail (Thumbnail & Title Studio)',
          description:
            'Tự động phân tích kịch bản gợi ý 3–5 phong cách tiêu đề giật tít (tò mò, tranh cãi, bài học) và prompt thumbnail đồng bộ BrandKit.',
          group: 'NHÓM 1',
          tag: 'Hook & CTR',
          highlight: false,
        },
        {
          title: '📈 Bắt Trend YouTube (YouTube Trending)',
          description:
            'Công cụ phân tích và nghiên cứu làm video YouTube chuyên sâu: Quét từ khóa, video thịnh hành theo ngách để đón đầu xu hướng.',
          group: 'NHÓM 1',
          tag: 'Nghiên Cứu YouTube',
          highlight: true,
        },
      ],
    },
    {
      id: 'group-2',
      number: 'NHÓM 2',
      title: 'Sản Xuất Âm Thanh & Phụ Đề',
      icon: 'Mic',
      features: [
        {
          title: '🎙️ Lồng Tiếng AI (Voice Studio / TTS Offline)',
          description:
            'Giọng đọc truyền cảm phòng thu. Chạy Offline qua Supertonic (ONNX) không tốn phí API, không cần mạng. Hỗ trợ Edge-TTS & ElevenLabs.',
          group: 'NHÓM 2',
          tag: 'Supertonic Offline 0đ',
          highlight: true,
        },
        {
          title: '⏱️ Tạo Phụ Đề Chuẩn Xác (Script SRT Studio / ASR)',
          description:
            'Faster-Whisper nghe và tạo phụ đề tự động. Khớp từng từ (Word-level) độ trễ ~0s, AI gộp câu thông minh không đè timeline.',
          group: 'NHÓM 2',
          tag: 'Word-Level Timing',
          highlight: false,
        },
      ],
    },
    {
      id: 'group-3',
      number: 'NHÓM 3',
      title: 'Sản Xuất Hình Ảnh & Video',
      icon: 'Film',
      features: [
        {
          title: '🎬 Phân Cảnh & Giữ Nhân Vật (Image Prompt Studio)',
          description:
            'Băm kịch bản theo SRT thành từng cảnh và viết prompt. Khóa khuôn mặt nhân vật chính xuyên suốt (Cast Consistency) không biến dạng.',
          group: 'NHÓM 3',
          tag: 'Cast Consistency',
          highlight: false,
        },
        {
          title: '🖼️ Sinh Ảnh Seedream MIỄN PHÍ (Image Studio)',
          description:
            'Tạo ảnh hàng loạt qua Dola Seedream MIỄN PHÍ hoặc Flow. Đa luồng 1–5 luồng song song, tạo 50–100 ảnh chỉ vài phút.',
          group: 'NHÓM 3',
          tag: 'Seedream MIỄN PHÍ',
          highlight: true,
        },
        {
          title: '🎥 Tạo Video Seedance MIỄN PHÍ (Video Studio)',
          description:
            'Biến ảnh tĩnh thành video mượt mà qua Dola Seedance MIỄN PHÍ hoặc Google Flow. Xoay vòng tài khoản, tự bù cảnh thiếu, xem trước Lightbox H.264.',
          group: 'NHÓM 3',
          tag: 'Seedance MIỄN PHÍ',
          highlight: true,
        },
      ],
    },
    {
      id: 'group-4',
      number: 'NHÓM 4',
      title: 'Dựng Phim & Xuất Bản',
      icon: 'Scissors',
      features: [
        {
          title: '✂️ Dựng Video & Ghép Khớp (Composer Workspace)',
          description:
            'Đồng bộ audio, SRT và hình ảnh/video vào 1 timeline. Nút 1-Click "Thay ảnh bằng video đã tạo" không làm xô lệch thời gian phụ đề.',
          group: 'NHÓM 4',
          tag: '1-Click Thay Video',
          highlight: false,
        },
        {
          title: '⚡ Xuất Thẳng Sang CapCut Desktop (CapCut Integration)',
          description:
            '1 nút bấm mở trực tiếp trên CapCut Desktop: Toàn bộ video, ảnh, audio và phụ đề đã nằm ngay ngắn trên timeline sẵn sàng render.',
          group: 'NHÓM 4',
          tag: 'CapCut Desktop Native',
          highlight: true,
        },
      ],
    },
    {
      id: 'group-5',
      number: 'NHÓM 5',
      title: 'Tiện Ích & Quản Trị Hệ Thống',
      icon: 'Wrench',
      features: [
        {
          title: '🚀 Công Cụ Nhanh (Quick Tools)',
          description:
            'Tạo ảnh và video nhanh không cần lập dự án phức tạp. Phù hợp test prompt hoặc làm video ngắn lẻ.',
          group: 'NHÓM 5',
          tag: 'Tạo Nhanh',
          highlight: false,
        },
        {
          title: '🏷️ BrandKit Nhân Vật & Phong Cách',
          description:
            'Quản lý kịch bản, nhân vật đại diện và phong cách hình ảnh đồng bộ cùng một nơi.',
          group: 'NHÓM 5',
          tag: 'BrandKit',
          highlight: false,
        },
      ],
    },
  ],
  autoVideoGroups: [
    {
      id: 'av-group-1',
      number: 'NHÓM 1',
      title: 'Cào & Tải Video Tự Động (Scraper)',
      icon: 'Download',
      features: [
        {
          title: '📥 Tải Hàng Loạt Qua 1 Link',
          description:
            'Dán link kênh Douyin/TikTok/YouTube/Bilibili, chọn số lượng và tải về máy hàng loạt chất lượng cao không watermark.',
          group: 'NHÓM 1',
          tag: '1-Click Scraper',
          highlight: false,
        },
        {
          title: '🛡️ Tự Nhớ Chống Tải Trùng & Upload 5GB',
          description:
            'Tự nhớ video đã tải tránh cào lại. Tự nhận diện cookie từ trình duyệt tải nét nhất. Hỗ trợ upload video từ máy tới 5GB.',
          group: 'NHÓM 1',
          tag: 'Chống Trùng & 5GB',
          highlight: true,
        },
      ],
    },
    {
      id: 'av-group-2',
      number: 'NHÓM 2',
      title: 'Hậu Kỳ & Lồng Tiếng AI (3 Chế Độ)',
      icon: 'Cpu',
      features: [
        {
          title: '🌐 Dịch & Thuyết Minh Video Nước Ngoài',
          description:
            'Demucs tách vocal giữ nguyên nhạc nền. Faster-Whisper tạo sub mili-giây. Dịch tự nhiên, tự gọt câu (TTS Budget Fitting) khớp khẩu hình nhân vật. Lồng tiếng đa giọng.',
          group: 'NHÓM 2',
          tag: 'Dịch & Thuyết Minh',
          highlight: true,
        },
        {
          title: '🍳 Bình Luận Trực Quan (Visual Commentary)',
          description:
            'Cho video nấu ăn, thủ công, unboxing: AI nhìn hiểu hành động trên màn hình, tự viết lời bình dí dỏm và tự hạ nhạc nền khi có tiếng nói.',
          group: 'NHÓM 2',
          tag: 'Visual Commentary',
          highlight: true,
        },
        {
          title: '🍿 Tóm Tắt & Review Phim (Movie Review)',
          description:
            'AI phân tích cốt truyện, hiểu logic nhân vật (không bịa tên), tự viết tóm tắt và tự chọn cảnh đắt giá ghép thành video review hoàn chỉnh.',
          group: 'NHÓM 2',
          tag: 'Review Phim EDL',
          highlight: true,
        },
      ],
    },
    {
      id: 'av-group-3',
      number: 'NHÓM 3',
      title: 'Xưởng Biên Tập Trực Quan (Video Editor)',
      icon: 'Palette',
      features: [
        {
          title: '👁️ Preview 4K & Kéo Thả Trực Quan',
          description:
            'Xem trước 4K (3840x2160), kéo thả phụ đề, cỡ chữ, màu sắc, bóng đổ; chèn logo & watermark tùy ý.',
          group: 'NHÓM 3',
          tag: 'Preview 4K',
          highlight: false,
        },
        {
          title: '🌫️ Che Mờ Thông Minh (Blur Tool)',
          description:
            'Vẽ khung che mờ tự do giấu logo gốc của video cũ hoặc thông tin riêng tư nhanh chóng.',
          group: 'NHÓM 3',
          tag: 'Blur Logo',
          highlight: false,
        },
        {
          title: '📱 Tự Đổi Dọc/Ngang & Tự Chia Tập',
          description:
            'Shorts 9:16 (blur nền nghệ thuật) hoặc 16:9 ngang. Video dài > 3 phút tự cắt thành Tập 1, Tập 2, Tập 3...',
          group: 'NHÓM 3',
          tag: 'Shorts & Chia Tập',
          highlight: true,
        },
      ],
    },
    {
      id: 'av-group-4',
      number: 'NHÓM 4',
      title: 'Ghép Ảnh Theo Voice & Xuất CapCut',
      icon: 'Image',
      features: [
        {
          title: '🎙️ Tách Chữ & Khớp Ảnh Theo Lời Nói',
          description:
            'Tải file giọng đọc lên, AI xuất phụ đề chuẩn từng giây. Ném 20–30 ảnh vào, tự tính thời gian chuyển cảnh ăn khớp câu nói (cho sách nói, truyện ma, tin tức).',
          group: 'NHÓM 4',
          tag: 'Khớp Ảnh Tự Động',
          highlight: true,
        },
        {
          title: '⚡ Bắn Thẳng Dự Án Sang CapCut Desktop',
          description:
            '1 nút bấm mở trực tiếp trên CapCut Desktop: Đầy đủ kịch bản, ảnh, phụ đề, âm thanh trên timeline.',
          group: 'NHÓM 4',
          tag: 'CapCut Desktop Native',
          highlight: true,
        },
      ],
    },
    {
      id: 'av-group-5',
      number: 'NHÓM 5',
      title: 'Viết Bài & Lên Lịch Đa Nền Tảng (Scheduler)',
      icon: 'Calendar',
      features: [
        {
          title: '🔗 Kết Nối Đa Kênh YouTube, TikTok, Facebook',
          description:
            'Liên kết trực tiếp tài khoản phân phối video tự động và an toàn.',
          group: 'NHÓM 5',
          tag: 'Đa Nền Tảng',
          highlight: false,
        },
        {
          title: '✍️ AI Viết Tiêu Đề, Tạo Thumbnail & Hẹn Giờ',
          description:
            'AI viết tiêu đề/mô tả chuẩn SEO + hashtag, tự bắt frame làm thumbnail hút click, hẹn giờ đăng tự động cả tuần/tháng.',
          group: 'NHÓM 5',
          tag: 'SEO & Hẹn Giờ',
          highlight: true,
        },
      ],
    },
  ],
  products: {
    aiStudio: {
      name: 'AI Studio',
      tagline: 'All-in-One AI Content Creation Workbench cho Content Creator & MMO',
      status: 'LIVE',
      statusLabel: 'LIVE / HOÀN THIỆN',
      description:
        'Sản xuất video AI hoàn chỉnh từ ý tưởng đến CapCut Desktop. Tạo Video Seedance & Ảnh Seedream MIỄN PHÍ, nghiên cứu YouTube chuyên sâu, giữ nhân vật đồng nhất 100%.',
      targetAudience:
        'Content Creator, kênh faceless, người làm MMO, đội ngũ sản xuất video YouTube/TikTok.',
      problemSolved:
        'Tiết kiệm 90% thời gian sáng tạo: Không bí ý tưởng, không văn mẫu AI, không lệch nhân vật và 0đ phí API tạo video/ảnh.',
      downloadUrl:
        'https://github.com/hihodaynee/ai-studio-releases/releases/download/v1.1.4/HITechDev.AIStudio.F0-stable-Setup.exe',
      downloadLabel: 'Tải AI Studio',
      badges: [
        'Seedance Video MIỄN PHÍ',
        'Seedream Image MIỄN PHÍ',
        'YouTube Trending Analytics',
        'Offline Supertonic TTS',
        'Cast Consistency Lock',
        '1-Click CapCut Native',
      ],
      metrics: [
        { value: '0đ Phí', label: 'Video Seedance & Ảnh Seedream' },
        { value: '6 Bước', label: 'Quy trình Kịch bản Chuẩn' },
        { value: '1-Click', label: 'Thay ảnh bằng video khớp timeline' },
        { value: 'CapCut', label: 'Xuất thẳng Native Draft Desktop' },
      ],
      screenshots: [
        {
          title: 'Quy Trình Video Toàn Vòng Đời',
          description:
            'Từ kịch bản AI, nhân vật, voice, phụ đề, cảnh & ảnh (132/132) đến timeline CapCut.',
          image: '/screenshots/ai-studio-workflow.png',
        },
        {
          title: 'BrandKit Nhân Vật & Phong Cách',
          description:
            'Kịch bản, nhân vật đại diện và phong cách hình ảnh cùng một nơi.',
          image: '/screenshots/ai-studio-brandkit.png',
        },
      ],
      features: [
        {
          title: '✍️ Xưởng Kịch Bản (Script Studio)',
          description:
            'Quy trình 6 bước chuẩn: Ý tưởng → Dữ kiện → Dàn ý → Viết nháp → Biên tập → Hoàn chỉnh. Lọc sạch văn mẫu AI, câu từ tự nhiên chuẩn nhịp thở.',
          tag: 'Quy Trình 6 Bước',
          highlight: false,
        },
        {
          title: '🎨 Tiêu Đề & Thumbnail (Thumbnail & Title Studio)',
          description:
            'Gợi ý 3–5 phong cách tiêu đề giật tít (tò mò, tranh cãi, bài học) và prompt thumbnail đồng bộ BrandKit.',
          tag: 'Hook & CTR Cao',
          highlight: false,
        },
        {
          title: '📈 Bắt Trend YouTube (YouTube Trending Analytics)',
          description:
            'Công cụ phân tích nghiên cứu làm video YouTube chuyên sâu: Nắm bắt chủ đề, từ khóa nóng hổi đón đầu lượt xem.',
          tag: 'YouTube Analytics',
          highlight: true,
        },
        {
          title: '🎙️ Lồng Tiếng AI (Voice Studio / TTS Offline)',
          description:
            'Supertonic (ONNX) chạy Offline cục bộ không cần mạng, không tốn phí API. Đa dạng giọng đọc nam/nữ truyền cảm.',
          tag: 'Supertonic Offline 0đ',
          highlight: true,
        },
        {
          title: '⏱️ Tạo Phụ Đề Chuẩn Xác (Script SRT Studio / ASR)',
          description:
            'Faster-Whisper nhận diện giọng nói tự động. Mốc thời gian từng từ độ trễ ~0s, AI gộp câu thông minh không đè timeline.',
          tag: 'Word-Level Timing',
          highlight: false,
        },
        {
          title: '🎬 Phân Cảnh & Prompt Hình Ảnh (Image Prompt Studio)',
          description:
            'Băm kịch bản theo SRT thành từng cảnh. Khóa khuôn mặt nhân vật chính xuyên suốt hàng chục cảnh (Cast Consistency) không biến dạng.',
          tag: 'Cast Consistency',
          highlight: false,
        },
        {
          title: '🖼️ Sinh Ảnh Hàng Loạt (Image Studio - Dola Seedream MIỄN PHÍ)',
          description:
            'Tạo ảnh hàng loạt qua Dola Seedream MIỄN PHÍ. Xử lý đa luồng 1–5 luồng song song, tạo 50–100 ảnh chỉ vài phút.',
          tag: 'Seedream MIỄN PHÍ',
          highlight: true,
        },
        {
          title: '🎥 Tạo Video từ Ảnh (Video Studio - Dola Seedance MIỄN PHÍ & Google Flow)',
          description:
            'Biến ảnh tĩnh thành video mượt mà qua Dola Seedance MIỄN PHÍ hoặc Google Flow. Xoay vòng tài khoản, tự bù cảnh thiếu.',
          tag: 'Seedance MIỄN PHÍ',
          highlight: true,
        },
        {
          title: '✂️ Dựng Video & Ghép Khớp (Composer Workspace)',
          description:
            'Đồng bộ audio, SRT và hình ảnh/video. Nút 1-Click "Thay ảnh bằng video đã tạo" không làm xô lệch thời gian phụ đề.',
          tag: '1-Click Replace',
          highlight: false,
        },
        {
          title: '⚡ Xuất Thẳng Sang CapCut (CapCut Integration)',
          description:
            '1 click mở trực tiếp trên CapCut Desktop: Toàn bộ video, ảnh, audio và phụ đề đã nằm ngay ngắn trên timeline.',
          tag: 'CapCut Desktop Native',
          highlight: true,
        },
        {
          title: '🚀 Công Cụ Nhanh (Quick Tools)',
          description:
            'Tạo ảnh và video nhanh không cần lập dự án phức tạp. Phù hợp test prompt hoặc làm video ngắn lẻ.',
          tag: 'Quick Create',
          highlight: false,
        },
      ],
    },
    autoVideo: {
      name: 'Auto Video',
      tagline: 'Cỗ máy tự động hoá sản xuất video đa kênh từ Douyin sang YouTube, TikTok & Facebook',
      status: 'COMING_SOON',
      statusLabel: 'SẮP RA MẮT',
      description:
        'Cỗ máy tự động hoá video đa kênh: Cào video sạch watermark, tách vocal Demucs, phụ đề Faster-Whisper, dịch gọt câu khớp khẩu hình (TTS Fitting), editor 4K kéo thả và lên lịch đăng đa nền tảng.',
      targetAudience:
        'Creator, kênh Review phim/truyện, kênh tin tức, Affiliate, kênh reup/dịch video nước ngoài.',
      problemSolved:
        'Tiết kiệm 90% thời gian dựng video: Thay vì mất hàng giờ chép sub, thu âm, canh frame — AI tự động hoá khép kín.',
      badges: [
        'SẮP RA MẮT',
        '1-Pass FFmpeg Engine',
        'Meta Demucs Vocal Split',
        'Faster-Whisper INT8',
        'TTS Budget Fitting',
        '3 Chế độ MMO',
      ],
      metrics: [
        { value: '90%', label: 'Tiết kiệm thời gian hậu kỳ' },
        { value: '1-Pass', label: 'Render duy nhất 1 lần' },
        { value: '100%', label: 'Tách vocal sạch bằng Demucs' },
        { value: '0s', label: 'Lệch tiếng trễ hình (Zero-Desync)' },
      ],
      screenshots: [
        {
          title: 'Tạo Project Video & Cào Đa Kênh',
          description:
            'Tải qua link Douyin, TikTok, YouTube, Bilibili hoặc upload video từ máy tới 5GB. 3 workflow chuyên biệt.',
          image: '/screenshots/autovideo-intake.png',
        },
        {
          title: 'Hậu Kỳ: Video Editor Trực Quan',
          description:
            'Preview 4K (3840x2160), kéo thả phụ đề, che mờ (Blur) logo cũ và cấu hình giọng đọc AI.',
          image: '/screenshots/autovideo-editor.png',
        },
      ],
      features: [
        {
          title: 'Auto Scraper Douyin (Bỏ qua Cookie & Watermark)',
          description:
            'Tải hàng loạt chỉ 1 đường link, không lo tải trùng, tự nhận diện cookie từ trình duyệt tải chất lượng gốc không watermark. Hỗ trợ upload video tới 5GB.',
          tag: 'No-Watermark Scraper',
        },
        {
          title: 'Meta Demucs AI & Faster-Whisper INT8',
          description:
            'Tách sạch 100% vocal tiếng Trung giữ nguyên nhạc nền. Faster-Whisper nhận diện phụ đề chính xác từng mili-giây kết hợp Silero VAD lọc hơi thở.',
          tag: 'Meta Demucs',
        },
        {
          title: 'Contextual Translation & TTS Budget Fitting',
          description:
            'Dịch ngữ cảnh 14 ngôn ngữ, tự động tính toán từ/giây và nén câu chữ vừa khít thời lượng cảnh, bù trễ timeline -0.35s triệt tiêu lệch hình trễ tiếng.',
          tag: 'Zero-Desync TTS',
        },
        {
          title: '3 Workflow Độc Lập Cho Từng Ngách MMO',
          description:
            'Chế độ 1: Reup chéo nền tảng (tự chia phần Part 1-2-3). Chế độ 2: Bình luận trực quan (Visual Commentary - AI Vision bóc tách frame cho ẩm thực, đập hộp, auto ducking). Chế độ 3: Tóm tắt phim thông minh (Story Contract & EDL).',
          tag: '3 Workflows',
        },
        {
          title: '1-Pass FFmpeg Render & Lên Lịch Đa Kênh',
          description:
            'Filter complex gộp blur nền Shorts 9:16, che sub cũ, burn sub ASS, chèn logo chỉ trong 1 lần transcode GPU NVENC/QSV. Tự tạo thumbnail và lên lịch YouTube, TikTok, Facebook.',
          tag: '1-Pass Render',
        },
      ],
    },
  },
  methodologySteps: [
    {
      step: '01',
      title: 'Thu Thập & Phân Tích Chuyên Sâu',
      description:
        'Cào tự động video Douyin/TikTok chất lượng gốc sạch watermark hoặc phân tích từ khóa YouTube Trending. Bóc tách giọng nói bằng Meta Demucs AI và nhận dạng phụ đề mili-giây bằng Faster-Whisper.',
      tech: ['YouTube Trending', 'Meta Demucs htdemucs', 'Faster-Whisper INT8', 'Silero VAD'],
    },
    {
      step: '02',
      title: 'Xử Lý Ngữ Cảnh & Tạo Media Miễn Phí',
      description:
        'Kịch bản 6 bước lọc sạch văn mẫu, tạo ảnh Dola Seedream MIỄN PHÍ và tạo video Seedance MIỄN PHÍ. Khóa chặt nhân vật Cast Consistency và Supertonic TTS offline không tốn phí API.',
      tech: ['Seedance Video Free', 'Seedream Image Free', 'Cast Consistency', 'Supertonic Offline'],
    },
    {
      step: '03',
      title: 'Xuất Bản 1-Pass & CapCut Desktop',
      description:
        'Tự động thay ảnh bằng video 1-click trên timeline, xuất thẳng bản thảo CapCut Native Drafts hoặc render 1-pass FFmpeg hỗ trợ GPU, lên lịch đăng video đa kênh.',
      tech: ['CapCut Native Drafts', '1-Click Video Replace', '1-Pass FFmpeg GPU', 'Multi-Platform Scheduler'],
    },
  ],
  digitalProducts: [
    {
      id: 'google-ai-pro',
      title: 'Google One AI Pro 1 Năm',
      subtitle: 'Kích hoạt ngay trên Gmail chính chủ: Gemini 3.1 Pro, Deep Research & 5 TB Cloud Storage',
      category: 'ai',
      categoryLabel: 'AI & Content',
      badge: '149K / NĂM',
      accentColor: 'blue',
      image: '/products/google-ai-pro.png',
      format: 'Kích hoạt Gmail chính chủ',
      priceDisplay: '149.000đ',
      durationDisplay: '1 Năm (Đến 18 Tháng)',
      tagHighlights: ['Gemini 3.1 Pro', '5 TB Cloud', 'Gmail Chính Chủ'],
      features: [
        'Gemini Pro sử dụng lên đến 1 năm',
        'Link nhận Google One AI Pro có hạn sử dụng đến 18 tháng',
        'Model Gemini 3.1 Pro nâng cấp: Higher model access, Deep Research báo cáo chuyên sâu',
        'Tích hợp Gemini thông minh trong Gmail, Docs, Sheets & bộ nhớ khủng 5 TB',
        'Hỗ trợ viết content, nghiên cứu, học tập, code, lên ý tưởng, làm video AI',
        'Làm việc với AI nhanh và tiện lợi hơn, xử lý context tài liệu siêu dài',
        'Chỉ mất vài phút, không cần thao tác phức tạp (kích hoạt thẳng vào Gmail của bạn)',
        'Phù hợp cho: Học tập • Công việc • Lập trình • Sáng tạo nội dung • Làm video AI',
      ],
      warranty: 'Bảo hành & Hỗ trợ Fulltime suốt thời hạn gói',
      rules: [
        'Kích hoạt an toàn trực tiếp trên Gmail của bạn, không cần đổi tài khoản',
        'Số lượng gói ưu đãi có hạn, liên hệ kích hoạt ngay',
      ],
      descriptionFull: [
        'GOOGLE AI PRO 1 NĂM CHỈ 149K – KÍCH HOẠT NGAY TRÊN GMAIL CỦA BẠN',
        '✅ Gemini Pro sử dụng lên đến 1 năm',
        '✅ Link nhận Google One AI Pro có hạn sử dụng đến 18 tháng',
        '✅ Hỗ trợ viết content, nghiên cứu, học tập, code, lên ý tưởng',
        '✅ Làm việc với AI nhanh và tiện lợi hơn',
        '⏱️ Chỉ mất vài phút, không cần thao tác phức tạp.',
        'Phù hợp cho: 🎓 Học tập • 💼 Công việc • 💻 Lập trình • 🎨 Sáng tạo nội dung • 🤖 Làm video AI',
        '📩 INBOX NGAY để được hỗ trợ kích hoạt',
        '🔥 Số lượng gói giá ưu đãi có hạn!',
      ],
      plans: [
        {
          id: 'google-ai-pro-1y',
          name: 'Google AI Pro 1 Năm',
          duration: '1 Năm (Link đến 18 Tháng)',
          price: '149.000đ',
          priceNumeric: 149000,
          highlight: true,
          warranty: 'Bảo hành Fulltime',
          description: 'Kích hoạt trực tiếp trên Gmail chính chủ',
          format: 'Gmail chính chủ của bạn',
          features: [
            'Gemini 3.1 Pro & Deep Research',
            '5 TB Cloud Storage Google One',
            'Tích hợp Gemini Docs, Sheets, Gmail',
            'Hạn sử dụng lên đến 18 tháng',
          ],
        },
      ],
    },
    {
      id: 'canva-pro',
      title: 'Slot Canva Pro 1 Tháng (BHF)',
      subtitle: 'Canva Pro Add Fam 1 Tháng chính chủ, mở khóa toàn bộ Premium Templates & Brand Kit',
      category: 'design',
      categoryLabel: 'Đồ Họa & Video',
      badge: '59K / THÁNG',
      accentColor: 'cyan',
      image: '/products/canva-pro.jpg',
      format: 'Add Family Email Chính Chủ',
      priceDisplay: '59.000đ',
      durationDisplay: '1 Tháng (30 Ngày)',
      tagHighlights: ['Bảo hành Fulltime', 'Không Watermark', 'Add Mail Chính Chủ'],
      features: [
        'CANVA PRO ADD FAM 1 THÁNG CHÍNH CHỦ',
        'BẢO HÀNH FULLTIME (BHF) suốt thời hạn',
        'Mở khóa kho Premium Templates hàng triệu mẫu thiết kế chuyên nghiệp',
        'Bộ công cụ Brand Kit quản lý màu sắc, logo và font chữ thương hiệu',
        'Background Remover: Xóa phông ảnh và video 1 chạm chuẩn nét',
        'Magic Resize: Tự động đổi tỷ lệ thiết kế cho YouTube, TikTok, Facebook',
        'Tải file chất lượng cao, không giới hạn, không watermark',
      ],
      warranty: 'Bảo hành Fulltime (BHF) 1 đổi 1 suốt 1 tháng',
      rules: [
        'Khách gửi email đang dùng Canva để được thêm vào nhóm Family Pro chính chủ',
        'Thiết kế và dữ liệu của bạn hoàn toàn bảo mật, các thành viên khác không xem được',
      ],
      descriptionFull: [
        'Slot Canva Pro 1 Tháng BHF giá 59k CANVA PRO ADD FAM 1 THÁNG CHÍNH CHỦ',
        'BẢO HÀNH FULLTIME',
        '🎨 Mở khóa kho tài nguyên triệu ảnh, video, audio cao cấp',
        '✨ Xóa phông ảnh 1 chạm (Background Remover)',
        '📐 Magic Resize kích thước tức thì',
        '🏷️ Brand kit màu sắc & font chữ riêng',
        '⚡ Hỗ trợ kích hoạt nhanh trong 5 phút',
      ],
      plans: [
        {
          id: 'canva-pro-1m',
          name: 'Canva Pro 1 Tháng (BHF)',
          duration: '1 Tháng (30 Ngày)',
          price: '59.000đ',
          priceNumeric: 59000,
          highlight: true,
          warranty: 'Bảo hành Fulltime (BHF)',
          description: 'Add Family Email Chính Chủ',
          format: 'Add Fam Gmail Khách',
          features: [
            'Mở khóa full Premium Templates',
            'Background Remover & Magic Resize',
            'Bảo hành Fulltime 1 đổi 1',
            'Dùng trên chính email của bạn',
          ],
        },
      ],
    },
    {
      id: 'capcut-pro',
      title: 'Tài Khoản CapCut Pro',
      subtitle: 'Mở khóa toàn bộ kho hiệu ứng & templates Pro, xuất 4K 60fps và công cụ AI',
      category: 'design',
      categoryLabel: 'Đồ Họa & Video',
      badge: '99K ~ 289K',
      accentColor: 'cyan',
      image: '/products/capcut-banner.jpg',
      detailImage: '/products/capcut-details.png',
      format: 'Email | Password',
      priceDisplay: '99.000đ - 289.000đ',
      durationDisplay: '1 Tháng hoặc 3 Tháng',
      tagHighlights: ['Xuất 4K 60fps', '2 Thiết bị PC & Mobile', 'Hiệu ứng Pro'],
      warranty: 'Bảo hành đầy đủ theo thời hạn gói',
      features: [
        'Gói 1 Tháng 99k (Tài khoản cá nhân) hoặc Gói 3 Tháng 289k (Pro Team Pay chính hãng)',
        'Đăng nhập tối đa 2 thiết bị (PC & Điện thoại)',
        'Định dạng bàn giao: Email | Password',
        'Mở khóa kho hiệu ứng & templates Pro không giới hạn',
        'Xuất video 4K / HD 60fps sắc nét không watermark',
        'Lưu trữ đám mây Cloud Storage & đồng bộ dự án',
        'Bộ công cụ AI video thông minh, phụ đề tự động',
      ],
      rules: [
        'Không rời khỏi, thay đổi Space để tránh mất Pro (áp dụng gói 3 Tháng Team Pay)',
        'Không chia sẻ tài khoản cho người khác dùng chung ngoài 2 thiết bị của mình',
        'Không đổi tên user để shop hỗ trợ bảo hành chính xác',
      ],
      descriptionFull: [
        'TÀI KHOẢN CAPCUT PRO CHÍNH HÃNG DÀNH CHO CREATOR & EDITOR',
        '1. Gói 1 Tháng: 99.000đ – Tài khoản cá nhân chính hãng, định dạng Email | Password',
        '2. Gói 3 Tháng (BHF): 289.000đ – Tài khoản Pro Team Pay chính hãng:',
        '• Chu kỳ 30 ngày gia hạn ổn định đủ 3 tháng',
        '• Đăng nhập tối đa 2 thiết bị (PC & Mobile)',
        '• Quy định: Không rời/đổi Space, không share tài khoản, không đổi user name',
      ],
      plans: [
        {
          id: 'capcut-1m',
          name: 'Gói 1 Tháng (Cá nhân)',
          duration: '30 Ngày',
          price: '99.000đ',
          priceNumeric: 99000,
          warranty: 'Bảo hành 30 ngày',
          description: 'Tài khoản cá nhân chính hãng',
          format: 'Email | Password',
          features: [
            'Hạn 30 ngày',
            'Đăng nhập tối đa 2 thiết bị (PC / Mobile)',
            'Định dạng: Email | Password',
            'Tài khoản cá nhân chính hãng độc lập',
          ],
        },
        {
          id: 'capcut-3m',
          name: 'Gói 3 Tháng (BHF Team)',
          duration: '3 Tháng (90 Ngày)',
          price: '289.000đ',
          priceNumeric: 289000,
          highlight: true,
          warranty: 'Bảo hành BHF chu kỳ gia hạn',
          description: 'Tài khoản Pro Team Pay chính hãng',
          format: 'Email | Password',
          features: [
            'Hạn 30 ngày (chu kỳ gia hạn ổn định 3 tháng)',
            'Đăng nhập tối đa 2 thiết bị (PC / Mobile)',
            'Định dạng bàn giao: Email | Password',
            'Tài khoản Pro Team Pay chính hãng',
          ],
          rules: [
            'Không rời khỏi, thay đổi Space để tránh mất Pro',
            'Không chia sẻ tài khoản cho người khác dùng chung',
            'Không đổi tên user để shop check kỹ tài khoản',
          ],
        },
      ],
    },
    {
      id: 'grok-super',
      title: 'Grok Super AI 5-7 Ngày (BHF)',
      subtitle: 'Mô hình AI siêu suy luận của xAI Elon Musk: Trả lời siêu tốc, giải mã code & logic',
      category: 'ai',
      categoryLabel: 'AI & Content',
      badge: '99K (BHF)',
      accentColor: 'purple',
      image: '/products/grok-super.png',
      format: 'Email | Pass',
      priceDisplay: '99.000đ',
      durationDisplay: '5 - 7 Ngày',
      tagHighlights: ['xAI Elon Musk', 'Suy luận nâng cao', 'Đổi pass riêng tư'],
      warranty: 'Bảo hành BHF theo thời hạn gói',
      features: [
        'Mô hình Smart AI hàng đầu của xAI Elon Musk',
        'Phản hồi siêu tốc (Fast responses) không giật lag',
        'Suy luận sâu sắc (Advanced reasoning), giải bài toán khó',
        'Quyền truy cập Premium Access đầy đủ tính năng',
        'Thời hạn sử dụng ổn định: 5 - 7 Ngày',
      ],
      rules: [
        'Tuyệt đối không hủy / cancel gói',
        'Có thể đổi pass để sử dụng riêng tư',
        'Không đổi email → Vi phạm Mất bảo hành (Tài khoản có thể bị khóa/thu hồi gói)',
      ],
      descriptionFull: [
        'GROK SUPER AI 5-7 NGÀY - BẢO HÀNH FULLTIME (BHF)',
        'Định dạng bàn giao: Email | Pass',
        '⚠️ QUY ĐỊNH BẮT BUỘC:',
        '• Tuyệt đối không hủy / cancel gói.',
        '• Có thể đổi pass để sử dụng riêng tư.',
        '• Không đổi email → Vi phạm Mất bảo hành. Vi phạm có thể khiến tài khoản bị khóa/thu hồi gói.',
      ],
      plans: [
        {
          id: 'grok-super-plan',
          name: 'Grok Super 5-7 Ngày',
          duration: '5 - 7 Ngày',
          price: '99.000đ',
          priceNumeric: 99000,
          warranty: 'Bảo hành BHF theo thời hạn',
          description: 'Tài khoản cấp sẵn dùng ngay',
          format: 'Email | Pass',
          features: [
            'Thời hạn 5 - 7 ngày',
            'Đổi pass riêng tư thoải mái',
            'Không cancel gói, không đổi email',
          ],
        },
      ],
    },
    {
      id: 'spotify-premium',
      title: 'Spotify Premium 3 Tháng (BH 3D)',
      subtitle: 'Account cấp sẵn nghe nhạc Lossless 320kbps không quảng cáo, tải offline',
      category: 'audio',
      categoryLabel: 'Âm Nhạc',
      badge: '129K / 3 THÁNG',
      accentColor: 'green',
      image: '/products/spotify-banner.jpg',
      format: 'Account cấp sẵn (Email | Pass)',
      priceDisplay: '129.000đ',
      durationDisplay: '3 Tháng (90 Ngày)',
      tagHighlights: ['Nhạc 320kbps', 'Nghe Offline', 'BH 1 Đổi 1'],
      warranty: '1 đổi 1 trong suốt 3 tháng sử dụng',
      features: [
        'Nghe nhạc không quảng cáo, chất lượng cao 320kbps',
        'Tải nhạc nghe Offline, chuyển bài không giới hạn',
        'Hỗ trợ mọi thiết bị: Điện thoại, Máy tính, Smart TV',
        'Account cấp sẵn, giao ngay sau khi thanh toán',
        'Thời hạn: 3 tháng (90 ngày) dùng ổn định',
        'Bảo hành: 1 đổi 1 trong suốt 3 tháng sử dụng',
      ],
      descriptionFull: [
        '🎵 Spotify Premium 3 Tháng (Account Cấp Sẵn)',
        '✨ Đặc quyền Premium:',
        '• Nghe nhạc không quảng cáo, chất lượng cao 320kbps.',
        '• Tải nhạc nghe Offline, chuyển bài không giới hạn.',
        '• Hỗ trợ mọi thiết bị: Điện thoại, Máy tính, Smart TV.',
        '📌 Thông tin & Bảo hành:',
        '• Định dạng: Account cấp sẵn, giao ngay sau khi thanh toán.',
        '• Thời hạn: 3 tháng (90 ngày) dùng ổn định.',
        '• Bảo hành: 1 đổi 1 trong suốt 3 tháng sử dụng.',
      ],
      plans: [
        {
          id: 'spotify-3m',
          name: 'Spotify Premium 3 Tháng',
          duration: '3 Tháng (90 Ngày)',
          price: '129.000đ',
          priceNumeric: 129000,
          highlight: true,
          warranty: '1 đổi 1 trong 3 tháng (BH 3D)',
          description: 'Account cấp sẵn, giao ngay lập tức',
          format: 'Email | Password',
          features: [
            'Nghe nhạc không quảng cáo, âm thanh 320kbps',
            'Tải nhạc nghe Offline không giới hạn',
            'Đồng bộ mọi thiết bị PC / Điện thoại / Smart TV',
            'Bảo hành 1 đổi 1 suốt 90 ngày',
          ],
        },
      ],
    },
    {
      id: 'gmail-aged',
      title: 'Gmail Cổ Random (2010 ~ 2022)',
      subtitle: 'Gmail năm cũ độ trust cực cao cho làm MMO, kênh YouTube, Ads & Tool',
      category: 'mmo',
      categoryLabel: 'Tài Nguyên MMO',
      badge: '49K / TÀI KHOẢN',
      accentColor: 'lime',
      image: '/products/gmail-banner.jpg',
      format: 'Gmail | Pass | Mail khôi phục | 2FA',
      priceDisplay: '49.000đ',
      durationDisplay: 'Sở hữu vĩnh viễn',
      tagHighlights: ['Năm tạo 2010~2022', 'Trust cao ít die', 'BH Login 24H'],
      warranty: 'Bảo hành Login 24H (Lỗi Pass, Very Phone)',
      features: [
        'Năm tạo random lâu năm từ 2010 đến 2022',
        'Độ trust cao, hạn chế tối đa checkpoint / vô hiệu hóa',
        'Thích hợp nuôi kênh YouTube, TikTok, chạy tool tự động',
        'Định dạng chuẩn: Gmail | Pass | Mail khôi phục | 2FA',
        'Bảo hành Login 24H: Lỗi Pass, Very Phone được 1 đổi 1',
      ],
      rules: [
        'Login Lỗi Pass, Very Phone được bảo hành Login trong 24H',
        'Login thành công là hết hạn bảo hành',
      ],
      descriptionFull: [
        'Gmail Cổ Random 2010~2022 giá 49k',
        'Mô tả: Login Lỗi Pass - Very Phone - Được Bảo hành Login 24H - login thành công là hết Bảo hành',
        'Định dạng: Gmail | Pass | Gmail khôi phục | 2FA (nếu có)',
      ],
      plans: [
        {
          id: 'gmail-random',
          name: 'Gmail Cổ 2010~2022',
          duration: 'Sở hữu vĩnh viễn',
          price: '49.000đ',
          priceNumeric: 49000,
          warranty: 'Bảo hành Login 24H',
          description: 'Định dạng đầy đủ kèm mail khôi phục',
          format: 'Gmail | Pass | Gmail khôi phục | 2FA',
          features: [
            'Năm tạo 2010 ~ 2022 ngẫu nhiên',
            'Bảo hành lỗi pass, very phone 24H',
            'Login thành công là hết bảo hành',
          ],
        },
      ],
    },
  ],
};
