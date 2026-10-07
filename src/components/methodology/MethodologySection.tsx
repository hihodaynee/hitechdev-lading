import React from 'react';
import { DownloadCloud, Cpu, Rocket, Check, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const MethodologySection: React.FC = () => {
  const stepIcons = [DownloadCloud, Cpu, Rocket];

  return (
    <section id="methodology" className="relative my-8 sm:my-16 px-4 sm:px-6 md:px-10">
      {/* High-Contrast Titanium Light Wrapper */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-100 text-zinc-950 p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-300/40 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-lime-400 font-mono text-xs font-semibold">
            <span>KIẾN TRÚC TỰ ĐỘNG HOÁ 3 BƯỚC</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
            Từ Video Nguồn Đến Thành Phẩm Triệu View Trong Vòng Vài Phút
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            Quy trình sản xuất chuẩn mực được tinh gọn triệt để. Loại bỏ hoàn toàn các thao tác thủ công rườm rà, tập trung tuyệt đối vào tốc độ và chất lượng chuyển đổi.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {siteConfig.methodologySteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-lime-400 flex items-center justify-center font-mono font-bold text-lg shadow-md">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-zinc-100">
                  <span className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                    Công nghệ lõi:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 text-[11px] font-mono border border-zinc-200/60"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner inside Titanium Section */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-mono text-zinc-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Mọi công đoạn đều có hệ thống Quality Gates giám sát và phục hồi lỗi tự động.</span>
          </div>

          <a
            href="#vip"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-950 hover:text-black underline underline-offset-4 group"
          >
            <span>Giao lưu & nhận tài liệu quy trình tại nhóm Zalo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
