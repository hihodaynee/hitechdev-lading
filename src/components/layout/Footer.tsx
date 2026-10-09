import React from 'react';
import { ArrowUpRight, MessageCircle, Share2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

// SVG Icons for TikTok and Facebook
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.38 6.38 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 10.82 4.49v-7.08a8.16 8.16 0 0 0 5.77 2.33v-3.45a4.77 4.77 0 0 1-3.77-3.07z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ZaloIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.88 1.5 5.43 3.86 7.03L5 22l4.28-1.42C10.16 20.82 11.06 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9zm5 12h-4v-1h4v1zm0-3h-6V9h6v2z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.94-1.28 4.91-2.12 5.9-2.54 2.81-1.17 3.4-.37 3.42 1.44z" />
  </svg>
);

interface FooterProps {
  onNavigate?: (view: 'home' | 'tools' | 'store') => void;
  onOpenVipModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenVipModal }) => {
  const handleNav = (view: 'home' | 'tools' | 'store', hash: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
      window.location.hash = hash;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative mt-12 sm:mt-20 pt-16 pb-12 px-4 sm:px-6 md:px-12 border-t border-white/10 overflow-hidden bg-obsidian-deep/80">
      {/* Massive Background Watermark */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap">
        <span className="font-mono font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-white">
          HITECH MMO // AUTOMATION
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#/"
              onClick={(e) => handleNav('home', '#/', e)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-lime-400/40">
                <img
                  src="/logo.png"
                  alt={siteConfig.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  {siteConfig.name}
                  <span className="text-[10px] text-lime-400 font-mono tracking-widest uppercase">
                    MMO
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                  {siteConfig.tagline}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Hệ sinh thái công cụ phần mềm tự động hoá sản xuất nội dung, phụ đề và video MMO thế hệ mới. Tiết kiệm 90% thời gian biên tập, nhân x10 năng suất kênh.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-lime-400 hover:text-black text-zinc-300 border border-white/10 flex items-center justify-center transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-lime-400 hover:text-black text-zinc-300 border border-white/10 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socials.zaloCommunity || '#vip'}
                target={siteConfig.socials.zaloCommunity ? '_blank' : undefined}
                rel={siteConfig.socials.zaloCommunity ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-lime-400 hover:text-black text-zinc-300 border border-white/10 flex items-center justify-center transition-all"
                aria-label="Zalo Community"
                title={siteConfig.socials.zaloCommunity ? 'Zalo Community' : 'Nhóm Zalo (Sắp mở liên kết)'}
              >
                <ZaloIcon className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socials.telegram || 'https://t.me/HOHINEEE'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-sky-400 hover:text-black text-zinc-300 border border-white/10 flex items-center justify-center transition-all"
                aria-label="Telegram Support"
                title="Hỗ trợ Telegram (@HOHINEEE)"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
              Hệ Thống Trang & Menu
            </span>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li>
                <a
                  href="#/"
                  onClick={(e) => handleNav('home', '#/', e)}
                  className="hover:text-lime-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Trang Chủ</span>
                </a>
              </li>
              <li>
                <a
                  href="#/tools"
                  onClick={(e) => handleNav('tools', '#/tools', e)}
                  className="hover:text-lime-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Công Cụ MMO (AI Studio & Auto Video)</span>
                  <span className="text-[9px] font-mono text-lime-400 bg-lime-400/10 px-1.5 py-0.2 rounded">LIVE</span>
                </a>
              </li>
              <li>
                <a
                  href="#/store"
                  onClick={(e) => handleNav('store', '#/store', e)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Kho Tài Nguyên Số (6 Sản Phẩm)</span>
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">HOT</span>
                </a>
              </li>
              <li>
                <a
                  href="#vip"
                  onClick={(e) => {
                    if (onOpenVipModal) {
                      e.preventDefault();
                      onOpenVipModal();
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Đặc Quyền Cộng Đồng VIP
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Community Card */}
          <div className="md:col-span-4 p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-lime-400 font-semibold uppercase">
                Zalo VIP Group
              </span>
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Nhận voucher 20% <span className="font-mono text-lime-400 font-bold">{siteConfig.vipCouponCode}</span> và trao đổi kỹ thuật trực tiếp cùng chuyên gia MMO.
            </p>
            <a
              href={siteConfig.socials.zaloCommunity || '#vip'}
              target={siteConfig.socials.zaloCommunity ? '_blank' : undefined}
              rel={siteConfig.socials.zaloCommunity ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-lime-400 hover:underline"
            >
              <span>{siteConfig.socials.zaloCommunity ? 'Truy cập nhóm Zalo ngay' : 'Sắp mở liên kết nhóm'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>OBSIDIAN & LIME ENGINE</span>
            <span>•</span>
            <span>V2.2.4 DEPLOYED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
