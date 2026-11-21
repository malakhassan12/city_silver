(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/EmployeeWorkspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmployeeWorkspace",
    ()=>EmployeeWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/boxes.js [app-client] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$tree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderTree$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-tree.js [app-client] (ecmascript) <export default as FolderTree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoreContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/StoreContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function EmployeeWorkspace() {
    _s();
    const { lang, t, session, loginDemoRole, openAuthModal, syncStaffRole, refreshStorefront } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoreContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('orders');
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inventoryLogs, setInventoryLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [silverPricing, setSilverPricing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedOrderId, setSelectedOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [actionMsg, setActionMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [courierNote, setCourierNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [payAmount, setPayAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [payMethod, setPayMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('In-Store Cash Counter');
    // Delegated Product creation state (only visible when Owner grants canAddProducts / canEditProducts)
    const [newProdNameAr, setNewProdNameAr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newProdNameEn, setNewProdNameEn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newProdCat, setNewProdCat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('rings');
    const [newProdMat, setNewProdMat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('silver_925');
    const [newProdWeight, setNewProdWeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('10');
    const [newProdPrice, setNewProdPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1500');
    const [newProdStock, setNewProdStock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('5');
    const [newCatNameAr, setNewCatNameAr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newCatNameEn, setNewCatNameEn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [gramRateInput, setGramRateInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('85');
    const [makingInput, setMakingInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('35');
    const staffRole = session?.staffRole;
    const isStaff = Boolean(staffRole);
    const perms = staffRole?.permissions;
    const isOwner = staffRole?.role === 'owner';
    const fetchWorkspace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmployeeWorkspace.useCallback[fetchWorkspace]": async (silent = false)=>{
            if (!session?.token || !staffRole) return;
            if (!silent) setLoading(true);
            try {
                const res = await fetch('/api/workspace/bootstrap', {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to load workspace');
                // Live-sync permissions granted or revoked by Store Owner!
                if (data.myStaffRole) {
                    syncStaffRole(data.myStaffRole);
                }
                const list = data.orders || [];
                setOrders(list);
                setProducts(data.products || []);
                setCategories(data.categories || []);
                setInventoryLogs(data.inventoryLogs || []);
                setSilverPricing(data.silverPricing || null);
                if (data.silverPricing && !silent) {
                    setGramRateInput(String(data.silverPricing.silver925PerGram));
                    setMakingInput(String(data.silverPricing.defaultMakingChargePerGram));
                }
                if (list.length > 0 && !list.some({
                    "EmployeeWorkspace.useCallback[fetchWorkspace]": (o)=>o.id === selectedOrderId
                }["EmployeeWorkspace.useCallback[fetchWorkspace]"])) {
                    setSelectedOrderId(list[0].id);
                }
            } catch (err) {
                if (!silent) {
                    setErrorMsg(err instanceof Error ? err.message : 'Error loading workspace');
                }
            } finally{
                if (!silent) setLoading(false);
            }
        }
    }["EmployeeWorkspace.useCallback[fetchWorkspace]"], [
        session?.token,
        staffRole,
        selectedOrderId,
        syncStaffRole
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmployeeWorkspace.useEffect": ()=>{
            fetchWorkspace(false);
        }
    }["EmployeeWorkspace.useEffect"], [
        fetchWorkspace
    ]);
    // Real-time permission sync every 3 seconds so Owner grants unlock tabs immediately!
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmployeeWorkspace.useEffect": ()=>{
            if (!session?.token || !staffRole) return;
            const timer = setInterval({
                "EmployeeWorkspace.useEffect.timer": ()=>{
                    fetchWorkspace(true);
                }
            }["EmployeeWorkspace.useEffect.timer"], 3000);
            return ({
                "EmployeeWorkspace.useEffect": ()=>clearInterval(timer)
            })["EmployeeWorkspace.useEffect"];
        }
    }["EmployeeWorkspace.useEffect"], [
        session?.token,
        staffRole,
        fetchWorkspace
    ]);
    const selectedOrder = orders.find((o)=>o.id === selectedOrderId) || null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmployeeWorkspace.useEffect": ()=>{
            if (selectedOrder) {
                setCourierNote(selectedOrder.courierNote || '');
                const remaining = Math.max(0, selectedOrder.total - selectedOrder.paidAmount);
                setPayAmount(remaining > 0 ? String(remaining) : '');
            }
        }
    }["EmployeeWorkspace.useEffect"], [
        selectedOrder?.id,
        selectedOrder?.courierNote,
        selectedOrder?.total,
        selectedOrder?.paidAmount
    ]);
    const showToast = (msg)=>{
        setActionMsg(msg);
        setTimeout(()=>setActionMsg(''), 2500);
    };
    const patchOrder = async (payload, successText)=>{
        if (!selectedOrder || !session?.token) return;
        setErrorMsg('');
        try {
            const res = await fetch(`/api/workspace/orders/${selectedOrder.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Operation denied');
            setOrders((prev)=>prev.map((o)=>o.id === data.id ? data : o));
            showToast(successText);
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Operation failed');
        }
    };
    const handleRecordPayment = async (e)=>{
        e.preventDefault();
        if (!selectedOrder || !session?.token) return;
        setErrorMsg('');
        try {
            const res = await fetch(`/api/workspace/orders/${selectedOrder.id}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.token}`
                },
                body: JSON.stringify({
                    amount: Number(payAmount),
                    method: payMethod,
                    note: 'Recorded from Employee Desk'
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Payment recording denied');
            setOrders((prev)=>prev.map((o)=>o.id === data.id ? data : o));
            showToast(lang === 'ar' ? 'تم تسجيل التحصيل بنجاح' : 'Store payment recorded');
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Payment error');
        }
    };
    const handleEmployeeAddProduct = async (e)=>{
        e.preventDefault();
        if (!session?.token) return;
        setErrorMsg('');
        const isSilver = newProdMat !== 'full_grain_leather';
        const imageMap = {
            rings: '/images/product_silver_ring_1794604055973.jpg',
            necklaces: '/images/product_silver_necklace_1794604056451.jpg',
            bracelets_earrings: '/images/product_silver_bracelet_earrings_1794604056472.jpg',
            evening_bags: '/images/product_evening_clutch_1794604057272.jpg',
            tote_bags: '/images/product_leather_tote_1794604057749.jpg'
        };
        try {
            const res = await fetch('/api/workspace/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.token}`
                },
                body: JSON.stringify({
                    nameAr: newProdNameAr,
                    nameEn: newProdNameEn,
                    category: newProdCat,
                    material: newProdMat,
                    useSilverPricing: isSilver,
                    weightGrams: isSilver ? Number(newProdWeight) : undefined,
                    makingCharge: isSilver ? Math.round(Number(newProdWeight) * (silverPricing?.defaultMakingChargePerGram || 35)) : undefined,
                    price: Number(newProdPrice),
                    stock: Number(newProdStock),
                    imageUrl: imageMap[newProdCat] || '/images/product_silver_ring_1794604055973.jpg'
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Permission denied');
            setProducts((prev)=>[
                    data,
                    ...prev
                ]);
            setNewProdNameAr('');
            setNewProdNameEn('');
            await refreshStorefront();
            showToast(lang === 'ar' ? 'تمت إضافة القطعة بنجاح' : 'Product added by staff');
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Error adding product');
        }
    };
    const handleEmployeeDeleteProduct = async (productId)=>{
        if (!session?.token) return;
        setErrorMsg('');
        const res = await fetch(`/api/workspace/products/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });
        const data = await res.json();
        if (!res.ok) {
            setErrorMsg(data.error || 'Delete denied');
            return;
        }
        setProducts((prev)=>prev.filter((p)=>p.id !== productId));
        await refreshStorefront();
        showToast(lang === 'ar' ? 'تم حذف القطعة' : 'Product deleted');
    };
    const handleEmployeeAdjustStock = async (productId, delta)=>{
        if (!session?.token) return;
        const res = await fetch('/api/workspace/inventory/adjust', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.token}`
            },
            body: JSON.stringify({
                productId,
                delta,
                reason: 'Employee inventory update'
            })
        });
        if (res.ok) {
            const data = await res.json();
            setProducts((prev)=>prev.map((p)=>p.id === data.product.id ? data.product : p));
            setInventoryLogs((prev)=>[
                    data.log,
                    ...prev
                ]);
            refreshStorefront();
            showToast(lang === 'ar' ? 'تم تعديل المخزون' : 'Stock updated');
        }
    };
    const handleEmployeeAddCategory = async (e)=>{
        e.preventDefault();
        if (!session?.token) return;
        const res = await fetch('/api/workspace/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.token}`
            },
            body: JSON.stringify({
                nameAr: newCatNameAr,
                nameEn: newCatNameEn
            })
        });
        if (res.ok) {
            const created = await res.json();
            setCategories((prev)=>[
                    ...prev,
                    created
                ]);
            setNewCatNameAr('');
            setNewCatNameEn('');
            refreshStorefront();
            showToast(lang === 'ar' ? 'تمت إضافة التصنيف' : 'Category created');
        }
    };
    const handleEmployeeSilverRate = async (e)=>{
        e.preventDefault();
        if (!session?.token) return;
        const res = await fetch('/api/workspace/silver-pricing', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.token}`
            },
            body: JSON.stringify({
                silver925PerGram: Number(gramRateInput),
                defaultMakingChargePerGram: Number(makingInput),
                recalculateCatalog: true
            })
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mx-auto max-w-3xl px-4 py-16 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 12
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "rounded-2xl border p-8 sm:p-12",
                style: {
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                        className: "mx-auto h-10 w-10 mb-4",
                        style: {
                            color: 'var(--accent-primary)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-serif-editorial text-2xl font-semibold",
                        children: t.accessDeniedTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm",
                        style: {
                            color: 'var(--text-secondary)'
                        },
                        children: t.accessDeniedDesc
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-wrap items-center justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>loginDemoRole('employee1'),
                                className: "rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer",
                                style: {
                                    backgroundColor: 'var(--accent-primary)',
                                    color: 'var(--accent-contrast)'
                                },
                                children: t.roleEmployee1
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>loginDemoRole('employee2'),
                                className: "rounded-xl border px-5 py-2.5 text-xs font-semibold cursor-pointer",
                                style: {
                                    borderColor: 'var(--border-hairline)'
                                },
                                children: t.roleEmployee2
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openAuthModal('staff'),
                                className: "rounded-xl border px-5 py-2.5 text-xs font-medium cursor-pointer",
                                style: {
                                    borderColor: 'var(--border-hairline)'
                                },
                                children: t.openAuth
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 324,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
            lineNumber: 323,
            columnNumber: 7
        }, this);
    }
    // Dynamic Employee Tabs — Appear Immediately When Owner Grants Permission!
    const canAccessProductsTab = isOwner || perms.canAddProducts || perms.canEditProducts || perms.canDeleteProducts;
    const canAccessCategoriesTab = isOwner || perms.canManageCategories;
    const canAccessInventoryTab = isOwner || perms.canManageInventory;
    const canAccessSilverTab = isOwner || perms.canEditSilverPricing;
    const canAccessReportsTab = isOwner || perms.canViewFinancialReports;
    const employeeTabs = [
        {
            id: 'orders',
            labelAr: perms.canViewAllOrders ? 'كل الطلبات' : 'الطلبات المسندة',
            labelEn: perms.canViewAllOrders ? 'All Orders' : 'Assigned Orders',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 391,
                columnNumber: 13
            }, this)
        },
        ...canAccessProductsTab ? [
            {
                id: 'products',
                labelAr: 'المنتجات (مفوض)',
                labelEn: 'Products (Granted)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 399,
                    columnNumber: 19
                }, this),
                delegated: true
            }
        ] : [],
        ...canAccessCategoriesTab ? [
            {
                id: 'categories',
                labelAr: 'التصنيفات (مفوض)',
                labelEn: 'Categories (Granted)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$tree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderTree$3e$__["FolderTree"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 410,
                    columnNumber: 19
                }, this),
                delegated: true
            }
        ] : [],
        ...canAccessInventoryTab ? [
            {
                id: 'inventory',
                labelAr: 'المخزون (مفوض)',
                labelEn: 'Inventory (Granted)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 421,
                    columnNumber: 19
                }, this),
                delegated: true
            }
        ] : [],
        ...canAccessSilverTab ? [
            {
                id: 'silver',
                labelAr: 'الفضة 925 (مفوض)',
                labelEn: 'Silver 925 (Granted)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 432,
                    columnNumber: 19
                }, this),
                delegated: true
            }
        ] : [],
        ...canAccessReportsTab ? [
            {
                id: 'reports',
                labelAr: 'التقارير (مفوض)',
                labelEn: 'Reports (Granted)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 443,
                    columnNumber: 19
                }, this),
                delegated: true
            }
        ] : []
    ];
    // Fallback to 'orders' if owner revokes a delegated tab while employee is viewing it
    const safeTab = employeeTabs.some((et)=>et.id === activeTab) ? activeTab : 'orders';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between",
                style: {
                    borderColor: 'var(--border-hairline)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-semibold",
                                style: {
                                    color: 'var(--accent-primary)'
                                },
                                children: [
                                    lang === 'ar' ? staffRole?.titleAr : staffRole?.titleEn,
                                    " · ",
                                    session?.user.name.split('|')[0]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-serif-editorial mt-1 text-2xl font-semibold sm:text-3xl",
                                children: t.employeeWorkspaceTitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>fetchWorkspace(false),
                                className: "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer",
                                style: {
                                    borderColor: 'var(--border-hairline)',
                                    backgroundColor: 'var(--bg-surface)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: `h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 473,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'ar' ? 'تحديث الصلاحيات' : 'Sync Permissions'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openAuthModal('staff'),
                                className: "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer",
                                style: {
                                    borderColor: 'var(--border-hairline)',
                                    backgroundColor: 'var(--bg-surface)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 482,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'ar' ? 'تبديل الموظف' : 'Switch Staff'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scrollbar-none mt-5 flex items-center gap-2 overflow-x-auto snap-x pb-1",
                children: employeeTabs.map((item)=>{
                    const active = safeTab === item.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveTab(item.id),
                        className: "snap-start relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors",
                        style: {
                            color: active ? 'var(--accent-contrast)' : 'var(--text-primary)'
                        },
                        children: [
                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].span, {
                                layoutId: "employee-tab-active",
                                transition: {
                                    type: 'spring',
                                    stiffness: 420,
                                    damping: 32
                                },
                                className: "absolute inset-0 rounded-xl",
                                style: {
                                    backgroundColor: 'var(--accent-primary)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 503,
                                columnNumber: 17
                            }, this),
                            !active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-xl border",
                                style: {
                                    backgroundColor: item.delegated ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                    borderColor: item.delegated ? 'var(--accent-primary)' : 'var(--border-hairline)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 511,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10 flex items-center gap-2",
                                children: [
                                    item.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'ar' ? item.labelAr : item.labelEn
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 521,
                                        columnNumber: 17
                                    }, this),
                                    item.delegated && !active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-3 w-3 opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 522,
                                        columnNumber: 47
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                lineNumber: 519,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 493,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-600 dark:text-red-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                        className: "h-4 w-4 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: errorMsg
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 530,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: actionMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -6
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -6
                    },
                    className: "mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold",
                    style: {
                        backgroundColor: 'var(--accent-soft)',
                        borderColor: 'var(--accent-primary)',
                        color: 'var(--accent-primary)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "h-4 w-4 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: actionMsg
                        }, void 0, false, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 550,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 538,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 8
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -6
                    },
                    transition: {
                        duration: 0.18,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: "mt-6",
                    children: [
                        safeTab === 'orders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-6 lg:grid-cols-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 lg:col-span-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-sm font-semibold",
                                            children: lang === 'ar' ? `الطلبات المتاحة (${orders.length})` : `Orders Queue (${orders.length})`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border p-6 text-center text-xs",
                                            style: {
                                                backgroundColor: 'var(--bg-surface)',
                                                borderColor: 'var(--border-hairline)',
                                                color: 'var(--text-secondary)'
                                            },
                                            children: lang === 'ar' ? 'لا توجد طلبات مسندة لحسابك حالياً.' : 'No orders assigned to you yet.'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 576,
                                            columnNumber: 19
                                        }, this) : orders.map((ord)=>{
                                            const active = ord.id === selectedOrder?.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].button, {
                                                whileHover: {
                                                    y: -1
                                                },
                                                type: "button",
                                                onClick: ()=>setSelectedOrderId(ord.id),
                                                className: "w-full rounded-2xl border p-4 text-start cursor-pointer transition-colors",
                                                style: {
                                                    backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                                    borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono-tabular text-xs font-semibold",
                                                                style: {
                                                                    color: 'var(--accent-primary)'
                                                                },
                                                                children: ord.orderNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 602,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono-tabular text-xs font-semibold",
                                                                children: [
                                                                    ord.total.toLocaleString(),
                                                                    " ",
                                                                    t.currency
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-sm font-semibold truncate",
                                                        children: ord.customerName.split('|')[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 flex items-center justify-between text-xs",
                                                        style: {
                                                            color: 'var(--text-secondary)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORDER_STATUS_LABELS"][lang][ord.status]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 611,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: ord.deliveryMethod === 'pickup' ? lang === 'ar' ? 'استلام' : 'Pickup' : lang === 'ar' ? 'شحن' : 'Delivery'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, ord.id, true, {
                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                lineNumber: 590,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-8 min-w-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        mode: "wait",
                                        children: selectedOrder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 8
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: -6
                                            },
                                            transition: {
                                                duration: 0.18,
                                                ease: [
                                                    0.16,
                                                    1,
                                                    0.3,
                                                    1
                                                ]
                                            },
                                            className: "rounded-2xl border p-5 sm:p-7 space-y-6",
                                            style: {
                                                backgroundColor: 'var(--bg-surface)',
                                                borderColor: 'var(--border-hairline)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between",
                                                    style: {
                                                        borderColor: 'var(--border-hairline)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-mono-tabular text-xs font-semibold",
                                                                    style: {
                                                                        color: 'var(--accent-primary)'
                                                                    },
                                                                    children: [
                                                                        selectedOrder.orderNumber,
                                                                        " · ",
                                                                        selectedOrder.paymentStatus.toUpperCase()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 634,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "mt-1 text-xl font-semibold",
                                                                    children: selectedOrder.customerName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 637,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-xs",
                                                                    style: {
                                                                        color: 'var(--text-secondary)'
                                                                    },
                                                                    children: [
                                                                        selectedOrder.customerPhone,
                                                                        " · ",
                                                                        selectedOrder.shippingAddress
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-start sm:text-end",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: lang === 'ar' ? 'المرحلة' : 'Stage'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 643,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-semibold",
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORDER_STATUS_LABELS"][lang][selectedOrder.status]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 646,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2.5",
                                                    children: selectedOrder.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-3 rounded-xl border p-3",
                                                            style: {
                                                                backgroundColor: 'var(--bg-canvas)',
                                                                borderColor: 'var(--border-hairline)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative h-12 w-12 overflow-hidden rounded-lg shrink-0",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                                                                src: item.imageUrl.replace('/src/assets/images/', '/images/'),
                                                                                alt: lang === 'ar' ? item.nameAr : item.nameEn,
                                                                                fill: true,
                                                                                sizes: "48px",
                                                                                className: "object-cover"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                lineNumber: 660,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 659,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "truncate text-sm font-semibold",
                                                                                    children: lang === 'ar' ? item.nameAr : item.nameEn
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                    lineNumber: 669,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-xs",
                                                                                    style: {
                                                                                        color: 'var(--text-muted)'
                                                                                    },
                                                                                    children: [
                                                                                        item.sku,
                                                                                        " · ",
                                                                                        item.variant,
                                                                                        " · ×",
                                                                                        item.quantity
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                    lineNumber: 672,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 668,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-mono-tabular text-xs font-semibold",
                                                                    children: [
                                                                        (item.unitPrice * item.quantity).toLocaleString(),
                                                                        " ",
                                                                        t.currency
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `${item.productId}-${idx}`, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 653,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border p-4 space-y-3",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-xs font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                                    className: "h-4 w-4",
                                                                    style: {
                                                                        color: 'var(--accent-primary)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 687,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'ar' ? 'تجهيز الطلب والتغليف (Packaging)' : 'Prepare Order & Packaging'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 gap-2.5 sm:grid-cols-3",
                                                            children: [
                                                                [
                                                                    'stockVerified',
                                                                    lang === 'ar' ? 'تأكيد توفر القطع' : 'Stock Verified'
                                                                ],
                                                                [
                                                                    'qualityInspected',
                                                                    lang === 'ar' ? 'فحص العيار والجودة' : 'Quality Checked'
                                                                ],
                                                                [
                                                                    'packaged',
                                                                    lang === 'ar' ? 'إتمام التغليف' : 'Packaged'
                                                                ]
                                                            ].map(([field, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${perms.canPrepareOrders || isOwner ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`,
                                                                    style: {
                                                                        borderColor: selectedOrder.checklist[field] ? 'var(--accent-primary)' : 'var(--border-hairline)',
                                                                        backgroundColor: selectedOrder.checklist[field] ? 'var(--accent-soft)' : 'transparent'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            disabled: !perms.canPrepareOrders && !isOwner,
                                                                            checked: selectedOrder.checklist[field],
                                                                            onChange: (e)=>patchOrder({
                                                                                    checklist: {
                                                                                        [field]: e.target.checked
                                                                                    }
                                                                                }, lang === 'ar' ? 'تم تحديث التجهيز' : 'Checklist saved'),
                                                                            className: "h-4 w-4 accent-[var(--accent-primary)]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 708,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 720,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, field, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 690,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border p-4 space-y-3",
                                                            style: {
                                                                backgroundColor: 'var(--bg-canvas)',
                                                                borderColor: 'var(--border-hairline)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-xs font-semibold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                            className: "h-4 w-4",
                                                                            style: {
                                                                                color: 'var(--accent-primary)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 730,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: lang === 'ar' ? 'تحديث الحالة' : 'Update Order Status'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 731,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 729,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-2",
                                                                    children: [
                                                                        'confirmed',
                                                                        'preparing',
                                                                        'ready_for_pickup',
                                                                        'out_for_delivery'
                                                                    ].map((st)=>{
                                                                        const active = selectedOrder.status === st;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            disabled: !perms.canUpdateOrderStatus && !isOwner || selectedOrder.status === 'completed',
                                                                            onClick: ()=>patchOrder({
                                                                                    status: st
                                                                                }, lang === 'ar' ? 'تم تحديث الحالة' : 'Status updated'),
                                                                            className: "rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer disabled:opacity-45",
                                                                            style: {
                                                                                backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
                                                                                borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                                                                                color: active ? 'var(--accent-contrast)' : 'var(--text-primary)'
                                                                            },
                                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORDER_STATUS_LABELS"][lang][st]
                                                                        }, st, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 737,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 733,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border p-4 space-y-3",
                                                            style: {
                                                                backgroundColor: 'var(--bg-canvas)',
                                                                borderColor: 'var(--border-hairline)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-xs font-semibold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                            className: "h-4 w-4",
                                                                            style: {
                                                                                color: 'var(--accent-primary)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 758,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: lang === 'ar' ? 'تجهيز الشحن / الاستلام' : 'Delivery / Pickup'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 759,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 757,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col sm:flex-row gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            disabled: !perms.canHandleDeliveryPickup && !isOwner,
                                                                            value: courierNote,
                                                                            onChange: (e)=>setCourierNote(e.target.value),
                                                                            placeholder: lang === 'ar' ? 'ملاحظة الشحن أو الاستلام...' : 'Dispatch or pickup note...',
                                                                            className: "flex-1 min-w-0 rounded-lg border px-3 py-2 text-xs",
                                                                            style: {
                                                                                backgroundColor: 'var(--bg-surface)',
                                                                                borderColor: 'var(--border-hairline)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 762,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            disabled: !perms.canHandleDeliveryPickup && !isOwner,
                                                                            onClick: ()=>patchOrder({
                                                                                    courierNote
                                                                                }, lang === 'ar' ? 'تم حفظ الملاحظة' : 'Saved'),
                                                                            className: "rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-45 shrink-0",
                                                                            style: {
                                                                                backgroundColor: 'var(--accent-primary)',
                                                                                color: 'var(--accent-contrast)'
                                                                            },
                                                                            children: lang === 'ar' ? 'حفظ' : 'Save'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 771,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 761,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                            onSubmit: handleRecordPayment,
                                                            className: "rounded-xl border p-4 space-y-3",
                                                            style: {
                                                                backgroundColor: 'var(--bg-canvas)',
                                                                borderColor: 'var(--border-hairline)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between text-xs font-semibold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"], {
                                                                                    className: "h-4 w-4",
                                                                                    style: {
                                                                                        color: 'var(--accent-primary)'
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                    lineNumber: 789,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                lang === 'ar' ? 'مدفوعات المتجر' : 'Handle Store Payments'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 788,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-mono-tabular",
                                                                            children: [
                                                                                selectedOrder.paidAmount.toLocaleString(),
                                                                                " / ",
                                                                                selectedOrder.total.toLocaleString()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 792,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 25
                                                                }, this),
                                                                !perms.canRecordStorePayments && !isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: lang === 'ar' ? 'تحصيل المدفوعات غير مفعل لهذا الحساب.' : 'Disabled for your role.'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 797,
                                                                    columnNumber: 27
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 1,
                                                                            required: true,
                                                                            value: payAmount,
                                                                            onChange: (e)=>setPayAmount(e.target.value),
                                                                            className: "font-mono-tabular w-24 rounded-lg border px-2.5 py-2 text-xs",
                                                                            style: {
                                                                                backgroundColor: 'var(--bg-surface)',
                                                                                borderColor: 'var(--border-hairline)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 802,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: payMethod,
                                                                            onChange: (e)=>setPayMethod(e.target.value),
                                                                            className: "flex-1 rounded-lg border px-2 py-2 text-xs",
                                                                            style: {
                                                                                backgroundColor: 'var(--bg-surface)',
                                                                                borderColor: 'var(--border-hairline)'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "In-Store Cash Counter",
                                                                                    children: lang === 'ar' ? 'نقدي بالمتجر' : 'Cash Counter'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                    lineNumber: 817,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "In-Store Card POS",
                                                                                    children: lang === 'ar' ? 'ماكينة POS' : 'Store POS'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                                    lineNumber: 818,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 811,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "submit",
                                                                            className: "rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer",
                                                                            style: {
                                                                                backgroundColor: 'var(--accent-primary)',
                                                                                color: 'var(--accent-contrast)'
                                                                            },
                                                                            children: lang === 'ar' ? 'تحصيل' : 'Record'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 820,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 801,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 786,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col justify-between rounded-xl border p-4 space-y-3",
                                                            style: {
                                                                backgroundColor: 'var(--bg-canvas)',
                                                                borderColor: 'var(--border-hairline)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-xs font-semibold",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            className: "h-4 w-4",
                                                                            style: {
                                                                                color: 'var(--accent-primary)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 833,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: lang === 'ar' ? 'إتمام الطلب بعد التسليم' : 'Complete Order'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 834,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 832,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    disabled: !perms.canCompleteOrders && !isOwner || selectedOrder.status === 'completed',
                                                                    onClick: ()=>patchOrder({
                                                                            status: 'completed'
                                                                        }, lang === 'ar' ? 'تم إتمام الطلب' : 'Order completed'),
                                                                    className: "w-full rounded-xl py-2.5 text-xs font-semibold cursor-pointer disabled:opacity-45",
                                                                    style: {
                                                                        backgroundColor: 'var(--accent-primary)',
                                                                        color: 'var(--accent-contrast)'
                                                                    },
                                                                    children: selectedOrder.status === 'completed' ? lang === 'ar' ? 'مكتمل' : 'Completed' : lang === 'ar' ? 'تأكيد التسليم وإتمام الطلب' : 'Complete Order'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 836,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, selectedOrder.id, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 623,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 621,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this),
                        safeTab === 'products' && canAccessProductsTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                (isOwner || perms.canAddProducts || perms.canEditProducts) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleEmployeeAddProduct,
                                    className: "rounded-2xl border p-5 space-y-4",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm font-semibold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-4 w-4",
                                                    style: {
                                                        color: 'var(--accent-primary)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 870,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: lang === 'ar' ? 'إضافة منتج جديد (صلاحية مفوضة من المالك)' : 'Add Product (Owner-Granted Permission)'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 869,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    required: true,
                                                    placeholder: lang === 'ar' ? 'الاسم بالعربية' : 'Arabic Name',
                                                    value: newProdNameAr,
                                                    onChange: (e)=>setNewProdNameAr(e.target.value),
                                                    className: "rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    required: true,
                                                    placeholder: lang === 'ar' ? 'الاسم بالإنجليزية' : 'English Name',
                                                    value: newProdNameEn,
                                                    onChange: (e)=>setNewProdNameEn(e.target.value),
                                                    className: "rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 883,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: newProdCat,
                                                    onChange: (e)=>setNewProdCat(e.target.value),
                                                    className: "rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    },
                                                    children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: c.slug,
                                                            children: lang === 'ar' ? c.nameAr : c.nameEn
                                                        }, c.id, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: newProdMat,
                                                    onChange: (e)=>setNewProdMat(e.target.value),
                                                    className: "rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "silver_925",
                                                            children: "925 Sterling Silver"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 910,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "silver_rhodium",
                                                            children: "925 Rhodium"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 911,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "full_grain_leather",
                                                            children: "Full-Grain Leather"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 912,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 904,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 873,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3",
                                            children: [
                                                newProdMat !== 'full_grain_leather' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.1",
                                                    value: newProdWeight,
                                                    onChange: (e)=>setNewProdWeight(e.target.value),
                                                    placeholder: "Weight (g)",
                                                    className: "font-mono-tabular w-full sm:w-32 rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 917,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: newProdPrice,
                                                    onChange: (e)=>setNewProdPrice(e.target.value),
                                                    placeholder: "Price",
                                                    className: "font-mono-tabular w-full sm:w-32 rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: newProdStock,
                                                    onChange: (e)=>setNewProdStock(e.target.value),
                                                    placeholder: "Stock",
                                                    className: "font-mono-tabular w-full sm:w-24 rounded-xl border px-3 py-2 text-xs",
                                                    style: {
                                                        backgroundColor: 'var(--bg-canvas)',
                                                        borderColor: 'var(--border-hairline)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 936,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "w-full sm:w-auto rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer",
                                                    style: {
                                                        backgroundColor: 'var(--accent-primary)',
                                                        color: 'var(--accent-contrast)'
                                                    },
                                                    children: lang === 'ar' ? 'نشر المنتج' : 'Add Product'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 944,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 915,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 864,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 md:hidden rounded-2xl border p-4",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border p-3.5 text-xs space-y-2",
                                            style: {
                                                backgroundColor: 'var(--bg-canvas)',
                                                borderColor: 'var(--border-hairline)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-mono-tabular text-[11px]",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: p.sku
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 965,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold text-sm truncate",
                                                                    children: lang === 'ar' ? p.nameAr : p.nameEn
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 964,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono-tabular font-semibold shrink-0",
                                                            children: [
                                                                p.price.toLocaleString(),
                                                                " ",
                                                                t.currency
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 970,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 963,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between pt-2 border-t",
                                                    style: {
                                                        borderColor: 'var(--border-hairline)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono-tabular",
                                                            style: {
                                                                color: 'var(--text-secondary)'
                                                            },
                                                            children: [
                                                                lang === 'ar' ? 'المخزون:' : 'Stock:',
                                                                " ",
                                                                p.stock
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 975,
                                                            columnNumber: 23
                                                        }, this),
                                                        (isOwner || perms.canDeleteProducts) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>handleEmployeeDeleteProduct(p.id),
                                                            className: "inline-flex items-center gap-1 text-red-500 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 984,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'ar' ? 'حذف' : 'Delete'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 985,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 979,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 974,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 958,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 956,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block overflow-x-auto rounded-2xl border p-5",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full min-w-[540px] text-start text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b",
                                                    style: {
                                                        borderColor: 'var(--border-hairline)',
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 text-start",
                                                            children: "SKU"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 997,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 text-start",
                                                            children: lang === 'ar' ? 'القطعة' : 'Piece'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 998,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 text-end",
                                                            children: lang === 'ar' ? 'السعر' : 'Price'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 999,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 text-center",
                                                            children: lang === 'ar' ? 'المخزون' : 'Stock'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 1000,
                                                            columnNumber: 23
                                                        }, this),
                                                        (isOwner || perms.canDeleteProducts) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 text-end",
                                                            children: lang === 'ar' ? 'حذف' : 'Delete'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 996,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                lineNumber: 995,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y",
                                                style: {
                                                    borderColor: 'var(--border-hairline)'
                                                },
                                                children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "font-mono-tabular py-2.5",
                                                                children: p.sku
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 1009,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 font-medium",
                                                                children: lang === 'ar' ? p.nameAr : p.nameEn
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "font-mono-tabular py-2.5 text-end font-semibold",
                                                                children: [
                                                                    p.price.toLocaleString(),
                                                                    " ",
                                                                    t.currency
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 1011,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "font-mono-tabular py-2.5 text-center",
                                                                children: p.stock
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 1014,
                                                                columnNumber: 25
                                                            }, this),
                                                            (isOwner || perms.canDeleteProducts) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 text-end",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleEmployeeDeleteProduct(p.id),
                                                                    className: "inline-flex items-center gap-1 text-red-500 hover:underline cursor-pointer",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 1022,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: lang === 'ar' ? 'حذف' : 'Delete'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                            lineNumber: 1023,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                    lineNumber: 1017,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                                lineNumber: 1016,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                lineNumber: 1006,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 994,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 993,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 862,
                            columnNumber: 13
                        }, this),
                        safeTab === 'categories' && canAccessCategoriesTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleEmployeeAddCategory,
                                    className: "rounded-2xl border p-5 flex flex-wrap gap-3",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            required: true,
                                            placeholder: lang === 'ar' ? 'اسم التصنيف بالعربية' : 'Arabic Category',
                                            value: newCatNameAr,
                                            onChange: (e)=>setNewCatNameAr(e.target.value),
                                            className: "flex-1 min-w-[180px] rounded-xl border px-3 py-2 text-xs",
                                            style: {
                                                backgroundColor: 'var(--bg-canvas)',
                                                borderColor: 'var(--border-hairline)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1043,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            required: true,
                                            placeholder: lang === 'ar' ? 'اسم التصنيف بالإنجليزية' : 'English Category',
                                            value: newCatNameEn,
                                            onChange: (e)=>setNewCatNameEn(e.target.value),
                                            className: "flex-1 min-w-[180px] rounded-xl border px-3 py-2 text-xs",
                                            style: {
                                                backgroundColor: 'var(--bg-canvas)',
                                                borderColor: 'var(--border-hairline)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1052,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "rounded-xl px-5 py-2 text-xs font-semibold cursor-pointer",
                                            style: {
                                                backgroundColor: 'var(--accent-primary)',
                                                color: 'var(--accent-contrast)'
                                            },
                                            children: lang === 'ar' ? 'إضافة تصنيف' : 'Add Category'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1061,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1038,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
                                    children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border p-4 text-xs",
                                            style: {
                                                backgroundColor: 'var(--bg-surface)',
                                                borderColor: 'var(--border-hairline)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold",
                                                    children: lang === 'ar' ? c.nameAr : c.nameEn
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 1076,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono-tabular mt-0.5",
                                                    style: {
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: c.slug
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                    lineNumber: 1077,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, c.id, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1071,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1069,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 1037,
                            columnNumber: 13
                        }, this),
                        safeTab === 'inventory' && canAccessInventoryTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border p-5 space-y-3",
                            style: {
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-hairline)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm font-semibold",
                                    children: lang === 'ar' ? 'تعديل المخزون' : 'Inventory Adjustments'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1089,
                                    columnNumber: 15
                                }, this),
                                products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs",
                                        style: {
                                            backgroundColor: 'var(--bg-canvas)',
                                            borderColor: 'var(--border-hairline)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: lang === 'ar' ? p.nameAr : p.nameEn
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 1097,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono-tabular",
                                                        style: {
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: [
                                                            p.sku,
                                                            " · Stock: ",
                                                            p.stock
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 1098,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                lineNumber: 1096,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>handleEmployeeAdjustStock(p.id, -1),
                                                        className: "rounded-lg border px-3 py-1 cursor-pointer",
                                                        style: {
                                                            borderColor: 'var(--border-hairline)'
                                                        },
                                                        children: "-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>handleEmployeeAdjustStock(p.id, 5),
                                                        className: "rounded-lg px-3 py-1 font-semibold cursor-pointer",
                                                        style: {
                                                            backgroundColor: 'var(--accent-primary)',
                                                            color: 'var(--accent-contrast)'
                                                        },
                                                        children: "+5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                                lineNumber: 1102,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, p.id, true, {
                                        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                        lineNumber: 1091,
                                        columnNumber: 17
                                    }, this)),
                                inventoryLogs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-3 text-xs",
                                    style: {
                                        color: 'var(--text-secondary)'
                                    },
                                    children: [
                                        "Latest: ",
                                        inventoryLogs[0].productNameEn,
                                        " (",
                                        inventoryLogs[0].delta > 0 ? `+${inventoryLogs[0].delta}` : inventoryLogs[0].delta,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1123,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 1088,
                            columnNumber: 13
                        }, this),
                        safeTab === 'silver' && canAccessSilverTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleEmployeeSilverRate,
                            className: "max-w-xl rounded-2xl border p-6 space-y-4",
                            style: {
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-hairline)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold",
                                    children: lang === 'ar' ? 'تحديث سعر جرام الفضة 925 (مفوض)' : 'Update 925 Silver Rate (Granted)'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: gramRateInput,
                                            onChange: (e)=>setGramRateInput(e.target.value),
                                            className: "font-mono-tabular rounded-xl border px-3 py-2 text-sm",
                                            style: {
                                                backgroundColor: 'var(--bg-canvas)',
                                                borderColor: 'var(--border-hairline)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1141,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: makingInput,
                                            onChange: (e)=>setMakingInput(e.target.value),
                                            className: "font-mono-tabular rounded-xl border px-3 py-2 text-sm",
                                            style: {
                                                backgroundColor: 'var(--bg-canvas)',
                                                borderColor: 'var(--border-hairline)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1148,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "rounded-xl px-5 py-2.5 text-xs font-semibold cursor-pointer",
                                    style: {
                                        backgroundColor: 'var(--accent-primary)',
                                        color: 'var(--accent-contrast)'
                                    },
                                    children: lang === 'ar' ? 'تحديث وإعادة التسعير' : 'Apply Rate'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1156,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 1132,
                            columnNumber: 13
                        }, this),
                        safeTab === 'reports' && canAccessReportsTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border p-5",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'ar' ? 'إجمالي الطلبات الظاهرة' : 'Visible Order Volume'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono-tabular mt-1 text-xl font-semibold",
                                            children: [
                                                orders.reduce((s, o)=>s + o.total, 0).toLocaleString(),
                                                " ",
                                                t.currency
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1169,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border p-5",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'ar' ? 'المبالغ المحصلة' : 'Collected'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono-tabular mt-1 text-xl font-semibold",
                                            children: [
                                                orders.reduce((s, o)=>s + o.paidAmount, 0).toLocaleString(),
                                                " ",
                                                t.currency
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1177,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border p-5",
                                    style: {
                                        backgroundColor: 'var(--bg-surface)',
                                        borderColor: 'var(--border-hairline)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'ar' ? 'قطع المخزون' : 'Catalog Pieces'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono-tabular mt-1 text-xl font-semibold",
                                            children: products.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                            lineNumber: 1189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                                    lineNumber: 1185,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                            lineNumber: 1168,
                            columnNumber: 13
                        }, this)
                    ]
                }, safeTab, true, {
                    fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                    lineNumber: 557,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/EmployeeWorkspace.tsx",
                lineNumber: 556,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EmployeeWorkspace.tsx",
        lineNumber: 454,
        columnNumber: 5
    }, this);
}
_s(EmployeeWorkspace, "nV7ePEBG/6YV38/ShqalsyvGf/w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoreContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = EmployeeWorkspace;
var _c;
__turbopack_context__.k.register(_c, "EmployeeWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/EmployeeWorkspace.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/EmployeeWorkspace.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_EmployeeWorkspace_tsx_1-rzn8u6jgyy_._.js.map