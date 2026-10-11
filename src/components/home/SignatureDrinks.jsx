import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { menuData } from '../../data/menu';
import DietBadge from '../DietBadge';

/* ─── Pick the 3 drink items flagged special / signature ────────────────────
   Only the drink categories (coffee, cold-coffee, tea) are eligible —
   desserts and snacks are intentionally excluded.
   Step 1: collect items with a Special/Signature badge from drink cats.
   Step 2: if fewer than 3, fill from remaining drink-category items
           (no badge filter) until we have 3. ──────────────────────────── */
const DRINK_CATEGORY_IDS = new Set(['coffee', 'cold-coffee', 'tea']);
const SPECIAL_BADGES = new Set(['Special', 'Signature']);

const signatureDrinks = (() => {
  const drinkCats = menuData.categories.filter((c) => DRINK_CATEGORY_IDS.has(c.id));

  // Step 1 — specials / signatures first
  const specials = [];
  for (const cat of drinkCats) {
    for (const item of cat.items) {
      if (SPECIAL_BADGES.has(item.badge) && specials.length < 3) {
        specials.push(item);
      }
    }
  }
  if (specials.length >= 3) return specials.slice(0, 3);

  // Step 2 — fill remaining slots from all drink items (no badge filter)
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

/* ─── Cup placeholder shown when item.image is missing ─────────────────── */
const CupPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-foam/20 flex items-center justify-center">
      <Coffee className="w-10 h-10 text-foam/60" strokeWidth={1.4} />
    </div>
  </div>
);

/* ─── Individual drink card ─────────────────────────────────────────────── */
const DrinkCard = ({ item, index, prefersReducedMotion }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      /* Extra top margin on mobile so the pop-out image above each card
         does not overlap the card above it in single-column layout. */
      className="relative mt-20 sm:mt-24 md:mt-16 flex-shrink-0"
    >
      {/* ── Pop-out drink image ── */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { rotate: 4, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute -top-14 left-1/2 -translate-x-1/2 z-20
                   w-44 md:w-52 h-44 md:h-52
                   pointer-events-none select-none"
        aria-hidden="true"
      >
        {item.image ? (
          /* Foam circle wrapper makes non-transparent images look intentional
             when popping out above the gradient card. */
          <div className="w-full h-full rounded-full bg-foam p-3 shadow-lg drop-shadow-xl
                          flex items-center justify-center overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <CupPlaceholder />
        )}
      </motion.div>

      {/* ── Card body ── */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative z-10 rounded-[2rem] overflow-hidden min-h-[380px]
                   flex flex-col justify-end
                   bg-gradient-to-b from-latte via-caramel to-ink
                   pt-24 px-6 pb-6 shadow-warm-lg"
      >
        {/* Inner top highlight for depth */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-foam/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Badge pill */}
          <span className="inline-block text-[10px] uppercase tracking-widest font-bold
                           bg-foam/15 border border-foam/25 text-foam/80
                           px-3 py-1 rounded-full mb-3 font-inter">
            {item.badge}
          </span>

          {/* Drink name */}
          <div className="flex items-start gap-2 mb-2">
            <div className="mt-1">
              <DietBadge diet={item.diet} size="sm" />
            </div>
            <h3 className="font-playfair font-bold text-xl sm:text-2xl text-foam leading-tight">
              {item.name}
            </h3>
          </div>

          {/* Description — clamped to 2 lines */}
          <p className="text-foam/80 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-inter">
            {item.description}
          </p>

          {/* Price + Order CTA row */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-playfair font-bold text-lg text-caramel">
              {item.formattedPrice}
            </span>
            <Link
              to={`/menu/${item.slug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full
                         bg-caramel hover:bg-caramel/80 text-ink text-xs font-bold
                         tracking-wide transition-all shadow-warm
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foam"
            >
              Order →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ─────────────────────────────────────────────────────────────── */
export const SignatureDrinks = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.1 }
        : { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  return (
    <section
      id="signature-drinks"
      className="bg-foam py-16 md:py-24 px-3 sm:px-6 overflow-hidden"
      aria-label="Signature Drinks"
    >
      {/* Almond rounded container */}
      <div className="bg-almond mx-auto max-w-7xl rounded-3xl px-6 sm:px-10 lg:px-14 py-16 md:py-24 relative overflow-hidden">

        {/* Decorative blur blob */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full
                     bg-caramel/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full
                     bg-latte/25 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Header ── */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6"
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-3 font-inter">
            Signature Drinks
          </span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            What Fuels Us
          </h2>
          <p className="mt-3 text-ink/70 text-sm sm:text-base max-w-md mx-auto font-inter">
            Handcrafted originals that have become the soul of TATVA.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {signatureDrinks.map((item, i) => (
            <DrinkCard
              key={item.id}
              item={item}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureDrinks;
