import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, ExternalLink, Headphones, Sparkles, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Telegram Official Plane SVG Icon
const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.94-1.28 4.91-2.12 5.9-2.54 2.81-1.17 3.4-.37 3.42 1.44z" />
  </svg>
);

// Zalo Official SVG Icon
const ZaloIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.88 1.5 5.43 3.86 7.03L5 22l4.28-1.42C10.16 20.82 11.06 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9zm5 12h-4v-1h4v1zm0-3h-6V9h6v2z" />
  </svg>
);

export const TelegramSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<'telegram' | 'zalo'>('telegram');
  const [showTooltip, setShowTooltip] = useState(true);
  const [copied, setCopied] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const telegramUrl = siteConfig.socials.telegram || 'https://t.me/HOHINEEE';
  const telegramUsername = '@HOHINEEE';

  // Auto-hide the initial tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click or ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyUsername = async () => {
    try {
      await navigator.clipboard.writeText(telegramUsername);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Prompt Speech Bubble when closed */}
      {!isOpen && showTooltip && (
        <div className="mb-2 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/95 border border-sky-400/30 text-white text-xs font-mono shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Cần hỗ trợ? Chat Tele / Zalo</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-zinc-400 hover:text-white ml-1 p-0.5 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng gợi ý"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Tooltip triangle tail */}
          <div className="w-2.5 h-2.5 bg-zinc-900 border-r border-b border-sky-400/30 transform rotate-45 absolute -bottom-1.5 right-6" />
        </div>
      )}

      {/* Popover Chat Window Card when opened */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] max-w-[calc(100vw-2.5rem)] rounded-3xl bg-zinc-950/95 border border-sky-400/30 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-200">
          {/* Card Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-sky-950/80 via-zinc-900/90 to-zinc-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-md transition-all ${
                    activeChannel === 'telegram'
                      ? 'bg-gradient-to-tr from-sky-500 to-blue-600 shadow-sky-500/20'
                      : 'bg-gradient-to-tr from-lime-400 to-emerald-500 text-black shadow-lime-400/20'
                  }`}
                >
                  {activeChannel === 'telegram' ? (
                    <TelegramIcon className="w-5 h-5 text-white" />
                  ) : (
                    <ZaloIcon className="w-5 h-5 text-black" />
                  )}
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Hỗ Trợ Kỹ Thuật MMO</span>
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </h4>
                <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Dev & Huy Hồ • Online 24/7</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label="Đóng popup hỗ trợ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-3.5">
            {/* Channel Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveChannel('telegram')}
                className={`py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all font-bold cursor-pointer ${
                  activeChannel === 'telegram'
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-black shadow-md shadow-sky-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </button>
              <button
                onClick={() => setActiveChannel('zalo')}
                className={`py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all font-bold cursor-pointer ${
                  activeChannel === 'zalo'
                    ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ZaloIcon className="w-3.5 h-3.5" />
                <span>Zalo</span>
              </button>
            </div>

            {/* TAB 1: TELEGRAM */}
            {activeChannel === 'telegram' && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Friendly Greeting Message Bubble */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-xs text-zinc-300 leading-relaxed space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1">
                    <Headphones className="w-3.5 h-3.5 text-sky-400" />
                    <span>Chào bạn! Cần trợ giúp qua Telegram?</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Quét mã QR bằng ứng dụng Telegram hoặc nhấn nút bên dưới để chat trực tiếp.
                  </p>
                </div>

                {/* QR Code Presentation Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900/90 border border-white/10 p-3 flex flex-col items-center gap-2.5 group">
                  <div className="relative w-48 sm:w-52 aspect-[9/16] rounded-xl overflow-hidden bg-black/80 border border-white/10 shadow-lg">
                    <img
                      src="/telegram-qr.png"
                      alt="Telegram QR Code Support @HOHINEEE"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-sky-400/20 rounded-xl" />
                  </div>

                  {/* Username Tag & Copy Action */}
                  <div className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                      <TelegramIcon className="w-3.5 h-3.5" />
                      <span>{telegramUsername}</span>
                    </div>
                    <button
                      onClick={handleCopyUsername}
                      className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all text-[11px] flex items-center gap-1 active:scale-95 cursor-pointer"
                      title="Sao chép username"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Open Telegram Action Button */}
                <div className="space-y-2 pt-1">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black shadow-lg shadow-sky-500/25 active:scale-95 transition-all cursor-pointer">
                      <TelegramIcon className="w-4 h-4 text-black" />
                      <span>Mở Chat Telegram (@HOHINEEE)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black/70" />
                    </button>
                  </a>

                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-zinc-400 text-center">
                    <span>Hỗ trợ cài đặt AI Studio, hướng dẫn & giải đáp lỗi 24/7</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ZALO */}
            {activeChannel === 'zalo' && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Friendly Greeting Message Bubble */}
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-xs text-zinc-300 leading-relaxed space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1">
                    <Headphones className="w-3.5 h-3.5 text-lime-400" />
                    <span>Kết nối Zalo cùng Huy Hồ</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Quét mã danh thiếp Zalo dưới đây để chat trực tiếp và nhận hướng dẫn cài đặt.
                  </p>
                </div>

                {/* QR Code Presentation Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900/90 border border-white/10 p-3 flex flex-col items-center gap-2.5 group">
                  <div className="relative w-48 sm:w-52 aspect-[4/5] rounded-xl overflow-hidden bg-white p-1 border border-lime-400/30 shadow-lg flex items-center justify-center">
                    <img
                      src="/zalo-qr.png"
                      alt="Danh thiếp Zalo Huy Hồ"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-lime-400/20 rounded-xl" />
                  </div>

                  {/* Name Tag */}
                  <div className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-lime-400 font-bold">
                      <ZaloIcon className="w-3.5 h-3.5" />
                      <span>Huy Hồ (Danh thiếp Zalo)</span>
                    </div>
                    <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20 font-bold">
                      Admin
                    </span>
                  </div>
                </div>

                {/* Instruction & Action */}
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-lime-400/10 border border-lime-400/20 text-center">
                    <p className="text-xs text-lime-400 font-semibold flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mở Zalo trên điện thoại ➔ Quét mã QR</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-zinc-400 text-center">
                    <span>Hỗ trợ kỹ thuật trực tiếp qua Zalo 24/7</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-zinc-800 text-white border border-white/20 rotate-90'
            : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-black hover:scale-105 border border-sky-300/40 shadow-sky-500/30 hover:shadow-sky-500/50'
        }`}
        aria-label="Mở bong bóng hỗ trợ Telegram & Zalo"
        title="Hỗ trợ kỹ thuật qua Telegram & Zalo"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-sky-400/30 blur-md -z-10 group-hover:bg-sky-400/50 transition-all" />

        {isOpen ? (
          <X className="w-6 h-6 text-zinc-200" />
        ) : (
          <>
            <TelegramIcon className="w-7 h-7 text-black drop-shadow-sm transition-transform group-hover:scale-110" />

            {/* Pulsating online beacon badge */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-zinc-950" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};
