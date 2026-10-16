import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Compass, Gauge, Droplet, Clock, Sparkles } from 'lucide-react';
import { PHONE_DISPLAY } from '../../config';

export const Telemetry3DCard = ({ isOpen, statusLabel }) => {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // 3D Perspective scroll-driven transformations
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 25, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={cardRef}
      className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto [perspective:1200px]"
    >
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          z: prefersReducedMotion ? 0 : translateZ,
          y: prefersReducedMotion ? 0 : y,
        }}
        className="relative bg-[#FAF7F2] border-2 border-[#14100E] p-8 sm:p-12 shadow-[8px_8px_0px_#14100E] [transform-style:preserve-3d]"
      >
        {/* Card Header Specimen */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#14100E] [transform:translateZ(20px)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#A8612E] animate-ping" />
            <span className="font-grotesk text-xs font-black uppercase tracking-[0.25em] text-[#14100E]">
              SPECIMEN 03 // 3D SENSORY EXTRACTION TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-2 font-grotesk text-xs font-bold text-[#14100E]">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
            <span className="uppercase">{statusLabel}</span>
          </div>
        </div>

        {/* 3D Multi-Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 [transform:translateZ(30px)]">
          
          {/* Specimen 1: Pressure & Flow */}
          <div className="p-6 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[3px_3px_0px_#14100E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#14100E] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="font-grotesk text-[10px] font-black uppercase tracking-widest text-[#14100E]/70">
                EXTRACTION
              </span>
              <Gauge className="w-5 h-5 text-[#A8612E]" />
            </div>
            <div>
              <div className="font-grotesk text-3xl sm:text-4xl font-black text-[#14100E] mb-1">
                9.0 <span className="text-sm font-bold text-[#A8612E]">BAR</span>
              </div>
              <p className="font-grotesk text-xs text-[#14100E]/75 leading-relaxed">
                Rotary vane pump calibration dialled in fresh each sunrise by lead baristas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#14100E]/20 flex justify-between text-[10px] font-mono font-bold text-[#A8612E]">
              <span>FLOW: 2.2 ML/S</span>
              <span>PRESSURE STABLE</span>
            </div>
          </div>

          {/* Specimen 2: Water Thermal Matrix */}
          <div className="p-6 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[3px_3px_0px_#14100E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#14100E] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="font-grotesk text-[10px] font-black uppercase tracking-widest text-[#14100E]/70">
                BREW THERMAL
              </span>
              <Droplet className="w-5 h-5 text-[#A8612E]" />
            </div>
            <div>
              <div className="font-grotesk text-3xl sm:text-4xl font-black text-[#14100E] mb-1">
                93.5 <span className="text-sm font-bold text-[#A8612E]">°C</span>
              </div>
              <p className="font-grotesk text-xs text-[#14100E]/75 leading-relaxed">
                Dual PID thermal control preserving single-origin florals and cocoa notes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#14100E]/20 flex justify-between text-[10px] font-mono font-bold text-[#A8612E]">
              <span>TDS: 1.38%</span>
              <span>YIELD: 20.4%</span>
            </div>
          </div>

          {/* Specimen 3: Geolocation Coordinates */}
          <div className="p-6 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[3px_3px_0px_#14100E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#14100E] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="font-grotesk text-[10px] font-black uppercase tracking-widest text-[#14100E]/70">
                COORDINATES
              </span>
              <Compass className="w-5 h-5 text-[#A8612E]" />
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-black text-[#14100E] mb-1 tracking-tight">
                25.1388° N
              </div>
              <div className="font-mono text-sm font-bold text-[#A8612E] mb-2">
                75.8362° E · KOTA
              </div>
              <p className="font-grotesk text-xs text-[#14100E]/75 leading-relaxed">
                Talwandi sanctuary sector, welcoming Kota's scholars and coffee enthusiasts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#14100E]/20 flex justify-between text-[10px] font-mono font-bold text-[#A8612E]">
              <span>ELEV: 271M</span>
              <span>TEL: {PHONE_DISPLAY}</span>
            </div>
          </div>

        </div>

        {/* Card Footer Micro-Bar */}
        <div className="mt-8 pt-6 border-t-2 border-[#14100E]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-grotesk text-xs text-[#14100E]/70 [transform:translateZ(20px)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A8612E]" />
            <span>Interactive 3D Sensory Module — Parallax depth responding to scroll</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider text-[#A8612E] font-bold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Daily Sessions
            </span>
            <span>Chikmagalur Arabica</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Telemetry3DCard;
