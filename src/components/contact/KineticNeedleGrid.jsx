import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const ROWS = 4;
const COLS = 8;
const TOTAL_TICKS = ROWS * COLS;

export const KineticNeedleGrid = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });
  const [tickPositions, setTickPositions] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-based fallback rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Measure tick center coordinates
  const updateTickPositions = useCallback(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.kinetic-tick');
    const positions = Array.from(elements).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    });
    setTickPositions(positions);
  }, []);

  useEffect(() => {
    updateTickPositions();
    window.addEventListener('resize', updateTickPositions);
    window.addEventListener('scroll', updateTickPositions, { passive: true });
    return () => {
      window.removeEventListener('resize', updateTickPositions);
      window.removeEventListener('scroll', updateTickPositions);
    };
  }, [updateTickPositions]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000, active: false });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 sm:p-10 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[6px_6px_0px_#14100E] overflow-hidden group select-none"
    >
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#EADBC8]/30 blur-2xl pointer-events-none" />

      {/* Grid of Directional Kinetic Needles */}
      <div className="grid grid-cols-8 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 place-items-center relative z-10">
        {Array.from({ length: TOTAL_TICKS }).map((_, idx) => {
          const pos = tickPositions[idx];
          let angle = 0;

          if (!prefersReducedMotion && mousePos.active && pos) {
            const dx = mousePos.x - pos.cx;
            const dy = mousePos.y - pos.cy;
            angle = Math.atan2(dy, dx) * (180 / Math.PI);
          } else {
            // Default elegant concentric pattern
            const row = Math.floor(idx / COLS);
            const col = idx % COLS;
            angle = (col - 3.5) * 18 + (row - 1.5) * 24;
          }

          return (
            <div
              key={idx}
              className="kinetic-tick w-8 h-8 flex items-center justify-center cursor-crosshair transition-transform duration-200"
            >
              <motion.div
                style={{
                  rotate: prefersReducedMotion ? angle : (mousePos.active ? angle : scrollRotation),
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-5 sm:w-6 h-[2.5px] rounded-full bg-gradient-to-r from-[#14100E]/40 via-[#14100E] to-[#A8612E] origin-center shadow-[1px_1px_2px_rgba(20,16,14,0.15)] group-hover:from-[#14100E] group-hover:to-[#A8612E]"
              />
            </div>
          );
        })}
      </div>

      {/* Grid Bottom Telemetry Subtitle */}
      <div className="mt-6 pt-4 border-t-2 border-[#14100E]/15 flex items-center justify-between font-grotesk text-[10px] font-black uppercase tracking-[0.2em] text-[#14100E]/70">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8612E] animate-ping" />
          KINETIC COMPASS MATRIX
        </span>
        <span className="font-mono text-[#A8612E]">8x4 DIAL MATRIX</span>
      </div>
    </div>
  );
};

export default KineticNeedleGrid;
