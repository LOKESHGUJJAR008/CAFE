import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * KineticHeadline — Reveals headlines word-by-word with an upward mask animation.
 * Respects prefers-reduced-motion and wraps cleanly on responsive viewports.
 */
export const KineticHeadline = ({
  text = '',
  as: Tag = 'h1',
  className = '',
  style = {},
  delay = 0,
  triggerKey,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <Tag className={className} style={style} {...props}>
      {words.map((word, index) => (
        <span
          key={`${triggerKey || 'word'}-${index}`}
          className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0 pb-1"
        >
          <motion.span
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: '115%', opacity: 0, rotate: 1.5 }
            }
            animate={{ y: '0%', opacity: 1, rotate: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.65,
              ease: EASE,
              delay: delay + index * 0.07,
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default KineticHeadline;
