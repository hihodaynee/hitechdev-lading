import React from 'react';
import {
  Sparkles,
  Users,
  Flame,
  BookOpenCheck,
  Headset,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ZaloVipSectionProps {
  onOpenVipModal: () => void;
}

export const ZaloVipSection: React.FC<ZaloVipSectionProps> = ({ onOpenVipModal }) => {
  const perkIcons = [Users, Flame, BookOpenCheck, Headset];

  return (
    <section id="vip" className="relative py-10 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Glow Banner Wrapper */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-obsidian-deep/95 border border-lime-400/40 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden group">
          {/* Ambient Spotlight Backgrounds */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-lime-400/[0.12] rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-lime-400/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="lime" dot>
                  CỘNG ĐỒNG CREATOR HITECH MMO
                </Badge>
                <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
                  // YOUTUBE & MMO COMMUNITY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Vào Nhóm Zalo Nhận Thông Tin &{' '}
                <span className="text-lime-400">Giao Lưu Làm YouTube</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Gặp gỡ, trao đổi kinh nghiệm thực chiến cùng hàng trăm Creator làm YouTube MMO. Nhận thông báo cập nhật tool mới nhất, tiến độ ra mắt Auto Video và kho kịch bản/prompt triệu view.
              </p>

              {/* VIP Code Callout */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono">
                <span className="text-zinc-400">Mã thành viên Zalo:</span>
                <span className="text-lime-400 font-bold text-sm tracking-wider bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                  {siteConfig.vipCouponCode}
                </span>
              </div>

              {/* Neon Pulse CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  variant="neon-pulse"
                  size="lg"
                  onClick={onOpenVipModal}
                  className="w-full sm:w-auto text-base"
                  icon={<MessageSquare className="w-5 h-5 text-black" />}
                >
                  Tham Gia Nhóm Zalo Làm YouTube
                </Button>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span>Miễn phí 100% — Giao lưu cởi mở</span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Community Highlights */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.vipPerks.map((perk, index) => {
                const Icon = perkIcons[index] || Sparkles;
                return (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-lime-400/30 transition-all space-y-1.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center border border-lime-400/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {perk.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
