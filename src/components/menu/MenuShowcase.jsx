import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import BlobShape from './BlobShape';
import CategoryThumb from './CategoryThumb';
import DietBadge from '../DietBadge';

/**
 * MenuShowcase component
 * Dynamic category stage with blob morphing, color re-theming, rotating image transitions,
 * dotted leader item list, and accessible keyboard-navigable tablist.
 */
export const MenuShowcase = ({ menuData }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCategory = menuData.categories[activeIdx] || menuData.categories[0];
  const { theme, items, image, name } = activeCategory;

  const tabRefs = useRef([]);
  const thumbScrollRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Keyboard navigation for tablist
  const handleKeyDown = (e, index) => {
    let nextIdx = null;
    const total = menuData.categories.length;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (index + 1) % total;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (index - 1 + total) % total;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = total - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  // Scroll active thumbnail into view on mobile
  useEffect(() => {
    if (tabRefs.current[activeIdx]) {
      tabRefs.current[activeIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIdx]);

  return (
    <motion.section
      id="menu-stage"
      animate={{ backgroundColor: theme.bg }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      className={`relative min-h-screen py-12 lg:py-20 overflow-hidden transition-colors ${theme.textColor}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ── DESKTOP LAYOUT (Hidden on mobile) ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center min-h-[640px]">

          {/* LEFT COLUMN: Blob, Category Title, Item List, Thumbnails (7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col justify-between h-full py-4 pr-4">

            {/* Organic SVG Blob behind text content */}
            <div
              className="absolute -top-12 -left-16 w-[560px] h-[560px] pointer-events-none z-0"
              aria-hidden="true"
            >
              <BlobShape d={theme.blobPath} fill={theme.blob} />
            </div>

            {/* Content Container (z-10 over blob) */}
            <div className="relative z-10 flex flex-col justify-between h-full">

              {/* Category Header */}
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="font-playfair font-bold text-5xl xl:text-6xl tracking-tight leading-none">
                    {name}
                  </h2>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${theme.subtextColor}`}>
                    {items.length} Options
                  </span>
                </div>
                <p className={`text-sm ${theme.subtextColor} max-w-lg mb-6`}>
                  {activeCategory.description}
                </p>
              </div>

              {/* Active Category Item List (Tabpanel) */}
              <div
                role="tabpanel"
                id={`panel-${activeCategory.id}`}
                aria-labelledby={`tab-${activeCategory.id}`}
                className={`my-4 p-6 sm:p-8 rounded-3xl border transition-colors ${theme.cardBg} backdrop-blur-sm shadow-warm`}
              >
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activeCategory.id}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.07, delayChildren: 0.05 }
                      },
                      exit: { opacity: 0, transition: { duration: 0.15 } }
                    }}
                    className="flex flex-col gap-4"
                  >
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: -8 }
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <Link
                          to={`/menu/${item.slug}`}
                          className="flex items-center justify-between gap-3 group"
                        >
                          {/* Item Name */}
                          <div className="flex items-center gap-2">
                            <DietBadge diet={item.diet} size="sm" />
                            <span className="font-playfair font-semibold text-base sm:text-lg group-hover:text-caramel transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-caramel/20 text-caramel border border-caramel/30">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Dotted Leader Line */}
                          <div
                            className="flex-1 mx-3 border-b-2 border-dotted opacity-30 group-hover:opacity-60 transition-opacity"
                            aria-hidden="true"
                          />

                          {/* Price */}
                          <span className={`font-playfair font-bold text-lg sm:text-xl ${theme.priceColor}`}>
                            {item.formattedPrice}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* Thumbnails Row (Tablist) */}
              <div className="mt-6 pt-4 border-t border-current/10">
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${theme.subtextColor} block mb-3`}>
                  Select Category
                </span>
                <div
                  role="tablist"
                  aria-label="Menu Categories"
                  className="flex items-center gap-4"
                >
                  {menuData.categories.map((cat, idx) => (
                    <CategoryThumb
                      key={cat.id}
                      category={cat}
                      isActive={activeIdx === idx}
                      onClick={() => setActiveIdx(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      buttonRef={(el) => (tabRefs.current[idx] = el)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Big Rotating Hero Product Image (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-full min-h-[500px] overflow-hidden">

            {/* Accent backdrop circle — z-0, stays inside this column */}
            <motion.div
              animate={{ backgroundColor: theme.accent }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: 'easeInOut' }
              }
              className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full opacity-40 blur-2xl pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Product Image Stage — rounded mask so no square edges */}
            <div className="relative z-10 w-[72%] aspect-square flex items-center justify-center rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.75, rotate: -15 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.75, rotate: 15 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.2 }
                      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Floating idle animation wrapper */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { y: [0, -10, 0] }
                    }
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={image}
                      alt={name}
                      width={400}
                      height={400}
                      loading={activeIdx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* ── MOBILE LAYOUT (Purpose-built, stacked) ── */}
        <div className="lg:hidden flex flex-col gap-6">

          {/* 1. Large Round Hero Image over Accent Circle */}
          <div className="relative flex items-center justify-center py-6 min-h-[260px]">
            {/* Background Accent Blob */}
            <motion.div
              animate={{ backgroundColor: theme.accent }}
              transition={{ duration: 0.5 }}
              className="absolute w-60 h-60 rounded-full opacity-70 blur-sm pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 w-[75vw] max-w-[280px] aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeCategory.id}
                  src={image}
                  alt={name}
                  width={300}
                  height={300}
                  loading={activeIdx === 0 ? 'eager' : 'lazy'}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8, rotate: -12 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8, rotate: 12 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* 2. Horizontal Scroll-Snap Row of 5 Thumbnails */}
          <div
            ref={thumbScrollRef}
            role="tablist"
            aria-label="Menu Categories"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-4 -mx-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {menuData.categories.map((cat, idx) => (
              <div key={cat.id} className="snap-center flex-shrink-0">
                <CategoryThumb
                  category={cat}
                  isActive={activeIdx === idx}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  buttonRef={(el) => (tabRefs.current[idx] = el)}
                />
              </div>
            ))}
          </div>

          {/* 3. Category Title & Subtext */}
          <div className="text-center mt-2">
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl leading-tight">
              {name}
            </h2>
            <span className={`text-xs font-semibold uppercase tracking-widest ${theme.subtextColor} block mt-1`}>
              {items.length} Items Available
            </span>
          </div>

          {/* 4. Item List inside a Rounded Card */}
          <div
            role="tabpanel"
            id={`panel-mobile-${activeCategory.id}`}
            aria-labelledby={`tab-${activeCategory.id}`}
            className={`p-5 rounded-3xl border transition-colors ${theme.cardBg} shadow-warm`}
          >
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeCategory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-current/10 pb-3 last:border-b-0 last:pb-0"
                  >
                    <Link
                      to={`/menu/${item.slug}`}
                      className="flex items-center justify-between gap-2 group"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-start gap-1.5 mb-1">
                          <DietBadge diet={item.diet} size="xs" />
                          <span className="font-playfair font-semibold text-base group-hover:text-caramel transition-colors leading-tight">
                            {item.name}
                          </span>
                        </div>
                        <span className={`text-[11px] ${theme.subtextColor} line-clamp-1`}>
                          {item.description}
                        </span>
                      </div>

                      <span className={`font-playfair font-bold text-lg flex-shrink-0 ${theme.priceColor}`}>
                        {item.formattedPrice}
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default MenuShowcase;
