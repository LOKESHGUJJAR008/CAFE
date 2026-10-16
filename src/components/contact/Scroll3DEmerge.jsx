import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Scroll3DEmerge
 * Creates a dramatic 3D perspective emergence effect ("ground opening / tectonic rise")
 * as the user scrolls. Sections tilt forward from the ground plane (rotateX)
 * and swing in from the sides (rotateY, rotateZ) to lock seamlessly into place.
 */
export const Scroll3DEmerge = ({
  children,
  className = '',
  side = 'center', // 'left' | 'right' | 'center'
  depth = 90,
  pitchAngle = 16,
  showRift = false,
  riftLabel = '',
}) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 65%'],
  });

  // Vertical emergence from the ground
  const y = useTransform(scrollYProgress, [0, 1], [depth, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.2, 0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  // Tectonic pitch: starts laying backward on the ground plane, rises upright
  const rotateX = useTransform(scrollYProgress, [0, 1], [pitchAngle, 0]);

  // Side-docking yaw: folds in from side angles to dock together
  const initialYaw = side === 'left' ? -7 : side === 'right' ? 7 : 0;
  const initialRoll = side === 'left' ? -1.5 : side === 'right' ? 1.5 : 0;
  const rotateY = useTransform(scrollYProgress, [0, 1], [initialYaw, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [initialRoll, 0]);

  // Top rift seam opacity
  const riftOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.4]);

  return (
    <div
      ref={ref}
      className={`relative [perspective:1400px] overflow-visible ${className}`}
    >
      {/* Optional Tectonic Rift Seam (illuminates the ground opening) */}
      {showRift && !prefersReducedMotion && (
        <motion.div
          style={{
            scaleX: scrollYProgress,
            opacity: riftOpacity,
          }}
          className="w-full flex items-center justify-between mb-4 border-b-2 border-dashed border-[#A8612E]/40 pb-1"
        >
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#A8612E]">
            {riftLabel || 'TECTONIC 3D SECTOR // ELEVATION ACTIVE'}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#A8612E] animate-ping" />
        </motion.div>
      )}

      <motion.div
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          y: prefersReducedMotion ? 0 : y,
          scale: prefersReducedMotion ? 1 : scale,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          rotateZ: prefersReducedMotion ? 0 : rotateZ,
          transformStyle: 'preserve-3d',
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3DEmerge;
