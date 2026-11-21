'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function HeroSection() {
  const { lang, t, silverPricing, settings, navigate } = useStore();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const scrollToCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 lg:px-8 lg:pt-10 lg:pb-14">
      {/* Slim Illustrative Notice Line with subtle shimmer sweep */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 flex items-center justify-between gap-4 overflow-hidden rounded-xl border px-4 py-2.5 text-xs"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
          color: 'var(--text-secondary)',
        }}
      >
        <div
          className="animate-silver-shimmer pointer-events-none absolute inset-y-0 w-1/3"
          style={{
            background:
              'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent-primary) 10%, transparent), transparent)',
          }}
        />
        <div className="relative z-10 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
          <span>{lang === 'ar' ? settings?.illustrativeNoticeAr : settings?.illustrativeNoticeEn}</span>
        </div>
      </motion.div>

      {/* 2-Column Editorial Hero Split (items-stretch for symmetrical vertical alignment) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid grid-cols-1 overflow-hidden rounded-2xl border lg:grid-cols-12 items-stretch"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div
          className="animate-atelier-float pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full blur-3xl opacity-65"
          style={{ backgroundColor: 'var(--accent-soft)' }}
        />
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-6 lg:p-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-wide"
            style={{ color: 'var(--accent-primary)' }}
          >
            {t.heroKicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-editorial mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl text-balance"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold cursor-pointer transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-contrast)',
              }}
            >
              <span>{t.heroCta}</span>
              <ArrowIcon className="h-4 w-4" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('track')}
              className="inline-flex items-center rounded-xl border px-5 py-3 text-sm font-medium cursor-pointer transition-colors hover:opacity-85"
              style={{
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
              }}
            >
              {t.heroSecondary}
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden min-h-[280px] sm:min-h-[360px] lg:col-span-6 lg:min-h-[460px]"
          style={{ backgroundColor: 'var(--bg-subtle)' }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]"
          >
            <Image
              src="/images/hero_silver_atelier_1794604055421.jpg"
              alt={lang === 'ar' ? 'تشكيلة فضة 925 وحقائب جلدية فاخرة' : 'City Silver 925 sterling silver jewelry and architectural leather bag'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Full-width 3-column metrics strip below hero split */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 grid grid-cols-1 divide-y rounded-2xl border sm:grid-cols-3 sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <motion.div whileHover={{ y: -2 }} className="p-5 transition-colors hover:bg-[var(--bg-subtle)]/40">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
            </span>
            <span>{t.silverRateLabel}</span>
          </div>
          <div className="font-mono-tabular mt-1 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {silverPricing ? `${silverPricing.silver925PerGram} ${t.currency}` : '85 EGP'}
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="p-5 transition-colors hover:bg-[var(--bg-subtle)]/40" style={{ borderColor: 'var(--border-hairline)' }}>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.freeShippingLabel}
          </div>
          <div className="font-mono-tabular mt-1 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {settings ? `${settings.freeShippingThreshold.toLocaleString()} ${t.currency}` : '3,000 EGP'}
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="p-5 transition-colors hover:bg-[var(--bg-subtle)]/40" style={{ borderColor: 'var(--border-hairline)' }}>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.pickupServiceLabel}
          </div>
          <div className="mt-1 text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>
            {lang === 'ar' ? 'تجهيز فوري وحجز بالمتجر' : 'Same-Day Boutique Hold & COD'}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
