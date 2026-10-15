import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';

export const HeroSection = ({
  headline = 'Where time slows.',
  eyebrow = 'OUR STORY • EST. KOTA',
  subtitle = 'An artisan sanctuary in Talwandi, Kota — crafted for slow sips, rich single-origin brews, and unhurried conversations.',
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const textVariants = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: ANIMATION.ease,
          },
        },
      };

  return (
    <section className="relative min-h-[62vh] sm:min-h-[72vh] flex items-center justify-center overflow-hidden bg-ink text-foam">
      {/* Cinematic Full-Bleed Atmospheric Backdrop */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: ANIMATION.ease }}
      >
        <img
          src={getImage('heroStill')}
          alt="Artisanal coffee and warm ambient morning light at TATVA Café"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.05]"
          loading="eager"
        />
      </motion.div>

      {/* Warm Amber Caramel Radial Glow & Deep Espresso Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,97,46,0.24)_0%,transparent_75%)] pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/80 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Pure Minimalist Editorial Typography Layout */}
      <motion.div
        className="relative z-20 max-w-3xl mx-auto px-6 sm:px-8 text-center pt-24 pb-12 sm:pt-28 sm:pb-16"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        {/* Subtle Timeless Eyebrow */}
        <p className="bd-eyebrow block mb-4 sm:mb-5">
          {eyebrow}
        </p>

        {/* Timeless Headline */}
        <h1 className="font-cormorant font-semibold text-5xl sm:text-7xl lg:text-8xl text-[#FBF7F1] leading-[0.95] tracking-[-0.03em] mb-6">
          Where time{' '}
          <span className="italic font-normal text-[#C9A012]">
            slows.
          </span>
        </h1>

        {/* Quiet Poetic Narrative */}
        <p className="text-[#FBF7F1]/85 text-xs sm:text-sm uppercase tracking-[0.18em] font-grotesk leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>

        {/* Minimalist Caramel Hairline Accent */}
        <motion.div
          className="w-16 sm:w-20 h-[1.5px] bg-caramel/75 mx-auto mt-7 sm:mt-8"
          initial={prefersReducedMotion ? { width: '4rem', opacity: 1 } : { width: 0, opacity: 0 }}
          animate={{ width: '4.5rem', opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: ANIMATION.ease }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;