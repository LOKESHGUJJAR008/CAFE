import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
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
    description: 'Explore the handcrafted botanical & artisan coffee flipbook menu at TATVA Café with curated pairings.',
  });

  const rm = useReducedMotion();
  const { totalItems, subtotal, openCart } = useCart();

  return (
    <div className="bg-foam text-ink min-h-screen pb-32 overflow-x-clip selection:bg-ink selection:text-foam">
      {/* ── Top Running Archival Ticker (Flush with Navbar) ── */}
      <div className="w-full border-b border-latte/30 bg-almond/20 py-2 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-[11px] font-inter font-semibold uppercase tracking-[0.24em] text-ink/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-caramel" />
            <span>TATVA BOTANICAL KITCHEN • COMPENDIUM</span>
          </div>
          <span className="text-latte/60 font-normal">/</span>
          <span>100% CHIKMAGALUR SINGLE-ORIGIN ARABICA</span>
          <span className="text-latte/60 font-normal">/</span>
          <span>HAND-ROLLED SOURDOUGH &amp; PATISSERIE</span>
          <span className="text-latte/60 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>KITCHEN &amp; BREW BAR ACTIVE</span>
          </div>
        </div>
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            {...fadeUp(0, rm)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-almond/60 border border-caramel/30 text-caramel text-[11px] font-bold tracking-[0.22em] uppercase font-inter mb-3"
          >
            <Sparkles className="w-3 h-3 text-caramel" />
            <span>Artisan Compendium • Kota Sanctuary</span>
          </motion.div>
          
          <motion.h1
            {...fadeUp(0.08, rm)}
            className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight"
          >
            The TATVA Menu Book
          </motion.h1>
          
          <motion.p
            {...fadeUp(0.16, rm)}
            className="mt-2.5 text-ink/70 max-w-xl font-inter text-xs sm:text-sm tracking-normal leading-relaxed"
          >
            Turn authentic artisan pages of our physical leather folio. Discover single-origin coffees, chilled nitro infusions, and chef-curated pairings.
          </motion.p>
        </div>
      </div>

      {/* ── ALLERGEN NOTICE ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-2 flex flex-col items-center border-y border-latte/20 mb-4 bg-almond/15 rounded-lg">
        <p className="text-[11px] text-ink/65 italic text-center font-inter">
          Fresh ingredients, pure extracts &amp; zero artificial syrups. Please inform our baristas of any dietary allergies.
        </p>
      </div>

      {/* ── DEDICATED FLIPBOOK MENU ─────────────────────────────────── */}
      <div className="mt-2 pb-24 md:pb-12">
        <FlipMenu />
      </div>

      {/* ── MOBILE CART BAR ─────────────────────────────────────────── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-40 bg-ink text-foam border border-latte/40 p-3.5 sm:p-4 rounded-xl flex items-center justify-between shadow-2xl backdrop-blur-md"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-latte font-semibold uppercase tracking-widest font-inter">
                {totalItems} item{totalItems !== 1 && 's'} in order
              </span>
              <span className="font-playfair font-bold text-2xl text-foam">₹{subtotal}</span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="px-5 py-2.5 bg-caramel hover:bg-[#8C4E22] text-foam font-bold font-inter text-xs uppercase tracking-[0.16em] rounded-lg transition-colors flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>View Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;

