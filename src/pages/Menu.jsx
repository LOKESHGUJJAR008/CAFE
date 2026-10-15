import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LayoutGrid, BookOpen } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useCart } from '../context/CartContext';
import FlipMenu from '../components/menu/FlipMenu';
import FullMenuGrid from '../components/menu/FullMenuGrid';

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
    description: 'Explore the handcrafted botanical & artisan coffee menu at TATVA Café with custom cards and curated pairings.',
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'journal'
  const rm = useReducedMotion();
  const { totalItems, subtotal, openCart } = useCart();

  return (
    <div className="bg-[#FAF7F2] text-[#14100E] min-h-screen pb-32 overflow-x-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      {/* ── Top Running Archival Ticker (Flush with Navbar) ── */}
      <div className="w-full border-b-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA BOTANICAL KITCHEN // MENU COMPENDIUM</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>CHIKMAGALUR SINGLE-ORIGIN ARABICA</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>DIAL-IN: 9.0 BAR EXTRACTION</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>HANDCRAFTED PATISSERIE</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>KITCHEN ACTIVE · 08:00 — 23:00</span>
          </div>
        </div>
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-8 border-b-2 border-[#14100E]">
        <div className="flex flex-col items-center text-center">
          <motion.div
            {...fadeUp(0, rm)}
            className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3"
          >
            <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
              DAILY CAFÉ & BOTANICAL KITCHEN
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.08, rm)}
            className="font-grotesk font-black text-4xl sm:text-6xl text-[#14100E] uppercase tracking-tighter"
          >
            Brewed Fresh, Served Warm
          </motion.h1>
          <motion.p
            {...fadeUp(0.16, rm)}
            className="mt-2 text-[#14100E]/70 max-w-lg font-grotesk text-xs sm:text-sm tracking-wide uppercase leading-relaxed"
          >
            Artisan coffee, single-origin brews, house bakes, and royal pairings.
          </motion.p>

          {/* View Mode Switcher */}
          <motion.div
            {...fadeUp(0.24, rm)}
            className="mt-6 flex items-center p-1 bg-[#FAF7F2] border-2 border-[#14100E] shadow-[3px_3px_0px_#14100E]"
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-grotesk font-black uppercase tracking-[0.18em] transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-[#14100E] text-[#FAF7F2]'
                  : 'text-[#14100E]/70 hover:text-[#14100E]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Artisan Cards Grid
            </button>
            <button
              onClick={() => setViewMode('journal')}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-grotesk font-black uppercase tracking-[0.18em] transition-all duration-200 ${
                viewMode === 'journal'
                  ? 'bg-[#14100E] text-[#FAF7F2]'
                  : 'text-[#14100E]/70 hover:text-[#14100E]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Journal Flipbook
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── ALLERGEN NOTICE ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col items-center border-b border-[#1F1612]/10 mb-6 bg-[#FBF7F1]/80">
        <p className="text-[11px] text-[#1F1612]/60 italic text-center font-grotesk">
          Ingredients and allergens: please inform our baristas before ordering.
        </p>
      </div>

      {/* ── DYNAMIC VIEW: CUSTOM CARDS OR FLIPBOOK ────────────────────── */}
      {viewMode === 'grid' ? (
        <FullMenuGrid />
      ) : (
        <div className="mt-4">
          <FlipMenu />
        </div>
      )}

      {/* ── MOBILE CART BAR ─────────────────────────────────────────── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-40 bg-[#1F1612] text-[#FBF7F1] border border-[#C9A012]/40 p-4 flex items-center justify-between shadow-2xl"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-[#C9A27E] font-semibold uppercase tracking-widest font-grotesk">
                {totalItems} item{totalItems !== 1 && 's'} in order
              </span>
              <span className="font-cormorant font-bold text-2xl text-[#FBF7F1]">₹{subtotal}</span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="px-6 py-2.5 bg-[#C9A012] hover:bg-[#E5B815] text-[#1F1612] font-bold font-grotesk text-xs uppercase tracking-[0.16em] transition-colors"
            >
              View Order →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
