import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from '../../config';

export const EssenceStatement = ({ lines }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const splitIntoWords = (text) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: '100%', filter: 'blur(8px)' }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: ANIMATION.ease,
          delay: prefersReducedMotion ? 0 : i * 0.05,
        }}
      >
        {word} {' '}
      </motion.span>
    ));
  };

  return (
    <section className="py-28 lg:py-40 px-6 sm:px-10 bg-foam text-ink">
      <div className="max-w-3xl mx-auto text-center leading-relaxed">
        {lines.map((line, lineIndex) => (
          <motion.p
            key={lineIndex}
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-ink mb-6 leading-snug"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: ANIMATION.ease,
              delay: prefersReducedMotion ? 0 : 0.2 + lineIndex * 0.4,
            }}
          >
            {splitIntoWords(line)}
          </motion.p>
        ))}
      </div>
    </section>
  );
};

export default EssenceStatement;