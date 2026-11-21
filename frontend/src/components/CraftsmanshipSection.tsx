'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function CraftsmanshipSection() {
  const { t } = useStore();

  const pillars = [
    {
      num: '01.',
      title: t.atelierPoint1Title,
      desc: t.atelierPoint1Desc,
    },
    {
      num: '02.',
      title: t.atelierPoint2Title,
      desc: t.atelierPoint2Desc,
    },
    {
      num: '03.',
      title: t.atelierPoint3Title,
      desc: t.atelierPoint3Desc,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border p-6 sm:p-10"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div className="max-w-2xl">
          <h2
            className="font-serif-editorial text-2xl font-semibold sm:text-3xl text-balance"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.atelierTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t.atelierBody}
          </p>
        </div>

        <div
          className="mt-8 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          {pillars.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group space-y-2 rounded-xl p-3 -m-3 transition-colors hover:bg-[var(--bg-canvas)]"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono-tabular text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {item.num}
                </span>
                <span
                  className="h-[1px] w-6 transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              </div>
              <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
