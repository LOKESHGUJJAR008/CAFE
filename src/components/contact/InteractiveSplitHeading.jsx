import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * InteractiveSplitHeading
 * When the user moves the cursor over "Get in touch.", the text splits
 * along a horizontal fracture line with 3D offset and reveals an amber fissure seam,
 * springing back with high-end kinetic physics.
 */
export const InteractiveSplitHeading = () => {
  const [isSplit, setIsSplit] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setIsSplit(true);
  };

  const handleMouseLeave = () => {
    setIsSplit(false);
  };

  const springTransition = {
    type: 'spring',
    stiffness: 320,
    damping: 22,
    mass: 0.8,
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer select-none py-2 mb-6 group inline-block focus-visible:outline-none"
      role="heading"
      aria-level={1}
      aria-label="Get in touch."
      tabIndex={0}
      onFocus={() => setIsSplit(true)}
      onBlur={() => setIsSplit(false)}
    >
      {/* ── Visual Layer 1: Top Sliced Half (Shifts Up & Left on hover) ── */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? {}
            : isSplit
            ? { y: -10, x: -6, rotate: -0.8 }
            : { y: 0, x: 0, rotate: 0 }
        }
        transition={springTransition}
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
        }}
        className="font-grotesk font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#14100E] leading-[0.9] uppercase will-change-transform"
      >
        <span>Get in</span>
        <br />
        <span>touch</span>
        <span className="text-[#A8612E]">.</span>
      </motion.div>

      {/* ── Middle Amber Fracture Rift Seam (Expands on split) ── */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { opacity: 0 }
            : isSplit
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[49%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#A8612E] to-transparent origin-center shadow-[0_0_12px_#A8612E] pointer-events-none"
      />

      {/* ── Visual Layer 2: Bottom Sliced Half (Shifts Down & Right on hover) ── */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? {}
            : isSplit
            ? { y: 10, x: 6, rotate: 0.8 }
            : { y: 0, x: 0, rotate: 0 }
        }
        transition={springTransition}
        style={{
          clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
        }}
        className="absolute inset-0 font-grotesk font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#14100E] leading-[0.9] uppercase pointer-events-none will-change-transform"
      >
        <span>Get in</span>
        <br />
        <span>touch</span>
        <span className="text-[#A8612E]">.</span>
      </motion.div>

      {/* Subtle indicator chip below heading */}
      <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#14100E]/40 group-hover:text-[#A8612E] transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A8612E] group-hover:animate-ping" />
        <span>HOVER TO FRACTURE // KINETIC SLICE</span>
      </div>
    </div>
  );
};

export default InteractiveSplitHeading;
