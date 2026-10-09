import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ZoomIn,
  Eye,
  AlertTriangle,
  Music,
  Mail,
  Cpu,
  Video,
} from 'lucide-react';
import { siteConfig, DigitalProduct, DigitalProductPlan } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface DigitalStoreSectionProps {
  onOrderProduct: (product: DigitalProduct, planId?: string) => void;
}

export const DigitalStoreSection: React.FC<DigitalStoreSectionProps> = ({
  onOrderProduct,
}) => {
  const [selectedCapcutPlan, setSelectedCapcutPlan] = useState<'capcut-1m' | 'capcut-3m'>(
    'capcut-3m'
  );
  const [activeLightbox, setActiveLightbox] = useState<{
    image: string;
    title: string;
    description: string;
    accentColor?: 'lime' | 'cyan';
  } | null>(null);

  const products = siteConfig.digitalProducts;

  const capcutProduct = products.find((p) => p.id === 'capcut-pro') || products[0];
  const spotifyProduct = products.find((p) => p.id === 'spotify-premium') || products[1];
  const gmailProduct = products.find((p) => p.id === 'gmail-aged') || products[2];
  const grokProduct = products.find((p) => p.id === 'grok-super') || products[3];

  const currentCapcutPlan =
    capcutProduct.plans.find((p) => p.id === selectedCapcutPlan) || capcutProduct.plans[0];

  return (
    <section id="digital-store" className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="lime" dot>
              DIGITAL STORE // TÀI NGUYÊN SỐ
            </Badge>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              // TÀI KHOẢN CHÍNH HÃNG & BẢO HÀNH
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Kho Tài Khoản & Bản Quyền Số{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400">
              Phục Vụ Creator & MMO
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Cung cấp tài khoản CapCut Pro, Grok Super AI, Spotify Premium và Gmail cổ chất lượng cao. Bàn giao ngay sau thanh toán, hỗ trợ bảo hành uy tín 1 đổi 1.
          </p>
        </div>

        {/* 4 Digital Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* PRODUCT 1: CAPCUT PRO */}
          <div className="rounded-[2.5rem] bg-zinc-950/90 border border-cyan-400/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-cyan-400/60 transition-all duration-300">
            <div className="space-y-6">
              {/* Product Banner with Zoom Lightbox */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group/img">
                <img
                  src={capcutProduct.image}
                  alt={capcutProduct.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Lightbox triggers */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveLightbox({
                        image: capcutProduct.image,
                        title: 'CapCut Pro Account — Ảnh Banner Đại Diện',
                        description:
                          'Tài khoản CapCut Pro chính hãng: Mở khóa hiệu ứng Pro, xuất 4K HD 60fps, lưu trữ đám mây và bộ công cụ AI thông minh.',
                        accentColor: 'cyan',
                      })
                    }
                    className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 hover:bg-black/90 hover:border-cyan-400 text-zinc-300 hover:text-cyan-400 transition-all cursor-pointer shadow-lg"
                    title="Phóng to ảnh banner"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Banner</span>
                  </button>

                  {capcutProduct.detailImage && (
                    <button
                      onClick={() =>
                        setActiveLightbox({
                          image: capcutProduct.detailImage!,
                          title: 'CapCut Pro — Bảng So Sánh Chi Tiết Gói 1 Tháng & 3 Tháng',
                          description:
                            'So sánh trực quan: Gói 1 Tháng 99k (Tài khoản cá nhân) và Gói 3 Tháng BHF 289k (Tài khoản Pro Team Pay chính hãng).',
                          accentColor: 'cyan',
                        })
                      }
                      className="px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 hover:bg-cyan-500/30 transition-all cursor-pointer shadow-lg font-bold"
                      title="Xem ảnh chi tiết 2 gói"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Xem Bảng Gói</span>
                    </button>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded-full border border-cyan-400/30 font-bold uppercase tracking-wider">
                    {capcutProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                    Bàn giao: Email | Password
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Video className="w-6 h-6 text-cyan-400" />
                  <span>{capcutProduct.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {capcutProduct.subtitle}
                </p>
              </div>

              {/* 2-Plan Interactive Switcher (Gói 1 Tháng vs Gói 3 Tháng) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="uppercase tracking-wider">Chọn Gói Đăng Ký:</span>
                  <span className="text-cyan-400 font-bold">2 Thiết bị PC & Mobile</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedCapcutPlan('capcut-1m')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedCapcutPlan === 'capcut-1m'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-black/50 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Gói 1 Tháng</span>
                      <span className="text-[9px] font-mono text-zinc-400">30 Ngày</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-mono font-black text-cyan-400">99.000đ</span>
                      <span className="text-[10px] text-zinc-400 font-sans">Cá nhân</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCapcutPlan('capcut-3m')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedCapcutPlan === 'capcut-3m'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-black/50 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Gói 3 Tháng (BHF)</span>
                      <span className="text-[9px] font-mono bg-cyan-400 text-black font-bold px-1.5 py-0.2 rounded">
                        TIẾT KIỆM
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-mono font-black text-cyan-400">289.000đ</span>
                      <span className="text-[10px] text-zinc-400 font-sans">Pro Team</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Plan Specs Display */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono text-sm">
                    {currentCapcutPlan.name} — {currentCapcutPlan.price}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                    {currentCapcutPlan.warranty}
                  </span>
                </div>

                <ul className="space-y-1.5 text-zinc-300 font-sans">
                  {currentCapcutPlan.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Important Rules for 3-Month Plan */}
                {currentCapcutPlan.rules && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-amber-400 font-bold block flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Quy định gói 3 Tháng:
                    </span>
                    <ul className="text-[11px] text-zinc-400 space-y-0.5 list-disc list-inside">
                      {currentCapcutPlan.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-400 block">Giá thanh toán:</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {currentCapcutPlan.price}
                </span>
              </div>

              <Button
                variant="cyan"
                size="md"
                onClick={() => onOrderProduct(capcutProduct, selectedCapcutPlan)}
                className="font-bold cursor-pointer"
                icon={<ShoppingBag className="w-4 h-4 text-black" />}
              >
                Đặt Mua CapCut Pro
              </Button>
            </div>
          </div>

          {/* PRODUCT 2: SPOTIFY PREMIUM */}
          <div className="rounded-[2.5rem] bg-zinc-950/90 border border-emerald-400/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-emerald-400/60 transition-all duration-300">
            <div className="space-y-6">
              {/* Product Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group/img">
                <img
                  src={spotifyProduct.image}
                  alt={spotifyProduct.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() =>
                      setActiveLightbox({
                        image: spotifyProduct.image,
                        title: 'Spotify Premium 3 Tháng — Ảnh Banner Đại Diện',
                        description:
                          'Tài khoản Spotify Premium cấp sẵn: Nghe nhạc không quảng cáo, chất lượng 320kbps, tải nhạc offline và bảo hành 1 đổi 1 suốt 3 tháng.',
                        accentColor: 'lime',
                      })
                    }
                    className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 hover:bg-black/90 hover:border-emerald-400 text-zinc-300 hover:text-emerald-400 transition-all cursor-pointer shadow-lg"
                    title="Phóng to ảnh"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zoom Ảnh</span>
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 bg-black/80 px-2 py-0.5 rounded-full border border-emerald-400/30 font-bold uppercase tracking-wider">
                    {spotifyProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                    Bảo hành 1 đổi 1 suốt 3 tháng
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Music className="w-6 h-6 text-emerald-400" />
                  <span>{spotifyProduct.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {spotifyProduct.subtitle}
                </p>
              </div>

              {/* Product Key Points Checklist */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  Đặc Quyền Spotify Premium:
                </span>
                <ul className="space-y-2 text-zinc-300 font-sans">
                  {spotifyProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-400 block">Thời hạn 3 tháng (90D):</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {spotifyProduct.plans[0]?.price || '129.000đ'}
                </span>
              </div>

              <Button
                variant="lime"
                size="md"
                onClick={() => onOrderProduct(spotifyProduct)}
                className="font-bold cursor-pointer"
                icon={<ShoppingBag className="w-4 h-4 text-black" />}
              >
                Đặt Mua Spotify
              </Button>
            </div>
          </div>

          {/* PRODUCT 3: GMAIL CỔ RANDOM 2010~2022 */}
          <div className="rounded-[2.5rem] bg-zinc-950/90 border border-lime-400/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-lime-400/60 transition-all duration-300">
            <div className="space-y-6">
              {/* Product Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group/img">
                <img
                  src={gmailProduct.image}
                  alt={gmailProduct.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() =>
                      setActiveLightbox({
                        image: gmailProduct.image,
                        title: 'Gmail Cổ Random (2010 ~ 2022) — Ảnh Banner',
                        description:
                          'Gmail năm tạo cũ 2010 ~ 2022: Độ trust cực cao, hạn chế checkpoint, bảo hành login 24H (lỗi pass, very phone). Định dạng: Gmail | Pass | Mail khôi phục | 2FA.',
                        accentColor: 'lime',
                      })
                    }
                    className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 hover:bg-black/90 hover:border-lime-400 text-zinc-300 hover:text-lime-400 transition-all cursor-pointer shadow-lg"
                    title="Phóng to ảnh"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-lime-400" />
                    <span>Zoom Ảnh</span>
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-lime-400 bg-black/80 px-2 py-0.5 rounded-full border border-lime-400/30 font-bold uppercase tracking-wider">
                    {gmailProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                    Bảo hành Login 24H
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Mail className="w-6 h-6 text-lime-400" />
                  <span>{gmailProduct.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {gmailProduct.subtitle}
                </p>
              </div>

              {/* Product Key Points Checklist */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-lime-400 font-bold uppercase tracking-wider block">
                  Thông Tin & Chính Sách Bảo Hành:
                </span>
                <ul className="space-y-2 text-zinc-300 font-sans">
                  {gmailProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Rules Alert */}
                {gmailProduct.rules && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-amber-400 font-bold block flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Quy định bảo hành:
                    </span>
                    <ul className="text-[11px] text-zinc-400 space-y-0.5 list-disc list-inside">
                      {gmailProduct.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-400 block">Giá tài khoản:</span>
                <span className="text-2xl font-bold font-mono text-lime-400">
                  {gmailProduct.plans[0]?.price || '49.000đ'}
                </span>
              </div>

              <Button
                variant="lime"
                size="md"
                onClick={() => onOrderProduct(gmailProduct)}
                className="font-bold cursor-pointer"
                icon={<ShoppingBag className="w-4 h-4 text-black" />}
              >
                Đặt Mua Gmail Cổ
              </Button>
            </div>
          </div>

          {/* PRODUCT 4: GROK SUPER AI 5-7 NGÀY */}
          <div className="rounded-[2.5rem] bg-zinc-950/90 border border-purple-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-purple-500/60 transition-all duration-300">
            <div className="space-y-6">
              {/* Product Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-zinc-900 border border-white/10 group/img">
                <img
                  src={grokProduct.image}
                  alt={grokProduct.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() =>
                      setActiveLightbox({
                        image: grokProduct.image,
                        title: 'Super Grok AI — Ảnh Banner Đại Diện',
                        description:
                          'Tài khoản Grok Super AI 5-7 Ngày (BHF): Smart AI, Fast responses, Advanced reasoning, Premium access. Giá chỉ 99k.',
                        accentColor: 'cyan',
                      })
                    }
                    className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 hover:bg-black/90 hover:border-purple-400 text-zinc-300 hover:text-purple-300 transition-all cursor-pointer shadow-lg"
                    title="Phóng to ảnh"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                    <span>Zoom Ảnh</span>
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-300 bg-black/80 px-2 py-0.5 rounded-full border border-purple-500/30 font-bold uppercase tracking-wider">
                    {grokProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                    Bảo hành BHF
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  <span>{grokProduct.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {grokProduct.subtitle}
                </p>
              </div>

              {/* Product Key Points Checklist */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                  Tính Năng & Thời Hạn:
                </span>
                <ul className="space-y-2 text-zinc-300 font-sans">
                  {grokProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Regulations Warning */}
                {grokProduct.rules && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-amber-400 font-bold block flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      QUY ĐỊNH BẮT BUỘC:
                    </span>
                    <ul className="text-[11px] text-zinc-400 space-y-0.5 list-disc list-inside">
                      {grokProduct.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-400 block">Thời hạn 5-7 Ngày:</span>
                <span className="text-2xl font-bold font-mono text-purple-400">
                  {grokProduct.plans[0]?.price || '99.000đ'}
                </span>
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => onOrderProduct(grokProduct)}
                className="font-bold border-purple-500/40 text-purple-300 hover:bg-purple-500/20 cursor-pointer"
                icon={<ShoppingBag className="w-4 h-4 text-purple-300" />}
              >
                Đặt Mua Grok Super
              </Button>
            </div>
          </div>
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
