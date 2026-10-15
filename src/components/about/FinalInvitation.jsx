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
        <span className="bd-eyebrow block mb-4">
          {eyebrow}
        </span>
        <motion.p
          className="font-cormorant italic font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FBF7F1] leading-tight mb-10"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ANIMATION.ease, delay: 0.5 }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
        <Link
          to={buttonLink}
          className="bd-btn bd-btn-caramel"
        >
          {buttonText}
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalInvitation;