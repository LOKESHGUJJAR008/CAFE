import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Reveal component using Framer Motion
 * Triggers a smooth fade-up animation as elements scroll into view.
 */
export const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  className = '',
  once = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // smooth cubic-bezier easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
