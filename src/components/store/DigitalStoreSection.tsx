import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Info,
  ZoomIn,
  ShieldCheck,
  Zap,
  Filter,
} from 'lucide-react';
import { siteConfig, DigitalProduct } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface DigitalStoreSectionProps {
  onOrderProduct: (product: DigitalProduct, planId?: string) => void;
  onViewProductDetail: (product: DigitalProduct) => void;
}

export const DigitalStoreSection: React.FC<DigitalStoreSectionProps> = ({
  onOrderProduct,
  onViewProductDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<{
    image: string;
    title: string;
    description: string;
    accentColor?: 'lime' | 'cyan';
  } | null>(null);

  const products = siteConfig.digitalProducts;

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm', count: products.length },
    {
      id: 'ai',
      label: 'AI & Content',
      count: products.filter((p) => p.category === 'ai').length,
    },
    {
      id: 'design',
      label: 'Đồ Họa & Video',
      count: products.filter((p) => p.category === 'design').length,
    },
    {
      id: 'mmo',
      label: 'Tài Nguyên MMO',
      count: products.filter((p) => p.category === 'mmo').length,
    },
    {
      id: 'audio',
      label: 'Âm Nhạc',
      count: products.filter((p) => p.category === 'audio').length,
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="digital-store" className="relative py-8 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="lime" dot>
              DIGITAL ASSETS // TÀI NGUYÊN SỐ
            </Badge>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              // TÀI KHOẢN CHÍNH HÃNG 100%
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Kho Tài Khoản & Bản Quyền Số{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400">
              Phục Vụ Creator & MMO
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Hệ sinh thái tài khoản cao cấp: Google AI Pro, Canva Pro, CapCut Pro, Grok Super AI, Spotify và Gmail cổ. Bàn giao tự động, bảo hành uy tín 1 đổi 1 suốt thời gian sử dụng.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-lime-400 text-black font-bold shadow-lime-glow'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeCategory === cat.id
                    ? 'bg-black/20 text-black'
                    : 'bg-white/10 text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 100% Balanced & Equal-Height Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredProducts.map((product) => {
            const isCyan = product.accentColor === 'cyan';
            const isBlue = product.accentColor === 'blue';
            const isPurple = product.accentColor === 'purple';
            const isGreen = product.accentColor === 'green';

            const borderClass = isCyan
              ? 'border-cyan-400/30 hover:border-cyan-400/70 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]'
              : isBlue
              ? 'border-blue-500/30 hover:border-blue-400/70 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
              : isPurple
              ? 'border-purple-500/30 hover:border-purple-400/70 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]'
              : isGreen
              ? 'border-emerald-400/30 hover:border-emerald-400/70 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]'
              : 'border-lime-400/30 hover:border-lime-400/70 group-hover:shadow-lime-glow';

            const priceColorClass = isCyan
              ? 'text-cyan-400'
              : isBlue
              ? 'text-blue-400'
              : isPurple
              ? 'text-purple-400'
              : isGreen
              ? 'text-emerald-400'
              : 'text-lime-400';

            return (
              <div
                key={product.id}
                className={`rounded-[2rem] bg-zinc-950/90 border ${borderClass} p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 h-full group`}
              >
                {/* Top Section */}
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Fixed Aspect Ratio Product Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Zoom Button in Corner */}
                    <div className="absolute top-2.5 right-2.5">
                      <button
                        onClick={() =>
                          setActiveLightbox({
                            image: product.image,
                            title: product.title,
                            description: product.subtitle,
                            accentColor: isCyan ? 'cyan' : 'lime',
                          })
                        }
                        className="p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:bg-black text-zinc-300 hover:text-lime-400 transition-all cursor-pointer shadow-lg"
                        title="Phóng to ảnh"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Badges on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="bg-black/85 text-white font-bold px-2 py-0.5 rounded-full border border-white/20">
                        {product.badge}
                      </span>
                      <span className="bg-black/85 text-zinc-300 px-2 py-0.5 rounded-full border border-white/10 truncate max-w-[140px]">
                        {product.format}
                      </span>
                    </div>
                  </div>

                  {/* Category Pill & Title (Consistent Height) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                        // {product.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Sẵn sàng
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
                      {product.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 min-h-[34px]">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* 3 Uniform Tag Highlights */}
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {product.tagHighlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Duration Row (Symmetrical) */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                        Giá trọn gói:
                      </span>
                      <span className={`text-xl font-bold font-mono ${priceColorClass}`}>
                        {product.priceDisplay}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                        Thời hạn:
                      </span>
                      <span className="text-xs font-mono text-zinc-200 font-semibold">
                        {product.durationDisplay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Symmetrical Action Buttons: Xem Chi Tiết & Đặt Mua */}
                <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProductDetail(product)}
                    className="font-medium cursor-pointer text-xs"
                    icon={<Info className="w-3.5 h-3.5 text-zinc-400" />}
                  >
                    Xem Chi Tiết
                  </Button>

                  <Button
                    variant={isCyan ? 'cyan' : 'lime'}
                    size="sm"
                    onClick={() => onOrderProduct(product)}
                    className="font-bold cursor-pointer text-xs"
                    icon={<ShoppingBag className="w-3.5 h-3.5 text-black" />}
                  >
                    Đặt Mua
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Lightbox Preview */}
      {activeLightbox && (
        <ImageLightbox
          isOpen={Boolean(activeLightbox)}
          onClose={() => setActiveLightbox(null)}
          image={activeLightbox.image}
          title={activeLightbox.title}
          description={activeLightbox.description}
          accentColor={activeLightbox.accentColor || 'lime'}
        />
      )}
    </section>
  );
};
