import React, { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const MARQUEE_SEGMENT = 'slow mornings ✦ good company ✦ sweet cravings ✦ late nights ✦ ';

/**
 * GalleryMarquee — A slow infinite text marquee in large outlined Playfair typography.
 * Pauses on hover, renders statically under prefers-reduced-motion.
 */
export const GalleryMarquee = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Repeat segment enough times so -50% loop is completely seamless
  const repeatedText = `${MARQUEE_SEGMENT}${MARQUEE_SEGMENT}${MARQUEE_SEGMENT}`;

  return (
    <div
      className="group relative w-full overflow-hidden select-none py-5 sm:py-7 lg:py-8 border-y transition-colors duration-700 my-6 sm:my-10"
      style={{
        borderColor: 'var(--gallery-border)',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <style>{`
        @keyframes tatvaMarqueeLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      {/* Track */}
      <div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : 'tatvaMarqueeLoop 48s linear infinite',
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      >
        <span
          className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] uppercase pr-8 transition-opacity duration-300"
          style={{
            WebkitTextStroke: '1.2px var(--gallery-accent)',
            color: 'transparent',
            opacity: isHovered ? 0.9 : 0.65,
          }}
        >
          {repeatedText}
        </span>
        <span
          className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] uppercase pr-8 transition-opacity duration-300"
          style={{
            WebkitTextStroke: '1.2px var(--gallery-accent)',
            color: 'transparent',
            opacity: isHovered ? 0.9 : 0.65,
          }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default GalleryMarquee;
