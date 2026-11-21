import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import type {
  CategoryRecord,
  InventoryLog,
  Order,
  OrderStatus,
  PaymentEntry,
  Product,
  SilverPricingConfig,
  StaffPermissions,
  StaffRoleRecord,
  StoreSettings,
  UserProfile,
} from './src/types/store.ts';

interface StoredUser extends UserProfile {
  passwordHash: string;
}

interface DatabaseSchema {
  products: Product[];
  categories: CategoryRecord[];
  inventoryLogs: InventoryLog[];
  silverPricing: SilverPricingConfig;
  settings: StoreSettings;
  users: StoredUser[];
  staffRoles: StaffRoleRecord[];
  orders: Order[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'store.json');

const DEFAULT_EMPLOYEE_PERMISSIONS: StaffPermissions = {
  canViewAssignedOrders: true,
  canViewAllOrders: false,
  canPrepareOrders: true,
  canUpdateOrderStatus: true,
  canHandleDeliveryPickup: true,
  canRecordStorePayments: true,
  canCompleteOrders: true,
  // Delegatable store permissions OFF by default until Owner grants them
  canAddProducts: false,
  canEditProducts: false,
  canManageCategories: false,
  canManageInventory: false,
  // Sensitive actions OFF by default
  canDeleteProducts: false,
  canIssueRefunds: false,
  canEditSilverPricing: false,
  canViewFinancialReports: false,
  canManageStaff: false,
};

const OWNER_PERMISSIONS: StaffPermissions = {
  canViewAssignedOrders: true,
  canViewAllOrders: true,
  canPrepareOrders: true,
  canUpdateOrderStatus: true,
  canHandleDeliveryPickup: true,
  canRecordStorePayments: true,
  canCompleteOrders: true,
  canAddProducts: true,
  canEditProducts: true,
  canManageCategories: true,
  canManageInventory: true,
  canDeleteProducts: true,
  canIssueRefunds: true,
  canEditSilverPricing: true,
  canViewFinancialReports: true,
  canManageStaff: true,
};

const SEED_CATEGORIES: CategoryRecord[] = [
  {
    id: 'cat-1',
    slug: 'rings',
    nameAr: 'خواتم فضة 925',
    nameEn: '925 Silver Rings',
    descriptionAr: 'خواتم سيجنت وسوليتير مصاغة من الفضة الإسترليني عيار 925.',
    descriptionEn: 'Hand-finished signet and solitaire rings in 925 sterling silver.',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'necklaces',
    nameAr: 'قلائد وسلاسل',
    nameEn: 'Necklaces & Chains',
    descriptionAr: 'سلاسل إيطالية ودلايات فضة 925 بتشطيب بلاتيني.',
    descriptionEn: 'Italian herringbone chains and sculpted pendants in 925 silver.',
    active: true,
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    slug: 'bracelets_earrings',
    nameAr: 'أساور وأقراط',
    nameEn: 'Bracelets & Earrings',
    descriptionAr: 'أساور كاف مفصلية وأقراط هندسية خفيفة.',
    descriptionEn: 'Hinged cuff bangles and geometric hoop earrings.',
    active: true,
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    slug: 'evening_bags',
    nameAr: 'حقائب سهرة',
    nameEn: 'Evening Bags',
    descriptionAr: 'حقائب جلدية مهيكلة للمناسبات بأقفال فضية مصقولة.',
    descriptionEn: 'Structured leather evening silhouettes with silver-tone clasps.',
    active: true,
    sortOrder: 4,
  },
  {
    id: 'cat-5',
    slug: 'tote_bags',
    nameAr: 'حقائب توت وكروس',
    nameEn: 'Totes & Crossbody',
    descriptionAr: 'حقائب يومية جلد طبيعي بإكسسوارات بلاتينية.',
    descriptionEn: 'Architectural pebbled calfskin totes and crossbody bags.',
    active: true,
    sortOrder: 5,
  },
];

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(`city-silver-925:${password}`).digest('hex');
}

