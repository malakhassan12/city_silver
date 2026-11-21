'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

interface SplashScreenProps {
  show: boolean;
  onFinish: () => void;
}

export function SplashScreen({ show, onFinish }: SplashScreenProps) {
  const { lang } = useStore();

  useEffect(() => {
    if (!show) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onFinish, reduced ? 240 : 1650);
    return () => window.clearTimeout(timer);
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="atelier-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -18, scale: 1.015 }}
          transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6 select-none"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            color: 'var(--text-primary)',
          }}
        >
          {/* Ambient radial aura matching active theme & palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: [0, 0.85, 0.55], scale: [0.78, 1.08, 1] }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--accent-soft)' }}
          />

          {/* Top Skip action */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.25 }}
            onClick={onFinish}
            className="absolute top-6 end-6 rounded-lg border px-3.5 py-1.5 text-xs font-medium cursor-pointer"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            {lang === 'ar' ? 'تخطي' : 'Skip'}
          </motion.button>

          {/* Centerpiece Crest & Editorial Title */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* 925 Sterling Silver Precision Crest */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border shadow-lg"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              {/* Metallic Shimmer Sweep */}
              <motion.div
                initial={{ x: '-140%', opacity: 0 }}
                animate={{ x: '160%', opacity: [0, 0.55, 0] }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent-primary) 28%, transparent), transparent)',
                }}
              />

              <svg
                viewBox="0 0 80 80"
                className="h-16 w-16"
                fill="none"
                aria-hidden="true"
              >
                {/* Outer octagonal jewel bezel */}
                <motion.path
                  d="M40 6 L64 16 L74 40 L64 64 L40 74 L16 64 L6 40 L16 16 Z"
                  stroke="var(--accent-primary)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Inner diamond facet */}
                <motion.path
                  d="M40 15 L65 40 L40 65 L15 40 Z"
                  stroke="var(--text-primary)"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>

              {/* Center 925 Hallmark Stamp */}
              <motion.span
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.42, type: 'spring', stiffness: 360, damping: 24 }}
                className="font-mono-tabular absolute text-sm font-bold tracking-wider"
                style={{ color: 'var(--accent-primary)' }}
              >
                925
              </motion.span>
            </motion.div>

            {/* Brand Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial mt-6 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {lang === 'ar' ? 'سيتي سيلفر 925 والحقائب' : 'City Silver 925 & Bags'}
            </motion.h1>

            {/* Bilingual Atelier Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-xs font-medium tracking-wide sm:text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {lang === 'ar'
                ? 'دار المجوهرات الفضية عيار 925 والحقائب الجلدية الفاخرة'
                : '925 Sterling Silver Atelier & Architectural Leather'}
            </motion.p>

            {/* Precision Progress Hairline */}
            <div
              className="mt-7 h-[2px] w-44 overflow-hidden rounded-full"
              style={{ backgroundColor: 'var(--border-hairline)' }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left rtl:origin-right"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
