import React, { useState } from 'react';
import { ShellContainer } from '@/components/layout/ShellContainer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { BentoGrid } from '@/components/bento/BentoGrid';
import { ZaloVipSection } from '@/components/vip/ZaloVipSection';
import { VipModal } from '@/components/vip/VipModal';
import { GlowingCursor } from '@/components/ui/GlowingCursor';
import { TelegramSupportWidget } from '@/components/support/TelegramSupportWidget';

export const App: React.FC = () => {
  const [vipModalOpen, setVipModalOpen] = useState(false);

  return (
    <>
      <GlowingCursor />
      <ShellContainer>
        <Header onOpenVipModal={() => setVipModalOpen(true)} />
        <main className="flex-1 w-full">
          <HeroSection onOpenVipModal={() => setVipModalOpen(true)} />
          <BentoGrid onOpenVipModal={() => setVipModalOpen(true)} />
          <ZaloVipSection onOpenVipModal={() => setVipModalOpen(true)} />
        </main>
        <Footer />
      </ShellContainer>
      <VipModal isOpen={vipModalOpen} onClose={() => setVipModalOpen(false)} />
      <TelegramSupportWidget />
    </>
  );
};

export default App;
