import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { menuData } from '../../data/menu';

/* ─── Pick the 3 drink items flagged special / signature ───────────────── */
const DRINK_CATEGORY_IDS = new Set(['coffee', 'cold-coffee', 'tea']);
const SPECIAL_BADGES = new Set(['Special', 'Signature']);

const signatureDrinks = (() => {
  const drinkCats = menuData.categories.filter((c) => DRINK_CATEGORY_IDS.has(c.id));
  const specials = [];
  for (const cat of drinkCats) {
    for (const item of cat.items) {
      if (SPECIAL_BADGES.has(item.badge) && specials.length < 3) {
        specials.push(item);
      }
    }
  }
  if (specials.length >= 3) return specials.slice(0, 3);
  const specialIds = new Set(specials.map((i) => i.id));
  const extras = [];
  for (const cat of drinkCats) {
    for (const item of cat.items) {
      if (!specialIds.has(item.id) && extras.length < 3 - specials.length) {
        extras.push(item);
      }
    }
  }
  return [...specials, ...extras].slice(0, 3);
})();

import { useCart } from '../../context/CartContext';
import { Plus, Check } from 'lucide-react';

/* ─── Luxury Editorial Custom Card ─────────────────────────────────────── */
const DrinkPanel = ({ item, index, prefersReducedMotion }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative overflow-hidden bg-[#1F1612] border border-[#C9A012]/20 hover:border-[#C9A012] transition-all duration-500 shadow-lg hover:shadow-[0_16px_36px_rgba(201,160,18,0.2)]"
    >
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="font-grotesk text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1 bg-[#1F1612]/90 backdrop-blur-sm text-[#C9A012] border border-[#C9A012]/50 shadow-sm flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A012] animate-pulse" />
          {item.badge || 'Signature'}
        </span>
      </div>

      {/* Image with smooth zoom and grayscale-to-color transition */}
      <div className="aspect-[3/4] overflow-hidden relative">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#3A2518] to-[#1F1612] flex items-center justify-center">
            <span className="text-[#C9A27E]/40 font-cormorant text-6xl italic">{item.name[0]}</span>
          </div>
        )}
        {/* Dark editorial gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/40 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Content & Quick-Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
        <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase text-[#C9A27E] mb-1.5">
          Tatva Craft Selection
        </span>
        <h3 className="font-cormorant font-semibold text-[#FBF7F1] text-2xl sm:text-3xl leading-tight mb-2 group-hover:text-[#F3E5D8] transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="font-grotesk text-xs text-[#FBF7F1]/70 line-clamp-1 mb-4">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#FBF7F1]/15">
          <span className="font-cormorant text-2xl font-bold text-[#C9A012]">
            {item.formattedPrice || `₹${item.price}`}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${item.slug}`}
              className="font-grotesk text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FBF7F1]/75 hover:text-[#FBF7F1] px-2.5 py-1.5 border border-[#FBF7F1]/20 hover:border-[#FBF7F1] transition-all"
            >
              Details
            </Link>
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${item.name} to cart`}
              className={`font-grotesk text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 transition-all duration-300 flex items-center gap-1 ${
                added
                  ? 'bg-[#2E7D32] text-white border border-[#2E7D32]'
                  : 'bg-[#C9A012] hover:bg-[#E5B815] text-[#1F1612] border border-[#C9A012]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3" /> Added
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" /> Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Section ──────────────────────────────────────────────────────────── */
export const SignatureDrinks = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="signature-drinks"
      className="bg-[#FBF7F1] py-20 md:py-24"
      aria-label="Signature Drinks"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mb-12 md:mb-16">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="bd-eyebrow block mb-3">Signature Drinks</span>
            <h2 className="font-cormorant font-semibold text-[#1F1612] text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">
              What Fuels Us
            </h2>
          </div>
          <Link
            to="/menu"
            className="bd-btn bd-btn-caramel self-start sm:self-auto"
          >
            View Full Menu
          </Link>
        </motion.div>
      </div>

      {/* BD-style 3-col image grid — full width, no padding, no border-radius */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-[#1F1612]/10">
        {signatureDrinks.map((item, i) => (
          <DrinkPanel
            key={item.id}
            item={item}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default SignatureDrinks;
