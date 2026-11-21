'use client';

import React, { useState } from 'react';
import {
  Check,
  Globe,
  Heart,
  LogOut,
  Menu,
  Moon,
  Palette,
  ShoppingBag,
  Sparkles,
  Sun,
  User,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useStore } from '../context/StoreContext';
import type { ColorPalette } from '../types/store';

const PALETTES: {
  id: ColorPalette;
  swatch: string;
  canvasSwatch: string;
  labelAr: string;
  labelEn: string;
}[] = [
  { id: 'platinum', swatch: '#9E7B47', canvasSwatch: '#F8F7F4', labelAr: 'بلاتينيوم شامبين', labelEn: 'Platinum Champagne' },
  { id: 'emerald', swatch: '#1C6B55', canvasSwatch: '#F4F7F6', labelAr: 'زمردي فضي', labelEn: 'Sterling Emerald' },
  { id: 'sapphire', swatch: '#25488E', canvasSwatch: '#F5F7FB', labelAr: 'ياقوتي ليلي', labelEn: 'Midnight Sapphire' },
  { id: 'burgundy', swatch: '#8C2F45', canvasSwatch: '#FAF7F6', labelAr: 'عنابي مخملي', labelEn: 'Velvet Burgundy' },
  { id: 'amethyst', swatch: '#6D3B96', canvasSwatch: '#F8F5FB', labelAr: 'جمشت ملكي', labelEn: 'Royal Amethyst' },
  { id: 'rosegold', swatch: '#B3626A', canvasSwatch: '#FBF7F6', labelAr: 'ذهب وردي كوارتز', labelEn: 'Rose Gold Quartz' },
  { id: 'amber', swatch: '#B4691E', canvasSwatch: '#FAF7F2', labelAr: 'كهرمان برونزي', labelEn: 'Imperial Amber' },
  { id: 'obsidian', swatch: '#0F767B', canvasSwatch: '#F2F8F8', labelAr: 'فيروزي قطبي', labelEn: 'Arctic Turquoise' },
];

