import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FlashDeals } from './components/FlashDeals';
import { TrendingProducts } from './components/TrendingProducts';
import { RecommendedSection } from './components/RecommendedSection';
import { WhyNexora } from './components/WhyNexora';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { DealsPage } from './pages/DealsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareModal } from './components/CompareModal';
import { AuthModal } from './pages/AuthModal';
import { ToastContainer } from './components/Toast';
import { Product, Order } from './types';

function MainApp() {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    addRecentlyViewed,
    orders,
  } = useStore();

  const [currentView, setCurrentView] = useState<
    'home' | 'catalog' | 'product-detail' | 'cart' | 'checkout' | 'orders' | 'account' | 'admin' | 'deals' | 'about' | 'contact' | '404'
  >('home');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedOrderToTrack, setSelectedOrderToTrack] = useState<Order | null>(orders[0] || null);
  const [accountInitialTab, setAccountInitialTab] = useState<string>('overview');

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Global Keyboard Shortcuts (e.g. Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Unified View Navigation Handler
  const handleNavigate = (view: string, param?: string | Product | Order) => {
    if (view === 'home') {
      setCurrentView('home');
    } else if (view === 'catalog') {
      setSelectedCategorySlug(typeof param === 'string' ? param : 'all');
      setCurrentView('catalog');
    } else if (view === 'product-detail') {
      if (param && typeof param === 'object' && 'sku' in param) {
        setSelectedProduct(param as Product);
        addRecentlyViewed(param as Product);
      }
      setCurrentView('product-detail');
    } else if (view === 'cart') {
      setCurrentView('cart');
    } else if (view === 'checkout') {
      setCurrentView('checkout');
    } else if (view === 'orders') {
      if (param && typeof param === 'object' && 'orderNumber' in param) {
        setSelectedOrderToTrack(param as Order);
      } else if (orders.length > 0) {
        setSelectedOrderToTrack(orders[0]);
      }
      setCurrentView('orders');
    } else if (view === 'account') {
      if (typeof param === 'string') {
        setAccountInitialTab(param);
      } else {
        setAccountInitialTab('overview');
      }
      setCurrentView('account');
    } else if (view === 'admin') {
      setCurrentView('admin');
    } else if (view === 'deals') {
      setCurrentView('deals');
    } else if (view === 'about') {
      setCurrentView('about');
    } else if (view === 'contact') {
      setCurrentView('contact');
    } else {
      setCurrentView('404');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    addRecentlyViewed(product);
    setCurrentView('product-detail');
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-900 dark:text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
      {/* Sticky Header */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            <Hero
              onShopClick={() => handleNavigate('catalog', 'all')}
              onDealsClick={() => handleNavigate('deals')}
              onSelectProduct={handleSelectProduct}
            />
            <CategoryShowcase
              onSelectCategory={(slug) => handleNavigate('catalog', slug)}
            />
            <FlashDeals
              products={products}
              onSelectProduct={handleSelectProduct}
              onViewAllDeals={() => handleNavigate('deals')}
            />
            <TrendingProducts
              products={products}
              onSelectProduct={handleSelectProduct}
              onExploreCatalog={(category) => handleNavigate('catalog', category || 'all')}
            />
            <RecommendedSection
              onSelectProduct={handleSelectProduct}
              onExploreMore={() => handleNavigate('catalog', 'all')}
            />
            <WhyNexora />
          </div>
        )}

        {currentView === 'catalog' && (
          <CatalogPage
            initialCategory={selectedCategorySlug}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigateCategory={(slug) => handleNavigate('catalog', slug)}
            onSelectProduct={handleSelectProduct}
            onProceedToCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onContinueShopping={() => handleNavigate('catalog', 'all')}
            onProceedToCheckout={() => handleNavigate('checkout')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onOrderSuccess={(order) => {
              setSelectedOrderToTrack(order);
            }}
            onBackToCart={() => handleNavigate('cart')}
            onContinueShopping={() => handleNavigate('catalog', 'all')}
          />
        )}

        {currentView === 'orders' && selectedOrderToTrack && (
          <OrderTrackingPage
            order={selectedOrderToTrack}
            onBackToOrders={() => handleNavigate('account', 'orders')}
          />
        )}

        {currentView === 'account' && (
          <AccountPage
            initialTab={accountInitialTab}
            onSelectProduct={handleSelectProduct}
            onTrackOrder={(order) => {
              setSelectedOrderToTrack(order);
              setCurrentView('orders');
            }}
            onExploreCatalog={() => handleNavigate('catalog', 'all')}
          />
        )}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'deals' && (
          <DealsPage onSelectProduct={handleSelectProduct} />
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'contact' && <ContactPage />}

        {currentView === '404' && (
          <NotFoundPage onBackToHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateCategory={(slug) => handleNavigate('catalog', slug)}
      />

      <QuickViewModal onNavigateProduct={handleSelectProduct} />

      <CompareModal onSelectProduct={handleSelectProduct} />

      <AuthModal />

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
