import React from 'react';
import { AiStudioCard } from './AiStudioCard';
import { AutoVideoCard } from './AutoVideoCard';
import { Badge } from '@/components/ui/Badge';

interface BentoGridProps {
  onOpenVipModal: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenVipModal }) => {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-10">
      {/* Section Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2">
          <Badge variant="lime" dot>
            HỆ SINH THÁI CÔNG CỤ TỰ ĐỘNG HOÁ
          </Badge>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Bộ Đôi Vũ Khí Sản Xuất Nội Dung & Video MMO
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Được tôi luyện trực tiếp từ bài toán thực tế của Creator và nhà phát triển kênh MMO. Mỗi công cụ là một giải pháp khép kín, tối ưu hoá đến từng mili-giây và từng khung hình.
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
        <AiStudioCard onOpenVipModal={onOpenVipModal} />
        <AutoVideoCard onOpenVipModal={onOpenVipModal} />
      </div>
    </section>
  );
};
