import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Sparkles } from 'lucide-react';

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
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLime = accentColor === 'lime';
  const accentDot = isLime ? 'bg-lime-400' : 'bg-cyan-400';
  const accentText = isLime ? 'text-lime-400' : 'text-cyan-400';
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

        {/* Centered Image Container */}
        <div className="p-2 sm:p-4 bg-black/90 flex items-center justify-center min-h-[300px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="max-h-[65vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Bottom Hint Footer */}
        <div className="px-4 py-2 bg-black/50 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <Sparkles className={`w-3 h-3 ${accentText}`} />
            Giao diện thực tế phần mềm
          </span>
          <span>Click ra ngoài hoặc bấm ESC để thoát</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
