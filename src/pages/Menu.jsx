import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useCart } from '../context/CartContext';
import FlipMenu from '../components/menu/FlipMenu';

/* ─── Shared easing ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0, rm = false) => ({
  initial: rm ? { opacity: 0 } : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

export const MenuPage = () => {
  useDocumentMeta({
    title: 'Artisan Menu | TATVA Café • Talwandi, Kota',
    description: 'Explore the handcrafted botanical & artisan coffee menu at TATVA Café.',
  });

  const rm = useReducedMotion();
  const { totalItems, subtotal } = useCart();
  const openCart = () => window.dispatchEvent(new Event('open-cart'));

  return (
    <div className="bg-foam text-ink min-h-screen pb-32 overflow-x-hidden">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-8 lg:pt-32 border-b border-latte/30">
        <div className="flex flex-col items-center text-center">
          <motion.span
            {...fadeUp(0, rm)}
            className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter"
          >
            Our Menu
          </motion.span>
          <motion.h1
            {...fadeUp(0.08, rm)}
            className="font-playfair font-bold text-4xl sm:text-5xl text-ink"
          >
            Brewed fresh, served warm
          </motion.h1>
          <motion.p
            {...fadeUp(0.16, rm)}
            className="mt-2 text-ink/70 max-w-lg font-inter text-sm sm:text-base leading-relaxed"
          >
            Artisan coffee, comforting bakes, and royal flavors.
          </motion.p>
        </div>
      </div>

      {/* ── ALLERGEN NOTICE ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-col items-center border-b border-latte/20 mb-6 bg-foam/60 backdrop-blur-xs">
        <p className="text-[11px] text-ink/60 italic text-center font-inter">
          Ingredients and allergens: please ask our team before ordering.
        </p>
      </div>

      {/* ── INTERACTIVE FLIPBOOK MENU ─────────────────────────────────── */}
      <FlipMenu />

      {/* ── MOBILE CART BAR ─────────────────────────────────────────── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-4 inset-x-4 z-40 bg-foam/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(31,22,18,0.15)] border border-latte/30 p-4 flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-xs text-ink/70 font-medium uppercase tracking-wider font-inter">
                {totalItems} item{totalItems !== 1 && 's'}
              </span>
              <span className="font-bold text-ink text-lg font-inter">₹{subtotal}</span>
            </div>
            <button
              onClick={openCart}
              className="px-6 py-2.5 rounded-full bg-caramel text-foam font-bold font-inter text-sm shadow-warm hover:bg-caramel/90 transition-colors"
            >
              View order
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
