import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  Gift,
  TrendingUp,
  Image as ImageIcon,
  Video as VideoIcon,
  Mic,
  Scissors,
  Wrench,
  ZoomIn,
  Download,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface AiStudioCardProps {
  onOpenVipModal?: () => void;
}

export const AiStudioCard: React.FC<AiStudioCardProps> = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);

  const product = siteConfig.products.aiStudio;
  const groups = siteConfig.aiStudioGroups;

  const groupIcons = [
    <Sparkles key="1" className="w-3.5 h-3.5" />,
    <Mic key="2" className="w-3.5 h-3.5" />,
    <VideoIcon key="3" className="w-3.5 h-3.5" />,
    <Scissors key="4" className="w-3.5 h-3.5" />,
    <Wrench key="5" className="w-3.5 h-3.5" />,
  ];

  return (
    <div
      id="ai-studio"
      className="relative rounded-[2.5rem] bg-obsidian-card/90 backdrop-blur-2xl border border-white/10 hover:border-lime-400/40 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between group mt-4 sm:mt-0"
    >
      {/* Điểm nhấn nổi bật bên ngoài ô sản phẩm: Ưu đãi miễn phí 7Đ */}
      <div className="absolute -top-4 sm:-top-5 left-6 sm:left-10 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 text-black font-sans font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-lime-400/40 border-2 border-black/30 ring-2 ring-lime-400/60 pointer-events-auto hover:scale-105 transition-transform">
          <Gift className="w-4 h-4 fill-black text-black shrink-0" />
          <span className="uppercase">ƯU ĐÃI MIỄN PHÍ 7Đ (TRẢI NGHIỆM 0Đ)</span>
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
        </div>
      </div>

      {/* Background Glow (Clipped internally) */}
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/[0.08] rounded-full blur-[100px] group-hover:bg-lime-400/[0.12] transition-all" />
      </div>

      {/* Main Card Content */}
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="lime" dot>
              {product.statusLabel}
            </Badge>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-lime-400 text-black shadow-md shadow-lime-400/20">
              <Gift className="w-3.5 h-3.5" />
              SEEDANCE & SEEDREAM 0Đ
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <TrendingUp className="w-4 h-4 text-lime-400" />
            <span className="text-zinc-300">YouTube Trending Analytics</span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <div className="space-y-2 mb-5">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            {product.name}
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Proof Metrics Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
          {product.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-0.5"
            >
              <div className="text-lg sm:text-xl font-bold text-lime-400 font-mono tracking-tight">
                {m.value}
              </div>
              <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Real App Screenshots Showcase */}
        {product.screenshots && product.screenshots.length > 0 && (
          <div className="my-5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-lime-400" />
                Giao Diện Thực Tế (Kính lúp zoom ảnh):
              </span>
              <span className="text-lime-400">100% HOÀN THIỆN</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveScreenshot(idx)}
                  className="group/shot relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 cursor-pointer hover:border-lime-400/40 transition-all hover:scale-[1.01]"
                  title="Click để mở kính lúp phóng to"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 relative">
                    <img
                      src={shot.image}
                      alt={shot.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/75 backdrop-blur-md text-zinc-300 group-hover/shot:text-lime-400 group-hover/shot:border-lime-400/40 border border-white/10 transition-all flex items-center gap-1 text-[11px] font-mono">
                      <ZoomIn className="w-3.5 h-3.5 text-lime-400" />
                      <span className="hidden sm:inline">Zoom ảnh</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-xs font-bold text-white group-hover/shot:text-lime-400 transition-colors">
                        {shot.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5 Feature Groups Switcher Tabs */}
        <div className="my-5 space-y-2.5">
          <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
            5 Nhóm Tính Năng Trọng Tâm:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
            {groups.map((group, index) => {
              const isActive = activeGroupIndex === index;
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroupIndex(index);
                    const firstFeatTitle = group.features[0]?.title;
                    const matchIdx = product.features.findIndex((f) => f.title === firstFeatTitle);
                    if (matchIdx !== -1) setSelectedFeature(matchIdx);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between gap-1 ${
                    isActive
                      ? 'bg-lime-400 text-black border-lime-400 shadow-md shadow-lime-400/20'
                      : 'bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase">{group.number}</span>
                    <span className={isActive ? 'text-black' : 'text-lime-400'}>
                      {groupIcons[index]}
                    </span>
                  </div>
                  <span className="text-xs font-bold leading-tight line-clamp-1">{group.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="my-4">
          <div className="flex flex-wrap gap-1.5">
            {product.features.map((feat, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left flex items-center gap-1.5 ${
                  selectedFeature === index
                    ? 'bg-lime-400 text-black font-bold shadow-sm'
                    : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    selectedFeature === index ? 'bg-black' : 'bg-lime-400'
                  }`}
                />
                <span>{feat.tag || feat.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Detail Showcase Card */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 mb-5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-lime-400" />
              {product.features[selectedFeature]?.title || product.features[0].title}
            </h4>
            <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
              MODULE #{selectedFeature + 1}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.features[selectedFeature]?.description || product.features[0].description}
          </p>
        </div>

      </div>

      {/* Card Action Footer with Direct Download Link */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
          <span>Bản cài đặt Setup.exe chính thức đã sẵn sàng</span>
        </div>

        <div className="w-full sm:w-auto">
          <a
            href={siteConfig.aiStudioDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block"
          >
            <Button
              variant="lime"
              size="md"
              className="w-full sm:w-auto font-bold shadow-lime-glow hover:bg-lime-300 cursor-pointer"
              icon={<Download className="w-4 h-4" />}
            >
              Tải AI Studio
            </Button>
          </a>
        </div>
      </div>

      {/* Screenshot Lightbox Modal with Centered Viewport & Description Below Close */}
      {activeScreenshot !== null && product.screenshots && product.screenshots[activeScreenshot] && (
        <ImageLightbox
          isOpen={activeScreenshot !== null}
          onClose={() => setActiveScreenshot(null)}
          image={product.screenshots[activeScreenshot].image}
          title={product.screenshots[activeScreenshot].title}
          description={product.screenshots[activeScreenshot].description}
          accentColor="lime"
        />
      )}
    </div>
  );
};
