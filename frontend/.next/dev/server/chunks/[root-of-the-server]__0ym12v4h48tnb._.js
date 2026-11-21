module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storeDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storeDb.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storeDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const sessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storeDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessions"])();
    const { email, password, demoRole } = await req.json();
    let user;
    if (demoRole) {
        const roleEmails = {
            owner: 'owner@citysilver925.demo',
            employee1: 'karim@citysilver925.demo',
            employee2: 'sara@citysilver925.demo',
            customer: 'customer@citysilver925.demo',
            google_customer: 'customer@citysilver925.demo'
        };
        user = db.users.find((u)=>u.email === roleEmails[demoRole]);
    } else if (email && password) {
        const normalized = email.trim().toLowerCase();
        user = db.users.find((u)=>u.email.toLowerCase() === normalized);
        if (!user || user.passwordHash !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storeDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(password)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid email or password'
            }, {
                status: 401
            });
        }
        if (!user.emailVerified) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email confirmation required before sign-in',
                needsVerification: true,
                email: user.email
            }, {
                status: 403
            });
        }
    }
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing credentials'
        }, {
            status: 400
        });
    }
    const token = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID();
    sessions.set(token, user.id);
    const staffRole = db.staffRoles.find((r)=>r.userId === user.id && r.active) ?? null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        token,
        user: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storeDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeUser"])(user),
        staffRole
    });
}
}),
"[project]/src/lib/storeDb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_EMPLOYEE_PERMISSIONS",
    ()=>DEFAULT_EMPLOYEE_PERMISSIONS,
    "OWNER_PERMISSIONS",
    ()=>OWNER_PERMISSIONS,
    "getAuthContextFromRequest",
    ()=>getAuthContextFromRequest,
    "getDb",
    ()=>getDb,
    "getPublicStorefront",
    ()=>getPublicStorefront,
    "getSessions",
    ()=>getSessions,
    "hashPassword",
    ()=>hashPassword,
    "requireStaffFromRequest",
    ()=>requireStaffFromRequest,
    "sanitizeUser",
    ()=>sanitizeUser,
    "saveDb",
    ()=>saveDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), 'data');
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'store.json');
const DEFAULT_EMPLOYEE_PERMISSIONS = {
    canViewAssignedOrders: true,
    canViewAllOrders: false,
    canPrepareOrders: true,
    canUpdateOrderStatus: true,
    canHandleDeliveryPickup: true,
    canRecordStorePayments: true,
    canCompleteOrders: true,
    canAddProducts: false,
    canEditProducts: false,
    canManageCategories: false,
    canManageInventory: false,
    canDeleteProducts: false,
    canIssueRefunds: false,
    canEditSilverPricing: false,
    canViewFinancialReports: false,
    canManageStaff: false
};
const OWNER_PERMISSIONS = {
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
    canManageStaff: true
};
const SEED_CATEGORIES = [
    {
        id: 'cat-1',
        slug: 'rings',
        nameAr: 'خواتم فضة 925',
        nameEn: '925 Silver Rings',
        descriptionAr: 'خواتم سيجنت وسوليتير مصاغة من الفضة الإسترليني عيار 925.',
        descriptionEn: 'Hand-finished signet and solitaire rings in 925 sterling silver.',
        active: true,
        sortOrder: 1
    },
    {
        id: 'cat-2',
        slug: 'necklaces',
        nameAr: 'قلائد وسلاسل',
        nameEn: 'Necklaces & Chains',
        descriptionAr: 'سلاسل إيطالية ودلايات فضة 925 بتشطيب بلاتيني.',
        descriptionEn: 'Italian herringbone chains and sculpted pendants in 925 silver.',
        active: true,
        sortOrder: 2
    },
    {
        id: 'cat-3',
        slug: 'bracelets_earrings',
        nameAr: 'أساور وأقراط',
        nameEn: 'Bracelets & Earrings',
        descriptionAr: 'أساور كاف مفصلية وأقراط هندسية خفيفة.',
        descriptionEn: 'Hinged cuff bangles and geometric hoop earrings.',
        active: true,
        sortOrder: 3
    },
    {
        id: 'cat-4',
        slug: 'evening_bags',
        nameAr: 'حقائب سهرة',
        nameEn: 'Evening Bags',
        descriptionAr: 'حقائب جلدية مهيكلة للمناسبات بأقفال فضية مصقولة.',
        descriptionEn: 'Structured leather evening silhouettes with silver-tone clasps.',
        active: true,
        sortOrder: 4
    },
    {
        id: 'cat-5',
        slug: 'tote_bags',
        nameAr: 'حقائب توت وكروس',
        nameEn: 'Totes & Crossbody',
        descriptionAr: 'حقائب يومية جلد طبيعي بإكسسوارات بلاتينية.',
        descriptionEn: 'Architectural pebbled calfskin totes and crossbody bags.',
        active: true,
        sortOrder: 5
    }
];
function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(`city-silver-925:${password}`).digest('hex');
}
function normalizeImagePath(url) {
    if (!url) return '/images/product_silver_ring_1794604055973.jpg';
    return url.replace('/src/assets/images/', '/images/');
}
function createSeedDatabase() {
    const now = new Date().toISOString();
    const silver925PerGram = 85;
    const products = [
        {
            id: 'prod-1',
            sku: 'CS-RNG-9251',
            slug: 'royal-signet-925-ring',
            nameAr: 'خاتم سيجنت ملكي فضة 925',
            nameEn: 'Royal Signet 925 Ring',
            descriptionAr: 'خاتم سيجنت مصقول يدوياً من الفضة الإسترليني عيار 925 بلمسة غير لامعة وحواف هندسية متوازنة.',
            descriptionEn: 'Hand-finished 925 sterling silver signet ring with satin brushed face and architectural bevels.',
            category: 'rings',
            material: 'silver_925',
            imageUrl: '/images/product_silver_ring_1794604055973.jpg',
            weightGrams: 14.5,
            makingCharge: 650,
            useSilverPricing: true,
            price: Math.round(14.5 * silver925PerGram + 650),
            stock: 14,
            variants: [
                '54 / 7 US',
                '57 / 8 US',
                '60 / 9 US',
                '62 / 10 US'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-2',
            sku: 'CS-RNG-9252',
            slug: 'solitaire-platinum-band-925',
            nameAr: 'خاتم سوليتير مطلي بلاتين 925',
            nameEn: 'Solitaire Rhodium 925 Band',
            descriptionAr: 'تصميم أنيق رفيع من الفضة الإيطالية 925 مطلي بالروديوم الفاخر مع فص زركون نقي عالي البريق.',
            descriptionEn: 'Refined rhodium-plated 925 sterling silver solitaire ring set with precision-cut cubic zirconia.',
            category: 'rings',
            material: 'silver_rhodium',
            imageUrl: '/images/product_silver_ring_1794604055973.jpg',
            weightGrams: 6.2,
            makingCharge: 520,
            useSilverPricing: true,
            price: Math.round(6.2 * silver925PerGram + 520),
            stock: 9,
            variants: [
                '52 / 6 US',
                '54 / 7 US',
                '57 / 8 US'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-3',
            sku: 'CS-NCK-9253',
            slug: 'herringbone-drop-necklace-925',
            nameAr: 'قلادة هيرينغبون فضة 925 بدلاية انسيابية',
            nameEn: 'Herringbone Drop 925 Necklace',
            descriptionAr: 'سلسلة هيرينغبون مرنة من الفضة عيار 925 تنسدل بسلاسة على الرقبة مع دلاية منحوتة وفص مضيء.',
            descriptionEn: 'Fluid Italian herringbone 925 sterling silver chain paired with a sculpted drop pendant.',
            category: 'necklaces',
            material: 'silver_925',
            imageUrl: '/images/product_silver_necklace_1794604056451.jpg',
            weightGrams: 18.0,
            makingCharge: 890,
            useSilverPricing: true,
            price: Math.round(18.0 * silver925PerGram + 890),
            stock: 7,
            variants: [
                '42 cm',
                '45 cm',
                '50 cm'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-4',
            sku: 'CS-NCK-9254',
            slug: 'obsidian-slate-collar-chain',
            nameAr: 'سلسلة ياقة مسطحة فضة إيطالي 925',
            nameEn: 'Flat Collar Chain 925',
            descriptionAr: 'سلسلة مسطحة عاكسة للضوء من الفضة الخالصة عيار 925 مثالية للارتداء المنفرد أو الطبقات.',
            descriptionEn: 'Mirror-finish flat collar chain crafted in solid 925 sterling silver for solo or layered styling.',
            category: 'necklaces',
            material: 'silver_rhodium',
            imageUrl: '/images/product_silver_necklace_1794604056451.jpg',
            weightGrams: 22.5,
            makingCharge: 940,
            useSilverPricing: true,
            price: Math.round(22.5 * silver925PerGram + 940),
            stock: 4,
            variants: [
                '40 cm',
                '45 cm'
            ],
            featured: false,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-5',
            sku: 'CS-BRC-9255',
            slug: 'sculpted-hinged-cuff-925',
            nameAr: 'أسورة كاف مفصلية فضة 925',
            nameEn: 'Sculpted Hinged Cuff 925',
            descriptionAr: 'أسورة صلبة بآلية قفل مخفية مصقولة كالمرآة من الفضة 925 المختومة بختم العيار.',
            descriptionEn: 'Architectural solid hinged cuff bangle in mirror-polished 925 sterling silver with concealed clasp.',
            category: 'bracelets_earrings',
            material: 'silver_925',
            imageUrl: '/images/product_silver_bracelet_earrings_1794604056472.jpg',
            weightGrams: 28.0,
            makingCharge: 1100,
            useSilverPricing: true,
            price: Math.round(28.0 * silver925PerGram + 1100),
            stock: 6,
            variants: [
                'Small 16cm',
                'Medium 17.5cm',
                'Large 19cm'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-6',
            sku: 'CS-EAR-9256',
            slug: 'architectural-hoops-925',
            nameAr: 'أقراط هوب هندسية فضة 925',
            nameEn: 'Architectural Silver Hoops 925',
            descriptionAr: 'أقراط حلقية بزوايا ناعمة من الفضة عيار 925 خفيفة الوزن ومريحة للارتداء اليومي.',
            descriptionEn: 'Faceted geometric hoop earrings in solid 925 sterling silver with snap-lock hinge.',
            category: 'bracelets_earrings',
            material: 'silver_rhodium',
            imageUrl: '/images/product_silver_bracelet_earrings_1794604056472.jpg',
            weightGrams: 9.4,
            makingCharge: 580,
            useSilverPricing: true,
            price: Math.round(9.4 * silver925PerGram + 580),
            stock: 18,
            variants: [
                '18 mm',
                '24 mm'
            ],
            featured: false,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-7',
            sku: 'CS-BAG-201',
            slug: 'obsidian-clasp-evening-bag',
            nameAr: 'حقيبة سهرة جلد طبيعي أسود بقفل فضي',
            nameEn: 'Obsidian Silver-Clasp Bag',
            descriptionAr: 'حقيبة سهرة مهيكلة من الجلد الطبيعي المحبب باللون الأسود الداكن مع قفل معدني مصقول بلون الفضة وحزام كتف قابل للإزالة.',
            descriptionEn: 'Structured full-grain obsidian leather evening bag featuring a geometric brushed-silver clasp and detachable strap.',
            category: 'evening_bags',
            material: 'full_grain_leather',
            useSilverPricing: false,
            imageUrl: '/images/product_evening_clutch_1794604057272.jpg',
            price: 3850,
            stock: 5,
            variants: [
                'Obsidian Black',
                'Charcoal'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-8',
            sku: 'CS-BAG-202',
            slug: 'taupe-atelier-crossbody-tote',
            nameAr: 'حقيبة توت جلد رمادي دافئ مع حزام كروس',
            nameEn: 'Atelier Taupe Crossbody Tote',
            descriptionAr: 'حقيبة يومية فاخرة من الجلد المرن بلون توب رمادي مع إكسسوارات فضية مصقولة ومساحة داخلية منظمة.',
            descriptionEn: 'Architectural pebbled calfskin tote in warm taupe-gray with polished silver hardware and adjustable crossbody strap.',
            category: 'tote_bags',
            material: 'full_grain_leather',
            useSilverPricing: false,
            imageUrl: '/images/product_leather_tote_1794604057749.jpg',
            price: 4200,
            stock: 8,
            variants: [
                'Warm Taupe',
                'Platinum Gray'
            ],
            featured: true,
            active: true,
            createdAt: now
        },
        {
            id: 'prod-9',
            sku: 'CS-BAG-203',
            slug: 'atelier-charcoal-top-handle',
            nameAr: 'حقيبة أتيليه فحمية بمقبض علوي وقفل بلاتيني',
            nameEn: 'Charcoal Atelier Top-Handle',
            descriptionAr: 'إصدار مميز يجمع بين الجلد الفحمي الفاخر والقفل البلاتيني المصقول لتناسب المناسبات الرسمية والعملية.',
            descriptionEn: 'Signature charcoal leather top-handle silhouette finished with platinum-tone turn-lock hardware.',
            category: 'evening_bags',
            material: 'full_grain_leather',
            useSilverPricing: false,
            imageUrl: '/images/hero_silver_atelier_1794604055421.jpg',
            price: 4650,
            stock: 3,
            variants: [
                'Deep Charcoal'
            ],
            featured: false,
            active: true,
            createdAt: now
        }
    ];
    const ownerUser = {
        id: 'user-owner',
        name: 'ليلى المنصور | Laila Al-Mansour',
        email: 'owner@citysilver925.demo',
        phone: '+20 100 000 0001',
        address: 'Boutique HQ — Demo District',
        emailVerified: true,
        authProvider: 'workspace_demo',
        passwordHash: hashPassword('Owner925!'),
        createdAt: now
    };
    const emp1User = {
        id: 'user-emp-1',
        name: 'كريم حسن | Karim Hassan',
        email: 'karim@citysilver925.demo',
        phone: '+20 100 000 0002',
        address: 'Boutique Floor A',
        emailVerified: true,
        authProvider: 'workspace_demo',
        passwordHash: hashPassword('Staff925!'),
        createdAt: now
    };
    const emp2User = {
        id: 'user-emp-2',
        name: 'سارة نبيل | Sara Nabil',
        email: 'sara@citysilver925.demo',
        phone: '+20 100 000 0003',
        address: 'Fulfillment Desk',
        emailVerified: true,
        authProvider: 'workspace_demo',
        passwordHash: hashPassword('Staff925!'),
        createdAt: now
    };
    const customerUser = {
        id: 'user-cust-1',
        name: 'نور الهدى | Nour El-Hoda',
        email: 'customer@citysilver925.demo',
        phone: '+20 100 000 0009',
        address: '14 Al-Horreya Axis, Demo City',
        emailVerified: true,
        authProvider: 'email',
        passwordHash: hashPassword('Customer925!'),
        createdAt: now
    };
    const staffRoles = [
        {
            userId: ownerUser.id,
            role: 'owner',
            titleAr: 'مالك المتجر والمدير العام',
            titleEn: 'Store Owner & General Admin',
            active: true,
            permissions: {
                ...OWNER_PERMISSIONS
            },
            updatedAt: now
        },
        {
            userId: emp1User.id,
            role: 'employee',
            titleAr: 'أخصائي مبيعات وتجهيز الطلبات',
            titleEn: 'Boutique Sales & Order Specialist',
            active: true,
            permissions: {
                ...DEFAULT_EMPLOYEE_PERMISSIONS
            },
            updatedAt: now
        },
        {
            userId: emp2User.id,
            role: 'employee',
            titleAr: 'منسقة التغليف والتسليم',
            titleEn: 'Packaging & Dispatch Coordinator',
            active: true,
            permissions: {
                ...DEFAULT_EMPLOYEE_PERMISSIONS,
                canRecordStorePayments: false
            },
            updatedAt: now
        }
    ];
    const orders = [
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
                    engravingNote: 'N.H'
                },
                {
                    productId: products[6].id,
                    sku: products[6].sku,
                    nameAr: products[6].nameAr,
                    nameEn: products[6].nameEn,
                    variant: 'Obsidian Black',
                    unitPrice: products[6].price,
                    quantity: 1,
                    imageUrl: products[6].imageUrl
                }
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
                packaged: false
            },
            courierNote: '',
            paymentLogs: [],
            createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
            completedAt: null
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
                    imageUrl: products[4].imageUrl
                }
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
                packaged: false
            },
            courierNote: 'Client arrives 6:00 PM for boutique pickup',
            paymentLogs: [
                {
                    id: 'pay-1',
                    amount: 1000,
                    method: 'Reservation Deposit (Counter)',
                    recordedBy: ownerUser.name,
                    recordedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
                    note: 'Initial reservation deposit'
                }
            ],
            createdAt: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            completedAt: null
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
                    imageUrl: products[2].imageUrl
                }
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
                packaged: true
            },
            courierNote: 'Delivered & signed by recipient',
            paymentLogs: [
                {
                    id: 'pay-2',
                    amount: products[2].price + 80,
                    method: 'COD Settlement',
                    recordedBy: ownerUser.name,
                    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
                }
            ],
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
        }
    ];
    const inventoryLogs = [
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
            createdAt: now
        }
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
            updatedBy: ownerUser.name
        },
        settings: {
            storeNameAr: 'سيتي سيلفر 925 والحقائب',
            storeNameEn: 'City Silver 925 & Bags',
            shippingFee: 85,
            freeShippingThreshold: 3000,
            pickupAvailable: true,
            codAvailable: true,
            illustrativeNoticeAr: 'تنويه: المنتجات والأسعار وأسعار الفضة المعروضة توضيحية فقط ولا يتصل المتجر ببوابة دفع حقيقية.',
            illustrativeNoticeEn: 'Illustrative catalog: sample items, silver rates, and app-managed checkout (no live payment gateway connected).'
        },
        users: [
            ownerUser,
            emp1User,
            emp2User,
            customerUser
        ],
        staffRoles,
        orders
    };
}
function migrateDb(parsed) {
    const seed = createSeedDatabase();
    const migratedProducts = (parsed.products || seed.products).map((p)=>({
            ...p,
            imageUrl: normalizeImagePath(p.imageUrl)
        }));
    const migratedOrders = (parsed.orders || seed.orders).map((o)=>({
            ...o,
            items: (o.items || []).map((it)=>({
                    ...it,
                    imageUrl: normalizeImagePath(it.imageUrl)
                }))
        }));
    const migratedStaffRoles = (parsed.staffRoles || seed.staffRoles).map((r)=>({
            ...r,
            permissions: r.role === 'owner' ? {
                ...OWNER_PERMISSIONS
            } : {
                ...DEFAULT_EMPLOYEE_PERMISSIONS,
                ...r.permissions
            }
        }));
    return {
        products: migratedProducts,
        categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : seed.categories,
        inventoryLogs: parsed.inventoryLogs || seed.inventoryLogs,
        silverPricing: parsed.silverPricing || seed.silverPricing,
        settings: parsed.settings || seed.settings,
        users: parsed.users || seed.users,
        staffRoles: migratedStaffRoles,
        orders: migratedOrders
    };
}
function loadDb() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
            recursive: true
        });
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(DB_PATH)) {
        const seed = createSeedDatabase();
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
        return seed;
    }
    try {
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(DB_PATH, 'utf8');
        const migrated = migrateDb(JSON.parse(raw));
        return migrated;
    } catch  {
        const seed = createSeedDatabase();
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
        return seed;
    }
}
const globalForStore = globalThis;
function getDb() {
    if (!globalForStore.__citySilverDb) {
        globalForStore.__citySilverDb = loadDb();
    }
    return globalForStore.__citySilverDb;
}
function getSessions() {
    if (!globalForStore.__citySilverSessions) {
        globalForStore.__citySilverSessions = new Map();
    }
    return globalForStore.__citySilverSessions;
}
function saveDb() {
    const db = getDb();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
            recursive: true
        });
    }
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}
function sanitizeUser(user) {
    const { passwordHash: _ignored, ...profile } = user;
    return profile;
}
function getPublicStorefront() {
    const db = getDb();
    return {
        products: db.products.filter((p)=>p.active),
        categories: db.categories.filter((c)=>c.active).sort((a, b)=>a.sortOrder - b.sortOrder),
        silverPricing: db.silverPricing,
        settings: db.settings
    };
}
function getAuthContextFromRequest(req) {
    const header = req.headers.get('authorization');
    if (!header || !header.startsWith('Bearer ')) {
        return {
            user: null,
            staffRole: null
        };
    }
    const token = header.slice('Bearer '.length).trim();
    const userId = getSessions().get(token);
    if (!userId) {
        return {
            user: null,
            staffRole: null
        };
    }
    const db = getDb();
    const user = db.users.find((u)=>u.id === userId) ?? null;
    if (!user) {
        return {
            user: null,
            staffRole: null
        };
    }
    const staffRole = db.staffRoles.find((r)=>r.userId === user.id && r.active) ?? null;
    return {
        user,
        staffRole
    };
}
function requireStaffFromRequest(req, ...anyPermissionKeys) {
    const { user, staffRole } = getAuthContextFromRequest(req);
    if (!user || !staffRole) {
        return {
            ok: false,
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Staff authentication required'
            }, {
                status: 401
            })
        };
    }
    if (staffRole.role === 'owner') {
        return {
            ok: true,
            user,
            staffRole
        };
    }
    if (anyPermissionKeys.length > 0 && !anyPermissionKeys.some((key)=>staffRole.permissions[key])) {
        return {
            ok: false,
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Permission denied: requires ${anyPermissionKeys.join(' or ')}`
            }, {
                status: 403
            })
        };
    }
    return {
        ok: true,
        user,
        staffRole
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ym12v4h48tnb._.js.map