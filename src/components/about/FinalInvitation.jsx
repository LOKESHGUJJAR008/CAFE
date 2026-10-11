import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImage } from '../../data/images';
import { ANIMATION } from '../../config';
import ProgressiveImage from '../ProgressiveImage';

export const FinalInvitation = ({ eyebrow, quote, buttonText, buttonLink, image }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const bgVariants = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: [1, 1.05, 1],
          transition: {
            duration: 20,
            ease: ANIMATION.ease,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        },
      };

  const contentVariants = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: ANIMATION.ease, delay: 0.3 },
        },
      };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-ink text-foam overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        variants={bgVariants}
      >
        <ProgressiveImage
          src={getImage(image)}
          alt="Evening café atmosphere moody lighting"
          className="w-full h-full object-cover"
          placeholder={getImage(image)}
          priority={false}
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <motion.div
        className="relative z-20 max-w-2xl mx-auto px-6 text-center"
        variants={contentVariants}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-4 block font-inter">
          {eyebrow}
        </span>
        <motion.p
          className="font-playfair italic text-3xl sm:text-4xl lg:text-5xl text-foam leading-snug mb-10"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ANIMATION.ease, delay: 0.5 }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-caramel text-caramel hover:bg-caramel hover:text-foam font-semibold tracking-wide transition-all duration-300"
          whileHover={prefersReducedMotion ? {} : { boxShadow: '0 0 25px rgba(168,97,46,0.5)' }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {buttonText}
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalInvitation;