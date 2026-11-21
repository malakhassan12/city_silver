'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function Footer() {
  const { lang, t, navigate, userRole, openAuthModal, setCatalogFilter, logout } = useStore();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 border-t py-10"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="font-serif-editorial text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'سيتي سيلفر 925 والحقائب' : 'City Silver 925 & Bags'}
          </div>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            {lang === 'ar'
              ? 'كتالوج توضيحي للمجوهرات الفضية عيار 925 والحقائب الجلدية · جميع البيانات لأغراض العرض.'
              : 'Illustrative 925 sterling silver jewelry & leather bags boutique · Sample catalog & workflow data.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {(userRole === 'guest' || userRole === 'customer') && (
            <>
              <button
                type="button"
                onClick={() => {
                  setCatalogFilter('all');
                  navigate('storefront');
                }}
                className="cursor-pointer hover:underline"
              >
                {t.navCatalog}
              </button>
              <button type="button" onClick={() => navigate('track')} className="cursor-pointer hover:underline">
                {t.navTrack}
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('staff')}
                className="cursor-pointer hover:underline opacity-75"
              >
                {lang === 'ar' ? 'بوابة الموظفين والإدارة' : 'Staff & Admin Portal'}
              </button>
            </>
          )}

          {userRole === 'employee' && (
            <>
              <button type="button" onClick={() => navigate('employee')} className="cursor-pointer hover:underline">
                {t.navEmployee}
              </button>
              <button type="button" onClick={logout} className="cursor-pointer hover:underline">
                {t.signOut}
              </button>
            </>
          )}

          {userRole === 'owner' && (
            <>
              <button type="button" onClick={() => navigate('owner')} className="cursor-pointer hover:underline">
                {t.navOwner}
              </button>
              <button type="button" onClick={logout} className="cursor-pointer hover:underline">
                {t.signOut}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.footer>
  );
}
