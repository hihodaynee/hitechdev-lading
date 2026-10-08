import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowRight, Download, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface HeaderProps {
  onOpenVipModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVipModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'AI Studio', href: '#ai-studio', badge: 'LIVE' },
    { label: 'Auto Video', href: '#auto-video', badge: 'SOON' },
    { label: 'Cộng Đồng Zalo', href: '#vip' },
  ];

  return (
    <header className="sticky top-4 sm:top-6 inset-x-0 mx-auto w-[94%] max-w-5xl lg:max-w-6xl z-50">
      <div className="relative rounded-full bg-black/85 backdrop-blur-2xl border border-white/10 px-3 sm:px-6 py-2 sm:py-2.5 shadow-2xl flex items-center justify-between flex-nowrap gap-2 sm:gap-4 transition-all">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-lime-400/30 group-hover:border-lime-400 transition-colors shrink-0">
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-sans font-bold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-lime-400 font-mono tracking-wider font-bold hidden sm:inline-block">
                MMO
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5 hidden xl:block whitespace-nowrap">
              {siteConfig.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-xs lg:text-sm font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase shrink-0 ${
                    link.badge === 'LIVE'
                      ? 'bg-lime-400/20 text-lime-400 border border-lime-400/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right Action & System Status */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Pulsating System Operational Tag */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[10px] font-mono text-zinc-300 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="text-zinc-200">SYSTEM OPERATIONAL</span>
          </div>

          {/* Direct Download Button */}
          <a
            href={siteConfig.aiStudioDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-lime-400" />
            <span>Tải Setup.exe</span>
          </a>

          {/* Join VIP / Zalo Button */}
          <button
            onClick={onOpenVipModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-lime-400 text-black hover:bg-lime-300 hover:shadow-lime-glow transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Nhóm Zalo</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>SYSTEM OPERATIONAL</span>
              </div>
              <span className="text-[10px] font-mono text-lime-400 font-bold">STABLE V1.0.1</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      link.badge === 'LIVE'
                        ? 'bg-lime-400/20 text-lime-400'
                        : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 space-y-2">
              <a
                href={siteConfig.aiStudioDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4 text-lime-400" />
                <span>Tải AI Studio v1.0.1 (Setup.exe)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVipModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-lime-400 text-black shadow-lime-glow active:scale-95 transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Vào Nhóm Zalo Giao Lưu Làm YouTube</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
