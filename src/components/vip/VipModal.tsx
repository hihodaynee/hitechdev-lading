import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Sparkles, ExternalLink, ShieldCheck, QrCode, MessageSquare, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.vipCouponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-obsidian-card border border-lime-400/30 p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center sm:text-left pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>CỘNG ĐỒNG CREATOR YOUTUBE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Nhóm Zalo Nhận Thông Tin & Giao Lưu Làm YouTube
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Trao đổi chuyên sâu về sản xuất video, bắt trend YouTube, cập nhật tiến độ công cụ Auto Video và nhận mã ưu đãi thành viên.
          </p>
        </div>

        {/* Coupon Code Box */}
        <div className="p-4 rounded-2xl bg-black/70 border border-white/15 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>MÃ THÀNH VIÊN ĐẶC QUYỀN (ƯU ĐÃI 20%)</span>
            <span className="text-lime-400 font-bold">HẠN DÙNG: TRỌN ĐỜI</span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-zinc-950 p-2.5 rounded-xl border border-lime-400/25">
            <span className="text-xl sm:text-2xl font-mono font-bold text-lime-400 tracking-wider select-all pl-2">
              {siteConfig.vipCouponCode}
            </span>
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                copied
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'bg-lime-400 text-black hover:bg-lime-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>ĐÃ CHÉP</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SAO CHÉP</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Direct Zalo Link & QR Code Representation */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-lime-400 p-2 flex flex-col items-center justify-center shrink-0 shadow-md">
            <QrCode className="w-16 h-16 text-black" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-lime-400 font-bold uppercase tracking-wider block">
              ZALO VIP // QUÉT MÃ GIAO LƯU
            </span>
            <h4 className="text-sm font-bold text-white">Nhóm Zalo: HITech MMO Creator</h4>
            <p className="text-[11px] text-zinc-400">
              Trao đổi kinh nghiệm làm YouTube, nhận cập nhật bản build mới và tài nguyên kịch bản.
            </p>
          </div>
        </div>

        {/* Outbound Link to Zalo */}
        <div className="pt-2">
          <a
            href={siteConfig.socials.zaloCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button
              variant="neon-pulse"
              size="lg"
              className="w-full text-sm font-bold"
              icon={<ExternalLink className="w-4 h-4 text-black" />}
            >
              Mở Nhóm Zalo Tham Gia Ngay
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
