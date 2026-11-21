'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, Heart, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CATEGORY_LABELS, MATERIAL_LABELS } from '../data/translations';
import type { Product, ProductMaterial } from '../types/store';

export function CatalogSection() {
  const {
    lang,
    t,
    products,
    categories: storeCategories,
    loadingStore,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    catalogFilter,
    setCatalogFilter,
  } = useStore();

  const [search, setSearch] = useState('');
  const [material, setMaterial] = useState<ProductMaterial | 'all'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const category = catalogFilter;
  const setCategory = setCatalogFilter;

  const categoryTabs = useMemo(() => {
    const base = [{ slug: 'all', nameAr: CATEGORY_LABELS.ar.all, nameEn: CATEGORY_LABELS.en.all }];
    if (storeCategories.length > 0) {
      return [...base, ...storeCategories.map((c) => ({ slug: c.slug, nameAr: c.nameAr, nameEn: c.nameEn }))];
    }
    return [
      ...base,
      { slug: 'rings', nameAr: CATEGORY_LABELS.ar.rings, nameEn: CATEGORY_LABELS.en.rings },
      { slug: 'necklaces', nameAr: CATEGORY_LABELS.ar.necklaces, nameEn: CATEGORY_LABELS.en.necklaces },
      { slug: 'bracelets_earrings', nameAr: CATEGORY_LABELS.ar.bracelets_earrings, nameEn: CATEGORY_LABELS.en.bracelets_earrings },
      { slug: 'evening_bags', nameAr: CATEGORY_LABELS.ar.evening_bags, nameEn: CATEGORY_LABELS.en.evening_bags },
      { slug: 'tote_bags', nameAr: CATEGORY_LABELS.ar.tote_bags, nameEn: CATEGORY_LABELS.en.tote_bags },
    ];
  }, [storeCategories]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category === 'silver_all') {
        if (p.material === 'full_grain_leather') return false;
      } else if (category === 'bags_all') {
        if (p.material !== 'full_grain_leather') return false;
      } else if (category !== 'all' && p.category !== category) {
        return false;
      }
      if (material !== 'all' && p.material !== material) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (!q) return true;
      return (
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q) ||
        p.descriptionEn.toLowerCase().includes(q)
      );
    });

    if (sortBy === 'price_asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, search, category, material, inStockOnly, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, product.variants[0] || 'Standard', 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId((curr) => (curr === product.id ? null : curr)), 1200);
  };

  return (
    <section id="catalog-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Section Header & Search Controls */}
      <div className="flex flex-col gap-6 border-b pb-6" style={{ borderColor: 'var(--border-hairline)' }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="font-serif-editorial text-2xl font-semibold sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {lang === 'ar' ? 'التشكيلة المختارة' : 'Curated Collection'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-mono-tabular font-medium">{filteredProducts.length}</span>{' '}
              {t.allProductsCount}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border py-2.5 ps-10 pe-4 text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Interactive Category Tabs + Material & Sort Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categoryTabs.map((cat) => {
              const active = category === cat.slug;
              return (
                <motion.button
                  key={cat.slug}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat.slug)}
                  className="relative rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
                  style={{
                    color: active ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="catalog-category-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  )}
                  {!active && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-subtle)' }}
                    />
                  )}
                  <span className="relative z-10">{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as ProductMaterial | 'all')}
                className="rounded-lg border px-3 py-2 text-xs font-medium focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                  color: 'var(--text-primary)',
                }}
              >
                {(Object.keys(MATERIAL_LABELS[lang]) as (ProductMaterial | 'all')[]).map((mat) => (
                  <option key={mat} value={mat}>
                    {MATERIAL_LABELS[lang][mat]}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'price_asc' | 'price_desc')}
              className="rounded-lg border px-3 py-2 text-xs font-medium focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
            </select>

            <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--accent-primary)]"
              />
              <span>{t.inStockOnly}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loadingStore ? (
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 animate-pulse rounded-2xl border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
              }}
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div
          className="mt-10 rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ar'
              ? 'لا توجد قطع مطابقة لخيارات البحث الحالية.'
              : 'No pieces match your current search or filter criteria.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCategory('all');
              setMaterial('all');
              setInStockOnly(false);
            }}
            className="mt-4 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-contrast)',
            }}
          >
            {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const wished = wishlist.includes(product.id);
            const justAdded = justAddedId === product.id;

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                whileHover={{ y: -5 }}
                transition={{
                  duration: 0.34,
                  delay: Math.min((index % 3) * 0.06, 0.22),
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col overflow-hidden rounded-2xl border cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                {/* Studio Imagery 4:3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  <Image
                    src={product.imageUrl.replace('/src/assets/images/', '/images/')}
                    alt={lang === 'ar' ? product.nameAr : product.nameEn}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Silver Gleam on Card Hover */}
                  <div
                    className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-700 group-hover:start-[120%] group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
                    }}
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.78 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label={t.wishlist}
                    className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md cursor-pointer"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--bg-surface) 85%, transparent)',
                      color: wished ? 'var(--accent-primary)' : 'var(--text-primary)',
                    }}
                  >
                    <motion.span
                      key={wished ? 'wished' : 'unwished'}
                      initial={{ scale: 0.7 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 480, damping: 18 }}
                      className="inline-flex"
                    >
                      <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
                    </motion.span>
                  </motion.button>
                </div>

                {/* Clean Unboxed Metadata & Purchase Action */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {/* Zero-Pill Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>{CATEGORY_LABELS[lang][product.category]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{product.sku}</span>
                      {product.weightGrams ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {product.weightGrams} {t.weightGram}
                          </span>
                        </>
                      ) : null}
                    </div>

                    <h3
                      className="mt-2 text-base font-semibold leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {lang === 'ar' ? product.nameAr : product.nameEn}
                    </h3>

                    <p
                      className="mt-1.5 line-clamp-2 text-xs leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                    <div>
                      <div className="font-mono-tabular text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {product.price.toLocaleString()} {t.currency}
                      </div>
                      <div
                        className="text-[11px] font-medium"
                        style={{
                          color: product.stock > 5 ? 'var(--text-muted)' : 'var(--accent-primary)',
                        }}
                      >
                        {product.stock <= 0
                          ? t.outOfStock
                          : product.stock <= 5
                          ? `${t.lowStock} (${product.stock})`
                          : t.inStock}
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      disabled={product.stock <= 0}
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                      style={{
                        backgroundColor: justAdded ? 'var(--bg-subtle)' : 'var(--accent-primary)',
                        color: justAdded ? 'var(--accent-primary)' : 'var(--accent-contrast)',
                      }}
                    >
                      {justAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                      <span>{justAdded ? (lang === 'ar' ? 'تمت الإضافة' : 'Added') : t.addToBag}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
