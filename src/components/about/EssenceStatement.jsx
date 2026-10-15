import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from '../../config';

export const EssenceStatement = ({ lines }) => {
  const { prefersReducedMotion } = useReducedMotion();

  const splitIntoWords = (text) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.28em] last:mr-0"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: '100%', filter: 'blur(8px)' }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: ANIMATION.ease,
          delay: prefersReducedMotion ? 0 : i * 0.05,
        }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <section id="story-essence" className="py-16 sm:py-24 px-6 sm:px-10 bg-foam text-ink">
      <div className="max-w-3xl mx-auto text-center leading-relaxed">
        {lines.map((line, lineIndex) => (
          <motion.p
            key={lineIndex}
            className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-ink mb-2 sm:mb-3 leading-snug"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: ANIMATION.ease,
              delay: prefersReducedMotion ? 0 : 0.2 + lineIndex * 0.3,
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