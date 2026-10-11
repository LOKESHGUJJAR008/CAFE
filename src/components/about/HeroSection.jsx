import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';

export const HeroSection = () => {
  const { prefersReducedMotion } = useReducedMotion();

  const kenBurnsVariants = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: [1, 1.08, 1],
          x: [0, -2, 0],
          y: [0, -2, 0],
          transition: {
            duration: 20,
            ease: ANIMATION.ease,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        },
      };

  const textVariants = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30, letterSpacing: '0em' },
        animate: {
          opacity: 1,
          y: 0,
          letterSpacing: '0.08em',
          transition: {
            duration: 1.4,
            ease: ANIMATION.ease,
            delay: 0.3,
          },
        },
      };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        variants={kenBurnsVariants}
      >
        <img
          src={getImage('heroStill')}
          alt="Morning light on marble counter with coffee cup"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,97,46,0.18)_0%,transparent_70%)] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <motion.div
        className="relative z-20 max-w-2xl mx-auto px-6 text-center"
        variants={textVariants}
      >
        <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-foam leading-tight tracking-tight">
          Where time slows.
        </h1>
        <motion.hr
          className="w-24 border-t-2 border-caramel mx-auto mt-8"
          initial={prefersReducedMotion ? { width: '6rem' } : { width: 0 }}
          animate={prefersReducedMotion ? { width: '6rem' } : { width: '6rem' }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, ease: ANIMATION.ease, delay: 0.8 }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;