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

  // Sync routing on mount, popstate, and hash changes
  useEffect(() => {
    const syncRouteFromLocation = () => {
      // 1. If legacy hash exists, migrate it cleanly to standard path
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (
        hash.includes('tools') ||
        hash.includes('ai-studio') ||
        hash.includes('auto-video')
      ) {
        window.history.replaceState(null, '', '/tools');
        setCurrentView('tools');
        return;
      } else if (
        hash.includes('store') ||
        hash.includes('digital-store') ||
        hash.includes('tai-nguyen')
      ) {
        window.history.replaceState(null, '', '/store');
        setCurrentView('store');
        return;
      } else if (hash.includes('vip')) {
        setVipModalOpen(true);
        if (pathname.startsWith('/tools')) {
          setCurrentView('tools');
        } else if (pathname.startsWith('/store')) {
          setCurrentView('store');
        } else {
          setCurrentView('home');
        }
        return;
      }

      // 2. Standard clean path routing
      if (pathname.startsWith('/tools')) {
        setCurrentView('tools');
      } else if (pathname.startsWith('/store')) {
        setCurrentView('store');
      } else {
        setCurrentView('home');
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  const navigateTo = (view: SubPageView, path?: string) => {
    setCurrentView(view);
    const targetPath =
      path || (view === 'home' ? '/' : view === 'tools' ? '/tools' : '/store');
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
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