export function Navbar() {
  const {
    lang,
    toggleLang,
    theme,
    toggleTheme,
    palette,
    setPalette,
    route,
    navigate,
    t,
    cart,
    wishlist,
    session,
    userRole,
    logout,
    setCartOpen,
    setWishlistOpen,
    openAuthModal,
    catalogFilter,
    setCatalogFilter,
  } = useStore();

  const [prefsOpen, setPrefsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 32, restDelta: 0.001 });

  const totalBagCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isCustomerOrGuest = userRole === 'guest' || userRole === 'customer';

  const handleStorefrontJump = (filter: string) => {
    setCatalogFilter(filter);
    navigate('storefront');
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleBrandClick = () => {
    setMobileOpen(false);
    if (userRole === 'owner') {
      navigate('owner');
    } else if (userRole === 'employee') {
      navigate('employee');
    } else {
      navigate('storefront');
    }
  };

  // Strictly isolated role-based navigation tabs:
  // - Guest/Customer -> ONLY Customer tabs
  // - Employee -> ONLY Employee tab (NO Admin tabs, NO Customer tabs)
  // - Owner/Admin -> ONLY Admin tab (NO Employee tabs, NO Customer tabs)
  const navLinks: {
    key: string;
    label: string;
    active: boolean;
    onClick: () => void;
  }[] =
    userRole === 'owner'
      ? [
          {
            key: 'owner',
            label: t.navOwner,
            active: route === 'owner',
            onClick: () => {
              navigate('owner');
              setMobileOpen(false);
            },
          },
        ]
      : userRole === 'employee'
      ? [
          {
            key: 'employee',
            label: t.navEmployee,
            active: route === 'employee',
            onClick: () => {
              navigate('employee');
              setMobileOpen(false);
            },
          },
        ]
      : [
          {
            key: 'all',
            label: t.navCatalog,
            active: route === 'storefront' && catalogFilter === 'all',
            onClick: () => handleStorefrontJump('all'),
          },
          {
            key: 'silver',
            label: t.navSilver,
            active: route === 'storefront' && catalogFilter === 'silver_all',
            onClick: () => handleStorefrontJump('silver_all'),
          },
          {
            key: 'bags',
            label: t.navBags,
            active: route === 'storefront' && catalogFilter === 'bags_all',
            onClick: () => handleStorefrontJump('bags_all'),
          },
          {
            key: 'track',
            label:
              userRole === 'customer'
                ? lang === 'ar'
                  ? 'طلباتي وتتبعها'
                  : 'My Orders & Track'
                : t.navTrack,
            active: route === 'track',
            onClick: () => {
              navigate('track');
              setMobileOpen(false);
            },
          },
        ];

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-canvas) 88%, transparent)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 lg:gap-8 px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="font-serif-editorial text-base sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded-sm"
          style={{ color: 'var(--text-primary)' }}
        >
          {lang === 'ar' ? 'سيتي سيلفر 925' : 'City Silver 925'}
        </button>

        {/* Zone 2: Strictly Role-Isolated Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={link.onClick}
              className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:opacity-100 ${
                link.active ? 'font-semibold' : 'opacity-75'
              }`}
              style={{ color: link.active ? 'var(--accent-primary)' : 'var(--text-primary)' }}
            >
              {link.label}
              {link.active && (
                <motion.span
                  layoutId="navbar-active-underline"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Role-Appropriate Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setPrefsOpen((prev) => !prev)}
            aria-label={t.preferences}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-2.5 cursor-pointer transition-colors"
            style={{
              backgroundColor: prefsOpen ? 'var(--accent-soft)' : 'var(--bg-subtle)',
              color: prefsOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.16 }}
                className="inline-flex"
              >
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
            <Palette className="h-3.5 w-3.5 opacity-80" style={{ color: 'var(--accent-primary)' }} />
          </motion.button>

          {/* Customer-only Wishlist & Shopping Bag */}
          {isCustomerOrGuest && (
            <>
              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                aria-label={t.wishlist}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 460, damping: 20 }}
                    className="font-mono-tabular absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t.bag}</span>
                <motion.span
                  key={totalBagCount}
                  initial={{ scale: 0.78 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="font-mono-tabular"
                >
                  ({totalBagCount})
                </motion.span>
              </motion.button>
            </>
          )}

          {/* Account / Switch Profile */}
          <button
            type="button"
            onClick={() => openAuthModal(userRole === 'owner' || userRole === 'employee' ? 'staff' : 'customer')}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer border transition-colors"
            style={{
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
            }}
          >
            <User className="h-3.5 w-3.5" />
            <span className="max-w-[120px] truncate">
              {session ? session.user.name.split('|')[0].trim() : t.signIn}
            </span>
          </button>

          {/* Direct Sign Out for Staff & Admin */}
          {(userRole === 'owner' || userRole === 'employee') && (
            <button
              type="button"
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t.signOut}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Theme & Color Palette Popover */}
          <AnimatePresence>
            {prefsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-12 end-0 z-50 w-72 max-w-[calc(100vw-1.5rem)] rounded-xl border p-4 shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-hairline)' }}>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t.preferences}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPrefsOpen(false)}
                    className="p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium cursor-pointer border transition-colors"
                    style={{
                      backgroundColor: theme === 'light' ? 'var(--accent-soft)' : 'transparent',
                      borderColor: theme === 'light' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                      color: theme === 'light' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <Sun className="h-3.5 w-3.5" />
                    <span>{t.themeLight}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium cursor-pointer border transition-colors"
                    style={{
                      backgroundColor: theme === 'dark' ? 'var(--accent-soft)' : 'transparent',
                      borderColor: theme === 'dark' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                      color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <Moon className="h-3.5 w-3.5" />
                    <span>{t.themeDark}</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'ar' ? 'اتجاه اللغة' : 'Language'}
                  </span>
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {lang === 'ar' ? 'العربية (RTL) → EN' : 'English (LTR) → العربية'}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-1.5">
                      <Palette className="h-3.5 w-3.5" style={{ color: 'var(--accent-primary)' }} />
                      <span>{lang === 'ar' ? 'لوحات الألوان (8 سمات)' : 'Color Themes (8)'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPrefsOpen(false);
                        window.dispatchEvent(new CustomEvent('cs925:replay-splash'));
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium hover:underline cursor-pointer"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{lang === 'ar' ? 'إعادة الافتتاحية' : 'Intro'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {PALETTES.map((p) => {
                      const active = palette === p.id;
                      return (
                        <motion.button
                          key={p.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setPalette(p.id)}
                          className="relative flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-medium cursor-pointer transition-colors"
                          style={{
                            borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                            backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black/15" style={{ backgroundColor: p.swatch }}>
                            {active ? (
                              <Check className="h-2.5 w-2.5 text-white" />
                            ) : (
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: p.canvasSwatch }}
                              />
                            )}
                          </span>
                          <span className="truncate">{lang === 'ar' ? p.labelAr : p.labelEn}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Strictly Role-Isolated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="lg:hidden border-t px-4 py-4 space-y-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  type="button"
                  onClick={link.onClick}
                  className="rounded-lg px-3 py-2.5 text-start text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: link.active ? 'var(--accent-soft)' : 'var(--bg-subtle)',
                    color: link.active ? 'var(--accent-primary)' : 'var(--text-primary)',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
              </button>

              {session ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal(userRole === 'owner' || userRole === 'employee' ? 'staff' : 'customer');
                      setMobileOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-xs font-medium cursor-pointer border"
                    style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-primary)' }}
                  >
                    {lang === 'ar' ? 'تبديل الحساب' : 'Switch'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                  >
                    {t.signOut}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal('customer');
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                >
                  {t.signIn}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Precision Scroll Progress Line */}
      <motion.div
        style={{
          scaleX,
          backgroundColor: 'var(--accent-primary)',
          transformOrigin: lang === 'ar' ? 'right' : 'left',
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-85"
      />
    </header>
  );
}
