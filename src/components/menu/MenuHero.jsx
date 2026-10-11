import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export const MenuHero = ({ onScrollToBook }) => {
  const rm = useReducedMotion();

  const handleScroll = () => {
    if (onScrollToBook) {
      onScrollToBook();
    } else {
      const el = document.getElementById('royal-menu-book');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
      {/* Decorative Warm Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[260px] bg-almond/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Illustrated Cafe Line-art Scene */}
      <motion.div
        initial={rm ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto mb-6 w-36 h-28 sm:w-48 sm:h-36 flex items-center justify-center text-latte"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 140"
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Cafe Window Frame */}
          <rect x="30" y="15" width="140" height="95" rx="8" className="stroke-latte/50" />
          <line x1="100" y1="15" x2="100" y2="110" className="stroke-latte/40" />
          <line x1="30" y1="65" x2="170" y2="65" className="stroke-latte/40" />

          {/* Steaming Coffee Cup on Window Sill */}
          <rect x="20" y="110" width="160" height="5" rx="2.5" className="fill-latte stroke-latte" />
          <path d="M85 96 h30 a6 6 0 0 1 6 6 v6 a10 10 0 0 1 -10 10 h-22 a10 10 0 0 1 -10 -10 v-6 a6 6 0 0 1 6 -6 z" className="fill-almond stroke-ink" />
          <path d="M121 102 a5 5 0 0 1 6 5 v2 a5 5 0 0 1 -6 5" className="stroke-ink" />
          <ellipse cx="100" cy="117" rx="24" ry="2" className="stroke-latte fill-almond" />

          {/* Steam curves */}
          <path d="M94 88 c0 -6 5 -6 5 -12" className="stroke-caramel opacity-80" />
          <path d="M102 85 c0 -6 5 -6 5 -12" className="stroke-caramel opacity-90" />
          <path d="M110 88 c0 -6 5 -6 5 -12" className="stroke-caramel opacity-70" />

          {/* Hanging Bistro Lamp */}
          <path d="M45 15 v18" className="stroke-latte" />
          <path d="M38 33 h14 l-3 8 h-8 z" className="stroke-caramel fill-almond" />
          <circle cx="45" cy="43" r="1.5" className="fill-caramel stroke-caramel" />

          {/* Small Potted Plant */}
          <path d="M148 100 l3 10 h10 l3 -10 z" className="stroke-ink fill-almond" />
          <path d="M156 100 c-3 -8 -8 -5 -8 -10 c6 0 8 6 8 10" className="stroke-[#2E7D32]" />
          <path d="M156 100 c3 -8 8 -5 8 -10 c-6 0 -8 6 -8 10" className="stroke-[#2E7D32]" />
        </svg>
      </motion.div>

      {/* Eyebrow */}
      <motion.span
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-caramel mb-2 font-inter"
      >
        Artisan Café & Roastery
      </motion.span>

      {/* Headline */}
      <motion.h1
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight mb-3"
      >
        Brewed with love, served with elegance
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="font-inter text-ink/70 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
      >
        Turn the pages of our handcrafted 3D menu book. Explore single-origin pour-overs, chilled blends, and freshly baked bites.
      </motion.p>

      {/* Scroll to open menu button with bouncing arrow */}
      <motion.div
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
      >
        <button
          type="button"
          onClick={handleScroll}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-almond/50 hover:bg-almond border border-latte/40 text-ink text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm group"
        >
          <span>Scroll to open the menu</span>
          <motion.span
            animate={rm ? {} : { y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-caramel group-hover:text-ink transition-colors"
          >
            <ArrowDown className="w-4 h-4 stroke-[2.2]" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};

export default MenuHero;
