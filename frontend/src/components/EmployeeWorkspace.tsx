'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Banknote,
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  FolderTree,
  Lock,
  Package,
  Plus,
  RefreshCw,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  UserCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ORDER_STATUS_LABELS } from '../data/translations';
import type {
  CategoryRecord,
  InventoryLog,
  Order,
  OrderStatus,
  Product,
  ProductCategory,
  ProductMaterial,
  SilverPricingConfig,
} from '../types/store';

type EmployeeTab = 'orders' | 'products' | 'categories' | 'inventory' | 'silver' | 'reports';

export function EmployeeWorkspace() {
  const { lang, t, session, loginDemoRole, openAuthModal, syncStaffRole, refreshStorefront } = useStore();
  const [activeTab, setActiveTab] = useState<EmployeeTab>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);
  const [silverPricing, setSilverPricing] = useState<SilverPricingConfig | null>(null);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const [courierNote, setCourierNote] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('In-Store Cash Counter');

  // Delegated Product creation state (only visible when Owner grants canAddProducts / canEditProducts)
  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCat, setNewProdCat] = useState<ProductCategory>('rings');
  const [newProdMat, setNewProdMat] = useState<ProductMaterial>('silver_925');
  const [newProdWeight, setNewProdWeight] = useState('10');
  const [newProdPrice, setNewProdPrice] = useState('1500');
  const [newProdStock, setNewProdStock] = useState('5');

  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');

  const [gramRateInput, setGramRateInput] = useState('85');
  const [makingInput, setMakingInput] = useState('35');

  const staffRole = session?.staffRole;
  const isStaff = Boolean(staffRole);
  const perms = staffRole?.permissions;
  const isOwner = staffRole?.role === 'owner';

  const fetchWorkspace = useCallback(
    async (silent = false) => {
      if (!session?.token || !staffRole) return;
      if (!silent) setLoading(true);
      try {
        const res = await fetch('/api/workspace/bootstrap', {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load workspace');

        // Live-sync permissions granted or revoked by Store Owner!
        if (data.myStaffRole) {
          syncStaffRole(data.myStaffRole);
        }

        const list = (data.orders || []) as Order[];
        setOrders(list);
        setProducts(data.products || []);
        setCategories(data.categories || []);
        setInventoryLogs(data.inventoryLogs || []);
        setSilverPricing(data.silverPricing || null);
        if (data.silverPricing && !silent) {
          setGramRateInput(String(data.silverPricing.silver925PerGram));
          setMakingInput(String(data.silverPricing.defaultMakingChargePerGram));
        }
        if (list.length > 0 && !list.some((o) => o.id === selectedOrderId)) {
          setSelectedOrderId(list[0].id);
        }
      } catch (err) {
        if (!silent) {
          setErrorMsg(err instanceof Error ? err.message : 'Error loading workspace');
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [session?.token, staffRole, selectedOrderId, syncStaffRole]
  );

  useEffect(() => {
    fetchWorkspace(false);
  }, [fetchWorkspace]);

  // Real-time permission sync every 3 seconds so Owner grants unlock tabs immediately!
  useEffect(() => {
    if (!session?.token || !staffRole) return;
    const timer = setInterval(() => {
      fetchWorkspace(true);
    }, 3000);
    return () => clearInterval(timer);
  }, [session?.token, staffRole, fetchWorkspace]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  useEffect(() => {
    if (selectedOrder) {
      setCourierNote(selectedOrder.courierNote || '');
      const remaining = Math.max(0, selectedOrder.total - selectedOrder.paidAmount);
      setPayAmount(remaining > 0 ? String(remaining) : '');
    }
  }, [selectedOrder?.id, selectedOrder?.courierNote, selectedOrder?.total, selectedOrder?.paidAmount]);

  const showToast = (msg: string) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 2500);
  };

  const patchOrder = async (payload: Record<string, unknown>, successText: string) => {
    if (!selectedOrder || !session?.token) return;
    setErrorMsg('');
    try {
      const res = await fetch(`/api/workspace/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation denied');
      setOrders((prev) => prev.map((o) => (o.id === data.id ? data : o)));
      showToast(successText);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !session?.token) return;
    setErrorMsg('');
    try {
      const res = await fetch(`/api/workspace/orders/${selectedOrder.id}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          amount: Number(payAmount),
          method: payMethod,
          note: 'Recorded from Employee Desk',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment recording denied');
      setOrders((prev) => prev.map((o) => (o.id === data.id ? data : o)));
      showToast(lang === 'ar' ? 'تم تسجيل التحصيل بنجاح' : 'Store payment recorded');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Payment error');
    }
  };

  const handleEmployeeAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token) return;
    setErrorMsg('');
    const isSilver = newProdMat !== 'full_grain_leather';
    const imageMap: Record<string, string> = {
      rings: '/images/product_silver_ring_1794604055973.jpg',
      necklaces: '/images/product_silver_necklace_1794604056451.jpg',
      bracelets_earrings: '/images/product_silver_bracelet_earrings_1794604056472.jpg',
      evening_bags: '/images/product_evening_clutch_1794604057272.jpg',
      tote_bags: '/images/product_leather_tote_1794604057749.jpg',
    };
    try {
      const res = await fetch('/api/workspace/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          nameAr: newProdNameAr,
          nameEn: newProdNameEn,
          category: newProdCat,
          material: newProdMat,
          useSilverPricing: isSilver,
          weightGrams: isSilver ? Number(newProdWeight) : undefined,
          makingCharge: isSilver
            ? Math.round(Number(newProdWeight) * (silverPricing?.defaultMakingChargePerGram || 35))
            : undefined,
          price: Number(newProdPrice),
          stock: Number(newProdStock),
          imageUrl: imageMap[newProdCat] || '/images/product_silver_ring_1794604055973.jpg',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Permission denied');
      setProducts((prev) => [data, ...prev]);
      setNewProdNameAr('');
      setNewProdNameEn('');
      await refreshStorefront();
      showToast(lang === 'ar' ? 'تمت إضافة القطعة بنجاح' : 'Product added by staff');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error adding product');
    }
  };

  const handleEmployeeDeleteProduct = async (productId: string) => {
    if (!session?.token) return;
    setErrorMsg('');
    const res = await fetch(`/api/workspace/products/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMsg(data.error || 'Delete denied');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    await refreshStorefront();
    showToast(lang === 'ar' ? 'تم حذف القطعة' : 'Product deleted');
  };

  const handleEmployeeAdjustStock = async (productId: string, delta: number) => {
    if (!session?.token) return;
    const res = await fetch('/api/workspace/inventory/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ productId, delta, reason: 'Employee inventory update' }),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)));
      setInventoryLogs((prev) => [data.log, ...prev]);
      refreshStorefront();
      showToast(lang === 'ar' ? 'تم تعديل المخزون' : 'Stock updated');
    }
  };

  const handleEmployeeAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token) return;
    const res = await fetch('/api/workspace/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ nameAr: newCatNameAr, nameEn: newCatNameEn }),
    });
    if (res.ok) {
      const created = (await res.json()) as CategoryRecord;
      setCategories((prev) => [...prev, created]);
      setNewCatNameAr('');
      setNewCatNameEn('');
      refreshStorefront();
      showToast(lang === 'ar' ? 'تمت إضافة التصنيف' : 'Category created');
    }
  };

  const handleEmployeeSilverRate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token) return;
    const res = await fetch('/api/workspace/silver-pricing', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        silver925PerGram: Number(gramRateInput),
        defaultMakingChargePerGram: Number(makingInput),
        recalculateCatalog: true,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSilverPricing(data.silverPricing);
      setProducts(data.products);
      await refreshStorefront();
      showToast(lang === 'ar' ? 'تم تحديث سعر جرام الفضة 925' : 'Silver rate updated');
    }
  };

  if (!isStaff || !perms) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border p-8 sm:p-12"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <Lock className="mx-auto h-10 w-10 mb-4" style={{ color: 'var(--accent-primary)' }} />
          <h1 className="font-serif-editorial text-2xl font-semibold">{t.accessDeniedTitle}</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t.accessDeniedDesc}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loginDemoRole('employee1')}
              className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              {t.roleEmployee1}
            </button>
            <button
              type="button"
              onClick={() => loginDemoRole('employee2')}
              className="rounded-xl border px-5 py-2.5 text-xs font-semibold cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              {t.roleEmployee2}
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('staff')}
              className="rounded-xl border px-5 py-2.5 text-xs font-medium cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              {t.openAuth}
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  // Dynamic Employee Tabs — Appear Immediately When Owner Grants Permission!
  const canAccessProductsTab =
    isOwner || perms.canAddProducts || perms.canEditProducts || perms.canDeleteProducts;
  const canAccessCategoriesTab = isOwner || perms.canManageCategories;
  const canAccessInventoryTab = isOwner || perms.canManageInventory;
  const canAccessSilverTab = isOwner || perms.canEditSilverPricing;
  const canAccessReportsTab = isOwner || perms.canViewFinancialReports;

  const employeeTabs: {
    id: EmployeeTab;
    labelAr: string;
    labelEn: string;
    icon: React.ReactNode;
    delegated?: boolean;
  }[] = [
    {
      id: 'orders',
      labelAr: perms.canViewAllOrders ? 'كل الطلبات' : 'الطلبات المسندة',
      labelEn: perms.canViewAllOrders ? 'All Orders' : 'Assigned Orders',
      icon: <Package className="h-4 w-4" />,
    },
    ...(canAccessProductsTab
      ? [
          {
            id: 'products' as const,
            labelAr: 'المنتجات (مفوض)',
            labelEn: 'Products (Granted)',
            icon: <ShoppingBag className="h-4 w-4" />,
            delegated: true,
          },
        ]
      : []),
    ...(canAccessCategoriesTab
      ? [
          {
            id: 'categories' as const,
            labelAr: 'التصنيفات (مفوض)',
            labelEn: 'Categories (Granted)',
            icon: <FolderTree className="h-4 w-4" />,
            delegated: true,
          },
        ]
      : []),
    ...(canAccessInventoryTab
      ? [
          {
            id: 'inventory' as const,
            labelAr: 'المخزون (مفوض)',
            labelEn: 'Inventory (Granted)',
            icon: <Boxes className="h-4 w-4" />,
            delegated: true,
          },
        ]
      : []),
    ...(canAccessSilverTab
      ? [
          {
            id: 'silver' as const,
            labelAr: 'الفضة 925 (مفوض)',
            labelEn: 'Silver 925 (Granted)',
            icon: <Coins className="h-4 w-4" />,
            delegated: true,
          },
        ]
      : []),
    ...(canAccessReportsTab
      ? [
          {
            id: 'reports' as const,
            labelAr: 'التقارير (مفوض)',
            labelEn: 'Reports (Granted)',
            icon: <BarChart3 className="h-4 w-4" />,
            delegated: true,
          },
        ]
      : []),
  ];

  // Fallback to 'orders' if owner revokes a delegated tab while employee is viewing it
  const safeTab: EmployeeTab = employeeTabs.some((et) => et.id === activeTab) ? activeTab : 'orders';

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-hairline)' }}>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
            {lang === 'ar' ? staffRole?.titleAr : staffRole?.titleEn} · {session?.user.name.split('|')[0]}
          </div>
          <h1 className="font-serif-editorial mt-1 text-2xl font-semibold sm:text-3xl">
            {t.employeeWorkspaceTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fetchWorkspace(false)}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-surface)' }}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{lang === 'ar' ? 'تحديث الصلاحيات' : 'Sync Permissions'}</span>
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('staff')}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-surface)' }}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>{lang === 'ar' ? 'تبديل الموظف' : 'Switch Staff'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Employee Navigation Tabs (Core + Owner-Unlocked Tabs) */}
      <div className="scrollbar-none mt-5 flex items-center gap-2 overflow-x-auto snap-x pb-1">
        {employeeTabs.map((item) => {
          const active = safeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className="snap-start relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              style={{
                color: active ? 'var(--accent-contrast)' : 'var(--text-primary)',
              }}
            >
              {active && (
                <motion.span
                  layoutId="employee-tab-active"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              )}
              {!active && (
                <span
                  className="absolute inset-0 rounded-xl border"
                  style={{
                    backgroundColor: item.delegated ? 'var(--accent-soft)' : 'var(--bg-surface)',
                    borderColor: item.delegated ? 'var(--accent-primary)' : 'var(--border-hairline)',
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                {item.delegated && !active && <Sparkles className="h-3 w-3 opacity-80" />}
              </span>
            </button>
          );
        })}
      </div>

      {errorMsg && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-600 dark:text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <AnimatePresence>
        {actionMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold"
            style={{
              backgroundColor: 'var(--accent-soft)',
              borderColor: 'var(--accent-primary)',
              color: 'var(--accent-primary)',
            }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{actionMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={safeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          {/* TAB: ASSIGNED ORDERS WORKFLOW */}
          {safeTab === 'orders' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <h2 className="text-sm font-semibold">
                  {lang === 'ar'
                    ? `الطلبات المتاحة (${orders.length})`
                    : `Orders Queue (${orders.length})`}
                </h2>

                {orders.length === 0 ? (
                  <div
                    className="rounded-2xl border p-6 text-center text-xs"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-hairline)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {lang === 'ar' ? 'لا توجد طلبات مسندة لحسابك حالياً.' : 'No orders assigned to you yet.'}
                  </div>
                ) : (
                  orders.map((ord) => {
                    const active = ord.id === selectedOrder?.id;
                    return (
                      <motion.button
                        key={ord.id}
                        whileHover={{ y: -1 }}
                        type="button"
                        onClick={() => setSelectedOrderId(ord.id)}
                        className="w-full rounded-2xl border p-4 text-start cursor-pointer transition-colors"
                        style={{
                          backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface)',
                          borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tabular text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                            {ord.orderNumber}
                          </span>
                          <span className="font-mono-tabular text-xs font-semibold">
                            {ord.total.toLocaleString()} {t.currency}
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-semibold truncate">{ord.customerName.split('|')[0]}</div>
                        <div className="mt-1 flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <span>{ORDER_STATUS_LABELS[lang][ord.status]}</span>
                          <span>{ord.deliveryMethod === 'pickup' ? (lang === 'ar' ? 'استلام' : 'Pickup') : (lang === 'ar' ? 'شحن' : 'Delivery')}</span>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>

              <div className="lg:col-span-8 min-w-0">
                <AnimatePresence mode="wait">
                  {selectedOrder && (
                    <motion.div
                      key={selectedOrder.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-2xl border p-5 sm:p-7 space-y-6"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                    >
                    <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-hairline)' }}>
                      <div>
                        <div className="font-mono-tabular text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                          {selectedOrder.orderNumber} · {selectedOrder.paymentStatus.toUpperCase()}
                        </div>
                        <h2 className="mt-1 text-xl font-semibold">{selectedOrder.customerName}</h2>
                        <div className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {selectedOrder.customerPhone} · {selectedOrder.shippingAddress}
                        </div>
                      </div>
                      <div className="text-start sm:text-end">
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'ar' ? 'المرحلة' : 'Stage'}
                        </div>
                        <div className="text-sm font-semibold">{ORDER_STATUS_LABELS[lang][selectedOrder.status]}</div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2.5">
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={`${item.productId}-${idx}`}
                          className="flex items-center justify-between gap-3 rounded-xl border p-3"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative h-12 w-12 overflow-hidden rounded-lg shrink-0">
                              <Image
                                src={item.imageUrl.replace('/src/assets/images/', '/images/')}
                                alt={lang === 'ar' ? item.nameAr : item.nameEn}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold">
                                {lang === 'ar' ? item.nameAr : item.nameEn}
                              </div>
                              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {item.sku} · {item.variant} · ×{item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-mono-tabular text-xs font-semibold">
                            {(item.unitPrice * item.quantity).toLocaleString()} {t.currency}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Prepare & Packaging */}
                    <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <ClipboardCheck className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                        <span>{lang === 'ar' ? 'تجهيز الطلب والتغليف (Packaging)' : 'Prepare Order & Packaging'}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                        {(
                          [
                            ['stockVerified', lang === 'ar' ? 'تأكيد توفر القطع' : 'Stock Verified'],
                            ['qualityInspected', lang === 'ar' ? 'فحص العيار والجودة' : 'Quality Checked'],
                            ['packaged', lang === 'ar' ? 'إتمام التغليف' : 'Packaged'],
                          ] as const
                        ).map(([field, label]) => (
                          <label
                            key={field}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
                              perms.canPrepareOrders || isOwner ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                            }`}
                            style={{
                              borderColor: selectedOrder.checklist[field] ? 'var(--accent-primary)' : 'var(--border-hairline)',
                              backgroundColor: selectedOrder.checklist[field] ? 'var(--accent-soft)' : 'transparent',
                            }}
                          >
                            <input
                              type="checkbox"
                              disabled={!perms.canPrepareOrders && !isOwner}
                              checked={selectedOrder.checklist[field]}
                              onChange={(e) =>
                                patchOrder(
                                  { checklist: { [field]: e.target.checked } },
                                  lang === 'ar' ? 'تم تحديث التجهيز' : 'Checklist saved'
                                )
                              }
                              className="h-4 w-4 accent-[var(--accent-primary)]"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Status + Delivery */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <Package className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                          <span>{lang === 'ar' ? 'تحديث الحالة' : 'Update Order Status'}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(['confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery'] as OrderStatus[]).map((st) => {
                            const active = selectedOrder.status === st;
                            return (
                              <button
                                key={st}
                                type="button"
                                disabled={(!perms.canUpdateOrderStatus && !isOwner) || selectedOrder.status === 'completed'}
                                onClick={() => patchOrder({ status: st }, lang === 'ar' ? 'تم تحديث الحالة' : 'Status updated')}
                                className="rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer disabled:opacity-45"
                                style={{
                                  backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
                                  borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                                  color: active ? 'var(--accent-contrast)' : 'var(--text-primary)',
                                }}
                              >
                                {ORDER_STATUS_LABELS[lang][st]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <Truck className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                          <span>{lang === 'ar' ? 'تجهيز الشحن / الاستلام' : 'Delivery / Pickup'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            disabled={!perms.canHandleDeliveryPickup && !isOwner}
                            value={courierNote}
                            onChange={(e) => setCourierNote(e.target.value)}
                            placeholder={lang === 'ar' ? 'ملاحظة الشحن أو الاستلام...' : 'Dispatch or pickup note...'}
                            className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-xs"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                          />
                          <button
                            type="button"
                            disabled={!perms.canHandleDeliveryPickup && !isOwner}
                            onClick={() => patchOrder({ courierNote }, lang === 'ar' ? 'تم حفظ الملاحظة' : 'Saved')}
                            className="rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-45 shrink-0"
                            style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                          >
                            {lang === 'ar' ? 'حفظ' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Payments & Complete */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <form onSubmit={handleRecordPayment} className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-2">
                            <Banknote className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                            {lang === 'ar' ? 'مدفوعات المتجر' : 'Handle Store Payments'}
                          </span>
                          <span className="font-mono-tabular">
                            {selectedOrder.paidAmount.toLocaleString()} / {selectedOrder.total.toLocaleString()}
                          </span>
                        </div>
                        {!perms.canRecordStorePayments && !isOwner ? (
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {lang === 'ar' ? 'تحصيل المدفوعات غير مفعل لهذا الحساب.' : 'Disabled for your role.'}
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <input
                              type="number"
                              min={1}
                              required
                              value={payAmount}
                              onChange={(e) => setPayAmount(e.target.value)}
                              className="font-mono-tabular w-24 rounded-lg border px-2.5 py-2 text-xs"
                              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                            />
                            <select
                              value={payMethod}
                              onChange={(e) => setPayMethod(e.target.value)}
                              className="flex-1 rounded-lg border px-2 py-2 text-xs"
                              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                            >
                              <option value="In-Store Cash Counter">{lang === 'ar' ? 'نقدي بالمتجر' : 'Cash Counter'}</option>
                              <option value="In-Store Card POS">{lang === 'ar' ? 'ماكينة POS' : 'Store POS'}</option>
                            </select>
                            <button
                              type="submit"
                              className="rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer"
                              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                            >
                              {lang === 'ar' ? 'تحصيل' : 'Record'}
                            </button>
                          </div>
                        )}
                      </form>

                      <div className="flex flex-col justify-between rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                          <span>{lang === 'ar' ? 'إتمام الطلب بعد التسليم' : 'Complete Order'}</span>
                        </div>
                        <button
                          type="button"
                          disabled={(!perms.canCompleteOrders && !isOwner) || selectedOrder.status === 'completed'}
                          onClick={() => patchOrder({ status: 'completed' }, lang === 'ar' ? 'تم إتمام الطلب' : 'Order completed')}
                          className="w-full rounded-xl py-2.5 text-xs font-semibold cursor-pointer disabled:opacity-45"
                          style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                        >
                          {selectedOrder.status === 'completed'
                            ? lang === 'ar'
                              ? 'مكتمل'
                              : 'Completed'
                            : lang === 'ar'
                            ? 'تأكيد التسليم وإتمام الطلب'
                            : 'Complete Order'}
                        </button>
                      </div>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* DELEGATED TAB: PRODUCTS (Unlocked dynamically by Owner!) */}
          {safeTab === 'products' && canAccessProductsTab && (
            <div className="space-y-6">
              {(isOwner || perms.canAddProducts || perms.canEditProducts) && (
                <form
                  onSubmit={handleEmployeeAddProduct}
                  className="rounded-2xl border p-5 space-y-4"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Plus className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                    <span>{lang === 'ar' ? 'إضافة منتج جديد (صلاحية مفوضة من المالك)' : 'Add Product (Owner-Granted Permission)'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'الاسم بالعربية' : 'Arabic Name'}
                      value={newProdNameAr}
                      onChange={(e) => setNewProdNameAr(e.target.value)}
                      className="rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'الاسم بالإنجليزية' : 'English Name'}
                      value={newProdNameEn}
                      onChange={(e) => setNewProdNameEn(e.target.value)}
                      className="rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {lang === 'ar' ? c.nameAr : c.nameEn}
                        </option>
                      ))}
                    </select>
                    <select
                      value={newProdMat}
                      onChange={(e) => setNewProdMat(e.target.value as ProductMaterial)}
                      className="rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    >
                      <option value="silver_925">925 Sterling Silver</option>
                      <option value="silver_rhodium">925 Rhodium</option>
                      <option value="full_grain_leather">Full-Grain Leather</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {newProdMat !== 'full_grain_leather' ? (
                      <input
                        type="number"
                        step="0.1"
                        value={newProdWeight}
                        onChange={(e) => setNewProdWeight(e.target.value)}
                        placeholder="Weight (g)"
                        className="font-mono-tabular w-full sm:w-32 rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    ) : (
                      <input
                        type="number"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        placeholder="Price"
                        className="font-mono-tabular w-full sm:w-32 rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    )}
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      placeholder="Stock"
                      className="font-mono-tabular w-full sm:w-24 rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      {lang === 'ar' ? 'نشر المنتج' : 'Add Product'}
                    </button>
                  </div>
                </form>
              )}

              {/* Mobile Product Cards */}
              <div className="space-y-3 md:hidden rounded-2xl border p-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border p-3.5 text-xs space-y-2"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-mono-tabular text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          {p.sku}
                        </div>
                        <div className="font-semibold text-sm truncate">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                      </div>
                      <div className="font-mono-tabular font-semibold shrink-0">
                        {p.price.toLocaleString()} {t.currency}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                      <span className="font-mono-tabular" style={{ color: 'var(--text-secondary)' }}>
                        {lang === 'ar' ? 'المخزون:' : 'Stock:'} {p.stock}
                      </span>
                      {(isOwner || perms.canDeleteProducts) && (
                        <button
                          type="button"
                          onClick={() => handleEmployeeDeleteProduct(p.id)}
                          className="inline-flex items-center gap-1 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                <table className="w-full min-w-[540px] text-start text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}>
                      <th className="py-2 text-start">SKU</th>
                      <th className="py-2 text-start">{lang === 'ar' ? 'القطعة' : 'Piece'}</th>
                      <th className="py-2 text-end">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                      <th className="py-2 text-center">{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                      {(isOwner || perms.canDeleteProducts) && (
                        <th className="py-2 text-end">{lang === 'ar' ? 'حذف' : 'Delete'}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="font-mono-tabular py-2.5">{p.sku}</td>
                        <td className="py-2.5 font-medium">{lang === 'ar' ? p.nameAr : p.nameEn}</td>
                        <td className="font-mono-tabular py-2.5 text-end font-semibold">
                          {p.price.toLocaleString()} {t.currency}
                        </td>
                        <td className="font-mono-tabular py-2.5 text-center">{p.stock}</td>
                        {(isOwner || perms.canDeleteProducts) && (
                          <td className="py-2.5 text-end">
                            <button
                              type="button"
                              onClick={() => handleEmployeeDeleteProduct(p.id)}
                              className="inline-flex items-center gap-1 text-red-500 hover:underline cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DELEGATED TAB: CATEGORIES */}
          {safeTab === 'categories' && canAccessCategoriesTab && (
            <div className="space-y-4">
              <form
                onSubmit={handleEmployeeAddCategory}
                className="rounded-2xl border p-5 flex flex-wrap gap-3"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
              >
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'اسم التصنيف بالعربية' : 'Arabic Category'}
                  value={newCatNameAr}
                  onChange={(e) => setNewCatNameAr(e.target.value)}
                  className="flex-1 min-w-[180px] rounded-xl border px-3 py-2 text-xs"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                />
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'اسم التصنيف بالإنجليزية' : 'English Category'}
                  value={newCatNameEn}
                  onChange={(e) => setNewCatNameEn(e.target.value)}
                  className="flex-1 min-w-[180px] rounded-xl border px-3 py-2 text-xs"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                />
                <button
                  type="submit"
                  className="rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                >
                  {lang === 'ar' ? 'إضافة تصنيف' : 'Add Category'}
                </button>
              </form>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border p-4 text-xs"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="text-sm font-semibold">{lang === 'ar' ? c.nameAr : c.nameEn}</div>
                    <div className="font-mono-tabular mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {c.slug}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DELEGATED TAB: INVENTORY */}
          {safeTab === 'inventory' && canAccessInventoryTab && (
            <div className="rounded-2xl border p-5 space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
              <h2 className="text-sm font-semibold">{lang === 'ar' ? 'تعديل المخزون' : 'Inventory Adjustments'}</h2>
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <div>
                    <div className="font-semibold">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                    <div className="font-mono-tabular" style={{ color: 'var(--text-muted)' }}>
                      {p.sku} · Stock: {p.stock}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEmployeeAdjustStock(p.id, -1)}
                      className="rounded-lg border px-3 py-1 cursor-pointer"
                      style={{ borderColor: 'var(--border-hairline)' }}
                    >
                      -1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEmployeeAdjustStock(p.id, 5)}
                      className="rounded-lg px-3 py-1 font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      +5
                    </button>
                  </div>
                </div>
              ))}
              {inventoryLogs.length > 0 && (
                <div className="pt-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Latest: {inventoryLogs[0].productNameEn} ({inventoryLogs[0].delta > 0 ? `+${inventoryLogs[0].delta}` : inventoryLogs[0].delta})
                </div>
              )}
            </div>
          )}

          {/* DELEGATED TAB: SILVER 925 PRICING */}
          {safeTab === 'silver' && canAccessSilverTab && (
            <form
              onSubmit={handleEmployeeSilverRate}
              className="max-w-xl rounded-2xl border p-6 space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
            >
              <h2 className="text-base font-semibold">
                {lang === 'ar' ? 'تحديث سعر جرام الفضة 925 (مفوض)' : 'Update 925 Silver Rate (Granted)'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="number"
                  value={gramRateInput}
                  onChange={(e) => setGramRateInput(e.target.value)}
                  className="font-mono-tabular rounded-xl border px-3 py-2 text-sm"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                />
                <input
                  type="number"
                  value={makingInput}
                  onChange={(e) => setMakingInput(e.target.value)}
                  className="font-mono-tabular rounded-xl border px-3 py-2 text-sm"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                />
              </div>
              <button
                type="submit"
                className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
              >
                {lang === 'ar' ? 'تحديث وإعادة التسعير' : 'Apply Rate'}
              </button>
            </form>
          )}

          {/* DELEGATED TAB: REPORTS */}
          {safeTab === 'reports' && canAccessReportsTab && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'ar' ? 'إجمالي الطلبات الظاهرة' : 'Visible Order Volume'}
                </div>
                <div className="font-mono-tabular mt-1 text-xl font-semibold">
                  {orders.reduce((s, o) => s + o.total, 0).toLocaleString()} {t.currency}
                </div>
              </div>
              <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'ar' ? 'المبالغ المحصلة' : 'Collected'}
                </div>
                <div className="font-mono-tabular mt-1 text-xl font-semibold">
                  {orders.reduce((s, o) => s + o.paidAmount, 0).toLocaleString()} {t.currency}
                </div>
              </div>
              <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'ar' ? 'قطع المخزون' : 'Catalog Pieces'}
                </div>
                <div className="font-mono-tabular mt-1 text-xl font-semibold">{products.length}</div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
