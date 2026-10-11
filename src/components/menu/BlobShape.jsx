import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * BlobShape component
 * Animated SVG morphing organic blob background.
 * Animates the `d` path attribute and fill color on category change.
 */
export const BlobShape = ({ d, fill, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 500 500"
      className={`w-full h-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        animate={{ d, fill }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
        }
      />
    </svg>
  );
};

export default BlobShape;
