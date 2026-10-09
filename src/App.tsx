import React, { useState, useEffect } from 'react';
import { ShellContainer } from '@/components/layout/ShellContainer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeOverview } from '@/components/home/HomeOverview';
import { ToolsSection } from '@/components/tools/ToolsSection';
import { DigitalStoreSection } from '@/components/store/DigitalStoreSection';
import { ProductDetailModal } from '@/components/store/ProductDetailModal';
import { OrderModal } from '@/components/store/OrderModal';
import { VipModal } from '@/components/vip/VipModal';
import { GlowingCursor } from '@/components/ui/GlowingCursor';
import { TelegramSupportWidget } from '@/components/support/TelegramSupportWidget';
import { DigitalProduct } from '@/config/site';

export type SubPageView = 'home' | 'tools' | 'store';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<SubPageView>('home');
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<DigitalProduct | null>(null);
  const [orderProduct, setOrderProduct] = useState<DigitalProduct | null>(null);
  const [orderPlanId, setOrderPlanId] = useState<string | undefined>(undefined);

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes('tools') ||
        hash.includes('ai-studio') ||
        hash.includes('auto-video')
      ) {
        setCurrentView('tools');
      } else if (
        hash.includes('store') ||
        hash.includes('digital-store') ||
        hash.includes('tai-nguyen')
      ) {
        setCurrentView('store');
      } else if (hash.includes('vip')) {
        setVipModalOpen(true);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: SubPageView) => {
    setCurrentView(view);
    const targetHash =
      view === 'home' ? '#/' : view === 'tools' ? '#/tools' : '#/store';
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <GlowingCursor />
      <ShellContainer>
        <Header
          currentView={currentView}
          onNavigate={navigateTo}
          onOpenVipModal={() => setVipModalOpen(true)}
        />

        <main className="flex-1 w-full">
          {currentView === 'home' && (
            <HomeOverview
              onOpenVipModal={() => setVipModalOpen(true)}
              onNavigateTools={() => navigateTo('tools')}
              onNavigateStore={() => navigateTo('store')}
            />
          )}

          {currentView === 'tools' && (
            <ToolsSection
              onOpenVipModal={() => setVipModalOpen(true)}
              onNavigateStore={() => navigateTo('store')}
            />
          )}

          {currentView === 'store' && (
            <DigitalStoreSection
              onOrderProduct={(prod, planId) => {
                setOrderProduct(prod);
                setOrderPlanId(planId);
              }}
              onViewProductDetail={(prod) => setDetailProduct(prod)}
            />
          )}
        </main>

        <Footer
          onNavigate={navigateTo}
          onOpenVipModal={() => setVipModalOpen(true)}
        />
      </ShellContainer>

      {/* Product Full Details & Policy Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
        onOrder={(prod, planId) => {
          setDetailProduct(null);
          setOrderProduct(prod);
          setOrderPlanId(planId);
        }}
      />

      {/* Checkout / Order Outbound Modal */}
      <OrderModal
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
        product={orderProduct}
        initialPlanId={orderPlanId}
      />

      {/* Community VIP Modal */}
      <VipModal isOpen={vipModalOpen} onClose={() => setVipModalOpen(false)} />

      {/* Floating Telegram Support Bubble */}
      <TelegramSupportWidget />
    </>
  );
};

export default App;
