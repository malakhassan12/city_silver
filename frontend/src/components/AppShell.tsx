'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Lock } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import {
  StoreProvider,
  useStore,
  type InitialStorefrontData,
} from '@/src/context/StoreContext';
import { Navbar } from '@/src/components/Navbar';
import { SplashScreen } from '@/src/components/SplashScreen';
import { HeroSection } from '@/src/components/HeroSection';
import { CatalogSection } from '@/src/components/CatalogSection';
import { CraftsmanshipSection } from '@/src/components/CraftsmanshipSection';
import { Footer } from '@/src/components/Footer';

// Code-split heavy workspace & overlay chunks for fast initial storefront load
const OrderTrackingView = dynamic(
  () => import('@/src/components/OrderTrackingView').then((m) => m.OrderTrackingView),
  { ssr: false }
);
const OwnerWorkspace = dynamic(
  () => import('@/src/components/OwnerWorkspace').then((m) => m.OwnerWorkspace),
  { ssr: false }
);
const EmployeeWorkspace = dynamic(
  () => import('@/src/components/EmployeeWorkspace').then((m) => m.EmployeeWorkspace),
  { ssr: false }
);
const ProductModal = dynamic(
  () => import('@/src/components/ProductModal').then((m) => m.ProductModal),
  { ssr: false }
);
const CartDrawer = dynamic(
  () => import('@/src/components/CartDrawer').then((m) => m.CartDrawer),
  { ssr: false }
);
const WishlistDrawer = dynamic(
  () => import('@/src/components/CartDrawer').then((m) => m.WishlistDrawer),
  { ssr: false }
);
const AuthModal = dynamic(
  () => import('@/src/components/AuthModal').then((m) => m.AuthModal),
  { ssr: false }
);

function RouteProtectionGate({ required }: { required: 'employee' | 'owner' | 'customer' }) {
  const { lang, navigate, openAuthModal, userRole } = useStore();

  const homeRoute =
    userRole === 'owner' ? 'owner' : userRole === 'employee' ? 'employee' : 'storefront';

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div
        className="rounded-2xl border p-8 sm:p-12"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
      >
        <Lock className="mx-auto h-10 w-10 mb-4" style={{ color: 'var(--accent-primary)' }} />
        <h1 className="font-serif-editorial text-2xl font-semibold">
          {required === 'owner'
            ? lang === 'ar'
              ? 'هذه المساحة مخصصة لمالك المتجر فقط'
              : 'Store Owner Admin Only'
            : required === 'employee'
            ? lang === 'ar'
              ? 'هذه المساحة مخصصة للموظف فقط'
              : 'Employee Desk Only'
            : lang === 'ar'
            ? 'صفحة مخصصة للعملاء'
            : 'Customer View Only'}
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {lang === 'ar'
            ? 'كل دور (عميل / موظف / مالك) يظهر له صفحاته وتبويباته المستقلة فقط.'
            : 'Each role (Customer, Employee, Store Owner) has strictly isolated pages and tabs.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(homeRoute)}
            className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
          >
            {lang === 'ar' ? 'الانتقال لمساحتي' : 'Go to My Workspace'}
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('staff')}
            className="rounded-xl border px-5 py-2.5 text-xs font-medium cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            {lang === 'ar' ? 'تبديل الحساب' : 'Switch Account'}
          </button>
        </div>
      </div>
    </section>
  );
}

function MainRouter() {
  const { route, userRole } = useStore();

  const renderPage = () => {
    if (userRole === 'owner') {
      if (route === 'employee') return <RouteProtectionGate required="employee" />;
      return <OwnerWorkspace />;
    }

    if (userRole === 'employee') {
      if (route === 'owner') return <RouteProtectionGate required="owner" />;
      return <EmployeeWorkspace />;
    }

    if (route === 'owner') return <RouteProtectionGate required="owner" />;
    if (route === 'employee') return <RouteProtectionGate required="employee" />;
    if (route === 'track') return <OrderTrackingView />;
    return (
      <>
        <HeroSection />
        <CatalogSection />
        <CraftsmanshipSection />
      </>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-primary)' }}
    >
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${route}-${userRole}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {(userRole === 'guest' || userRole === 'customer') && (
        <>
          <ProductModal />
          <CartDrawer />
          <WishlistDrawer />
        </>
      )}
      <AuthModal />
    </div>
  );
}

export function AppShell({
  initialStorefront,
  children,
}: {
  initialStorefront: InitialStorefrontData;
  children?: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  React.useEffect(() => {
    const handler = () => setShowSplash(true);
    window.addEventListener('cs925:replay-splash', handler);
    return () => window.removeEventListener('cs925:replay-splash', handler);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider initialStorefront={initialStorefront}>
        <SplashScreen show={showSplash} onFinish={() => setShowSplash(false)} />
        <MainRouter />
        <div className="sr-only">{children}</div>
      </StoreProvider>
    </MotionConfig>
  );
}
