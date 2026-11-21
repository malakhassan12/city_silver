'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Clock, Package, Search, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ORDER_STATUS_LABELS } from '../data/translations';
import type { Order, OrderStatus } from '../types/store';

const PIPELINE: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'completed',
];

export function OrderTrackingView() {
  const { lang, t, session, lastTrackedOrderCode } = useStore();
  const [queryCode, setQueryCode] = useState(lastTrackedOrderCode || 'CS-1042');
  const [order, setOrder] = useState<Order | null>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lookupOrder = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        setOrder(null);
        setError(t.orderNotFound);
        return;
      }
      const data = (await res.json()) as Order;
      setOrder(data);
    } catch {
      setError(t.orderNotFound);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    lookupOrder(lastTrackedOrderCode || 'CS-1042');
  }, [lastTrackedOrderCode]);

  useEffect(() => {
    if (!session?.token) {
      setMyOrders([]);
      return;
    }
    fetch('/api/orders/my', {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((list) => setMyOrders(Array.isArray(list) ? list : []))
      .catch(() => setMyOrders([]));
  }, [session]);

  const effectivePipeline: OrderStatus[] =
    order?.deliveryMethod === 'pickup'
      ? ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'completed']
      : PIPELINE;

  const activeStepIndex = order
    ? effectivePipeline.indexOf(order.status)
    : -1;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif-editorial text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t.trackTitle}
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {t.trackSubtitle}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            lookupOrder(queryCode);
          }}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              placeholder={t.trackPlaceholder}
              className="font-mono-tabular w-full rounded-xl border py-3 ps-10 pe-4 text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-contrast)',
            }}
          >
            {t.trackBtn}
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{lang === 'ar' ? 'أمثلة متاحة للتجربة:' : 'Sample codes:'}</span>
          {['CS-1042', 'CS-1041', 'CS-1040'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setQueryCode(code);
                lookupOrder(code);
              }}
              className="font-mono-tabular underline cursor-pointer hover:opacity-80"
              style={{ color: 'var(--accent-primary)' }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          className="rounded-2xl border p-6 text-center text-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
            color: 'var(--text-secondary)',
          }}
        >
          {error}
        </div>
      )}

      {order && (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border p-6 sm:p-8 space-y-7"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-hairline)' }}>
            <div>
              <div className="font-mono-tabular text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                {order.orderNumber} {order.isReservation ? `· ${lang === 'ar' ? 'حجز متجر' : 'Boutique Reservation'}` : ''}
              </div>
              <h2 className="mt-1 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {ORDER_STATUS_LABELS[lang][order.status]}
              </h2>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                {order.customerName} · {order.shippingAddress}
              </p>
            </div>

            <div className="text-start sm:text-end">
              <div className="font-mono-tabular text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {order.total.toLocaleString()} {t.currency}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {t.paidAmount}: <span className="font-mono-tabular">{order.paidAmount.toLocaleString()} {t.currency}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Progress Bar */}
          {order.status !== 'cancelled' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {effectivePipeline.map((stage, i) => {
                const done = activeStepIndex >= i;
                const isCurrent = activeStepIndex === i;
                return (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border p-3 transition-colors"
                    style={{
                      backgroundColor: done ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                      borderColor: done ? 'var(--accent-primary)' : 'var(--border-hairline)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {done ? (
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${isCurrent ? 'animate-pulse' : ''}`}
                          style={{ color: 'var(--accent-primary)' }}
                        />
                      ) : i === 2 ? (
                        <Package className="h-4 w-4 shrink-0 opacity-40" />
                      ) : i === 3 ? (
                        <Truck className="h-4 w-4 shrink-0 opacity-40" />
                      ) : (
                        <Clock className="h-4 w-4 shrink-0 opacity-40" />
                      )}
                      <span
                        className="text-xs font-semibold"
                        style={{ color: done ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                      >
                        {ORDER_STATUS_LABELS[lang][stage]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Items & Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'القطع المشمولة' : 'Ordered Pieces'}
              </h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="flex items-center gap-3 rounded-xl border p-3"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg shrink-0">
                      <Image
                        src={item.imageUrl.replace('/src/assets/images/', '/images/')}
                        alt={lang === 'ar' ? item.nameAr : item.nameEn}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {item.variant} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-mono-tabular text-xs font-semibold">
                      {(item.unitPrice * item.quantity).toLocaleString()} {t.currency}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl border p-4 space-y-2.5 text-xs"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>{t.assignedStaff}</span>
                <span className="font-medium">
                  {order.assignedEmployeeName ? order.assignedEmployeeName.split('|')[0] : t.unassigned}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>{t.paymentStatus}</span>
                <span className="font-semibold uppercase">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>
                  {lang === 'ar' ? 'فحص المخزون والتغليف' : 'Preparation & Packaging'}
                </span>
                <span>
                  {order.checklist.packaged
                    ? lang === 'ar'
                      ? 'تم التغليف'
                      : 'Packaged'
                    : order.checklist.stockVerified
                    ? lang === 'ar'
                      ? 'تم التحقق من المخزون'
                      : 'Stock Verified'
                    : lang === 'ar'
                    ? 'في الانتظار'
                    : 'Pending'}
                </span>
              </div>
              {order.courierNote && (
                <div className="pt-2 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                  <div style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'ملاحظة التسليم:' : 'Fulfillment Note:'}
                  </div>
                  <div className="mt-1 font-medium">{order.courierNote}</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Logged-in Customer Orders */}
      {myOrders.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t.myOrdersTitle}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {myOrders.map((mo) => (
              <button
                key={mo.id}
                type="button"
                onClick={() => {
                  setQueryCode(mo.orderNumber);
                  setOrder(mo);
                }}
                className="flex items-center justify-between rounded-xl border p-4 text-start cursor-pointer transition-colors hover:opacity-90"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div>
                  <div className="font-mono-tabular text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                    {mo.orderNumber}
                  </div>
                  <div className="mt-0.5 text-sm font-medium">{ORDER_STATUS_LABELS[lang][mo.status]}</div>
                </div>
                <div className="font-mono-tabular text-sm font-semibold">
                  {mo.total.toLocaleString()} {t.currency}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
