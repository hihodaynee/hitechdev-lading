import React from 'react';
import { ArrowRight, Sparkles, Zap, Clock, ShieldCheck, Cpu, Gift, TrendingUp, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FloatingPreviewCard } from './FloatingPreviewCard';
import { siteConfig } from '@/config/site';

interface HeroSectionProps {
  onOpenVipModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVipModal }) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Headline & Value Prop */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
          {/* Top Pill Announcement */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <Badge variant="lime" dot>
              HITECH MMO TOOLS 2026
            </Badge>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-lime-400/20 text-lime-400 border border-lime-400/30">
              <Gift className="w-3 h-3" />
              SEEDANCE & SEEDREAM MIỄN PHÍ
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Vũ Khí Tự Động Hoá <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-300 to-white">
              Sản Xuất Video Bằng AI
            </span>
          </h1>

          {/* Punchy Sub-copy */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Tiết kiệm 90% thời gian dựng video: <span className="text-lime-400 font-semibold">Tạo video Seedance & ảnh Seedream 0đ</span>, phân tích <span className="text-white font-semibold">YouTube Trending chuyên sâu</span>, lồng tiếng Supertonic Offline và xuất thẳng <span className="text-lime-400 font-semibold">CapCut Desktop 1-Click</span>.
          </p>

          {/* Action Buttons: Direct Download + Zalo Community */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href={siteConfig.aiStudioDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold bg-lime-400 text-black hover:bg-lime-300 hover:scale-[1.03] active:scale-95 shadow-lime-glow transition-all">
                <Download className="w-5 h-5 text-black" />
                <span>{siteConfig.downloadLabel}</span>
              </button>
            </a>

            <Button
              variant="neon-pulse"
              size="lg"
              onClick={onOpenVipModal}
              className="w-full sm:w-auto text-sm"
              icon={<Users className="w-4 h-4 text-black" />}
            >
              Vào Nhóm Zalo Giao Lưu YTB
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="space-y-0.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-lime-400 text-[11px] font-mono">
                <Gift className="w-3 h-3" />
                <span>MIỄN PHÍ</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white font-sans">0đ</p>
              <p className="text-[10px] text-zinc-400">Seedance & Seedream</p>
            </div>

            <div className="space-y-0.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-lime-400 text-[11px] font-mono">
                <TrendingUp className="w-3 h-3" />
                <span>YOUTUBE</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white font-sans">Trend</p>
              <p className="text-[10px] text-zinc-400">Bắt trend đón triệu view</p>
            </div>

            <div className="space-y-0.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-lime-400 text-[11px] font-mono">
                <Zap className="w-3 h-3" />
                <span>NĂNG SUẤT</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white font-sans">10x</p>
              <p className="text-[10px] text-zinc-400">Tốc độ làm video</p>
            </div>

            <div className="space-y-0.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-lime-400 text-[11px] font-mono">
                <Cpu className="w-3 h-3" />
                <span>CAPCUT</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white font-sans">1-Click</p>
              <p className="text-[10px] text-zinc-400">Native Draft Desktop</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Preview Card */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <FloatingPreviewCard />
        </div>
      </div>
    </section>
  );
};
