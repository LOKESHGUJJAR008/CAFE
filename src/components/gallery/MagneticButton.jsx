import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MagneticButton — Gently attracts the wrapped button element towards the mouse pointer
 * within ~10px. Disables on touch devices and when prefers-reduced-motion is active.
 */
export const MagneticButton = ({
  children,
  className = '',
  maxDisplacement = 10,
  strength = 0.28,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine) and (hover: hover)');
    const handler = (e) => setIsFinePointer(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !isFinePointer || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (prefersReducedMotion || !isFinePointer) {
    return (
      <div className={`inline-block ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 18,
        mass: 0.35,
      }}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
