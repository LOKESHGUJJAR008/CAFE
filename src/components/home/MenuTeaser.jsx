import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { menuTeaserData } from '../../data/menuTeaser';

export const MenuTeaser = () => {
  const prefersReducedMotion = useReducedMotion();

  // Pick first 5 categories to show as menu items
  const showcaseCategories = menuTeaserData.categories.slice(0, 5);

  return (
    <section
      id="menu-teaser"
      className="bg-[#FBF7F1] py-0 relative"
      aria-label="Our Menu"
    >
      {/* ── BD-style: "DAILY CAFÉ" editorial split ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">

        {/* Left — text side */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16 md:py-24 bg-[#FBF7F1]"
        >
          <span className="bd-eyebrow block mb-6">{menuTeaserData.eyebrow}</span>

          <h2 className="font-cormorant font-semibold text-[#1F1612] text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] mb-8 uppercase">
            {menuTeaserData.title}
          </h2>

          <p className="font-grotesk text-[#1F1612]/60 text-xs sm:text-sm tracking-wide leading-relaxed mb-10 max-w-xs">
            WE CRAFT NOURISHING, SINGLE-ORIGIN BREWS, HOUSEMADE BAKES AND ARTISAN SNACKS —
            ALL SERVED WITH WARMTH AND INTENTION.
          </p>

          {/* Menu category list — BD divider style */}
          <div className="flex flex-col divide-y divide-[#1F1612]/10 mb-10">
            {showcaseCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                className="py-3 flex items-center justify-between gap-4 group"
              >
                <Link
                  to={`/menu?cat=${cat.id}`}
                  className="font-grotesk text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1F1612]
                             hover:text-[#A8612E] transition-colors duration-200 focus-visible:outline-none"
                >
                  {cat.name}
                </Link>
                <span className="font-grotesk text-[10px] text-[#1F1612]/35 tracking-wide">
                  {cat.items?.[0]?.price ?? ''}
                </span>
              </motion.div>
            ))}
          </div>

          {/* BD rectangular outlined CTA */}
          <Link to="/menu" className="bd-btn self-start">
            explore our menu
          </Link>
        </motion.div>

        {/* Right — full image, no padding, no border-radius */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative overflow-hidden min-h-[400px] md:min-h-full bg-[#EADBC8]"
        >
          {/* Editorial atmosphere placeholder — warm gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #3A2518 0%, #C9A27E 60%, #EADBC8 100%)'
            }}
          />
          {/* Decorative text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-cormorant font-semibold text-[#FBF7F1]/12 text-[140px] sm:text-[180px] leading-none tracking-[-0.05em] select-none"
              aria-hidden="true"
            >
              Menu
            </span>
          </div>
          {/* Small caption */}
          <div className="absolute bottom-8 left-8">
            <span className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-[#FBF7F1]/50">
              Crafted with care
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuTeaser;
