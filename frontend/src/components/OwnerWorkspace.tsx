'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookmarkCheck,
  Boxes,
  CheckCircle2,
  Coins,
  CreditCard,
  Download,
  FileSpreadsheet,
  FolderTree,
  LayoutDashboard,
  Lock,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShoppingBag,
  Trash2,
  Truck,
  Upload,
  UserCheck,
  UserPlus,
  Users,
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
  StaffPermissions,
  StaffRoleRecord,
  StoreSettings,
  UserProfile,
} from '../types/store';

type OwnerTab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'silver'
  | 'orders'
  | 'reservations'
  | 'payments'
  | 'shipping'
  | 'customers'
  | 'employees'
  | 'permissions'
  | 'reports'
  | 'settings';

const PERMISSION_GROUPS: {
  groupAr: string;
  groupEn: string;
  items: { key: keyof StaffPermissions; sensitive?: boolean; labelAr: string; labelEn: string }[];
}[] = [
  {
    groupAr: 'العمليات اليومية للطلبات',
    groupEn: 'Core Order Operations',
    items: [
      { key: 'canViewAssignedOrders', labelAr: 'عرض الطلبات المسندة', labelEn: 'View Assigned Orders' },
      { key: 'canViewAllOrders', labelAr: 'عرض كل طلبات المتجر', labelEn: 'View All Store Orders' },
      { key: 'canPrepareOrders', labelAr: 'تجهيز وتغليف الطلب', labelEn: 'Prepare & Package' },
      { key: 'canUpdateOrderStatus', labelAr: 'تحديث مراحل الطلب', labelEn: 'Update Order Status' },
      { key: 'canHandleDeliveryPickup', labelAr: 'إدارة الشحن والاستلام', labelEn: 'Delivery & Pickup' },
      { key: 'canRecordStorePayments', labelAr: 'تحصيل مدفوعات المتجر', labelEn: 'Record Store Payments' },
      { key: 'canCompleteOrders', labelAr: 'تأكيد التسليم والإغلاق', labelEn: 'Complete Orders' },
    ],
  },
  {
    groupAr: 'صلاحيات كتالوج مفوضة من المالك (تظهر فوراً للموظف)',
    groupEn: 'Owner-Delegated Store Tabs (Unlock Live in Employee Desk)',
    items: [
      { key: 'canAddProducts', labelAr: 'إضافة منتجات جديدة', labelEn: 'Add New Products' },
      { key: 'canEditProducts', labelAr: 'تعديل المنتجات والأسعار', labelEn: 'Edit Products' },
      { key: 'canManageCategories', labelAr: 'إدارة التصنيفات', labelEn: 'Manage Categories' },
      { key: 'canManageInventory', labelAr: 'إدارة المخزون والجرد', labelEn: 'Manage Inventory' },
    ],
  },
  {
    groupAr: 'صلاحيات حساسة (مغلقة افتراضياً)',
    groupEn: 'Sensitive Actions (OFF by Default)',
    items: [
      { key: 'canDeleteProducts', sensitive: true, labelAr: 'حذف المنتجات', labelEn: 'Delete Products' },
      { key: 'canIssueRefunds', sensitive: true, labelAr: 'إصدار استرداد وإلغاء', labelEn: 'Issue Refunds / Cancel' },
      { key: 'canEditSilverPricing', sensitive: true, labelAr: 'تعديل سعر جرام الفضة', labelEn: 'Edit Silver 925 Rate' },
      { key: 'canViewFinancialReports', sensitive: true, labelAr: 'التقارير المالية والعملاء', labelEn: 'Reports & Customers' },
      { key: 'canManageStaff', sensitive: true, labelAr: 'إدارة الموظفين والصلاحيات', labelEn: 'Manage Staff & Roles' },
    ],
  },
];

