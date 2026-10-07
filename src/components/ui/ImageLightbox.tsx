import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
  accentColor?: 'lime' | 'cyan';
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  image,
  title,
  description,
  accentColor = 'lime',
}) => {
  const [scale, setScale] = useState<number>(1);

  // Reset zoom whenever a new image or modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
    }
  }, [isOpen, image]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') {
        setScale((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 3));
      }
      if (e.key === '-' || e.key === '_') {
        setScale((prev) => Math.max(Number((prev - 0.5).toFixed(1)), 1));
      }
      if (e.key === '0') {
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 3));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.max(Number((prev - 0.5).toFixed(1)), 1));
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
  };

  const handleToggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => (prev > 1 ? 1 : 2));
  };

  const isLime = accentColor === 'lime';
  const accentDot = isLime ? 'bg-lime-400' : 'bg-cyan-400';
  const accentText = isLime ? 'text-lime-400' : 'text-cyan-400';
  const accentBg = isLime ? 'bg-lime-400/10' : 'bg-cyan-400/10';
  const accentBorder = isLime ? 'border-lime-400/30' : 'border-cyan-400/30';

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-zinc-950/95 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col cursor-default animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 bg-black/60 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg bg-white/5 border ${accentBorder}`}>
              <ImageIcon className={`w-4 h-4 ${accentText}`} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{title}</span>
                <span className={`text-[10px] font-mono ${accentText} bg-white/5 px-2 py-0.5 rounded-full border ${accentBorder}`}>
                  FULL RESOLUTION
                </span>
              </h4>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all text-xs font-mono font-semibold active:scale-95 cursor-pointer"
            aria-label="Đóng popup ảnh"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Đóng</span>
            <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">(ESC)</span>
          </button>
        </div>

        {/* Dedicated Description Block Under Close Button / Header */}
        <div className="px-5 py-3 sm:px-6 bg-zinc-900/80 border-b border-white/10 flex items-start gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${accentDot} mt-1.5 shrink-0 animate-pulse`} />
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {description}
          </p>
        </div>

        {/* Zoom & Magnifying Glass Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2 sm:px-6 bg-black/70 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <ZoomIn className={`w-3.5 h-3.5 ${accentText}`} />
              <span className="font-semibold">Kính lúp thu phóng:</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                scale > 1
                  ? `${accentBg} ${accentText} border ${accentBorder}`
                  : 'bg-white/5 text-zinc-400 border border-white/10'
              }`}
            >
              {Math.round(scale * 100)}%
            </span>
            <span className="text-[11px] text-zinc-400 hidden sm:inline">
              ({scale > 1 ? 'Cuộn chuột để di chuyển xem chi tiết' : 'Click vào ảnh để phóng to'})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-zinc-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed text-xs"
              title="Thu nhỏ (-)"
              aria-label="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thu nhỏ</span>
            </button>

            <button
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-zinc-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed text-xs"
              title="Phóng to (+)"
              aria-label="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phóng to</span>
            </button>

            {scale > 1 && (
              <button
                onClick={handleResetZoom}
                className={`px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 ${accentText} transition-all flex items-center gap-1 cursor-pointer text-xs`}
                title="Về kích thước chuẩn (100%)"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>100%</span>
              </button>
            )}
          </div>
        </div>

        {/* Centered Image Container with Interactive Zoom */}
        <div
          className="relative p-2 sm:p-4 bg-black/95 flex items-center justify-center min-h-[300px] max-h-[66vh] sm:max-h-[72vh] overflow-auto select-none"
        >
          <div
            className={`relative transition-all duration-200 inline-flex items-center justify-center ${
              scale > 1 ? 'min-w-full min-h-full p-4' : ''
            }`}
          >
            <img
              src={image}
              alt={title}
              onClick={handleToggleZoom}
              style={{
                width: scale === 1 ? 'auto' : `${scale * 100}%`,
                maxWidth: scale === 1 ? '100%' : 'none',
                maxHeight: scale === 1 ? '66vh' : 'none',
              }}
              className={`object-contain rounded-xl shadow-2xl transition-all duration-200 select-none ${
                scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              title={scale > 1 ? 'Click để thu nhỏ về 100%' : 'Click kính lúp để phóng to chi tiết UI'}
            />

            {/* Quick Magnifying Glass Badge overlay when at 100% */}
            {scale === 1 && (
              <button
                onClick={handleToggleZoom}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Phóng to ảnh"
              >
                <ZoomIn className={`w-3.5 h-3.5 ${accentText}`} />
                <span>Kính lúp zoom</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Hint Footer */}
        <div className="px-5 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${accentText}`} />
            <span>Giao diện thực tế phần mềm (Hỗ trợ kính lúp zoom chi tiết)</span>
          </span>
          <span className="hidden sm:inline">Phím +/- để zoom, ESC để thoát</span>
          <span className="sm:hidden">ESC để thoát</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
