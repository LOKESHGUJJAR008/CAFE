import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * BackgroundScrollText
 * Renders massive architectural ghost typography ("CONTACT") that glides and merges
 * in the background as the user scrolls through the page, creating profound multi-layer depth.
 */
export const BackgroundScrollText = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Scroll parallax for the primary vertical "CONTACT" watermark
  const primaryY = useTransform(scrollYProgress, [0, 1], [-60, 950]);
  const primaryRotate = useTransform(scrollYProgress, [0, 1], [-2, 4]);
  const primaryOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.65, 0.5, 0.35]);

  // Scroll parallax for the secondary horizontal ribbon track
  const ribbonX = useTransform(scrollYProgress, [0, 1], ['10%', '-50%']);
  const ribbonY = useTransform(scrollYProgress, [0, 1], ['25vh', '85vh']);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.3]);

  // Subterranean depth scale
  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.98]);

  // Secondary ambient watermark transforms
  const dispatchY = useTransform(scrollYProgress, [0, 1], [400, -200]);
  const dispatchOpacity = useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 0.45, 0.2]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* ── Layer 1: Giant Floating Ghost "CONTACT" Pillar ── */}
      <motion.div
        style={{
          y: primaryY,
          rotate: primaryRotate,
          opacity: primaryOpacity,
          scale: depthScale,
        }}
        className="absolute top-16 right-[-4vw] font-grotesk font-black text-[22vw] leading-none uppercase tracking-tighter text-transparent [-webkit-text-stroke:2.5px_rgba(20,16,14,0.06)] will-change-transform"
      >
        CONTACT
      </motion.div>

      {/* ── Layer 2: Horizontal Kinetic Telemetry Ribbon ── */}
      <motion.div
        style={{
          x: ribbonX,
          top: ribbonY,
          opacity: ribbonOpacity,
        }}
        className="absolute whitespace-nowrap font-grotesk font-black text-6xl sm:text-8xl tracking-tight uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(168,97,46,0.12)] will-change-transform flex items-center gap-8"
      >
        <span>TATVA CONTACT ARCHIVE</span>
        <span className="text-[#A8612E]/30">•</span>
        <span>TALWANDI KOTA 324005</span>
        <span className="text-[#A8612E]/30">•</span>
        <span>TELEMETRY DISPATCH</span>
        <span className="text-[#A8612E]/30">•</span>
        <span>SINGLE-ORIGIN SANCTUARY</span>
        <span className="text-[#A8612E]/30">•</span>
        <span>CONTACT</span>
      </motion.div>

      {/* ── Layer 3: Secondary Ambient Watermark at Bottom ── */}
      <motion.div
        style={{
          y: dispatchY,
          opacity: dispatchOpacity,
        }}
        className="absolute bottom-12 left-[-2vw] font-grotesk font-black text-[18vw] leading-none uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(20,16,14,0.05)] will-change-transform"
      >
        DISPATCH
      </motion.div>
    </div>
  );
};

export default BackgroundScrollText;
