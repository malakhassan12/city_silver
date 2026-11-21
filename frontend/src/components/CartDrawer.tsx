'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Heart, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import type { DeliveryMethod, PaymentMethod } from '../types/store';

export function CartDrawer() {
  const {
    lang,
    t,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartOpen,
    setCartOpen,
    settings,
    session,
    refreshStorefront,
    setLastTrackedOrderCode,
    navigate,
  } = useStore();

  const [step, setStep] = useState<'bag' | 'checkout'>('bag');
  const [customerName, setCustomerName] = useState(session?.user.name.split('|')[0].trim() || '');
  const [customerPhone, setCustomerPhone] = useState(session?.user.phone || '');
  const [customerEmail, setCustomerEmail] = useState(session?.user.email || '');
  const [shippingAddress, setShippingAddress] = useState(session?.user.address || '');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isReservation, setIsReservation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const threshold = settings?.freeShippingThreshold ?? 3000;
  const shippingFee =
    deliveryMethod === 'pickup' || subtotal === 0 || subtotal >= threshold
      ? 0
      : settings?.shippingFee ?? 85;
  const total = subtotal + shippingFee;

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.token) {
        headers.Authorization = `Bearer ${session.token}`;
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          shippingAddress,
          deliveryMethod,
          paymentMethod,
          isReservation,
          items: cart.map((c) => ({
            productId: c.product.id,
            variant: c.variant,
            quantity: c.quantity,
            engravingNote: c.engravingNote,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not place order');
      }

      clearCart();
      await refreshStorefront();
      setLastTrackedOrderCode(data.orderNumber);
      setStep('bag');
      setCartOpen(false);
      navigate('track');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Checkout error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-s shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b px-5 py-4"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex items-center gap-2">
                {step === 'checkout' && (
                  <button
                    type="button"
                    onClick={() => setStep('bag')}
                    className="rounded-lg p-1.5 cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-subtle)' }}
                  >
                    <BackIcon className="h-4 w-4" />
                  </button>
                )}
                <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {step === 'bag' ? t.bag : t.checkoutTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1.5 cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="h-10 w-10 mb-3 opacity-35" />
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t.emptyBag}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {t.emptyBagHint}
                  </p>
                </div>
              ) : step === 'bag' ? (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: lang === 'ar' ? -24 : 24, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        key={`${item.product.id}-${item.variant}-${item.engravingNote || ''}`}
                        className="flex gap-3.5 rounded-xl border p-3"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      >
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg shrink-0">
                        <Image
                          src={item.product.imageUrl.replace('/src/assets/images/', '/images/')}
                          alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {item.variant}
                              {item.engravingNote ? ` · ${item.engravingNote}` : ''}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.variant)}
                            className="p-1 opacity-60 hover:opacity-100 cursor-pointer"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div
                            className="inline-flex items-center rounded-lg border"
                            style={{ borderColor: 'var(--border-hairline)' }}
                          >
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.product.id, item.variant, -1)}
                              className="p-1.5 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono-tabular px-2 text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.product.id, item.variant, 1)}
                              className="p-1.5 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="font-mono-tabular text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {(item.product.price * item.quantity).toLocaleString()} {t.currency}
                          </span>
                        </div>
                      </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div
                    className="rounded-xl border p-3 text-xs"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: 'var(--border-hairline)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {lang === 'ar'
                      ? 'تدفق طلبات داخلي توضيحي — لا يتم خصم أي بطاقة دفع إلكترونية.'
                      : 'App-managed checkout flow — no external card processing connected.'}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">{t.customerName}</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold mb-1">{t.customerPhone}</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">{t.customerEmail}</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">{t.deliveryMethod}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('delivery')}
                        className="rounded-xl border py-2.5 text-xs font-medium cursor-pointer"
                        style={{
                          backgroundColor: deliveryMethod === 'delivery' ? 'var(--accent-soft)' : 'transparent',
                          borderColor:
                            deliveryMethod === 'delivery' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                          color: deliveryMethod === 'delivery' ? 'var(--accent-primary)' : 'var(--text-primary)',
                        }}
                      >
                        {t.deliveryCourier}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('pickup')}
                        className="rounded-xl border py-2.5 text-xs font-medium cursor-pointer"
                        style={{
                          backgroundColor: deliveryMethod === 'pickup' ? 'var(--accent-soft)' : 'transparent',
                          borderColor:
                            deliveryMethod === 'pickup' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                          color: deliveryMethod === 'pickup' ? 'var(--accent-primary)' : 'var(--text-primary)',
                        }}
                      >
                        {t.deliveryPickup}
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold mb-1">{t.shippingAddress}</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">{t.paymentMethod}</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    >
                      <option value="cod">{t.payCod}</option>
                      <option value="store_counter">{t.payCounter}</option>
                      <option value="bank_transfer_ref">{t.payBankRef}</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isReservation}
                      onChange={(e) => setIsReservation(e.target.checked)}
                      className="h-4 w-4 accent-[var(--accent-primary)]"
                    />
                    <span>{t.reserveOption}</span>
                  </label>

                  {errorMsg && (
                    <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400">
                      {errorMsg}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="border-t p-5 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>{t.subtotal}</span>
                    <span className="font-mono-tabular">
                      {subtotal.toLocaleString()} {t.currency}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>{t.shipping}</span>
                    <span className="font-mono-tabular">
                      {shippingFee === 0 ? t.free : `${shippingFee.toLocaleString()} ${t.currency}`}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pt-2 border-t text-sm font-semibold"
                    style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-primary)' }}
                  >
                    <span>{t.total}</span>
                    <span className="font-mono-tabular">
                      {total.toLocaleString()} {t.currency}
                    </span>
                  </div>
                </div>

                {step === 'bag' ? (
                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full rounded-xl py-3 text-sm font-semibold cursor-pointer transition-transform active:scale-[0.98]"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    {t.proceedCheckout}
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={submitting}
                    className="w-full rounded-xl py-3 text-sm font-semibold cursor-pointer disabled:opacity-60"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    {submitting
                      ? lang === 'ar'
                        ? 'جاري تأكيد الطلب...'
                        : 'Submitting...'
                      : t.confirmOrderBtn}
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function WishlistDrawer() {
  const {
    lang,
    t,
    wishlist,
    products,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    setSelectedProduct,
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-s shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <div
              className="flex items-center justify-between border-b px-5 py-4"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <h2 className="text-base font-semibold">{t.wishlist}</h2>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="rounded-lg p-1.5 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {savedProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <Heart className="h-10 w-10 mb-3 opacity-35" />
                  <p className="text-sm font-medium">
                    {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setWishlistOpen(false);
                        setSelectedProduct(p);
                      }}
                      className="flex items-center gap-3 rounded-xl border p-3 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg shrink-0">
                        <Image
                          src={p.imageUrl.replace('/src/assets/images/', '/images/')}
                          alt={lang === 'ar' ? p.nameAr : p.nameEn}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {lang === 'ar' ? p.nameAr : p.nameEn}
                        </div>
                        <div className="font-mono-tabular text-xs font-medium mt-0.5" style={{ color: 'var(--accent-primary)' }}>
                          {p.price.toLocaleString()} {t.currency}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p.id);
                        }}
                        className="p-2 opacity-70 hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
