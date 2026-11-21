export type Language = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark';
export type ColorPalette =
  | 'platinum'
  | 'emerald'
  | 'sapphire'
  | 'burgundy'
  | 'amethyst'
  | 'rosegold'
  | 'amber'
  | 'obsidian';

export type ProductCategory =
  | 'rings'
  | 'necklaces'
  | 'bracelets_earrings'
  | 'evening_bags'
  | 'tote_bags'
  | string;

export type ProductMaterial = 'silver_925' | 'silver_rhodium' | 'full_grain_leather';

export interface CategoryRecord {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  active: boolean;
  sortOrder: number;
}

export interface InventoryLog {
  id: string;
  productId: string;
  sku: string;
  productNameEn: string;
  productNameAr: string;
  delta: number;
  newStock: number;
  reason: string;
  actorName: string;
  createdAt: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: ProductCategory;
  material: ProductMaterial;
  imageUrl: string;
  weightGrams?: number;
  makingCharge?: number;
  useSilverPricing: boolean;
  price: number;
  stock: number;
  variants: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
}

export interface SilverPricingConfig {
  silver925PerGram: number;
  defaultMakingChargePerGram: number;
  currencyCode: string;
  updatedAt: string;
  updatedBy: string;
}

export interface StoreSettings {
  storeNameAr: string;
  storeNameEn: string;
  shippingFee: number;
  freeShippingThreshold: number;
  pickupAvailable: boolean;
  codAvailable: boolean;
  illustrativeNoticeAr: string;
  illustrativeNoticeEn: string;
}

export interface StaffPermissions {
  // Core Employee Operations
  canViewAssignedOrders: boolean;
  canViewAllOrders: boolean;
  canPrepareOrders: boolean;
  canUpdateOrderStatus: boolean;
  canHandleDeliveryPickup: boolean;
  canRecordStorePayments: boolean;
  canCompleteOrders: boolean;
  // Delegated Store / Catalog Capabilities (OFF by default unless Owner grants)
  canAddProducts: boolean;
  canEditProducts: boolean;
  canManageCategories: boolean;
  canManageInventory: boolean;
  // Sensitive Owner Capabilities (OFF by default)
  canDeleteProducts: boolean;
  canIssueRefunds: boolean;
  canEditSilverPricing: boolean;
  canViewFinancialReports: boolean;
  canManageStaff: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emailVerified: boolean;
  authProvider: 'email' | 'google' | 'workspace_demo';
  createdAt: string;
}

export interface StaffRoleRecord {
  userId: string;
  role: 'owner' | 'employee';
  titleAr: string;
  titleEn: string;
  active: boolean;
  permissions: StaffPermissions;
  updatedAt: string;
}

export interface AuthSession {
  token: string;
  user: UserProfile;
  staffRole: StaffRoleRecord | null;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';
export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'cod' | 'store_counter' | 'bank_transfer_ref';

export interface OrderItem {
  productId: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
  engravingNote?: string;
}

export interface PaymentEntry {
  id: string;
  amount: number;
  method: string;
  recordedBy: string;
  recordedAt: string;
  note?: string;
}

export interface PackagingChecklist {
  stockVerified: boolean;
  qualityInspected: boolean;
  packaged: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  isReservation: boolean;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  assignedEmployeeId: string | null;
  assignedEmployeeName: string | null;
  checklist: PackagingChecklist;
  courierNote: string;
  paymentLogs: PaymentEntry[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
  engravingNote?: string;
}

export interface StoreSnapshot {
  products: Product[];
  categories: CategoryRecord[];
  silverPricing: SilverPricingConfig;
  settings: StoreSettings;
}
