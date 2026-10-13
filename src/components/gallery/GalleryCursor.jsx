import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * GalleryCursor — Desktop-only custom cursor that smoothly follows the pointer.
 * Default: Small elegant dot.
 * Hovering matching elements: Grows into a soft ring with a contextual label ("view", "drag", "select").
 * Automatically hidden on touch devices, mobile viewports, or when prefers-reduced-motion is on.
 */
export const GalleryCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  });
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState(null);

  // Check desktop fine pointer capabilities
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine) and (hover: hover)');
    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    media.addEventListener('change', handleMediaChange);

    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  // Track pointer movements and check for interactive data-cursor attributes
  useEffect(() => {
    if (prefersReducedMotion || !isFinePointer) return;

    const handlePointerMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check for explicit data-cursor or infer from context
      const target = e.target;
      if (!(target instanceof Element)) return;

      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        setCursorLabel(cursorEl.getAttribute('data-cursor'));
        return;
      }

      // Contextual element inference
      if (target.closest('[role="radio"]')) {
        setCursorLabel('select');
      } else if (target.closest('.polaroid-drag-handle, [data-drag-handle]')) {
        setCursorLabel('drag');
      } else if (target.closest('[data-lightbox-trigger], [data-view-photo]')) {
        setCursorLabel('view');
      } else {
        setCursorLabel(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorLabel(null);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [prefersReducedMotion, isFinePointer, isVisible]);

  if (prefersReducedMotion || !isFinePointer || !isVisible) {
    return null;
  }

  const isExpanded = Boolean(cursorLabel);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full will-change-transform"
      animate={{
        x: mousePosition.x - (isExpanded ? 28 : 4),
        y: mousePosition.y - (isExpanded ? 28 : 4),
        width: isExpanded ? 56 : 8,
        height: isExpanded ? 56 : 8,
        backgroundColor: isExpanded
          ? 'rgba(234, 219, 200, 0.45)'
          : 'var(--gallery-accent)',
        borderColor: isExpanded
          ? 'var(--gallery-accent)'
          : 'transparent',
        borderWidth: isExpanded ? 1.5 : 0,
        backdropFilter: isExpanded ? 'blur(2px)' : 'none',
      }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 24,
        mass: 0.25,
      }}
      aria-hidden="true"
    >
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.15 }}
          className="font-inter text-[10px] font-bold uppercase tracking-wider select-none"
          style={{ color: 'var(--gallery-accent)' }}
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>
  );
};

export default GalleryCursor;
