'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type {
  AuthSession,
  CartItem,
  CategoryRecord,
  ColorPalette,
  Language,
  Product,
  SilverPricingConfig,
  StaffRoleRecord,
  StoreSettings,
  ThemeMode,
} from '../types/store';
import { COPY } from '../data/translations';

export type ActiveRoute = 'storefront' | 'track' | 'owner' | 'employee';

export interface InitialStorefrontData {
  products: Product[];
  categories: CategoryRecord[];
  silverPricing: SilverPricingConfig | null;
  settings: StoreSettings | null;
}

interface StoreContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
  route: ActiveRoute;
  navigate: (route: ActiveRoute) => void;
  t: (typeof COPY)[Language];
  products: Product[];
  categories: CategoryRecord[];
  silverPricing: SilverPricingConfig | null;
  settings: StoreSettings | null;
  loadingStore: boolean;
  refreshStorefront: () => Promise<void>;
  session: AuthSession | null;
  userRole: 'guest' | 'customer' | 'employee' | 'owner';
  syncStaffRole: (role: StaffRoleRecord) => void;
  refreshSession: () => Promise<void>;
  loginWithCredentials: (
    email: string,
    password: string
  ) => Promise<{ needsVerification?: boolean; email?: string }>;
  loginDemoRole: (
    role: 'owner' | 'employee1' | 'employee2' | 'customer' | 'google_customer'
  ) => Promise<void>;
  registerAccount: (payload: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }) => Promise<{ email: string }>;
  confirmEmail: (email: string) => Promise<void>;
  logout: () => void;
  catalogFilter: string;
  setCatalogFilter: (filter: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, variant: string, quantity?: number, engravingNote?: string) => void;
  updateCartQty: (productId: string, variant: string, delta: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  authOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  authDefaultTab: 'customer' | 'register' | 'staff';
  openAuthModal: (defaultTab?: 'customer' | 'register' | 'staff') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  lastTrackedOrderCode: string;
  setLastTrackedOrderCode: (code: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEYS = {
  lang: 'cs925_lang',
  theme: 'cs925_theme',
  palette: 'cs925_palette',
  token: 'cs925_token',
  cart: 'cs925_cart',
  wishlist: 'cs925_wishlist',
};

function pathnameToRoute(pathname: string | null): ActiveRoute {
  if (!pathname) return 'storefront';
  if (pathname.startsWith('/track')) return 'track';
  if (pathname.startsWith('/owner')) return 'owner';
  if (pathname.startsWith('/employee')) return 'employee';
  return 'storefront';
}

const ROUTE_PATHS: Record<ActiveRoute, string> = {
  storefront: '/',
  track: '/track',
  owner: '/owner',
  employee: '/employee',
};

export function StoreProvider({
  children,
  initialStorefront,
}: {
  children: React.ReactNode;
  initialStorefront?: InitialStorefrontData;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const route = pathnameToRoute(pathname);

  const [lang, setLangState] = useState<Language>('ar');
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [palette, setPaletteState] = useState<ColorPalette>('platinum');
  const [hydratedPrefs, setHydratedPrefs] = useState(false);

  const [products, setProducts] = useState<Product[]>(initialStorefront?.products || []);
  const [categories, setCategories] = useState<CategoryRecord[]>(
    initialStorefront?.categories || []
  );
  const [silverPricing, setSilverPricing] = useState<SilverPricingConfig | null>(
    initialStorefront?.silverPricing || null
  );
  const [settings, setSettings] = useState<StoreSettings | null>(
    initialStorefront?.settings || null
  );
  const [loadingStore, setLoadingStore] = useState(!initialStorefront);
  const [session, setSession] = useState<AuthSession | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'customer' | 'register' | 'staff'>('customer');
  const [catalogFilter, setCatalogFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastTrackedOrderCode, setLastTrackedOrderCode] = useState('CS-1042');

  const userRole: 'guest' | 'customer' | 'employee' | 'owner' = !session
    ? 'guest'
    : session.staffRole?.role === 'owner'
    ? 'owner'
    : session.staffRole?.role === 'employee'
    ? 'employee'
    : 'customer';

  const openAuthModal = useCallback((defaultTab: 'customer' | 'register' | 'staff' = 'customer') => {
    setAuthDefaultTab(defaultTab);
    setAuthOpen(true);
  }, []);

  // Hydrate client preferences & persisted cart/wishlist cleanly after mount
  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEYS.lang);
    if (savedLang === 'en' || savedLang === 'ar') {
      setLangState(savedLang);
    }
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme);
    }
    const savedPalette = localStorage.getItem(STORAGE_KEYS.palette);
    if (
      savedPalette === 'platinum' ||
      savedPalette === 'emerald' ||
      savedPalette === 'sapphire' ||
      savedPalette === 'burgundy' ||
      savedPalette === 'amethyst' ||
      savedPalette === 'rosegold' ||
      savedPalette === 'amber' ||
      savedPalette === 'obsidian'
    ) {
      setPaletteState(savedPalette);
    }

    try {
      const rawCart = localStorage.getItem(STORAGE_KEYS.cart);
      if (rawCart) setCart(JSON.parse(rawCart) as CartItem[]);
    } catch {
      // ignore invalid storage
    }

    try {
      const rawWish = localStorage.getItem(STORAGE_KEYS.wishlist);
      if (rawWish) setWishlist(JSON.parse(rawWish) as string[]);
    } catch {
      // ignore invalid storage
    }

    // Legacy hash URL compatibility (#/track, #/owner, #/employee)
    const hash = window.location.hash.replace('#', '');
    if (hash === '/track' || hash === 'track') router.replace('/track');
    else if (hash === '/owner' || hash === 'owner') router.replace('/owner');
    else if (hash === '/employee' || hash === 'employee') router.replace('/employee');

    setHydratedPrefs(true);
  }, [router]);

  // Sync HTML attributes for RTL/LTR, Dark Mode, and Palette
  useEffect(() => {
    if (!hydratedPrefs) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(STORAGE_KEYS.lang, lang);
  }, [lang, hydratedPrefs]);

  useEffect(() => {
    if (!hydratedPrefs) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme, hydratedPrefs]);

  useEffect(() => {
    if (!hydratedPrefs) return;
    document.documentElement.setAttribute('data-palette', palette);
    localStorage.setItem(STORAGE_KEYS.palette, palette);
  }, [palette, hydratedPrefs]);

  useEffect(() => {
    if (!hydratedPrefs) return;
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart, hydratedPrefs]);

  useEffect(() => {
    if (!hydratedPrefs) return;
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydratedPrefs]);

  const navigate = useCallback(
    (nextRoute: ActiveRoute) => {
      const target = ROUTE_PATHS[nextRoute];
      if (pathname !== target) {
        router.push(target);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [pathname, router]
  );

  const refreshStorefront = useCallback(async () => {
    try {
      const res = await fetch('/api/storefront', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setSilverPricing(data.silverPricing || null);
      setSettings(data.settings || null);
    } finally {
      setLoadingStore(false);
    }
  }, []);

  const syncStaffRole = useCallback((staffRole: StaffRoleRecord) => {
    setSession((prev) => (prev ? { ...prev, staffRole } : prev));
  }, []);

  const refreshSession = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (!token) return;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setSession({ token, user: data.user, staffRole: data.staffRole });
    } catch {
      // ignore transient network errors
    }
  }, []);

  useEffect(() => {
    if (!initialStorefront) {
      refreshStorefront();
    }
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            localStorage.removeItem(STORAGE_KEYS.token);
            return;
          }
          const data = await res.json();
          setSession({ token, user: data.user, staffRole: data.staffRole });
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEYS.token);
        });
    }
  }, [initialStorefront, refreshStorefront]);

  const setLang = (next: Language) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  const setTheme = (next: ThemeMode) => setThemeState(next);
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  const setPalette = (next: ColorPalette) => setPaletteState(next);

  const loginWithCredentials = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.needsVerification) {
        return { needsVerification: true, email: data.email };
      }
      throw new Error(data.error || 'Authentication failed');
    }
    localStorage.setItem(STORAGE_KEYS.token, data.token);
    setSession(data);
    if (data.staffRole?.role === 'owner') {
      navigate('owner');
    } else if (data.staffRole?.role === 'employee') {
      navigate('employee');
    } else {
      navigate('storefront');
    }
    return {};
  };

  const loginDemoRole = async (
    demoRole: 'owner' | 'employee1' | 'employee2' | 'customer' | 'google_customer'
  ) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ demoRole }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Demo sign-in failed');
    localStorage.setItem(STORAGE_KEYS.token, data.token);
    setSession(data);
    if (data.staffRole?.role === 'owner') {
      navigate('owner');
    } else if (data.staffRole?.role === 'employee') {
      navigate('employee');
    } else {
      navigate('storefront');
    }
  };

  const registerAccount = async (payload: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return { email: data.email };
  };

  const confirmEmail = async (email: string) => {
    const res = await fetch('/api/auth/confirm-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    localStorage.setItem(STORAGE_KEYS.token, data.token);
    setSession(data);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    setSession(null);
    if (route === 'owner' || route === 'employee') {
      navigate('storefront');
    }
  };

  const addToCart = (product: Product, variant: string, quantity = 1, engravingNote?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.variant === variant &&
          (item.engravingNote || '') === (engravingNote || '')
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: Math.min(product.stock, next[idx].quantity + quantity),
        };
        return next;
      }
      return [...prev, { product, variant, quantity, engravingNote }];
    });
  };

  const updateCartQty = (productId: string, variant: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant === variant) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return { ...item, quantity: Math.min(item.product.stock, nextQty) };
          }
          return item;
        })
        .filter((x): x is CartItem => x !== null)
    );
  };

  const removeFromCart = (productId: string, variant: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant === variant))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        palette,
        setPalette,
        route,
        navigate,
        t: COPY[lang],
        products,
        categories,
        silverPricing,
        settings,
        loadingStore,
        refreshStorefront,
        session,
        userRole,
        syncStaffRole,
        refreshSession,
        loginWithCredentials,
        loginDemoRole,
        registerAccount,
        confirmEmail,
        logout,
        catalogFilter,
        setCatalogFilter,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        authOpen,
        setAuthOpen,
        authDefaultTab,
        openAuthModal,
        selectedProduct,
        setSelectedProduct,
        lastTrackedOrderCode,
        setLastTrackedOrderCode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