function createSeedDatabase(): DatabaseSchema {
  const now = new Date().toISOString();
  const silver925PerGram = 85;

  const products: Product[] = [
    {
      id: 'prod-1',
      sku: 'CS-RNG-9251',
      slug: 'royal-signet-925-ring',
      nameAr: 'خاتم سيجنت ملكي فضة 925',
      nameEn: 'Royal Signet 925 Ring',
      descriptionAr:
        'خاتم سيجنت مصقول يدوياً من الفضة الإسترليني عيار 925 بلمسة غير لامعة وحواف هندسية متوازنة.',
      descriptionEn:
        'Hand-finished 925 sterling silver signet ring with satin brushed face and architectural bevels.',
      category: 'rings',
      material: 'silver_925',
      imageUrl: '/src/assets/images/product_silver_ring_1794604055973.jpg',
      weightGrams: 14.5,
      makingCharge: 650,
      useSilverPricing: true,
      price: Math.round(14.5 * silver925PerGram + 650),
      stock: 14,
      variants: ['54 / 7 US', '57 / 8 US', '60 / 9 US', '62 / 10 US'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-2',
      sku: 'CS-RNG-9252',
      slug: 'solitaire-platinum-band-925',
      nameAr: 'خاتم سوليتير مطلي بلاتين 925',
      nameEn: 'Solitaire Rhodium 925 Band',
      descriptionAr:
        'تصميم أنيق رفيع من الفضة الإيطالية 925 مطلي بالروديوم الفاخر مع فص زركون نقي عالي البريق.',
      descriptionEn:
        'Refined rhodium-plated 925 sterling silver solitaire ring set with precision-cut cubic zirconia.',
      category: 'rings',
      material: 'silver_rhodium',
      imageUrl: '/src/assets/images/product_silver_ring_1794604055973.jpg',
      weightGrams: 6.2,
      makingCharge: 520,
      useSilverPricing: true,
      price: Math.round(6.2 * silver925PerGram + 520),
      stock: 9,
      variants: ['52 / 6 US', '54 / 7 US', '57 / 8 US'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-3',
      sku: 'CS-NCK-9253',
      slug: 'herringbone-drop-necklace-925',
      nameAr: 'قلادة هيرينغبون فضة 925 بدلاية انسيابية',
      nameEn: 'Herringbone Drop 925 Necklace',
      descriptionAr:
        'سلسلة هيرينغبون مرنة من الفضة عيار 925 تنسدل بسلاسة على الرقبة مع دلاية منحوتة وفص مضيء.',
      descriptionEn:
        'Fluid Italian herringbone 925 sterling silver chain paired with a sculpted drop pendant.',
      category: 'necklaces',
      material: 'silver_925',
      imageUrl: '/src/assets/images/product_silver_necklace_1794604056451.jpg',
      weightGrams: 18.0,
      makingCharge: 890,
      useSilverPricing: true,
      price: Math.round(18.0 * silver925PerGram + 890),
      stock: 7,
      variants: ['42 cm', '45 cm', '50 cm'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-4',
      sku: 'CS-NCK-9254',
      slug: 'obsidian-slate-collar-chain',
      nameAr: 'سلسلة ياقة مسطحة فضة إيطالي 925',
      nameEn: 'Flat Collar Chain 925',
      descriptionAr:
        'سلسلة مسطحة عاكسة للضوء من الفضة الخالصة عيار 925 مثالية للارتداء المنفرد أو الطبقات.',
      descriptionEn:
        'Mirror-finish flat collar chain crafted in solid 925 sterling silver for solo or layered styling.',
      category: 'necklaces',
      material: 'silver_rhodium',
      imageUrl: '/src/assets/images/product_silver_necklace_1794604056451.jpg',
      weightGrams: 22.5,
      makingCharge: 940,
      useSilverPricing: true,
      price: Math.round(22.5 * silver925PerGram + 940),
      stock: 4,
      variants: ['40 cm', '45 cm'],
      featured: false,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-5',
      sku: 'CS-BRC-9255',
      slug: 'sculpted-hinged-cuff-925',
      nameAr: 'أسورة كاف مفصلية فضة 925',
      nameEn: 'Sculpted Hinged Cuff 925',
      descriptionAr:
        'أسورة صلبة بآلية قفل مخفية مصقولة كالمرآة من الفضة 925 المختومة بختم العيار.',
      descriptionEn:
        'Architectural solid hinged cuff bangle in mirror-polished 925 sterling silver with concealed clasp.',
      category: 'bracelets_earrings',
      material: 'silver_925',
      imageUrl: '/src/assets/images/product_silver_bracelet_earrings_1794604056472.jpg',
      weightGrams: 28.0,
      makingCharge: 1100,
      useSilverPricing: true,
      price: Math.round(28.0 * silver925PerGram + 1100),
      stock: 6,
      variants: ['Small 16cm', 'Medium 17.5cm', 'Large 19cm'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-6',
      sku: 'CS-EAR-9256',
      slug: 'architectural-hoops-925',
      nameAr: 'أقراط هوب هندسية فضة 925',
      nameEn: 'Architectural Silver Hoops 925',
      descriptionAr:
        'أقراط حلقية بزوايا ناعمة من الفضة عيار 925 خفيفة الوزن ومريحة للارتداء اليومي.',
      descriptionEn:
        'Faceted geometric hoop earrings in solid 925 sterling silver with snap-lock hinge.',
      category: 'bracelets_earrings',
      material: 'silver_rhodium',
      imageUrl: '/src/assets/images/product_silver_bracelet_earrings_1794604056472.jpg',
      weightGrams: 9.4,
      makingCharge: 580,
      useSilverPricing: true,
      price: Math.round(9.4 * silver925PerGram + 580),
      stock: 18,
      variants: ['18 mm', '24 mm'],
      featured: false,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-7',
      sku: 'CS-BAG-201',
      slug: 'obsidian-clasp-evening-bag',
      nameAr: 'حقيبة سهرة جلد طبيعي أسود بقفل فضي',
      nameEn: 'Obsidian Silver-Clasp Bag',
      descriptionAr:
        'حقيبة سهرة مهيكلة من الجلد الطبيعي المحبب باللون الأسود الداكن مع قفل معدني مصقول بلون الفضة وحزام كتف قابل للإزالة.',
      descriptionEn:
        'Structured full-grain obsidian leather evening bag featuring a geometric brushed-silver clasp and detachable strap.',
      category: 'evening_bags',
      material: 'full_grain_leather',
      useSilverPricing: false,
      imageUrl: '/src/assets/images/product_evening_clutch_1794604057272.jpg',
      price: 3850,
      stock: 5,
      variants: ['Obsidian Black', 'Charcoal'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-8',
      sku: 'CS-BAG-202',
      slug: 'taupe-atelier-crossbody-tote',
      nameAr: 'حقيبة توت جلد رمادي دافئ مع حزام كروس',
      nameEn: 'Atelier Taupe Crossbody Tote',
      descriptionAr:
        'حقيبة يومية فاخرة من الجلد المرن بلون توب رمادي مع إكسسوارات فضية مصقولة ومساحة داخلية منظمة.',
      descriptionEn:
        'Architectural pebbled calfskin tote in warm taupe-gray with polished silver hardware and adjustable crossbody strap.',
      category: 'tote_bags',
      material: 'full_grain_leather',
      useSilverPricing: false,
      imageUrl: '/src/assets/images/product_leather_tote_1794604057749.jpg',
      price: 4200,
      stock: 8,
      variants: ['Warm Taupe', 'Platinum Gray'],
      featured: true,
      active: true,
      createdAt: now,
    },
    {
      id: 'prod-9',
      sku: 'CS-BAG-203',
      slug: 'atelier-charcoal-top-handle',
      nameAr: 'حقيبة أتيليه فحمية بمقبض علوي وقفل بلاتيني',
      nameEn: 'Charcoal Atelier Top-Handle',
      descriptionAr:
        'إصدار مميز يجمع بين الجلد الفحمي الفاخر والقفل البلاتيني المصقول لتناسب المناسبات الرسمية والعملية.',
      descriptionEn:
        'Signature charcoal leather top-handle silhouette finished with platinum-tone turn-lock hardware.',
      category: 'evening_bags',
      material: 'full_grain_leather',
      useSilverPricing: false,
      imageUrl: '/src/assets/images/hero_silver_atelier_1794604055421.jpg',
      price: 4650,
      stock: 3,
      variants: ['Deep Charcoal'],
      featured: false,
      active: true,
      createdAt: now,
    },
  ];

  const ownerUser: StoredUser = {
    id: 'user-owner',
    name: 'ليلى المنصور | Laila Al-Mansour',
    email: 'owner@citysilver925.demo',
    phone: '+20 100 000 0001',
    address: 'Boutique HQ — Demo District',
    emailVerified: true,
    authProvider: 'workspace_demo',
    passwordHash: hashPassword('Owner925!'),
    createdAt: now,
  };

  const emp1User: StoredUser = {
    id: 'user-emp-1',
    name: 'كريم حسن | Karim Hassan',
    email: 'karim@citysilver925.demo',
    phone: '+20 100 000 0002',
    address: 'Boutique Floor A',
    emailVerified: true,
    authProvider: 'workspace_demo',
    passwordHash: hashPassword('Staff925!'),
    createdAt: now,
  };

  const emp2User: StoredUser = {
    id: 'user-emp-2',
    name: 'سارة نبيل | Sara Nabil',
    email: 'sara@citysilver925.demo',
    phone: '+20 100 000 0003',
    address: 'Fulfillment Desk',
    emailVerified: true,
    authProvider: 'workspace_demo',
    passwordHash: hashPassword('Staff925!'),
    createdAt: now,
  };

  const customerUser: StoredUser = {
    id: 'user-cust-1',
    name: 'نور الهدى | Nour El-Hoda',
    email: 'customer@citysilver925.demo',
    phone: '+20 100 000 0009',
    address: '14 Al-Horreya Axis, Demo City',
    emailVerified: true,
    authProvider: 'email',
    passwordHash: hashPassword('Customer925!'),
    createdAt: now,
  };

  const staffRoles: StaffRoleRecord[] = [
    {
      userId: ownerUser.id,
      role: 'owner',
      titleAr: 'مالك المتجر والمدير العام',
      titleEn: 'Store Owner & General Admin',
      active: true,
      permissions: { ...OWNER_PERMISSIONS },
      updatedAt: now,
    },
    {
      userId: emp1User.id,
      role: 'employee',
      titleAr: 'أخصائي مبيعات وتجهيز الطلبات',
      titleEn: 'Boutique Sales & Order Specialist',
      active: true,
      permissions: { ...DEFAULT_EMPLOYEE_PERMISSIONS },
      updatedAt: now,
    },
    {
      userId: emp2User.id,
      role: 'employee',
      titleAr: 'منسقة التغليف والتسليم',
      titleEn: 'Packaging & Dispatch Coordinator',
      active: true,
      permissions: {
        ...DEFAULT_EMPLOYEE_PERMISSIONS,
        canRecordStorePayments: false,
      },
      updatedAt: now,
    },
  ];

  const orders: Order[] = [
    {
      id: 'ord-1042',
      orderNumber: 'CS-1042',
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      customerEmail: customerUser.email,
      shippingAddress: customerUser.address,
      deliveryMethod: 'delivery',
      paymentMethod: 'cod',
      isReservation: false,
      items: [
        {
          productId: products[0].id,
          sku: products[0].sku,
          nameAr: products[0].nameAr,
          nameEn: products[0].nameEn,
          variant: '57 / 8 US',
          unitPrice: products[0].price,
          quantity: 1,
          imageUrl: products[0].imageUrl,
          engravingNote: 'N.H',
        },
        {
          productId: products[6].id,
          sku: products[6].sku,
          nameAr: products[6].nameAr,
          nameEn: products[6].nameEn,
          variant: 'Obsidian Black',
          unitPrice: products[6].price,
          quantity: 1,
          imageUrl: products[6].imageUrl,
        },
      ],
      subtotal: products[0].price + products[6].price,
      shippingFee: 0,
      total: products[0].price + products[6].price,
      paidAmount: 0,
      paymentStatus: 'unpaid',
      status: 'confirmed',
      assignedEmployeeId: emp1User.id,
      assignedEmployeeName: emp1User.name,
      checklist: {
        stockVerified: true,
        qualityInspected: false,
        packaged: false,
      },
      courierNote: '',
      paymentLogs: [],
      createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      completedAt: null,
    },
    {
      id: 'ord-1041',
      orderNumber: 'CS-1041',
      customerId: null,
      customerName: 'مريم طارق | Mariam Tarek',
      customerPhone: '+20 111 222 3344',
      customerEmail: 'mariam@example.demo',
      shippingAddress: 'Boutique Pickup — Main Gallery',
      deliveryMethod: 'pickup',
      paymentMethod: 'store_counter',
      isReservation: true,
      items: [
        {
          productId: products[4].id,
          sku: products[4].sku,
          nameAr: products[4].nameAr,
          nameEn: products[4].nameEn,
          variant: 'Medium 17.5cm',
          unitPrice: products[4].price,
          quantity: 1,
          imageUrl: products[4].imageUrl,
        },
      ],
      subtotal: products[4].price,
      shippingFee: 0,
      total: products[4].price,
      paidAmount: 1000,
      paymentStatus: 'partial',
      status: 'preparing',
      assignedEmployeeId: emp1User.id,
      assignedEmployeeName: emp1User.name,
      checklist: {
        stockVerified: true,
        qualityInspected: true,
        packaged: false,
      },
      courierNote: 'Client arrives 6:00 PM for boutique pickup',
      paymentLogs: [
        {
          id: 'pay-1',
          amount: 1000,
          method: 'Reservation Deposit (Counter)',
          recordedBy: ownerUser.name,
          recordedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
          note: 'Initial reservation deposit',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      completedAt: null,
    },
    {
      id: 'ord-1040',
      orderNumber: 'CS-1040',
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      customerEmail: customerUser.email,
      shippingAddress: customerUser.address,
      deliveryMethod: 'delivery',
      paymentMethod: 'cod',
      isReservation: false,
      items: [
        {
          productId: products[2].id,
          sku: products[2].sku,
          nameAr: products[2].nameAr,
          nameEn: products[2].nameEn,
          variant: '45 cm',
          unitPrice: products[2].price,
          quantity: 1,
          imageUrl: products[2].imageUrl,
        },
      ],
      subtotal: products[2].price,
      shippingFee: 80,
      total: products[2].price + 80,
      paidAmount: products[2].price + 80,
      paymentStatus: 'paid',
      status: 'completed',
      assignedEmployeeId: emp2User.id,
      assignedEmployeeName: emp2User.name,
      checklist: {
        stockVerified: true,
        qualityInspected: true,
        packaged: true,
      },
      courierNote: 'Delivered & signed by recipient',
      paymentLogs: [
        {
          id: 'pay-2',
          amount: products[2].price + 80,
          method: 'COD Settlement',
          recordedBy: ownerUser.name,
          recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ];

  const inventoryLogs: InventoryLog[] = [
    {
      id: 'inv-1',
      productId: products[3].id,
      sku: products[3].sku,
      productNameAr: products[3].nameAr,
      productNameEn: products[3].nameEn,
      delta: -1,
      newStock: products[3].stock,
      reason: 'Showroom display transfer',
      actorName: ownerUser.name,
      createdAt: now,
    },
  ];

  return {
    products,
    categories: SEED_CATEGORIES,
    inventoryLogs,
    silverPricing: {
      silver925PerGram,
      defaultMakingChargePerGram: 35,
      currencyCode: 'EGP',
      updatedAt: now,
      updatedBy: ownerUser.name,
    },
    settings: {
      storeNameAr: 'سيتي سيلفر 925 والحقائب',
      storeNameEn: 'City Silver 925 & Bags',
      shippingFee: 85,
      freeShippingThreshold: 3000,
      pickupAvailable: true,
      codAvailable: true,
      illustrativeNoticeAr:
        'تنويه: المنتجات والأسعار وأسعار الفضة المعروضة توضيحية فقط ولا يتصل المتجر ببوابة دفع حقيقية.',
      illustrativeNoticeEn:
        'Illustrative catalog: sample items, silver rates, and app-managed checkout (no live payment gateway connected).',
    },
    users: [ownerUser, emp1User, emp2User, customerUser],
    staffRoles,
    orders,
  };
}

function migrateDb(parsed: Partial<DatabaseSchema>): DatabaseSchema {
  const seed = createSeedDatabase();
  const migratedStaffRoles = (parsed.staffRoles || seed.staffRoles).map((r) => ({
    ...r,
    permissions:
      r.role === 'owner'
        ? { ...OWNER_PERMISSIONS }
        : { ...DEFAULT_EMPLOYEE_PERMISSIONS, ...r.permissions },
  }));
  return {
    products: parsed.products || seed.products,
    categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : seed.categories,
    inventoryLogs: parsed.inventoryLogs || seed.inventoryLogs,
    silverPricing: parsed.silverPricing || seed.silverPricing,
    settings: parsed.settings || seed.settings,
    users: parsed.users || seed.users,
    staffRoles: migratedStaffRoles,
    orders: parsed.orders || seed.orders,
  };
}

function loadDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return migrateDb(JSON.parse(raw) as Partial<DatabaseSchema>);
  } catch {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
}

let db: DatabaseSchema = loadDb();

function saveDb(): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

const sessions = new Map<string, string>();

function sanitizeUser(user: StoredUser): UserProfile {
  const { passwordHash: _ignored, ...profile } = user;
  return profile;
}

function getAuthContext(req: Request): {
  user: StoredUser | null;
  staffRole: StaffRoleRecord | null;
} {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return { user: null, staffRole: null };
  }
  const token = header.slice('Bearer '.length).trim();
  const userId = sessions.get(token);
  if (!userId) {
    return { user: null, staffRole: null };
  }
  const user = db.users.find((u) => u.id === userId) ?? null;
  if (!user) {
    return { user: null, staffRole: null };
  }
  const staffRole = db.staffRoles.find((r) => r.userId === user.id && r.active) ?? null;
  return { user, staffRole };
}

function requireStaff(
  ...anyPermissionKeys: (keyof StaffPermissions)[]
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user, staffRole } = getAuthContext(req);
    if (!user || !staffRole) {
      res.status(401).json({ error: 'Staff authentication required' });
      return;
    }
    if (staffRole.role === 'owner') {
      next();
      return;
    }
    if (
      anyPermissionKeys.length > 0 &&
      !anyPermissionKeys.some((key) => staffRole.permissions[key])
    ) {
      res.status(403).json({
        error: `Permission denied: requires ${anyPermissionKeys.join(' or ')}`,
      });
      return;
    }
    next();
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  // Storefront public catalog + categories + pricing + settings
  app.get('/api/storefront', (_req, res) => {
    res.json({
      products: db.products.filter((p) => p.active),
      categories: db.categories.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder),
      silverPricing: db.silverPricing,
      settings: db.settings,
    });
  });

  // Auth
  app.post('/api/auth/login', (req, res) => {
    const { email, password, demoRole } = req.body as {
      email?: string;
      password?: string;
      demoRole?: 'owner' | 'employee1' | 'employee2' | 'customer' | 'google_customer';
    };

    let user: StoredUser | undefined;

    if (demoRole) {
      const roleEmails: Record<string, string> = {
        owner: 'owner@citysilver925.demo',
        employee1: 'karim@citysilver925.demo',
        employee2: 'sara@citysilver925.demo',
        customer: 'customer@citysilver925.demo',
        google_customer: 'customer@citysilver925.demo',
      };
      user = db.users.find((u) => u.email === roleEmails[demoRole]);
    } else if (email && password) {
      const normalized = email.trim().toLowerCase();
      user = db.users.find((u) => u.email.toLowerCase() === normalized);
      if (!user || user.passwordHash !== hashPassword(password)) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
      if (!user.emailVerified) {
        res.status(403).json({
          error: 'Email confirmation required before sign-in',
          needsVerification: true,
          email: user.email,
        });
        return;
      }
    }

    if (!user) {
      res.status(400).json({ error: 'Missing credentials' });
      return;
    }

    const token = crypto.randomUUID();
    sessions.set(token, user.id);
    const staffRole = db.staffRoles.find((r) => r.userId === user.id && r.active) ?? null;

    res.json({
      token,
      user: sanitizeUser(user),
      staffRole,
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, address, password } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    const normalized = email.trim().toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
      res.status(409).json({ error: 'Account already exists for this email' });
      return;
    }

    const newUser: StoredUser = {
      id: `user-${crypto.randomUUID().slice(0, 8)}`,
      name: name.trim(),
      email: normalized,
      phone: phone?.trim() || '',
      address: address?.trim() || '',
      emailVerified: false,
      authProvider: 'email',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveDb();

    res.status(201).json({
      pendingVerification: true,
      email: newUser.email,
      message: 'Account created. Confirm your email to activate sign-in.',
    });
  });

  app.post('/api/auth/confirm-email', (req, res) => {
    const { email } = req.body as { email?: string };
    const normalized = email?.trim().toLowerCase();
    const user = db.users.find((u) => u.email.toLowerCase() === normalized);
    if (!user) {
      res.status(404).json({ error: 'Account not found' });
      return;
    }
    user.emailVerified = true;
    saveDb();

    const token = crypto.randomUUID();
    sessions.set(token, user.id);
    const staffRole = db.staffRoles.find((r) => r.userId === user.id && r.active) ?? null;

    res.json({
      token,
      user: sanitizeUser(user),
      staffRole,
    });
  });

  app.get('/api/auth/me', (req, res) => {
    const { user, staffRole } = getAuthContext(req);
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    res.json({
      user: sanitizeUser(user),
      staffRole,
    });
  });

  // Public Orders
  app.post('/api/orders', (req, res) => {
    const { user } = getAuthContext(req);
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      isReservation,
      items,
    } = req.body as {
      customerName?: string;
      customerPhone?: string;
      customerEmail?: string;
      shippingAddress?: string;
      deliveryMethod?: 'delivery' | 'pickup';
      paymentMethod?: 'cod' | 'store_counter' | 'bank_transfer_ref';
      isReservation?: boolean;
      items?: Array<{
        productId: string;
        variant: string;
        quantity: number;
        engravingNote?: string;
      }>;
    };

    if (!customerName || !customerPhone || !items || items.length === 0) {
      res.status(400).json({ error: 'Customer name, phone, and at least one item are required' });
      return;
    }

    const orderItems = [];
    let subtotal = 0;

    for (const reqItem of items) {
      const product = db.products.find((p) => p.id === reqItem.productId && p.active);
      if (!product) {
        res.status(404).json({ error: `Product not found: ${reqItem.productId}` });
        return;
      }
      const qty = Math.max(1, Math.min(20, Math.floor(reqItem.quantity || 1)));
      if (product.stock < qty) {
        res.status(400).json({ error: `Insufficient stock for ${product.nameEn}` });
        return;
      }
      product.stock -= qty;
      subtotal += product.price * qty;
      orderItems.push({
        productId: product.id,
        sku: product.sku,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        variant: reqItem.variant || product.variants[0] || 'Standard',
        unitPrice: product.price,
        quantity: qty,
        imageUrl: product.imageUrl,
        engravingNote: reqItem.engravingNote?.slice(0, 60) || undefined,
      });
    }

    const method = deliveryMethod === 'pickup' ? 'pickup' : 'delivery';
    const shippingFee =
      method === 'pickup' || subtotal >= db.settings.freeShippingThreshold
        ? 0
        : db.settings.shippingFee;

    const nextNum = 1043 + db.orders.length;
    const now = new Date().toISOString();

    const defaultEmpRole = db.staffRoles.find((r) => r.role === 'employee' && r.active);
    const defaultEmpUser = defaultEmpRole
      ? db.users.find((u) => u.id === defaultEmpRole.userId)
      : null;

    const order: Order = {
      id: `ord-${crypto.randomUUID().slice(0, 8)}`,
      orderNumber: `CS-${nextNum}`,
      customerId: user?.id ?? null,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail?.trim() || user?.email || '',
      shippingAddress:
        method === 'pickup'
          ? 'Boutique Pickup — Main Gallery'
          : shippingAddress?.trim() || 'Address provided at checkout',
      deliveryMethod: method,
      paymentMethod: paymentMethod || 'cod',
      isReservation: Boolean(isReservation),
      items: orderItems,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      paidAmount: 0,
      paymentStatus: 'unpaid',
      status: 'pending',
      assignedEmployeeId: defaultEmpUser?.id ?? null,
      assignedEmployeeName: defaultEmpUser?.name ?? null,
      checklist: {
        stockVerified: false,
        qualityInspected: false,
        packaged: false,
      },
      courierNote: '',
      paymentLogs: [],
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    };

    db.orders.unshift(order);
    saveDb();

    res.status(201).json(order);
  });

  app.get('/api/orders/track/:orderNumber', (req, res) => {
    const code = req.params.orderNumber.trim().toUpperCase();
    const order = db.orders.find((o) => o.orderNumber.toUpperCase() === code);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  });

  app.get('/api/orders/my', (req, res) => {
    const { user } = getAuthContext(req);
    if (!user) {
      res.status(401).json({ error: 'Sign in required' });
      return;
    }
    const mine = db.orders.filter(
      (o) =>
        o.customerId === user.id ||
        o.customerEmail.toLowerCase() === user.email.toLowerCase()
    );
    res.json(mine);
  });

  // Workspace Bootstrap (Scoped by live Staff Role & Permissions!)
  app.get('/api/workspace/bootstrap', requireStaff(), (req, res) => {
    const { user, staffRole } = getAuthContext(req);
    if (!user || !staffRole) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const isOwner = staffRole.role === 'owner';
    const perms = staffRole.permissions;

    const visibleOrders =
      isOwner || perms.canViewAllOrders
        ? db.orders
        : perms.canViewAssignedOrders
        ? db.orders.filter((o) => o.assignedEmployeeId === user.id)
        : [];

    const customers =
      isOwner || perms.canViewFinancialReports
        ? db.users
            .filter((u) => !db.staffRoles.some((r) => r.userId === u.id))
            .map(sanitizeUser)
        : [];

    const staffMembers =
      isOwner || perms.canManageStaff
        ? db.staffRoles.map((roleRec) => {
            const u = db.users.find((usr) => usr.id === roleRec.userId);
            return {
              staffRole: roleRec,
              profile: u ? sanitizeUser(u) : null,
            };
          })
        : db.staffRoles
            .filter((r) => r.role === 'employee' && r.active)
            .map((roleRec) => {
              const u = db.users.find((usr) => usr.id === roleRec.userId);
              return {
                staffRole: roleRec,
                profile: u ? sanitizeUser(u) : null,
              };
            });

    res.json({
      myStaffRole: staffRole,
      products: db.products,
      categories: db.categories,
      inventoryLogs: isOwner || perms.canManageInventory ? db.inventoryLogs : [],
      orders: visibleOrders,
      silverPricing: db.silverPricing,
      settings: db.settings,
      customers,
      staffMembers,
    });
  });

  // Workspace: Update Order
  app.patch('/api/workspace/orders/:orderId', requireStaff(), (req, res) => {
    const { user, staffRole } = getAuthContext(req);
    if (!user || !staffRole) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const order = db.orders.find((o) => o.id === req.params.orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const isOwner = staffRole.role === 'owner';
    const perms = staffRole.permissions;

    if (!isOwner && !perms.canViewAllOrders && order.assignedEmployeeId !== user.id) {
      res.status(403).json({ error: 'Order is not assigned to you' });
      return;
    }

    const { assignedEmployeeId, checklist, status, courierNote, refundAmount } = req.body as {
      assignedEmployeeId?: string | null;
      checklist?: Partial<Order['checklist']>;
      status?: OrderStatus;
      courierNote?: string;
      refundAmount?: number;
    };

    if (assignedEmployeeId !== undefined) {
      if (!isOwner && !perms.canManageStaff) {
        res.status(403).json({ error: 'Only store owner or staff manager can reassign orders' });
        return;
      }
      if (assignedEmployeeId === null || assignedEmployeeId === '') {
        order.assignedEmployeeId = null;
        order.assignedEmployeeName = null;
      } else {
        const emp = db.users.find((u) => u.id === assignedEmployeeId);
        order.assignedEmployeeId = emp?.id ?? null;
        order.assignedEmployeeName = emp?.name ?? null;
      }
    }

    if (checklist) {
      if (!isOwner && !perms.canPrepareOrders) {
        res.status(403).json({ error: 'Permission denied: cannot prepare orders' });
        return;
      }
      order.checklist = { ...order.checklist, ...checklist };
    }

    if (courierNote !== undefined) {
      if (!isOwner && !perms.canHandleDeliveryPickup) {
        res.status(403).json({ error: 'Permission denied: cannot update delivery/pickup notes' });
        return;
      }
      order.courierNote = courierNote.slice(0, 240);
    }

    if (status && status !== order.status) {
      if (status === 'completed') {
        if (!isOwner && !perms.canCompleteOrders) {
          res.status(403).json({ error: 'Permission denied: cannot complete orders' });
          return;
        }
        order.completedAt = new Date().toISOString();
      } else if (status === 'cancelled') {
        if (!isOwner && !perms.canIssueRefunds) {
          res.status(403).json({ error: 'Permission denied: cancelling requires refund authority' });
          return;
        }
      } else if (!isOwner && !perms.canUpdateOrderStatus) {
        res.status(403).json({ error: 'Permission denied: cannot update order status' });
        return;
      }
      order.status = status;
    }

    if (typeof refundAmount === 'number' && refundAmount > 0) {
      if (!isOwner && !perms.canIssueRefunds) {
        res.status(403).json({ error: 'Permission denied: refunds are off by default' });
        return;
      }
      order.paidAmount = Math.max(0, order.paidAmount - refundAmount);
      order.paymentStatus = 'refunded';
      order.paymentLogs.push({
        id: `pay-${crypto.randomUUID().slice(0, 8)}`,
        amount: -refundAmount,
        method: 'Refund',
        recordedBy: user.name,
        recordedAt: new Date().toISOString(),
        note: 'Refund issued',
      });
    }

    order.updatedAt = new Date().toISOString();
    saveDb();
    res.json(order);
  });

  // Workspace: Record In-Store Payment
  app.post(
    '/api/workspace/orders/:orderId/payments',
    requireStaff('canRecordStorePayments'),
    (req, res) => {
      const { user } = getAuthContext(req);
      const order = db.orders.find((o) => o.id === req.params.orderId);
      if (!order || !user) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const { amount, method, note } = req.body as {
        amount?: number;
        method?: string;
        note?: string;
      };
      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        res.status(400).json({ error: 'Valid positive payment amount required' });
        return;
      }

      const entry: PaymentEntry = {
        id: `pay-${crypto.randomUUID().slice(0, 8)}`,
        amount: numericAmount,
        method: method?.trim() || 'In-Store Counter',
        recordedBy: user.name,
        recordedAt: new Date().toISOString(),
        note: note?.trim(),
      };

      order.paymentLogs.push(entry);
      order.paidAmount = Math.min(order.total, order.paidAmount + numericAmount);
      order.paymentStatus =
        order.paidAmount >= order.total
          ? 'paid'
          : order.paidAmount > 0
          ? 'partial'
          : 'unpaid';
      order.updatedAt = new Date().toISOString();
      saveDb();

      res.json(order);
    }
  );

  // Workspace: Products CRUD (Add, Edit, Delete separately gated)
  app.post('/api/workspace/products', requireStaff('canAddProducts', 'canEditProducts'), (req, res) => {
    const body = req.body as Partial<Product>;
    if (!body.nameAr || !body.nameEn || !body.category) {
      res.status(400).json({ error: 'Product Arabic name, English name, and category required' });
      return;
    }

    const useSilverPricing = Boolean(body.useSilverPricing);
    const weightGrams = Number(body.weightGrams || 0);
    const makingCharge = Number(body.makingCharge || 0);
    const computedPrice = useSilverPricing
      ? Math.round(weightGrams * db.silverPricing.silver925PerGram + makingCharge)
      : Number(body.price || 0);

    const newProduct: Product = {
      id: `prod-${crypto.randomUUID().slice(0, 8)}`,
      sku: body.sku?.trim() || `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: (body.nameEn || 'item')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      nameAr: body.nameAr.trim(),
      nameEn: body.nameEn.trim(),
      descriptionAr: body.descriptionAr?.trim() || '',
      descriptionEn: body.descriptionEn?.trim() || '',
      category: body.category,
      material: body.material || 'silver_925',
      imageUrl: body.imageUrl || '/src/assets/images/product_silver_ring_1794604055973.jpg',
      weightGrams: useSilverPricing ? weightGrams : undefined,
      makingCharge: useSilverPricing ? makingCharge : undefined,
      useSilverPricing,
      price: Math.max(0, computedPrice),
      stock: Math.max(0, Number(body.stock ?? 5)),
      variants: body.variants && body.variants.length > 0 ? body.variants : ['Standard'],
      featured: Boolean(body.featured),
      active: true,
      createdAt: new Date().toISOString(),
    };

    db.products.unshift(newProduct);
    saveDb();
    res.status(201).json(newProduct);
  });

  app.post('/api/workspace/products/import-csv', requireStaff('canAddProducts', 'canEditProducts'), (req, res) => {
    const { items } = req.body as {
      items?: Array<{
        sku?: string;
        nameAr: string;
        nameEn: string;
        category: string;
        material: 'silver_925' | 'silver_rhodium' | 'full_grain_leather';
        weightGrams?: number;
        price?: number;
        stock?: number;
      }>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'No valid CSV items supplied' });
      return;
    }

    const imageByCat: Record<string, string> = {
      rings: '/src/assets/images/product_silver_ring_1794604055973.jpg',
      necklaces: '/src/assets/images/product_silver_necklace_1794604056451.jpg',
      bracelets_earrings: '/src/assets/images/product_silver_bracelet_earrings_1794604056472.jpg',
      evening_bags: '/src/assets/images/product_evening_clutch_1794604057272.jpg',
      tote_bags: '/src/assets/images/product_leather_tote_1794604057749.jpg',
    };

    const created: Product[] = [];
    for (const row of items.slice(0, 50)) {
      if (!row.nameAr || !row.nameEn) continue;
      const isSilver = row.material !== 'full_grain_leather';
      const weight = Number(row.weightGrams || 0);
      const making = isSilver ? Math.round(weight * db.silverPricing.defaultMakingChargePerGram) : 0;
      const price = isSilver && weight > 0
        ? Math.round(weight * db.silverPricing.silver925PerGram + making)
        : Math.max(0, Number(row.price || 1500));

      const p: Product = {
        id: `prod-${crypto.randomUUID().slice(0, 8)}`,
        sku: row.sku?.trim() || `CS-CSV-${Math.floor(100 + Math.random() * 900)}`,
        slug: row.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        nameAr: row.nameAr.trim(),
        nameEn: row.nameEn.trim(),
        descriptionAr: 'مستورد عبر ملف CSV للكتالوج.',
        descriptionEn: 'Imported via catalog CSV batch tool.',
        category: row.category || 'rings',
        material: row.material || 'silver_925',
        imageUrl: imageByCat[row.category] || '/src/assets/images/product_silver_ring_1794604055973.jpg',
        weightGrams: isSilver && weight > 0 ? weight : undefined,
        makingCharge: isSilver && weight > 0 ? making : undefined,
        useSilverPricing: isSilver && weight > 0,
        price,
        stock: Math.max(0, Number(row.stock ?? 5)),
        variants: ['Standard'],
        featured: false,
        active: true,
        createdAt: new Date().toISOString(),
      };
      db.products.unshift(p);
      created.push(p);
    }

    saveDb();
    res.status(201).json({ importedCount: created.length, products: created });
  });

  app.patch('/api/workspace/products/:productId', requireStaff('canEditProducts'), (req, res) => {
    const product = db.products.find((p) => p.id === req.params.productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const updates = req.body as Partial<Product>;
    Object.assign(product, {
      ...(updates.nameAr !== undefined ? { nameAr: updates.nameAr } : {}),
      ...(updates.nameEn !== undefined ? { nameEn: updates.nameEn } : {}),
      ...(updates.descriptionAr !== undefined ? { descriptionAr: updates.descriptionAr } : {}),
      ...(updates.descriptionEn !== undefined ? { descriptionEn: updates.descriptionEn } : {}),
      ...(updates.category !== undefined ? { category: updates.category } : {}),
      ...(updates.stock !== undefined ? { stock: Math.max(0, Number(updates.stock)) } : {}),
      ...(updates.price !== undefined ? { price: Math.max(0, Number(updates.price)) } : {}),
      ...(updates.weightGrams !== undefined ? { weightGrams: Number(updates.weightGrams) } : {}),
      ...(updates.makingCharge !== undefined ? { makingCharge: Number(updates.makingCharge) } : {}),
      ...(updates.active !== undefined ? { active: Boolean(updates.active) } : {}),
      ...(updates.featured !== undefined ? { featured: Boolean(updates.featured) } : {}),
    });

    if (product.useSilverPricing && product.weightGrams) {
      product.price = Math.round(
        product.weightGrams * db.silverPricing.silver925PerGram + (product.makingCharge || 0)
      );
    }

    saveDb();
    res.json(product);
  });

  app.delete('/api/workspace/products/:productId', requireStaff('canDeleteProducts'), (req, res) => {
    const idx = db.products.findIndex((p) => p.id === req.params.productId);
    if (idx === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    db.products.splice(idx, 1);
    saveDb();
    res.json({ deleted: true });
  });

  // Workspace: Inventory Adjustment with Audit Log
  app.post('/api/workspace/inventory/adjust', requireStaff('canManageInventory', 'canEditProducts'), (req, res) => {
    const { user } = getAuthContext(req);
    const { productId, delta, reason } = req.body as {
      productId?: string;
      delta?: number;
      reason?: string;
    };
    const product = db.products.find((p) => p.id === productId);
    if (!product || !user) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const numericDelta = Math.trunc(Number(delta || 0));
    product.stock = Math.max(0, product.stock + numericDelta);

    const log: InventoryLog = {
      id: `inv-${crypto.randomUUID().slice(0, 8)}`,
      productId: product.id,
      sku: product.sku,
      productNameAr: product.nameAr,
      productNameEn: product.nameEn,
      delta: numericDelta,
      newStock: product.stock,
      reason: reason?.trim() || 'Manual stock adjustment',
      actorName: user.name,
      createdAt: new Date().toISOString(),
    };
    db.inventoryLogs.unshift(log);
    saveDb();
    res.json({ product, log });
  });

  // Workspace: Categories CRUD
  app.post('/api/workspace/categories', requireStaff('canManageCategories'), (req, res) => {
    const { slug, nameAr, nameEn, descriptionAr, descriptionEn } = req.body as Partial<CategoryRecord>;
    if (!nameAr || !nameEn) {
      res.status(400).json({ error: 'Arabic and English category names are required' });
      return;
    }
    const finalSlug =
      slug?.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_') ||
      nameEn.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');

    const newCat: CategoryRecord = {
      id: `cat-${crypto.randomUUID().slice(0, 6)}`,
      slug: finalSlug,
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim(),
      descriptionAr: descriptionAr?.trim() || '',
      descriptionEn: descriptionEn?.trim() || '',
      active: true,
      sortOrder: db.categories.length + 1,
    };
    db.categories.push(newCat);
    saveDb();
    res.status(201).json(newCat);
  });

  app.patch('/api/workspace/categories/:catId', requireStaff('canManageCategories'), (req, res) => {
    const cat = db.categories.find((c) => c.id === req.params.catId);
    if (!cat) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    Object.assign(cat, req.body);
    saveDb();
    res.json(cat);
  });

  app.delete('/api/workspace/categories/:catId', requireStaff('canManageCategories'), (req, res) => {
    const idx = db.categories.findIndex((c) => c.id === req.params.catId);
    if (idx === -1) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    db.categories.splice(idx, 1);
    saveDb();
    res.json({ deleted: true });
  });

  // Workspace: Silver 925 Pricing Engine
  app.patch('/api/workspace/silver-pricing', requireStaff('canEditSilverPricing'), (req, res) => {
    const { user } = getAuthContext(req);
    const { silver925PerGram, defaultMakingChargePerGram, recalculateCatalog } = req.body as {
      silver925PerGram?: number;
      defaultMakingChargePerGram?: number;
      recalculateCatalog?: boolean;
    };

    if (typeof silver925PerGram === 'number' && silver925PerGram > 0) {
      db.silverPricing.silver925PerGram = silver925PerGram;
    }
    if (typeof defaultMakingChargePerGram === 'number' && defaultMakingChargePerGram >= 0) {
      db.silverPricing.defaultMakingChargePerGram = defaultMakingChargePerGram;
    }
    db.silverPricing.updatedAt = new Date().toISOString();
    db.silverPricing.updatedBy = user?.name || 'Owner';

    if (recalculateCatalog) {
      for (const prod of db.products) {
        if (prod.useSilverPricing && prod.weightGrams) {
          prod.price = Math.round(
            prod.weightGrams * db.silverPricing.silver925PerGram + (prod.makingCharge || 0)
          );
        }
      }
    }

    saveDb();
    res.json({
      silverPricing: db.silverPricing,
      products: db.products,
    });
  });

  // Workspace: Create Employee & Separate Staff Role Record
  app.post('/api/workspace/employees', requireStaff('canManageStaff'), (req, res) => {
    const { name, email, phone, password, titleAr, titleEn } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      titleAr?: string;
      titleEn?: string;
    };

    if (!name || !email) {
      res.status(400).json({ error: 'Employee name and email required' });
      return;
    }
    const normalized = email.trim().toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    const now = new Date().toISOString();
    const newUser: StoredUser = {
      id: `user-emp-${crypto.randomUUID().slice(0, 6)}`,
      name: name.trim(),
      email: normalized,
      phone: phone?.trim() || '+20 100 000 0000',
      address: 'Boutique Staff',
      emailVerified: true,
      authProvider: 'email',
      passwordHash: hashPassword(password || 'Staff925!'),
      createdAt: now,
    };

    const newRole: StaffRoleRecord = {
      userId: newUser.id,
      role: 'employee',
      titleAr: titleAr?.trim() || 'موظف مبيعات وتجهيز',
      titleEn: titleEn?.trim() || 'Boutique Sales Associate',
      active: true,
      permissions: { ...DEFAULT_EMPLOYEE_PERMISSIONS },
      updatedAt: now,
    };

    db.users.push(newUser);
    db.staffRoles.push(newRole);
    saveDb();

    res.status(201).json({
      profile: sanitizeUser(newUser),
      staffRole: newRole,
    });
  });

  // Workspace: Staff Permissions Management
  app.patch('/api/workspace/staff/:userId/permissions', requireStaff('canManageStaff'), (req, res) => {
    const targetRole = db.staffRoles.find((r) => r.userId === req.params.userId);
    if (!targetRole) {
      res.status(404).json({ error: 'Staff role not found' });
      return;
    }
    if (targetRole.role === 'owner') {
      res.status(400).json({ error: 'Owner permissions cannot be restricted' });
      return;
    }

    const { permissions, active, titleAr, titleEn } = req.body as {
      permissions?: Partial<StaffPermissions>;
      active?: boolean;
      titleAr?: string;
      titleEn?: string;
    };

    if (permissions) {
      targetRole.permissions = {
        ...targetRole.permissions,
        ...permissions,
      };
    }
    if (typeof active === 'boolean') {
      targetRole.active = active;
    }
    if (titleAr !== undefined) targetRole.titleAr = titleAr;
    if (titleEn !== undefined) targetRole.titleEn = titleEn;
    targetRole.updatedAt = new Date().toISOString();
    saveDb();

    res.json(targetRole);
  });

  // Workspace: Store Settings
  app.patch('/api/workspace/settings', requireStaff('canManageStaff'), (req, res) => {
    const updates = req.body as Partial<StoreSettings>;
    db.settings = { ...db.settings, ...updates };
    saveDb();
    res.json(db.settings);
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use('/src/assets/images', express.static(path.resolve(process.cwd(), 'src/assets/images')));
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT || 3000);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`City Silver 925 & Bags server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
