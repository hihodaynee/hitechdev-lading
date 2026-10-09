import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  ZoomIn,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { DigitalProduct, DigitalProductPlan } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: DigitalProduct | null;
  onOrder: (product: DigitalProduct, planId?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onOrder,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [lightboxImage, setLightboxImage] = useState<{
    image: string;
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (product && product.plans.length > 0) {
      setSelectedPlanId(product.plans[0].id);
    }
  }, [product, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !lightboxImage) onClose();
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
  }, [isOpen, onClose, lightboxImage]);

  if (!isOpen || !product) return null;

  const currentPlan =
    product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];

  return (
    <>
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
                <Info className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {product.title}
                  </h3>
                  <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20 font-bold">
                    {product.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {product.categoryLabel} // Thông tin & Quy định chi tiết
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label="Đóng chi tiết"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-5 text-sm">
            {/* Visual Banners / Lightbox Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() =>
                    setLightboxImage({
                      image: product.image,
                      title: `${product.title} — Ảnh đại diện`,
                      description: product.subtitle,
                    })
                  }
                  className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 hover:bg-black transition-all cursor-pointer shadow"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-lime-400" />
                  <span>Phóng to</span>
                </button>
              </div>

              {product.detailImage ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group">
                  <img
                    src={product.detailImage}
                    alt={`${product.title} chi tiết`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() =>
                      setLightboxImage({
                        image: product.detailImage!,
                        title: `${product.title} — Bảng so sánh chi tiết`,
                        description: 'Bảng đối chiếu thông số các gói bản quyền chính hãng.',
                      })
                    }
                    className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-black transition-all cursor-pointer shadow"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Xem Bảng Gói</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-lime-400 font-bold block mb-1 uppercase">
                      Đặc Điểm Nổi Bật:
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.tagHighlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Plan Switcher (if product has multiple plans) */}
            {product.plans.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Lựa chọn gói dịch vụ:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.plans.map((plan) => {
                    const isSelected = plan.id === selectedPlanId;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                          isSelected
                            ? 'bg-lime-400/15 border-lime-400 text-white shadow-lg'
                            : 'bg-black/50 border-white/10 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{plan.name}</span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {plan.duration}
                          </span>
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

            {/* Specs Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">
                    Định Dạng Bàn Giao:
                  </span>
                  <span className="font-bold text-white text-xs">
                    {currentPlan?.format || product.format}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">
                    Chính Sách Bảo Hành:
                  </span>
                  <span className="font-bold text-white text-xs">
                    {currentPlan?.warranty || product.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5">
              <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-wider block">
                Chi Tiết Tính Năng & Quyền Lợi:
              </span>
              <ul className="space-y-2 text-xs text-zinc-200 font-sans">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulations & Warranty Rules */}
            {(currentPlan?.rules || product.rules) && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>QUY ĐỊNH BẮT BUỘC & ĐIỀU KHOẢN BẢO HÀNH:</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                  {(currentPlan?.rules || product.rules)?.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 py-4 bg-black/80 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 block">Giá thanh toán:</span>
              <span className="text-2xl font-bold font-mono text-lime-400">
                {currentPlan?.price || product.priceDisplay}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="cursor-pointer"
              >
                Đóng
              </Button>

              <Button
                variant="lime"
                size="md"
                onClick={() => {
                  onClose();
                  onOrder(product, selectedPlanId);
                }}
                className="font-bold cursor-pointer"
                icon={<ShoppingBag className="w-4 h-4 text-black" />}
              >
                Đặt Mua Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox if triggered */}
      {lightboxImage && (
        <ImageLightbox
          isOpen={Boolean(lightboxImage)}
          onClose={() => setLightboxImage(null)}
          image={lightboxImage.image}
          title={lightboxImage.title}
          description={lightboxImage.description}
          accentColor="lime"
        />
      )}
    </>
  );
};
