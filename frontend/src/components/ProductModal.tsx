'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CATEGORY_LABELS, MATERIAL_LABELS } from '../data/translations';

export function ProductModal() {
  const {
    lang,
    t,
    selectedProduct,
    setSelectedProduct,
    silverPricing,
    addToCart,
    wishlist,
    toggleWishlist,
    setCartOpen,
  } = useStore();

  const [variant, setVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [engravingNote, setEngravingNote] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setVariant(selectedProduct.variants[0] || 'Standard');
      setQuantity(1);
      setEngravingNote('');
      setAdded(false);
    }
  }, [selectedProduct]);

  const wished = selectedProduct ? wishlist.includes(selectedProduct.id) : false;

  const handleAdd = () => {
    if (!selectedProduct || selectedProduct.stock <= 0) return;
    addToCart(selectedProduct, variant, quantity, engravingNote.trim() || undefined);
    setAdded(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setCartOpen(true);
    }, 350);
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-2xl border shadow-2xl md:grid-cols-12"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            aria-label="Close"
            className="absolute top-4 end-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
            }}
          >
            <X className="h-4 w-4" />
          </button>

          {/* Media Frame */}
          <motion.div
            initial={{ opacity: 0.7, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[280px] overflow-hidden md:col-span-6"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            <Image
              src={selectedProduct.imageUrl.replace('/src/assets/images/', '/images/')}
              alt={lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
            />
          </motion.div>

          {/* Contiguous Purchase Module */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{CATEGORY_LABELS[lang][selectedProduct.category]}</span>
                <span aria-hidden="true">·</span>
                <span>{MATERIAL_LABELS[lang][selectedProduct.material]}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{selectedProduct.sku}</span>
              </div>

              <h2
                className="font-serif-editorial mt-2 text-2xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono-tabular text-2xl font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {selectedProduct.price.toLocaleString()} {t.currency}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {selectedProduct.stock > 0
                    ? `${t.inStock} (${selectedProduct.stock})`
                    : t.outOfStock}
                </span>
              </div>

              {/* Silver 925 Weight Pricing Breakdown */}
              {selectedProduct.useSilverPricing && selectedProduct.weightGrams && silverPricing && (
                <div
                  className="mt-4 rounded-xl border p-3 text-xs"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div className="flex justify-between">
                    <span>{lang === 'ar' ? 'الوزن الصافي (عيار 925)' : 'Net Weight (925 Sterling)'}</span>
                    <span className="font-mono-tabular font-medium">
                      {selectedProduct.weightGrams} {t.weightGram}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span>{lang === 'ar' ? 'تسعير الجرام × الوزن + المصنعية' : 'Gram Rate × Weight + Craft'}</span>
                    <span className="font-mono-tabular">
                      {silverPricing.silver925PerGram} × {selectedProduct.weightGrams} +{' '}
                      {selectedProduct.makingCharge || 0}
                    </span>
                  </div>
                </div>
              )}

              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
              </p>

              {/* Variant Selector */}
              <div className="mt-5">
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.selectVariant}
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.map((v) => {
                    const active = v === variant;
                    return (
                      <motion.button
                        key={v}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setVariant(v)}
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors"
                        style={{
                          backgroundColor: active ? 'var(--accent-soft)' : 'transparent',
                          borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                          color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
                        }}
                      >
                        {v}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Engraving / Gift Note */}
              <div className="mt-4">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  {t.engravingOptional}
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={engravingNote}
                  onChange={(e) => setEngravingNote(e.target.value)}
                  placeholder={t.engravingPlaceholder}
                  className="w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
              <div
                className="flex items-center rounded-xl border"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-sm font-medium cursor-pointer"
                >
                  −
                </button>
                <span className="font-mono-tabular px-2 text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock || 1, q + 1))}
                  className="px-3 py-2.5 text-sm font-medium cursor-pointer"
                >
                  +
                </button>
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                disabled={selectedProduct.stock <= 0}
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
              >
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                <span>{added ? (lang === 'ar' ? 'تمت الإضافة' : 'Added to Bag') : t.addToBag}</span>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleWishlist(selectedProduct.id)}
                aria-label={t.wishlist}
                className="flex h-11 w-11 items-center justify-center rounded-xl border cursor-pointer"
                style={{
                  borderColor: 'var(--border-hairline)',
                  color: wished ? 'var(--accent-primary)' : 'var(--text-primary)',
                }}
              >
                <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
