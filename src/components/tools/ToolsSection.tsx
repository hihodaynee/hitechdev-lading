import React from 'react';
import { Sparkles, Download, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BentoGrid } from '@/components/bento/BentoGrid';
import { MethodologySection } from '@/components/methodology/MethodologySection';

interface ToolsSectionProps {
  onOpenVipModal: () => void;
  onNavigateStore?: () => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  onOpenVipModal,
  onNavigateStore,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      {/* Tools Page Header */}
      <section className="px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="lime" dot>
              CÔNG CỤ MMO // HỆ THỐNG TỰ ĐỘNG HÓA
            </Badge>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              // AI STUDIO (LIVE) & AUTO VIDEO (BETA)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Bộ Đôi Vũ Khí Tự Động Hóa{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-300 to-sky-400">
              Sản Xuất Video Triệu View
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Giải phóng 90% thời gian biên tập. Tự động hóa từ khâu quét kịch bản, trích xuất phong cách ảnh, lồng tiếng AI đến ghép bản thảo CapCut Desktop hoàn chỉnh.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={siteConfig.aiStudioDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="lime"
                size="md"
                className="font-bold cursor-pointer shadow-lime-glow"
                icon={<Download className="w-4 h-4 text-black" />}
              >
                Tải Setup.exe v1.1.2 (Miễn Phí)
              </Button>
            </a>

            {onNavigateStore && (
              <Button
                variant="outline"
                size="md"
                onClick={onNavigateStore}
                className="cursor-pointer"
                icon={<ArrowRight className="w-4 h-4 text-lime-400" />}
              >
                Xem Kho Tài Nguyên Số
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Bento Grid (AI Studio & Auto Video) */}
      <BentoGrid onOpenVipModal={onOpenVipModal} />

      {/* Methodology Section (3-Step Workflow) */}
      <MethodologySection />
    </div>
  );
};
