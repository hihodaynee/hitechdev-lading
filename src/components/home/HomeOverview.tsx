import React from 'react';
import {
  Wrench,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Download,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HeroSection } from '@/components/hero/HeroSection';
import { ZaloVipSection } from '@/components/vip/ZaloVipSection';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HomeOverviewProps {
  onOpenVipModal: () => void;
  onNavigateTools: () => void;
  onNavigateStore: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onOpenVipModal,
  onNavigateTools,
  onNavigateStore,
}) => {
  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section */}
      <HeroSection onOpenVipModal={onOpenVipModal} />

      {/* 2 Main Ecosystem Portals: Công Cụ MMO & Tài Nguyên Số */}
      <section className="px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-wider">
              // HỆ SINH THÁI TOÀN DIỆN
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Chọn Lĩnh Vực Bạn Cần Trợ Lực
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Chuyển hướng tức thì đến trang công cụ tự động hóa hoặc kho tài nguyên số chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* PORTAL 1: CÔNG CỤ MMO */}
            <div className="rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 hover:border-lime-400/60 hover:shadow-lime-glow p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-lime-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-lime-400/20 transition-all" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full font-bold">
                      AUTOMATION
                    </span>
                    <Badge variant="lime" dot>
                      2 PHẦN MỀM TỰ ĐỘNG
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Công Cụ MMO</span>
                    <span className="text-lime-400 font-mono text-sm">(TOOLS)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Hệ thống phần mềm độc quyền: <strong>HITech AI Studio (Live v1.1.1)</strong> sản xuất kịch bản, ảnh và giọng đọc tự động; cùng <strong>HITech Auto Video</strong> cào video Douyin và render phụ đề thần tốc.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>AI Studio v1.1.1: Tải Setup.exe cài đặt ngay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Tạo video Seedance & ảnh Seedream miễn phí</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Auto Video: Bóc tách vocal AI & render đa nền tảng</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <span className="text-xs font-mono text-zinc-400">Trang chuyên biệt</span>
                <Button
                  variant="lime"
                  size="md"
                  onClick={onNavigateTools}
                  className="font-bold cursor-pointer"
                  icon={<ArrowRight className="w-4 h-4 text-black" />}
                >
                  Vào Trang Công Cụ
                </Button>
              </div>
            </div>

            {/* PORTAL 2: TÀI NGUYÊN SỐ */}
            <div className="rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 hover:border-lime-400/60 hover:shadow-lime-glow p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-lime-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-lime-400/20 transition-all" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full font-bold">
                      VERIFIED
                    </span>
                    <Badge variant="lime" dot>
                      6 TÀI NGUYÊN BẢN QUYỀN
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Tài Nguyên Số</span>
                    <span className="text-lime-400 font-mono text-sm">(STORE)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Kho tài khoản chính hãng giá siêu tiết kiệm: <strong>Google AI Pro 1 Năm (149k)</strong>, <strong>Slot Canva Pro BHF (59k)</strong>, <strong>CapCut Pro (99k-289k)</strong>, Grok Super AI, Spotify và Gmail cổ.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Google AI Pro: Kích hoạt ngay trên Gmail của bạn (149k)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Canva Pro Add Fam 1 Tháng: Bảo hành fulltime (59k)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Bàn giao tài khoản nhanh chóng, bảo hành 1 đổi 1</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <span className="text-xs font-mono text-zinc-400">Trang chuyên biệt</span>
                <Button
                  variant="lime"
                  size="md"
                  onClick={onNavigateStore}
                  className="font-bold cursor-pointer"
                  icon={<ArrowRight className="w-4 h-4 text-black" />}
                >
                  Vào Kho Tài Nguyên
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zalo VIP Community Section */}
      <ZaloVipSection onOpenVipModal={onOpenVipModal} />
    </div>
  );
};
