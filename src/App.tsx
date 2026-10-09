import React, { useState } from 'react';
import { ShellContainer } from '@/components/layout/ShellContainer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { BentoGrid } from '@/components/bento/BentoGrid';
import { DigitalStoreSection } from '@/components/store/DigitalStoreSection';
import { OrderModal } from '@/components/store/OrderModal';
import { ZaloVipSection } from '@/components/vip/ZaloVipSection';
import { VipModal } from '@/components/vip/VipModal';
import { GlowingCursor } from '@/components/ui/GlowingCursor';
import { TelegramSupportWidget } from '@/components/support/TelegramSupportWidget';
import { DigitalProduct } from '@/config/site';

export const App: React.FC = () => {
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<DigitalProduct | null>(null);
  const [orderPlanId, setOrderPlanId] = useState<string | undefined>(undefined);

  return (
    <>
      <GlowingCursor />
      <ShellContainer>
        <Header onOpenVipModal={() => setVipModalOpen(true)} />
        <main className="flex-1 w-full">
          <HeroSection onOpenVipModal={() => setVipModalOpen(true)} />
          <BentoGrid onOpenVipModal={() => setVipModalOpen(true)} />
          <DigitalStoreSection
            onOrderProduct={(prod, planId) => {
              setOrderProduct(prod);
              setOrderPlanId(planId);
            }}
          />
          <ZaloVipSection onOpenVipModal={() => setVipModalOpen(true)} />
        </main>
        <Footer />
      </ShellContainer>
      <VipModal isOpen={vipModalOpen} onClose={() => setVipModalOpen(false)} />
      <OrderModal
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
        product={orderProduct}
        initialPlanId={orderPlanId}
      />
      <TelegramSupportWidget />
    </>
  );
};

export default App;
