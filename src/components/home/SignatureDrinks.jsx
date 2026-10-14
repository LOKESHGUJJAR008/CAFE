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

/* ─── BD-style 3-column image card ─────────────────────────────────────── */
const DrinkPanel = ({ item, index, prefersReducedMotion }) => {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative overflow-hidden bg-[#1F1612]"
    >
      {/* Image — no border radius */}
      <div className="aspect-[3/4] overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-85 group-hover:opacity-100"
          />
        ) : (
          // Atmospheric placeholder
          <div className="w-full h-full bg-gradient-to-b from-[#3A2518] to-[#1F1612] flex items-center justify-center">
            <span className="text-[#C9A27E]/40 font-cormorant text-6xl italic">{item.name[0]}</span>
          </div>
        )}
        {/* Dark hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/20 to-transparent" />
      </div>

      {/* Caption — BD style: no card, text over image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        {/* Badge */}
        {item.badge && (
          <span className="block font-grotesk text-[9px] tracking-[0.3em] uppercase text-[#C9A27E] mb-2">
            {item.badge}
          </span>
        )}
        {/* Name */}
        <h3 className="font-cormorant font-semibold text-[#FBF7F1] text-2xl sm:text-3xl leading-tight mb-1">
          {item.name}
        </h3>
        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <span className="font-grotesk text-sm text-[#C9A27E] font-semibold">
            {item.formattedPrice}
          </span>
          <Link
            to={`/menu/${item.slug}`}
            className="font-grotesk text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FBF7F1]/60
                       hover:text-[#FBF7F1] border-b border-[#FBF7F1]/30 hover:border-[#FBF7F1]
                       pb-0.5 transition-all duration-200 focus-visible:outline-none"
          >
            Order →
          </Link>
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
