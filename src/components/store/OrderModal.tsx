import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Zap,
  Clock,
  Send,
  MessageCircle,
} from 'lucide-react';
import { DigitalProduct, DigitalProductPlan, siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

// Telegram Official Plane SVG Icon
const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
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

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: DigitalProduct | null;
  initialPlanId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
  initialPlanId,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product) {
      if (initialPlanId && product.plans.some((p) => p.id === initialPlanId)) {
        setSelectedPlanId(initialPlanId);
      } else if (product.plans.length > 0) {
        setSelectedPlanId(product.plans[0].id);
      }
    }
  }, [product, initialPlanId, isOpen]);

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

  if (!isOpen || !product) return null;

  const currentPlan =
    product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];

  const orderText = `[ĐẶT HÀNG] Tôi muốn mua: ${product.title} - ${currentPlan.name} (Giá: ${currentPlan.price}). Bàn giao tài khoản giúp tôi nhé!`;

  const telegramOrderUrl = `https://t.me/HOHINEEE?text=${encodeURIComponent(orderText)}`;

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {product.title}
                </h3>
                <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20">
                  {product.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Đặt mua & bàn giao tài khoản tự động 24/7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Đóng popup đặt hàng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Plan Selector (if product has multiple plans) */}
          {product.plans.length > 1 && (
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Chọn Gói Sản Phẩm:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.plans.map((plan) => {
                  const isSelected = plan.id === selectedPlanId;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-lime-400/10 border-lime-400 text-white shadow-lg shadow-lime-400/10'
                          : 'bg-black/40 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-tight">
                          {plan.name}
                        </span>
                        {plan.highlight && (
                          <span className="text-[9px] font-mono bg-lime-400 text-black font-bold px-1.5 py-0.2 rounded">
                            TIẾT KIỆM
                          </span>
                        )}
                      </div>
                      <span className="text-base font-mono font-black text-lime-400">
                        {plan.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Summary Card */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-zinc-400">
                Gói đang chọn: <strong className="text-white">{currentPlan.name}</strong>
              </span>
              <div className="text-2xl font-bold font-mono text-lime-400">
                {currentPlan.price}
              </div>
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 block">
                Giao ngay lập tức
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                {currentPlan.duration}
              </span>
            </div>
          </div>

          {/* Format & Warranty Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 text-zinc-300">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-zinc-400 block">Định dạng bàn giao:</span>
                <span className="font-semibold text-white">{currentPlan.format}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-zinc-400 block">Chính sách bảo hành:</span>
                <span className="font-semibold text-white">{currentPlan.warranty}</span>
              </div>
            </div>
          </div>

          {/* Regulations / Notes warning if present */}
          {(currentPlan.rules || product.rules) && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>QUY ĐỊNH SỬ DỤNG & BẢO HÀNH:</span>
              </div>
              <ul className="text-[11px] text-zinc-300 space-y-1 list-disc list-inside font-sans leading-relaxed">
                {(currentPlan.rules || product.rules)?.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Copy Order Syntax Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Cú pháp đặt hàng nhanh:</span>
              <button
                onClick={handleCopyOrder}
                className="text-lime-400 hover:text-lime-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'ĐÃ CHÉP CÚ PHÁP' : 'SAO CHÉP'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-zinc-300 break-all select-all">
              {orderText}
            </div>
          </div>

          {/* Direct Order Channels (Telegram & Zalo) */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Chọn Kênh Nhắn Tin Đặt Hàng:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Telegram Outbound Button */}
              <a
                href={telegramOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer">
                  <TelegramIcon className="w-4 h-4 text-black" />
                  <span>Đặt Qua Telegram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black/70" />
                </button>
              </a>

              {/* Zalo Contact Trigger */}
              <button
                onClick={handleCopyOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs bg-lime-400 hover:bg-lime-300 text-black shadow-lg shadow-lime-400/20 active:scale-95 transition-all cursor-pointer"
              >
                <ZaloIcon className="w-4 h-4 text-black" />
                <span>{copied ? 'Đã Chép! Mở Zalo Dán' : 'Chép Cú Pháp Đặt Zalo'}</span>
              </button>
            </div>

            {/* Quick Zalo Huy Ho Callout */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-0.5 overflow-hidden shrink-0 shadow">
                <img
                  src="/zalo-qr.png"
                  alt="Zalo Huy Hồ"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-mono text-lime-400 font-bold uppercase block">
                  HỖ TRỢ ZALO TRỰC TIẾP: HUY HỒ
                </span>
                <p className="text-xs text-zinc-300">
                  Quét mã Zalo hoặc gửi cú pháp đã chép để nhận tài khoản ngay sau thanh toán!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