export function OwnerWorkspace() {
  const { lang, t, session, loginDemoRole, openAuthModal, refreshStorefront } = useStore();
  const [tab, setTab] = useState<OwnerTab>('overview');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [staffMembers, setStaffMembers] = useState<
    { staffRole: StaffRoleRecord; profile: UserProfile | null }[]
  >([]);
  const [silverPricing, setSilverPricing] = useState<SilverPricingConfig | null>(null);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);

  // Forms & UI state
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdDescAr, setNewProdDescAr] = useState('');
  const [newProdDescEn, setNewProdDescEn] = useState('');
  const [newProdCat, setNewProdCat] = useState<ProductCategory>('rings');
  const [newProdMat, setNewProdMat] = useState<ProductMaterial>('silver_925');
  const [newProdWeight, setNewProdWeight] = useState('12');
  const [newProdPrice, setNewProdPrice] = useState('1600');
  const [newProdStock, setNewProdStock] = useState('8');

  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatDescEn, setNewCatDescEn] = useState('');

  const [invDelta, setInvDelta] = useState<Record<string, string>>({});
  const [invReason, setInvReason] = useState('Supplier restock');

  const [gramRateInput, setGramRateInput] = useState('85');
  const [makingInput, setMakingInput] = useState('35');
  const [calcWeight, setCalcWeight] = useState('15');
  const [recalculateAll, setRecalculateAll] = useState(true);

  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empTitleAr, setEmpTitleAr] = useState('');
  const [empTitleEn, setEmpTitleEn] = useState('');
  const [empPassword, setEmpPassword] = useState('Staff925!');

  const [csvText, setCsvText] = useState(
    'sku,nameAr,nameEn,category,material,weightGrams,price,stock\nCS-RNG-991,خاتم فضة مجدول 925,Braided 925 Silver Ring,rings,silver_925,11.5,0,7\nCS-BAG-299,حقيبة كلاسيك جلد بلاتيني,Platinum Leather Mini Bag,evening_bags,full_grain_leather,0,3950,4'
  );

  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isOwner = session?.staffRole?.role === 'owner';

  const loadWorkspace = useCallback(async () => {
    if (!session?.token || !isOwner) return;
    try {
      const res = await fetch('/api/workspace/bootstrap', {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load owner workspace');
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setInventoryLogs(data.inventoryLogs || []);
      setOrders(data.orders || []);
      setCustomers(data.customers || []);
      setStaffMembers(data.staffMembers || []);
      setSilverPricing(data.silverPricing || null);
      setStoreSettings(data.settings || null);
      if (data.silverPricing) {
        setGramRateInput(String(data.silverPricing.silver925PerGram));
        setMakingInput(String(data.silverPricing.defaultMakingChargePerGram));
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Workspace error');
    }
  }, [session?.token, isOwner]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 2800);
  };

  const navItems: { id: OwnerTab; labelAr: string; labelEn: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', labelAr: 'نظرة عامة', labelEn: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'products', labelAr: 'المنتجات', labelEn: 'Products', icon: <ShoppingBag className="h-4 w-4" />, badge: products.length },
    { id: 'categories', labelAr: 'التصنيفات', labelEn: 'Categories', icon: <FolderTree className="h-4 w-4" />, badge: categories.length },
    { id: 'inventory', labelAr: 'المخزون والجرد', labelEn: 'Inventory', icon: <Boxes className="h-4 w-4" />, badge: products.filter((p) => p.stock <= 5).length || undefined },
    { id: 'silver', labelAr: 'تسعير الفضة 925', labelEn: 'Silver Pricing', icon: <Coins className="h-4 w-4" /> },
    { id: 'orders', labelAr: 'الطلبات', labelEn: 'Orders', icon: <Package className="h-4 w-4" />, badge: orders.length },
    { id: 'reservations', labelAr: 'الحجوزات', labelEn: 'Reservations', icon: <BookmarkCheck className="h-4 w-4" />, badge: orders.filter((o) => o.isReservation || o.deliveryMethod === 'pickup').length || undefined },
    { id: 'payments', labelAr: 'المدفوعات', labelEn: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'shipping', labelAr: 'الشحن والتوصيل', labelEn: 'Shipping & Delivery', icon: <Truck className="h-4 w-4" /> },
    { id: 'customers', labelAr: 'العملاء', labelEn: 'Customers', icon: <Users className="h-4 w-4" /> },
    { id: 'employees', labelAr: 'الموظفون', labelEn: 'Employees', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'permissions', labelAr: 'الأدوار والصلاحيات', labelEn: 'Roles & Permissions', icon: <Shield className="h-4 w-4" /> },
    { id: 'reports', labelAr: 'التقارير والتحليلات', labelEn: 'Reports & Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'settings', labelAr: 'الإعدادات واستيراد CSV', labelEn: 'Settings & CSV Import', icon: <Settings className="h-4 w-4" /> },
  ];

  const employeesOnly = staffMembers.filter((m) => m.staffRole.role === 'employee');

  const analytics = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'cancelled');
    const totalRevenue = validOrders.reduce((s, o) => s + o.total, 0);
    const collected = orders.reduce((s, o) => s + o.paidAmount, 0);
    const avgOrder = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
    const byCategory = categories.map((cat) => {
      const catProdIds = new Set(products.filter((p) => p.category === cat.slug).map((p) => p.id));
      const revenue = validOrders.reduce(
        (sum, ord) =>
          sum +
          ord.items
            .filter((it) => catProdIds.has(it.productId))
            .reduce((s2, it) => s2 + it.unitPrice * it.quantity, 0),
        0
      );
      return { cat, revenue };
    });
    const maxCatRev = Math.max(1, ...byCategory.map((b) => b.revenue));
    return { totalRevenue, collected, avgOrder, byCategory, maxCatRev };
  }, [orders, categories, products]);

  if (!isOwner) {
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
          <h1 className="font-serif-editorial text-2xl font-semibold">
            {lang === 'ar' ? 'لوحة تحكم المالك محمية' : 'Store Owner Admin Protected'}
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ar'
              ? 'سجل الدخول بحساب المالك لإدارة المنتجات، التصنيفات، الجرد، تسعير الفضة 925، الطلبات، وصلاحيات الفريق.'
              : 'Sign in with the Store Owner Admin account to access all 14 operational & permission modules.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => loginDemoRole('owner')}
              className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              {t.roleOwner}
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

  // Action Handlers
  const handleCreateProduct = async (e: React.FormEvent) => {
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
          descriptionAr: newProdDescAr,
          descriptionEn: newProdDescEn,
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
          variants: isSilver ? ['Standard', 'Custom Fit'] : ['Obsidian Black', 'Warm Taupe'],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not add product');
      setProducts((prev) => [data, ...prev]);
      setNewProdNameAr('');
      setNewProdNameEn('');
      setNewProdDescAr('');
      setNewProdDescEn('');
      await refreshStorefront();
      flash(lang === 'ar' ? 'تمت إضافة القطعة إلى الكتالوج' : 'Product added to catalog');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error creating product');
    }
  };

  const handleToggleProductFlag = async (prod: Product, field: 'active' | 'featured') => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/products/${prod.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ [field]: !prod[field] }),
    });
    if (res.ok) {
      const updated = (await res.json()) as Product;
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      refreshStorefront();
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/products/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      refreshStorefront();
      flash(lang === 'ar' ? 'تم حذف القطعة' : 'Product deleted');
    }
  };

  const handleAdjustInventory = async (productId: string, delta: number, reasonText?: string) => {
    if (!session?.token || !delta) return;
    const res = await fetch('/api/workspace/inventory/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        productId,
        delta,
        reason: reasonText || invReason,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)));
      setInventoryLogs((prev) => [data.log, ...prev]);
      refreshStorefront();
      flash(lang === 'ar' ? 'تم تسجيل حركة المخزون' : 'Inventory adjustment logged');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token) return;
    const res = await fetch('/api/workspace/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        nameAr: newCatNameAr,
        nameEn: newCatNameEn,
        descriptionEn: newCatDescEn,
      }),
    });
    if (res.ok) {
      const created = (await res.json()) as CategoryRecord;
      setCategories((prev) => [...prev, created]);
      setNewCatNameAr('');
      setNewCatNameEn('');
      setNewCatDescEn('');
      refreshStorefront();
      flash(lang === 'ar' ? 'تم إضافة التصنيف الجديد' : 'Category added');
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/categories/${catId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      refreshStorefront();
    }
  };

  const handleUpdateSilverRate = async (e: React.FormEvent) => {
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
        recalculateCatalog: recalculateAll,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSilverPricing(data.silverPricing);
      setProducts(data.products);
      await refreshStorefront();
      flash(lang === 'ar' ? 'تم تحديث سعر جرام الفضة 925 وإعادة تسعير القطع' : 'Silver 925 pricing applied');
    }
  };

  const handleAssignEmployee = async (orderId: string, employeeId: string) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ assignedEmployeeId: employeeId || null }),
    });
    if (res.ok) {
      const updated = (await res.json()) as Order;
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      flash(lang === 'ar' ? 'تم إسناد الطلب' : 'Order assigned');
    }
  };

  const handleUpdateOrder = async (orderId: string, payload: Record<string, unknown>) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const updated = (await res.json()) as Order;
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      flash(lang === 'ar' ? 'تم تحديث الطلب' : 'Order updated');
    }
  };

  const handleRecordPayment = async (order: Order, amount: number, method: string) => {
    if (!session?.token || amount <= 0) return;
    const res = await fetch(`/api/workspace/orders/${order.id}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ amount, method, note: 'Recorded by Store Owner' }),
    });
    if (res.ok) {
      const updated = (await res.json()) as Order;
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      flash(lang === 'ar' ? 'تم تسجيل الدفعة' : 'Payment recorded');
    }
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token) return;
    setErrorMsg('');
    try {
      const res = await fetch('/api/workspace/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          name: empName,
          email: empEmail,
          phone: empPhone,
          titleAr: empTitleAr,
          titleEn: empTitleEn,
          password: empPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create employee');
      setStaffMembers((prev) => [...prev, data]);
      setEmpName('');
      setEmpEmail('');
      setEmpPhone('');
      setEmpTitleAr('');
      setEmpTitleEn('');
      flash(lang === 'ar' ? 'تم إنشاء حساب الموظف بصلاحيات افتراضية مقيدة' : 'Employee created with safe default permissions');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error creating employee');
    }
  };

  const handleTogglePermission = async (
    userId: string,
    key: keyof StaffPermissions,
    nextVal: boolean
  ) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/staff/${userId}/permissions`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ permissions: { [key]: nextVal } }),
    });
    if (res.ok) {
      const updatedRole = (await res.json()) as StaffRoleRecord;
      setStaffMembers((prev) =>
        prev.map((m) => (m.staffRole.userId === userId ? { ...m, staffRole: updatedRole } : m))
      );
      flash(
        nextVal
          ? lang === 'ar'
            ? 'تم منح الصلاحية وستظهر فوراً في بوابة الموظف'
            : 'Permission granted — unlocked live in Employee Desk'
          : lang === 'ar'
          ? 'تم سحب الصلاحية من الموظف'
          : 'Permission revoked'
      );
    }
  };

  const handleToggleStaffActive = async (userId: string, active: boolean) => {
    if (!session?.token) return;
    const res = await fetch(`/api/workspace/staff/${userId}/permissions`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ active }),
    });
    if (res.ok) {
      const updatedRole = (await res.json()) as StaffRoleRecord;
      setStaffMembers((prev) =>
        prev.map((m) => (m.staffRole.userId === userId ? { ...m, staffRole: updatedRole } : m))
      );
    }
  };

  const handleImportCsv = async () => {
    if (!session?.token) return;
    setErrorMsg('');
    const lines = csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) {
      setErrorMsg(lang === 'ar' ? 'أدخل سطر العناوين وصف منتج واحد على الأقل' : 'Provide header row + at least 1 product row');
      return;
    }
    const items = lines.slice(1).map((line) => {
      const [sku, nameAr, nameEn, category, material, weightGrams, price, stock] = line.split(',');
      return {
        sku: sku?.trim(),
        nameAr: nameAr?.trim(),
        nameEn: nameEn?.trim(),
        category: category?.trim() || 'rings',
        material: (material?.trim() as ProductMaterial) || 'silver_925',
        weightGrams: Number(weightGrams || 0),
        price: Number(price || 0),
        stock: Number(stock || 5),
      };
    });

    const res = await fetch('/api/workspace/products/import-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMsg(data.error || 'CSV Import failed');
      return;
    }
    setProducts((prev) => [...data.products, ...prev]);
    await refreshStorefront();
    flash(
      lang === 'ar'
        ? `تم استيراد ${data.importedCount} قطعة بنجاح`
        : `Imported ${data.importedCount} products from CSV`
    );
  };

  const handleDownloadOrdersCsv = () => {
    const header = 'orderNumber,customerName,status,paymentStatus,total,paidAmount,deliveryMethod';
    const rows = orders.map(
      (o) =>
        `${o.orderNumber},"${o.customerName.replace(/"/g, '')}",${o.status},${o.paymentStatus},${o.total},${o.paidAmount},${o.deliveryMethod}`
    );
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'city-silver-925-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.token || !storeSettings) return;
    const res = await fetch('/api/workspace/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(storeSettings),
    });
    if (res.ok) {
      await refreshStorefront();
      flash(lang === 'ar' ? 'تم حفظ الإعدادات' : 'Settings saved');
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      p.nameAr.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    const q = orderSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-hairline)' }}>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
            {lang === 'ar' ? 'لوحة المالك الشاملة · 14 وحدة تشغيلية' : 'Store Owner Admin · 14 Operations Modules'}
          </div>
          <h1 className="font-serif-editorial mt-1 text-2xl font-semibold sm:text-3xl">
            {t.ownerWorkspaceTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {session?.user.name}
          </span>
          <button
            type="button"
            onClick={() => openAuthModal('staff')}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-surface)' }}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>{lang === 'ar' ? 'تبديل الحساب' : 'Switch Account'}</span>
          </button>
        </div>
      </div>

      {/* Feedback Banners */}
      <AnimatePresence>
        {notice && (
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
            <span>{notice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {errorMsg && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Sidebar + Content Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar Navigation (Mobile horizontal scroll, Desktop sticky vertical sidebar) */}
        <aside className="lg:col-span-3 min-w-0">
          <nav
            className="scrollbar-none flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible snap-x rounded-2xl border p-2 lg:sticky lg:top-20"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {navItems.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className="snap-start relative flex items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                  style={{
                    color: active ? 'var(--accent-contrast)' : 'var(--text-primary)',
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="owner-sidebar-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    {item.icon}
                    <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className="relative z-10 font-mono-tabular rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'var(--bg-subtle)',
                        color: active ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Viewport */}
        <div className="lg:col-span-9 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* 1. OVERVIEW */}
              {tab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      { label: lang === 'ar' ? 'إجمالي المبيعات' : 'Gross Revenue', val: `${analytics.totalRevenue.toLocaleString()} ${t.currency}` },
                      { label: lang === 'ar' ? 'المحصل فعلياً' : 'Collected Cash', val: `${analytics.collected.toLocaleString()} ${t.currency}` },
                      { label: lang === 'ar' ? 'متوسط قيمة الطلب' : 'Average Order', val: `${analytics.avgOrder.toLocaleString()} ${t.currency}` },
                      { label: lang === 'ar' ? 'تنبيهات نقص المخزون' : 'Low Stock Items', val: String(products.filter((p) => p.stock <= 5).length) },
                    ].map((kpi, idx) => (
                      <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-2xl border p-5 transition-shadow hover:shadow-md"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                      >
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
                        <div className="font-mono-tabular mt-2 text-xl font-semibold">{kpi.val}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Category Revenue Distribution */}
                  <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                    <h2 className="text-sm font-semibold">
                      {lang === 'ar' ? 'توزيع المبيعات حسب التصنيف' : 'Revenue by Category'}
                    </h2>
                    <div className="space-y-3">
                      {analytics.byCategory.map(({ cat, revenue }, idx) => (
                        <div key={cat.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                            <span className="font-mono-tabular font-semibold">
                              {revenue.toLocaleString()} {t.currency}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: Math.max(0.04, revenue / analytics.maxCatRev) }}
                              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                              style={{
                                transformOrigin: lang === 'ar' ? 'right' : 'left',
                                backgroundColor: 'var(--accent-primary)',
                              }}
                              className="h-full w-full rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 2. PRODUCTS */}
              {tab === 'products' && (
                <>
                  <form
                    onSubmit={handleCreateProduct}
                    className="rounded-2xl border p-5 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Plus className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                      <span>{lang === 'ar' ? 'إضافة منتج جديد' : 'Create Product'}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                      <input
                        type="text"
                        placeholder={lang === 'ar' ? 'وصف مختصر بالعربية' : 'Arabic Description'}
                        value={newProdDescAr}
                        onChange={(e) => setNewProdDescAr(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="text"
                        placeholder={lang === 'ar' ? 'وصف مختصر بالإنجليزية' : 'English Description'}
                        value={newProdDescEn}
                        onChange={(e) => setNewProdDescEn(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
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
                        <option value="silver_rhodium">925 Rhodium-Plated</option>
                        <option value="full_grain_leather">Full-Grain Leather</option>
                      </select>

                      {newProdMat !== 'full_grain_leather' ? (
                        <input
                          type="number"
                          step="0.1"
                          value={newProdWeight}
                          onChange={(e) => setNewProdWeight(e.target.value)}
                          placeholder={lang === 'ar' ? 'الوزن (جم)' : 'Weight (g)'}
                          className="font-mono-tabular rounded-xl border px-3 py-2 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      ) : (
                        <input
                          type="number"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          placeholder={lang === 'ar' ? 'السعر الثابت' : 'Fixed Price'}
                          className="font-mono-tabular rounded-xl border px-3 py-2 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      )}

                      <input
                        type="number"
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        placeholder={lang === 'ar' ? 'الكمية بالمخزون' : 'Initial Stock'}
                        className="font-mono-tabular rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      {lang === 'ar' ? 'حفظ ونشر القطعة' : 'Save & Publish Piece'}
                    </button>
                  </form>

                  <div className="rounded-2xl border p-4 sm:p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold">
                        {lang === 'ar' ? `كتالوج المنتجات (${filteredProducts.length})` : `Catalog Products (${filteredProducts.length})`}
                      </h2>
                      <div className="relative w-full sm:w-64">
                        <Search className="pointer-events-none absolute top-1/2 start-3 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
                        <input
                          type="text"
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          placeholder={lang === 'ar' ? 'بحث SKU أو اسم...' : 'Search SKU or name...'}
                          className="w-full rounded-xl border py-2 ps-8 pe-3 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-3 md:hidden">
                      {filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-xl border p-3.5 text-xs space-y-2.5"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="font-mono-tabular text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                {p.sku}
                              </div>
                              <div className="font-semibold text-sm truncate">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                              <div style={{ color: 'var(--text-muted)' }}>
                                {p.category} {p.weightGrams ? `· ${p.weightGrams}g` : ''}
                              </div>
                            </div>
                            <div className="font-mono-tabular text-sm font-semibold shrink-0">
                              {p.price.toLocaleString()} {t.currency}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                            <span className="font-mono-tabular" style={{ color: 'var(--text-secondary)' }}>
                              {lang === 'ar' ? 'المخزون:' : 'Stock:'} <strong>{p.stock}</strong>
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleProductFlag(p, 'active')}
                                className="rounded-md border px-2.5 py-1 text-[11px] cursor-pointer"
                                style={{
                                  borderColor: 'var(--border-hairline)',
                                  color: p.active ? 'var(--accent-primary)' : 'var(--text-muted)',
                                }}
                              >
                                {p.active ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'مخفي' : 'Hidden')}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p.id)}
                                className="inline-flex items-center gap-1 rounded-md border border-red-500/30 px-2 py-1 text-red-500 cursor-pointer"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full min-w-[600px] text-start text-xs">
                        <thead>
                          <tr className="border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}>
                            <th className="py-2.5 text-start">SKU</th>
                            <th className="py-2.5 text-start">{lang === 'ar' ? 'القطعة' : 'Piece'}</th>
                            <th className="py-2.5 text-end">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                            <th className="py-2.5 text-center">{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                            <th className="py-2.5 text-center">{lang === 'ar' ? 'الحالة' : 'Visible'}</th>
                            <th className="py-2.5 text-end">{lang === 'ar' ? 'حذف' : 'Delete'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
                          {filteredProducts.map((p) => (
                            <tr key={p.id}>
                              <td className="font-mono-tabular py-3">{p.sku}</td>
                              <td className="py-3">
                                <div className="font-medium">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                                <div style={{ color: 'var(--text-muted)' }}>
                                  {p.category} {p.weightGrams ? `· ${p.weightGrams}g` : ''}
                                </div>
                              </td>
                              <td className="font-mono-tabular py-3 text-end font-semibold">
                                {p.price.toLocaleString()} {t.currency}
                              </td>
                              <td className="font-mono-tabular py-3 text-center">{p.stock}</td>
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleProductFlag(p, 'active')}
                                  className="rounded-md border px-2 py-1 text-[11px] cursor-pointer"
                                  style={{
                                    borderColor: 'var(--border-hairline)',
                                    color: p.active ? 'var(--accent-primary)' : 'var(--text-muted)',
                                  }}
                                >
                                  {p.active ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'مخفي' : 'Hidden')}
                                </button>
                              </td>
                              <td className="py-3 text-end">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="inline-flex items-center gap-1 text-red-500 hover:underline cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* 3. CATEGORIES */}
              {tab === 'categories' && (
                <>
                  <form
                    onSubmit={handleCreateCategory}
                    className="rounded-2xl border p-5 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <h2 className="text-sm font-semibold">
                      {lang === 'ar' ? 'إضافة تصنيف جديد للمتجر' : 'Add Storefront Category'}
                    </h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ar' ? 'اسم التصنيف بالعربية' : 'Arabic Title'}
                        value={newCatNameAr}
                        onChange={(e) => setNewCatNameAr(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ar' ? 'اسم التصنيف بالإنجليزية' : 'English Title'}
                        value={newCatNameEn}
                        onChange={(e) => setNewCatNameEn(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="text"
                        placeholder={lang === 'ar' ? 'وصف مختصر' : 'Short Description'}
                        value={newCatDescEn}
                        onChange={(e) => setNewCatDescEn(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      {lang === 'ar' ? 'إضافة التصنيف' : 'Add Category'}
                    </button>
                  </form>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {categories.map((cat) => {
                      const count = products.filter((p) => p.category === cat.slug).length;
                      return (
                        <div
                          key={cat.id}
                          className="flex items-start justify-between rounded-2xl border p-4"
                          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div>
                            <div className="text-sm font-semibold">{lang === 'ar' ? cat.nameAr : cat.nameEn}</div>
                            <div className="font-mono-tabular text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                              {cat.slug} · {count} {lang === 'ar' ? 'منتجات' : 'items'}
                            </div>
                            <p className="mt-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                              {lang === 'ar' ? cat.descriptionAr : cat.descriptionEn}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 text-red-500 hover:opacity-80 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* 4. INVENTORY */}
              {tab === 'inventory' && (
                <>
                  <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold">
                        {lang === 'ar' ? 'إدارة الجرد وتعديل الكميات' : 'Stock Levels & Quick Restock'}
                      </h2>
                      <input
                        type="text"
                        value={invReason}
                        onChange={(e) => setInvReason(e.target.value)}
                        placeholder={lang === 'ar' ? 'سبب التعديل (توريد / جرد)' : 'Adjustment reason'}
                        className="rounded-xl border px-3 py-1.5 text-xs w-full sm:w-56"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>

                    <div className="space-y-2.5">
                      {products.map((p) => {
                        const low = p.stock <= 5;
                        return (
                          <div
                            key={p.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs"
                            style={{
                              backgroundColor: 'var(--bg-canvas)',
                              borderColor: low ? 'rgba(217, 119, 6, 0.45)' : 'var(--border-hairline)',
                            }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {low && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
                              <div>
                                <div className="font-semibold">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                                <div className="font-mono-tabular" style={{ color: 'var(--text-muted)' }}>
                                  {p.sku} · Stock: <strong style={{ color: 'var(--text-primary)' }}>{p.stock}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleAdjustInventory(p.id, -1, 'Manual reduction')}
                                className="rounded-lg border px-2.5 py-1 cursor-pointer"
                                style={{ borderColor: 'var(--border-hairline)' }}
                              >
                                -1
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustInventory(p.id, 5, invReason)}
                                className="rounded-lg border px-2.5 py-1 font-semibold cursor-pointer"
                                style={{ borderColor: 'var(--border-hairline)', color: 'var(--accent-primary)' }}
                              >
                                +5
                              </button>
                              <input
                                type="number"
                                placeholder="±"
                                value={invDelta[p.id] || ''}
                                onChange={(e) => setInvDelta({ ...invDelta, [p.id]: e.target.value })}
                                className="font-mono-tabular w-16 rounded-lg border px-2 py-1 text-xs"
                                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const d = Number(invDelta[p.id] || 0);
                                  if (d) {
                                    handleAdjustInventory(p.id, d, invReason);
                                    setInvDelta({ ...invDelta, [p.id]: '' });
                                  }
                                }}
                                className="rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer"
                                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                              >
                                {lang === 'ar' ? 'تطبيق' : 'Apply'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                    <h3 className="text-sm font-semibold mb-3">
                      {lang === 'ar' ? 'سجل حركات المخزون' : 'Inventory Audit Trail'}
                    </h3>
                    <div className="space-y-2 text-xs">
                      {inventoryLogs.slice(0, 10).map((log) => (
                        <div
                          key={log.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2"
                          style={{ backgroundColor: 'var(--bg-canvas)' }}
                        >
                          <span>
                            <strong className="font-mono-tabular">{log.delta > 0 ? `+${log.delta}` : log.delta}</strong>{' '}
                            · {lang === 'ar' ? log.productNameAr : log.productNameEn} ({log.reason})
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>
                            New: {log.newStock} · {log.actorName.split('|')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 5. SILVER PRICING */}
              {tab === 'silver' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <form
                    onSubmit={handleUpdateSilverRate}
                    className="rounded-2xl border p-6 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <h2 className="text-base font-semibold">
                      {lang === 'ar' ? 'تسعير جرام الفضة عيار 925' : '925 Silver Gram Pricing Engine'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          {lang === 'ar' ? 'سعر الجرام 925' : '925 Rate / Gram'}
                        </label>
                        <input
                          type="number"
                          min={1}
                          required
                          value={gramRateInput}
                          onChange={(e) => setGramRateInput(e.target.value)}
                          className="font-mono-tabular w-full rounded-xl border px-3 py-2 text-sm"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          {lang === 'ar' ? 'المصنعية / جرام' : 'Craft Charge / Gram'}
                        </label>
                        <input
                          type="number"
                          min={0}
                          required
                          value={makingInput}
                          onChange={(e) => setMakingInput(e.target.value)}
                          className="font-mono-tabular w-full rounded-xl border px-3 py-2 text-sm"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={recalculateAll}
                        onChange={(e) => setRecalculateAll(e.target.checked)}
                        className="h-4 w-4 accent-[var(--accent-primary)]"
                      />
                      <span>
                        {lang === 'ar'
                          ? 'إعادة تسعير كل منتجات الفضة 925 تلقائياً'
                          : 'Batch-recalculate all weight-linked 925 products'}
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      {lang === 'ar' ? 'تحديث وتطبيق السعر' : 'Save & Recalculate'}
                    </button>
                  </form>

                  <div
                    className="rounded-2xl border p-6 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <h3 className="text-base font-semibold">
                      {lang === 'ar' ? 'حاسبة تسعير فورية للقطعة' : 'Live Weight Valuation Preview'}
                    </h3>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        {lang === 'ar' ? 'وزن القطعة بالجرام' : 'Piece Weight (grams)'}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(e.target.value)}
                        className="font-mono-tabular w-full rounded-xl border px-3 py-2 text-sm"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>
                    <div className="rounded-xl p-4 space-y-1.5 text-xs" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'قيمة الفضة الصافية:' : 'Silver Metal Value:'}</span>
                        <span className="font-mono-tabular">
                          {Math.round(Number(calcWeight || 0) * Number(gramRateInput || 0)).toLocaleString()} {t.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'المصنعية التقديرية:' : 'Estimated Craft:'}</span>
                        <span className="font-mono-tabular">
                          {Math.round(Number(calcWeight || 0) * Number(makingInput || 0)).toLocaleString()} {t.currency}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t text-sm font-semibold" style={{ borderColor: 'var(--border-hairline)', color: 'var(--accent-primary)' }}>
                        <span>{lang === 'ar' ? 'سعر البيع المقترح:' : 'Calculated Retail Price:'}</span>
                        <span className="font-mono-tabular">
                          {Math.round(
                            Number(calcWeight || 0) * (Number(gramRateInput || 0) + Number(makingInput || 0))
                          ).toLocaleString()}{' '}
                          {t.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. ORDERS */}
              {tab === 'orders' && (
                <div className="rounded-2xl border p-4 sm:p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="relative w-full sm:w-64">
                      <Search className="pointer-events-none absolute top-1/2 start-3 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder={lang === 'ar' ? 'بحث برقم الطلب أو العميل...' : 'Search order # or client...'}
                        className="w-full rounded-xl border py-2 ps-8 pe-3 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="w-full sm:w-auto rounded-xl border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    >
                      <option value="all">{lang === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                      {(Object.keys(ORDER_STATUS_LABELS[lang]) as OrderStatus[]).map((st) => (
                        <option key={st} value={st}>
                          {ORDER_STATUS_LABELS[lang][st]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Orders Stack */}
                  <div className="space-y-3 md:hidden">
                    {filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="rounded-xl border p-3.5 text-xs space-y-3"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-mono-tabular font-semibold" style={{ color: 'var(--accent-primary)' }}>
                              {ord.orderNumber}
                            </div>
                            <div className="font-semibold text-sm mt-0.5">{ord.customerName.split('|')[0]}</div>
                            <div style={{ color: 'var(--text-muted)' }}>
                              {ord.items.length} {lang === 'ar' ? 'قطع' : 'items'} · {ord.deliveryMethod}
                            </div>
                          </div>
                          <div className="font-mono-tabular text-sm font-semibold shrink-0">
                            {ord.total.toLocaleString()} {t.currency}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <select
                            value={ord.assignedEmployeeId || ''}
                            onChange={(e) => handleAssignEmployee(ord.id, e.target.value)}
                            className="w-full rounded-lg border px-2.5 py-2 text-xs"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                          >
                            <option value="">{t.unassigned}</option>
                            {employeesOnly.map((emp) => (
                              <option key={emp.staffRole.userId} value={emp.staffRole.userId}>
                                {emp.profile?.name.split('|')[0]}
                              </option>
                            ))}
                          </select>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrder(ord.id, { status: e.target.value })}
                            className="w-full rounded-lg border px-2.5 py-2 text-xs"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                          >
                            {(Object.keys(ORDER_STATUS_LABELS[lang]) as OrderStatus[]).map((st) => (
                              <option key={st} value={st}>
                                {ORDER_STATUS_LABELS[lang][st]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Orders Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[620px] text-start text-xs">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}>
                          <th className="py-2.5 text-start">{lang === 'ar' ? 'الطلب' : 'Order'}</th>
                          <th className="py-2.5 text-start">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                          <th className="py-2.5 text-start">{lang === 'ar' ? 'الموظف' : 'Assigned'}</th>
                          <th className="py-2.5 text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                          <th className="py-2.5 text-end">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id}>
                            <td className="font-mono-tabular py-3 font-semibold" style={{ color: 'var(--accent-primary)' }}>
                              {ord.orderNumber}
                            </td>
                            <td className="py-3">
                              <div className="font-medium">{ord.customerName.split('|')[0]}</div>
                              <div style={{ color: 'var(--text-muted)' }}>
                                {ord.items.length} {lang === 'ar' ? 'قطع' : 'items'} · {ord.deliveryMethod}
                              </div>
                            </td>
                            <td className="py-3">
                              <select
                                value={ord.assignedEmployeeId || ''}
                                onChange={(e) => handleAssignEmployee(ord.id, e.target.value)}
                                className="rounded-lg border px-2 py-1 text-xs"
                                style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                              >
                                <option value="">{t.unassigned}</option>
                                {employeesOnly.map((emp) => (
                                  <option key={emp.staffRole.userId} value={emp.staffRole.userId}>
                                    {emp.profile?.name.split('|')[0]}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3">
                              <select
                                value={ord.status}
                                onChange={(e) => handleUpdateOrder(ord.id, { status: e.target.value })}
                                className="rounded-lg border px-2 py-1 text-xs"
                                style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                              >
                                {(Object.keys(ORDER_STATUS_LABELS[lang]) as OrderStatus[]).map((st) => (
                                  <option key={st} value={st}>
                                    {ORDER_STATUS_LABELS[lang][st]}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="font-mono-tabular py-3 text-end font-semibold">
                              {ord.total.toLocaleString()} {t.currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 7. RESERVATIONS */}
              {tab === 'reservations' && (
                <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <h2 className="text-sm font-semibold">
                    {lang === 'ar' ? 'حجوزات البوتيك واستلام المتجر' : 'Boutique Reservations & Holds'}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {orders
                      .filter((o) => o.isReservation || o.deliveryMethod === 'pickup')
                      .map((resOrd) => (
                        <div
                          key={resOrd.id}
                          className="rounded-xl border p-4 space-y-2.5 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div className="flex justify-between font-semibold">
                            <span className="font-mono-tabular" style={{ color: 'var(--accent-primary)' }}>
                              {resOrd.orderNumber}
                            </span>
                            <span>{ORDER_STATUS_LABELS[lang][resOrd.status]}</span>
                          </div>
                          <div className="text-sm font-semibold">{resOrd.customerName}</div>
                          <div style={{ color: 'var(--text-secondary)' }}>
                            {resOrd.courierNote || (lang === 'ar' ? 'حجز للاستلام من المعرض الرئيسي' : 'Held for main gallery pickup')}
                          </div>
                          <div className="flex justify-between pt-2 border-t font-mono-tabular" style={{ borderColor: 'var(--border-hairline)' }}>
                            <span>
                              {lang === 'ar' ? 'العربون المدفوع:' : 'Deposit:'} {resOrd.paidAmount.toLocaleString()}
                            </span>
                            <span>
                              {lang === 'ar' ? 'المتبقي:' : 'Due:'} {(resOrd.total - resOrd.paidAmount).toLocaleString()} {t.currency}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 8. PAYMENTS */}
              {tab === 'payments' && (
                <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <h2 className="text-sm font-semibold">
                    {lang === 'ar' ? 'سجل المدفوعات والاسترداد' : 'Payments Ledger & Refunds'}
                  </h2>
                  <div className="space-y-3">
                    {orders.map((ord) => {
                      const due = Math.max(0, ord.total - ord.paidAmount);
                      return (
                        <div
                          key={ord.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div>
                            <div className="font-mono-tabular font-semibold">
                              {ord.orderNumber} · {ord.paymentStatus.toUpperCase()}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                              {ord.customerName.split('|')[0]} · {ord.paymentMethod}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-tabular font-semibold">
                              {ord.paidAmount.toLocaleString()} / {ord.total.toLocaleString()} {t.currency}
                            </span>
                            {due > 0 && ord.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => handleRecordPayment(ord, due, 'Owner Full Settlement')}
                                className="rounded-lg px-3 py-1.5 font-semibold cursor-pointer"
                                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                              >
                                {lang === 'ar' ? `تحصيل المتبقي (${due})` : `Collect ${due}`}
                              </button>
                            )}
                            {ord.paidAmount > 0 && ord.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateOrder(ord.id, {
                                    refundAmount: ord.paidAmount,
                                    status: 'cancelled',
                                  })
                                }
                                className="rounded-lg border border-red-500/30 px-3 py-1.5 font-semibold text-red-500 cursor-pointer"
                              >
                                {lang === 'ar' ? 'استرداد' : 'Refund'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. SHIPPING & DELIVERY */}
              {tab === 'shipping' && (
                <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <h2 className="text-sm font-semibold">
                    {lang === 'ar' ? 'متابعة الشحن والتوصيل' : 'Shipping & Courier Dispatch'}
                  </h2>
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="rounded-xl border p-4 space-y-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      >
                        <div className="flex justify-between font-semibold">
                          <span className="font-mono-tabular">
                            {ord.orderNumber} · {ord.deliveryMethod === 'pickup' ? 'BOUTIQUE PICKUP' : 'COURIER DELIVERY'}
                          </span>
                          <span>{ORDER_STATUS_LABELS[lang][ord.status]}</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>{ord.shippingAddress}</div>
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            defaultValue={ord.courierNote}
                            onBlur={(e) => {
                              if (e.target.value !== ord.courierNote) {
                                handleUpdateOrder(ord.id, { courierNote: e.target.value });
                              }
                            }}
                            placeholder={lang === 'ar' ? 'أدخل رقم البوليصة أو ملاحظة التوصيل...' : 'Courier tracking # or dispatch note...'}
                            className="flex-1 rounded-lg border px-3 py-1.5 text-xs"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. CUSTOMERS */}
              {tab === 'customers' && (
                <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <h2 className="text-sm font-semibold">
                    {lang === 'ar' ? `دليل العملاء (${customers.length})` : `Customer Directory (${customers.length})`}
                  </h2>
                  <div className="space-y-2.5 text-xs">
                    {customers.map((c) => {
                      const custOrders = orders.filter(
                        (o) => o.customerId === c.id || o.customerEmail.toLowerCase() === c.email.toLowerCase()
                      );
                      const spent = custOrders.reduce((s, o) => s + o.total, 0);
                      const open = selectedCustomerEmail === c.email;
                      return (
                        <div
                          key={c.id}
                          className="rounded-xl border p-4"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div
                            onClick={() => setSelectedCustomerEmail(open ? null : c.email)}
                            className="flex flex-wrap items-center justify-between gap-2 cursor-pointer"
                          >
                            <div>
                              <div className="text-sm font-semibold">{c.name}</div>
                              <div style={{ color: 'var(--text-secondary)' }}>
                                {c.email} · {c.phone}
                              </div>
                            </div>
                            <div className="text-end font-mono-tabular">
                              <div className="font-semibold">{spent.toLocaleString()} {t.currency}</div>
                              <div style={{ color: 'var(--text-muted)' }}>
                                {custOrders.length} {lang === 'ar' ? 'طلبات' : 'orders'}
                              </div>
                            </div>
                          </div>
                          {open && custOrders.length > 0 && (
                            <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: 'var(--border-hairline)' }}>
                              {custOrders.map((co) => (
                                <div key={co.id} className="flex justify-between">
                                  <span className="font-mono-tabular">{co.orderNumber}</span>
                                  <span>{ORDER_STATUS_LABELS[lang][co.status]}</span>
                                  <span className="font-mono-tabular">{co.total.toLocaleString()} {t.currency}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 11. EMPLOYEES */}
              {tab === 'employees' && (
                <>
                  <form
                    onSubmit={handleCreateEmployee}
                    className="rounded-2xl border p-5 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <UserPlus className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                      <span>{lang === 'ar' ? 'إضافة موظف جديد (بصلاحيات مقيدة افتراضياً)' : 'Add Staff Member (Safe Defaults)'}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="email"
                        required
                        placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Staff Email'}
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="text"
                        placeholder={lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                        value={empTitleEn}
                        onChange={(e) => {
                          setEmpTitleEn(e.target.value);
                          setEmpTitleAr(e.target.value);
                        }}
                        className="rounded-xl border px-3 py-2 text-xs"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <input
                        type="tel"
                        placeholder={lang === 'ar' ? 'الهاتف' : 'Phone'}
                        value={empPhone}
                        onChange={(e) => setEmpPhone(e.target.value)}
                        className="rounded-xl border px-3 py-2 text-xs w-full sm:w-44"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <input
                        type="text"
                        value={empPassword}
                        onChange={(e) => setEmpPassword(e.target.value)}
                        placeholder={lang === 'ar' ? 'كلمة المرور' : 'Initial Password'}
                        className="rounded-xl border px-3 py-2 text-xs w-full sm:w-44"
                        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer"
                        style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                      >
                        {lang === 'ar' ? 'إنشاء حساب الموظف' : 'Create Employee'}
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {employeesOnly.map(({ staffRole, profile }) => {
                      const assignedCount = orders.filter((o) => o.assignedEmployeeId === staffRole.userId).length;
                      return (
                        <div
                          key={staffRole.userId}
                          className="rounded-2xl border p-5 space-y-3"
                          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-semibold">{profile?.name}</div>
                              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                {lang === 'ar' ? staffRole.titleAr : staffRole.titleEn}
                              </div>
                              <div className="font-mono-tabular text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                                {profile?.email} · {assignedCount} {lang === 'ar' ? 'طلبات مسندة' : 'assigned orders'}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleStaffActive(staffRole.userId, !staffRole.active)}
                              className="rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer"
                              style={{
                                borderColor: staffRole.active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                                color: staffRole.active ? 'var(--accent-primary)' : 'var(--text-muted)',
                              }}
                            >
                              {staffRole.active ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'موقوف' : 'Suspended')}
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTab('permissions')}
                            className="text-xs font-semibold underline cursor-pointer"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            {lang === 'ar' ? 'تعديل صلاحيات هذا الموظف ←' : 'Configure Permissions →'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* 12. ROLES & PERMISSIONS */}
              {tab === 'permissions' && (
                <div className="space-y-6">
                  <div
                    className="rounded-xl border p-4 text-xs"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: 'var(--border-hairline)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {lang === 'ar'
                      ? 'عند تفعيل أي صلاحية مفوضة (مثل إضافة منتجات أو حذفها أو التصنيفات أو الفضة 925)، تظهر التبويبات الخاصة بها تلقائياً وفوراً داخل مساحة عمل الموظف.'
                      : 'When you grant any delegated permission (Add Products, Delete Products, Categories, Inventory, Silver Pricing, Reports), the matching tab unlocks automatically in real time inside the Employee Workspace.'}
                  </div>

                  {employeesOnly.map(({ staffRole, profile }) => (
                    <div
                      key={staffRole.userId}
                      className="rounded-2xl border p-5 space-y-5"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border-hairline)' }}>
                        <div>
                          <div className="text-base font-semibold">{profile?.name}</div>
                          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {lang === 'ar' ? staffRole.titleAr : staffRole.titleEn} · {profile?.email}
                          </div>
                        </div>
                        <span className="font-mono-tabular text-xs" style={{ color: 'var(--accent-primary)' }}>
                          {Object.values(staffRole.permissions).filter(Boolean).length} / {Object.keys(staffRole.permissions).length}{' '}
                          {lang === 'ar' ? 'صلاحية مفعلة' : 'active'}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {PERMISSION_GROUPS.map((group) => (
                          <div key={group.groupEn}>
                            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                              {lang === 'ar' ? group.groupAr : group.groupEn}
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {group.items.map((perm) => {
                                const checked = staffRole.permissions[perm.key];
                                return (
                                  <label
                                    key={perm.key}
                                    className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs cursor-pointer transition-colors"
                                    style={{
                                      borderColor: checked
                                        ? perm.sensitive
                                          ? 'rgba(220, 38, 38, 0.5)'
                                          : 'var(--accent-primary)'
                                        : 'var(--border-hairline)',
                                      backgroundColor: checked ? 'var(--bg-canvas)' : 'transparent',
                                    }}
                                  >
                                    <span>{lang === 'ar' ? perm.labelAr : perm.labelEn}</span>
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={(e) =>
                                        handleTogglePermission(staffRole.userId, perm.key, e.target.checked)
                                      }
                                      className="h-4 w-4 accent-[var(--accent-primary)]"
                                    />
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 13. REPORTS & ANALYTICS */}
              {tab === 'reports' && (
                <div className="rounded-2xl border p-6 space-y-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold">
                        {lang === 'ar' ? 'التقارير والتحليلات التفصيلية' : 'Sales & Operations Analytics'}
                      </h2>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {lang === 'ar' ? 'تصدير بيانات الطلبات والتحصيل بصيغة CSV' : 'Export real-time order and settlement summaries'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadOrdersCsv}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>{lang === 'ar' ? 'تصدير CSV' : 'Export Orders CSV'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                      <div style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'قيمة المخزون الحالية' : 'Total Inventory Value'}</div>
                      <div className="font-mono-tabular mt-1 text-lg font-semibold">
                        {products.reduce((s, p) => s + p.price * p.stock, 0).toLocaleString()} {t.currency}
                      </div>
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                      <div style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'طلبات مكتملة' : 'Completed Orders'}</div>
                      <div className="font-mono-tabular mt-1 text-lg font-semibold">
                        {orders.filter((o) => o.status === 'completed').length}
                      </div>
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                      <div style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'مبالغ قيد التحصيل' : 'Outstanding Receivables'}</div>
                      <div className="font-mono-tabular mt-1 text-lg font-semibold">
                        {Math.max(0, analytics.totalRevenue - analytics.collected).toLocaleString()} {t.currency}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 14. SETTINGS & CSV IMPORT */}
              {tab === 'settings' && storeSettings && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <form
                    onSubmit={handleSaveSettings}
                    className="rounded-2xl border p-5 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <h2 className="text-sm font-semibold">
                      {lang === 'ar' ? 'إعدادات المتجر والتوصيل' : 'Storefront & Delivery Configuration'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs mb-1">{lang === 'ar' ? 'رسوم الشحن' : 'Shipping Fee'}</label>
                        <input
                          type="number"
                          value={storeSettings.shippingFee}
                          onChange={(e) => setStoreSettings({ ...storeSettings, shippingFee: Number(e.target.value) })}
                          className="font-mono-tabular w-full rounded-xl border px-3 py-2 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">{lang === 'ar' ? 'حد الشحن المجاني' : 'Free Delivery Over'}</label>
                        <input
                          type="number"
                          value={storeSettings.freeShippingThreshold}
                          onChange={(e) =>
                            setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })
                          }
                          className="font-mono-tabular w-full rounded-xl border px-3 py-2 text-xs"
                          style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      {lang === 'ar' ? 'حفظ الإعدادات' : 'Save Store Settings'}
                    </button>
                  </form>

                  <div
                    className="rounded-2xl border p-5 space-y-4"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <FileSpreadsheet className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                        <span>{lang === 'ar' ? 'استيراد منتجات عبر CSV' : 'Bulk CSV Product Import'}</span>
                      </div>
                    </div>
                    <textarea
                      rows={5}
                      value={csvText}
                      onChange={(e) => setCsvText(e.target.value)}
                      className="font-mono-tabular w-full rounded-xl border p-3 text-[11px]"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                    <button
                      type="button"
                      onClick={handleImportCsv}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-contrast)' }}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>{lang === 'ar' ? 'استيراد الصفوف إلى المتجر' : 'Import CSV Rows'}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
