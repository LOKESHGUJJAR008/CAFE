import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImage } from '../data/images';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[100svh] bg-[#1F1612] overflow-hidden" aria-label="Hero">
      {/* ── Full bleed background image ── */}
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={getImage('latteArt')}
          alt="Artisanal brew and latte art at TATVA Café"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay — heavier at bottom, lighter at top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(31,22,18,0.42) 0%, rgba(31,22,18,0.28) 40%, rgba(31,22,18,0.72) 100%)'
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Center Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-6 text-center">

        {/* Boxed Brand Badge — BD style center-top box */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="mb-10 md:mb-12"
        >
          <div className="inline-block border border-[#FBF7F1]/70 px-6 py-3 text-center">
            <span className="block font-cormorant font-semibold text-[#FBF7F1] text-xl sm:text-2xl tracking-[0.12em]">
              TATVA CAFÉ
            </span>
            <span className="block font-grotesk text-[#FBF7F1]/70 text-[9px] tracking-[0.3em] uppercase mt-0.5">
              Talwandi · Kota · Rajasthan
            </span>
          </div>
        </motion.div>

        {/* Massive ALL CAPS headline */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          className="font-cormorant font-semibold text-[#FBF7F1]
                     text-5xl sm:text-7xl md:text-8xl lg:text-[96px]
                     leading-[0.95] tracking-[-0.01em]
                     uppercase max-w-4xl mx-auto mb-5"
        >
          Artisan Coffee<br />
          <em className="not-italic text-[#C9A27E]">Sanctuary</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          className="font-grotesk text-[#FBF7F1]/75 text-xs sm:text-sm tracking-[0.2em] uppercase mb-10 max-w-sm"
        >
          A Bold Reimagining of the Neighbourhood Café.
        </motion.p>

        {/* Two rectangular outlined CTAs — BD pattern */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/reserve"
            className="bd-btn bd-btn-light min-w-[200px] justify-center"
          >
            Reserve a Table
          </Link>
          <Link
            to="/menu"
            className="bd-btn bd-btn-light min-w-[200px] justify-center"
          >
            Explore Menu
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-grotesk text-[#FBF7F1]/50 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-[1px] h-8 bg-gradient-to-b from-[#FBF7F1]/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
