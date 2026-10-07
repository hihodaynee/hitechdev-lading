import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Video,
  Radio,
  Download,
  Cpu,
  Palette,
  Image as ImageIcon,
  Calendar,
  ZoomIn,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface AutoVideoCardProps {
  onOpenVipModal: () => void;
}

export const AutoVideoCard: React.FC<AutoVideoCardProps> = ({ onOpenVipModal }) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);

  const product = siteConfig.products.autoVideo;
  const groups = siteConfig.autoVideoGroups;
  const currentGroup = groups[activeGroupIndex] || groups[0];
  const currentSubFeature = currentGroup.features[activeSubIndex] || currentGroup.features[0];

  const groupIcons = [
    <Download key="1" className="w-3.5 h-3.5" />,
    <Cpu key="2" className="w-3.5 h-3.5" />,
    <Palette key="3" className="w-3.5 h-3.5" />,
    <ImageIcon key="4" className="w-3.5 h-3.5" />,
    <Calendar key="5" className="w-3.5 h-3.5" />,
  ];

  return (
    <div
      id="auto-video"
      className="relative rounded-[2.5rem] bg-obsidian-card/90 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between overflow-hidden group"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/[0.05] rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-400/[0.08] transition-all" />

      {/* Main Card Content */}
      <div>
        {/* Top Header & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" dot>
              {product.statusLabel}
            </Badge>
            <Badge variant="outline">
              1-PASS FFMPEG ENGINE
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Sắp Ra Mắt // Đang Hoàn Thiện</span>
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
              <div className="text-lg sm:text-xl font-bold text-cyan-300 font-mono tracking-tight">
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
                <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                Giao Diện Auto Video (Kính lúp zoom ảnh):
              </span>
              <span className="text-cyan-400">4K EDITOR NATIVE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveScreenshot(idx)}
                  className="group/shot relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 cursor-pointer hover:border-cyan-400/40 transition-all hover:scale-[1.01]"
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
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/75 backdrop-blur-md text-zinc-300 group-hover/shot:text-cyan-400 group-hover/shot:border-cyan-400/40 border border-white/10 transition-all flex items-center gap-1 text-[11px] font-mono">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Zoom ảnh</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h5 className="text-xs font-bold text-white group-hover/shot:text-cyan-400 transition-colors">
                        {shot.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5 Nhóm Chức Năng Chính */}
        <div className="my-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              5 Nhóm Chức Năng Chính:
            </span>
            <span className="text-zinc-500">CHỌN NHÓM XEM CHI TIẾT</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
            {groups.map((group, index) => {
              const isActive = activeGroupIndex === index;
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroupIndex(index);
                    setActiveSubIndex(0);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-400 text-black border-cyan-400 shadow-md shadow-cyan-400/20'
                      : 'bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase">{group.number}</span>
                    <span className={isActive ? 'text-black' : 'text-cyan-400'}>
                      {groupIcons[index]}
                    </span>
                  </div>
                  <span className="text-xs font-bold leading-tight line-clamp-1">{group.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Group Detail Showcase Card: Ô trên là nút chuyển đổi (1/3 mỗi ô), ô dưới là nội dung */}
          {currentGroup && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-cyan-500/20 space-y-3.5">
              {/* Header của Nhóm */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                    {currentGroup.number}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {currentGroup.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-300/80">
                  {currentGroup.features.length} CHẾ ĐỘ // CLICK ĐỔI
                </span>
              </div>

              {/* Ô TRÊN: Hàng ngang các nút chuyển đổi (mỗi nút 1/3 khi có 3 chế độ) */}
              <div
                className={`grid ${
                  currentGroup.features.length === 3
                    ? 'grid-cols-3 sm:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-2'
                } gap-2`}
              >
                {currentGroup.features.map((feat, fIdx) => {
                  const isSubActive = activeSubIndex === fIdx;
                  // Tên ngắn gọn cho nút
                  const shortName = feat.tag || feat.title.split(' (')[0].replace(/^[^\w\s]+/, '').trim();
                  return (
                    <button
                      key={fIdx}
                      onClick={() => setActiveSubIndex(fIdx)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border flex flex-col justify-between gap-1 cursor-pointer ${
                        isSubActive
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-400/40'
                          : 'bg-black/50 text-zinc-400 hover:text-white hover:bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase ${
                            isSubActive ? 'text-cyan-400' : 'text-zinc-500'
                          }`}
                        >
                          {currentGroup.features.length === 3 ? `CHẾ ĐỘ 0${fIdx + 1}` : `MỤC 0${fIdx + 1}`}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSubActive ? 'bg-cyan-400 animate-pulse' : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold truncate w-full">
                        {shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Ô DƯỚI: Khối nội dung chi tiết rộng rãi của chế độ đang chọn */}
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-white/5">
                  <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{currentSubFeature.title}</span>
                  </h5>
                  {currentSubFeature.tag && (
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                      {currentSubFeature.tag}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pt-1">
                  {currentSubFeature.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer: Sắp ra mắt + Tham gia nhóm Zalo */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Sắp ra mắt — Vào nhóm Zalo để nhận thông tin sớm nhất</span>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={onOpenVipModal}
          className="w-full sm:w-auto border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 cursor-pointer"
          icon={<Users className="w-4 h-4" />}
        >
          Vào Nhóm Zalo Nhận Tin Sớm
        </Button>
      </div>

      {/* Screenshot Lightbox Modal with Centered Viewport & Description Below Close */}
      {activeScreenshot !== null && product.screenshots && product.screenshots[activeScreenshot] && (
        <ImageLightbox
          isOpen={activeScreenshot !== null}
          onClose={() => setActiveScreenshot(null)}
          image={product.screenshots[activeScreenshot].image}
          title={product.screenshots[activeScreenshot].title}
          description={product.screenshots[activeScreenshot].description}
          accentColor="cyan"
        />
      )}
    </div>
  );
};
