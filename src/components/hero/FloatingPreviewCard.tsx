import React, { useState } from 'react';
import { ShieldCheck, Volume2, Film, CheckCircle2, Gift, TrendingUp, Sparkles, Eye } from 'lucide-react';

export const FloatingPreviewCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'audio' | 'pipeline'>('prompt');

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-lime-400/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glass Card (Card 1) */}
      <div className="relative rounded-3xl bg-obsidian-card/90 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 shadow-2xl animate-float-slow transition-all">
        {/* Card Header & Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-300 font-semibold tracking-wider">
              STUDIO REAL-TIME RUNTIME
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                activeTab === 'prompt'
                  ? 'bg-lime-400 text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Prompt V2
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                activeTab === 'audio'
                  ? 'bg-lime-400 text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Audio/TTS
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-lime-400 text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Pipeline
            </button>
          </div>
        </div>

        {/* Tab 1: Image Prompt Studio V2 Mockup */}
        {activeTab === 'prompt' && (
          <div className="space-y-3.5">
            {/* Character Anchor Pill */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 font-medium">Anchor: Protagonist_Master_01</span>
              </div>
              <span className="text-[10px] text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                LOCKED (NO DRIFT)
              </span>
            </div>

            {/* Prompt Window */}
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 border-b border-white/5 pb-1">
                <span>SLIDING CONTEXT: CUE #024 [±2 WINDOW]</span>
                <span className="text-lime-400 font-bold">118 WORDS / STANDARD</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                <span className="text-lime-400 font-semibold">[Subject-First]:</span> A determined cyber technician in high-visibility obsidian tactical gear, calibrating automated multi-monitor workstation.
                <span className="text-zinc-400"> Volumetric teal backlighting, 50mm f/1.4 lens, hyper-sharp textures, zero generic fluff.</span>
              </p>
            </div>

            {/* Feature Status */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 text-[11px] font-mono text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Cast Consistency: 100%</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 text-[11px] font-mono text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Seedance & Seedream 0đ</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Audio & TTS Fitting Mockup */}
        {activeTab === 'audio' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-lime-400" />
                <span className="text-zinc-200">Supertonic 3 Neural TTS</span>
              </div>
              <span className="text-[10px] text-zinc-400">ON-DEVICE ONNX (OFFLINE 0đ)</span>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                <span>00:04.280 / 00:07.150</span>
                <span className="text-lime-400">FIT BUDGET: 4.8 W/S (PERFECT)</span>
              </div>
              <div className="flex items-end justify-between h-12 gap-1 px-2 py-1 bg-black/40 rounded-lg">
                {[45, 70, 30, 85, 95, 60, 40, 100, 75, 55, 90, 65, 35, 80, 50, 90, 30, 60, 85, 40].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-lime-400/80 hover:bg-lime-300 transition-all"
                      style={{
                        height: `${height}%`,
                        opacity: i % 2 === 0 ? 0.9 : 0.6,
                      }}
                    />
                  )
                )}
              </div>
              <p className="mt-2 text-[11px] font-mono text-zinc-400 text-center">
                Subtitle Cue: "Tự động hóa hoàn toàn quy trình sáng tạo MMO"
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
              <span>Whisper Large-v3-Turbo</span>
              <span className="text-cyan-400">Zero-Desync (-0.35s Offset)</span>
            </div>
          </div>
        )}

        {/* Tab 3: Pipeline & CapCut Export Mockup */}
        {activeTab === 'pipeline' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">1-Pass FFmpeg Hardware Transcode</span>
                <span className="text-lime-400 font-bold">NVENC / QSV</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                <div className="bg-lime-400 h-full w-[88%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Scale: 1080x1920 (Shorts 9:16)</span>
                <span>Speed: 3.4x realtime</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/80 border border-white/10">
              <Film className="w-5 h-5 text-lime-400 shrink-0" />
              <div className="flex flex-col text-xs font-mono">
                <span className="text-white font-medium">CapCut Desktop Native Draft</span>
                <span className="text-zinc-500 text-[10px]">Ready for 1-Click Fine Editing</span>
              </div>
              <span className="ml-auto text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                READY
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Accent Card (Card 2 - Delayed Float) */}
      <div className="absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl bg-black/90 backdrop-blur-2xl border border-lime-400/40 p-3.5 sm:p-4 shadow-lime-glow animate-float-delayed max-w-[220px] sm:max-w-[250px]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          <span className="text-[10px] font-mono text-lime-400 font-bold uppercase tracking-wider">
            SEEDANCE & SEEDREAM
          </span>
        </div>
        <p className="text-lg sm:text-xl font-bold font-sans text-white tracking-tight">
          0đ <span className="text-xs font-normal text-zinc-400">Tạo Video & Ảnh</span>
        </p>
        <p className="text-[10px] text-zinc-400 mt-1 leading-snug">
          Không tốn chi phí API, phân tích YouTube Trending đón đầu triệu view.
        </p>
      </div>
    </div>
  );
};
