import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import galleryImages from '../../data/galleryImages';
import { getRackPosition, generateScatteredPositions } from './poolGeometry';
import Lightbox from './Lightbox';

export default function PoolGallery() {
  const tableRef = useRef(null);
  const wasDraggedRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, y: 0 });

  // Mouse spotlight coordinates (desktop only)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Respect prefers-reduced-motion
  const shouldReduceMotion = useReducedMotion();

  const [ballSize, setBallSize] = useState(64);
  const [dimensions, setDimensions] = useState({ width: 700, height: 440 });
  const [isBroken, setIsBroken] = useState(false);
  const [scatteredPositions, setScatteredPositions] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Track cursor over table for subtle torchlight effect (desktop)
  const handleMouseMove = useCallback((e) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  // Dynamically compute ballSize and table dimensions via ResizeObserver
  useEffect(() => {
    const updateSize = () => {
      if (!tableRef.current) return;
      const width = tableRef.current.clientWidth;
      const height = tableRef.current.clientHeight;

      setDimensions({ width, height });

      // Proportional ball sizing:
      // Mobile (360px): ~52px (tap target >= 44px, comfortably fits 3-ball row)
      // Tablet (768px): ~72px
      // Desktop (1280px): ~88px
      const calculated = Math.max(52, Math.min(88, Math.round(width * 0.105)));
      setBallSize(calculated);
    };

    updateSize();

    let observer;
    if (typeof ResizeObserver !== 'undefined' && tableRef.current) {
      observer = new ResizeObserver(updateSize);
      observer.observe(tableRef.current);
    }

    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      if (observer) observer.disconnect();
    };
  }, []);

  // Safe sound playback on break (never autoplays on load)
  const playBreakSound = useCallback(() => {
    if (isMuted) return;
    try {
      const audio = new Audio('/sounds/break.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently skip if file is missing or browser restricts playback
      });
    } catch {
      // Silently skip
    }
  }, [isMuted]);

  // Break rack: generates fresh random positions each time
  const handleBreak = useCallback(() => {
    if (isBroken) return;

    const width = tableRef.current?.clientWidth || dimensions.width;
    const height = tableRef.current?.clientHeight || dimensions.height;

    const positions = generateScatteredPositions(
      width,
      height,
      ballSize,
      galleryImages.length
    );

    setScatteredPositions(positions);
    setIsBroken(true);
    playBreakSound();
  }, [isBroken, dimensions.width, dimensions.height, ballSize, playBreakSound]);

  // Reset rack: animates all balls back into triangle rack
  const handleResetRack = useCallback(() => {
    setIsBroken(false);
  }, []);

  // Track drag vs click to resolve click-conflict without triggering component re-renders
  const handleDragStart = useCallback((_event, info) => {
    wasDraggedRef.current = false;
    dragOriginRef.current = { x: info.point.x, y: info.point.y };
  }, []);

  const handleDrag = useCallback((_event, info) => {
    const dist = Math.hypot(
      info.point.x - dragOriginRef.current.x,
      info.point.y - dragOriginRef.current.y
    );
    if (dist > 5) {
      wasDraggedRef.current = true;
    }
  }, []);

  const handleDragEnd = useCallback((_event, info) => {
    const dist = Math.hypot(
      info.point.x - dragOriginRef.current.x,
      info.point.y - dragOriginRef.current.y
    );
    if (dist > 5) {
      wasDraggedRef.current = true;
    }
    setTimeout(() => {
      wasDraggedRef.current = false;
    }, 150);
  }, []);

  // Open Lightbox on clean click (not drag)
  const handleBallClick = useCallback((index) => {
    if (wasDraggedRef.current) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full max-w-5xl mx-auto flex flex-col items-center relative"
    >
      {/* 3D Pool Table Wooden Frame with Wood-Grain Gradients & Thin Gold Trim */}
      <div
        className="w-full p-2.5 sm:p-5 md:p-6 lg:p-7 rounded-[1.75rem] sm:rounded-[2.5rem] md:rounded-[2.75rem] shadow-[0_30px_70px_rgba(20,13,10,0.8),0_10px_24px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(251,247,241,0.22),inset_0_-4px_8px_rgba(0,0,0,0.5)] border-4 border-[#7D421C] relative"
        style={{
          background: `
            repeating-linear-gradient(
              92deg,
              rgba(168, 97, 46, 0.95) 0px,
              rgba(146, 82, 38, 0.98) 18px,
              rgba(125, 66, 28, 0.95) 36px,
              rgba(152, 87, 40, 0.98) 54px,
              rgba(168, 97, 46, 0.95) 72px
            ),
            linear-gradient(to bottom, #B56D38 0%, #A8612E 40%, #7D421C 100%)
          `,
        }}
      >
        {/* Brass "Diamond" Inlay Markers Along Rails */}
        {/* Top Rail Diamonds */}
        <div className="absolute top-2 sm:top-2.5 left-1/4 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />
        <div className="absolute top-2 sm:top-2.5 left-3/4 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />

        {/* Bottom Rail Diamonds */}
        <div className="absolute bottom-2 sm:bottom-2.5 left-1/4 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />
        <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />
        <div className="absolute bottom-2 sm:bottom-2.5 left-3/4 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />

        {/* Left & Right Side Rail Diamonds */}
        <div className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />
        <div className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gradient-to-br from-[#FBF7F1] via-[#C9A27E] to-[#8C5D33] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-[#EADBC8]/70 pointer-events-none" />

        {/* 6 Polished Leather Pocket Castings */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98),0_2px_4px_rgba(251,247,241,0.08)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98),0_2px_4px_rgba(251,247,241,0.08)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98),0_2px_4px_rgba(251,247,241,0.08)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98),0_2px_4px_rgba(251,247,241,0.08)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-8 h-5 sm:w-11 sm:h-7 rounded-b-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-5 sm:w-11 sm:h-7 rounded-t-full bg-[#0D0907] shadow-[inset_0_6px_14px_rgba(0,0,0,0.98)] border-2 border-[#54331C]/80 z-10 pointer-events-none" />

        {/* Felt Surface (Espresso Brown #2A1B14) with Thin Gold Inner Trim */}
        <div
          ref={tableRef}
          className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] min-h-[420px] sm:min-h-[460px] md:min-h-[500px] rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden select-none border border-[#C9A27E]/40"
          style={{
            backgroundColor: '#2A1B14',
            backgroundImage: `
              radial-gradient(ellipse at center, rgba(68, 43, 32, 0.9) 0%, rgba(42, 27, 20, 0.95) 60%, rgba(20, 12, 9, 1) 100%),
              radial-gradient(rgba(201, 162, 126, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 16px 16px',
            boxShadow: 'inset 0 12px 34px rgba(0, 0, 0, 0.85), inset 0 2px 6px rgba(0, 0, 0, 0.95), inset 0 -10px 28px rgba(0, 0, 0, 0.75)',
          }}
        >
          {/* Hanging-Lamp Warm Spotlight (#C9A27E at low opacity, centered above table) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at 50% 48%, rgba(201, 162, 126, 0.16) 0%, rgba(201, 162, 126, 0.05) 50%, transparent 80%)',
            }}
          />

          {/* Soft Vignette Overlay Over Felt */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 45%, rgba(15, 10, 8, 0.55) 85%, rgba(10, 6, 5, 0.8) 100%)',
            }}
          />

          {/* Subtle Desktop Interactive Torchlight Following Cursor */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${mousePos.x}% ${mousePos.y}%, rgba(234, 219, 200, 0.06) 0%, rgba(201, 162, 126, 0.02) 40%, transparent 70%)`,
            }}
          />

          {/* Subtle Brass Rail Brand Plaque */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#150F0D]/90 border border-[#C9A27E]/40 shadow-sm">
            <span className="text-[9px] font-playfair tracking-[0.25em] text-[#EADBC8] uppercase font-bold">
              TATVA CAFE · TABLE 01
            </span>
          </div>

          {/* Faint White "Head String" Line & Baize Spots */}
          <div className="absolute top-[28%] left-6 right-6 sm:left-8 sm:right-8 h-[1px] bg-[#FBF7F1]/10 pointer-events-none" />
          {/* Head spot with elegant Tatva monogram 'T' */}
          <div
            title="Tatva"
            className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#150F0D]/60 border border-[#C9A27E]/30 flex items-center justify-center pointer-events-none"
          >
            <span className="font-playfair text-[8px] font-bold text-[#EADBC8]/70 leading-none">
              T
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#EADBC8]/25 pointer-events-none" />

          {/* Balls: ONE motion.div per ball switching animate prop between rack and scattered */}
          {galleryImages.map((ball, index) => {
            const rackPos = getRackPosition(index, ballSize);
            const scatteredPos = scatteredPositions[index];
            const ballNumber = index + 1;
            const isStriped = ballNumber >= 9;

            const targetX = isBroken && scatteredPos ? scatteredPos.x : rackPos.x;
            const targetY = isBroken && scatteredPos ? scatteredPos.y : rackPos.y;
            const targetRotate = isBroken && scatteredPos ? scatteredPos.rotate : 0;
            const targetDelay = isBroken && scatteredPos ? scatteredPos.delay : 0;

            // Transition: Skip spring if reduced motion is preferred
            const transitionConfig = shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: 'spring',
                  stiffness: 60,
                  damping: 12,
                  delay: targetDelay,
                };

            return (
              <motion.div
                key={ball.id}
                initial={false}
                animate={{
                  x: targetX,
                  y: targetY,
                  rotate: targetRotate,
                }}
                transition={transitionConfig}
                drag={isBroken}
                dragConstraints={tableRef}
                dragElastic={0.2}
                dragMomentum={true}
                dragTransition={{
                  bounceStiffness: 200,
                  bounceDamping: 18,
                  power: 0.16,
                  timeConstant: 220,
                }}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onClick={() => handleBallClick(index)}
                whileHover={
                  isBroken
                    ? {
                        scale: 1.08,
                        zIndex: 30,
                        filter: 'drop-shadow(0 0 14px rgba(168, 97, 46, 0.8))',
                      }
                    : undefined
                }
                whileDrag={{
                  scale: 1.10,
                  zIndex: 50,
                  cursor: 'grabbing',
                }}
                className={`absolute rounded-full group select-none min-w-[44px] min-h-[44px] ${
                  isBroken ? 'cursor-grab touch-none' : 'cursor-pointer'
                }`}
                style={{
                  width: ballSize,
                  height: ballSize,
                  left: '50%',
                  top: '50%',
                  marginLeft: -ballSize / 2,
                  marginTop: -ballSize / 2,
                  touchAction: isBroken ? 'none' : 'auto',
                }}
              >
                {/* Soft Dynamic Contact Shadow on Felt (Expands & lightens when lifted/dragged) */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  initial={false}
                  animate={{
                    width: '92%',
                    height: '24%',
                    left: '4%',
                    bottom: '-8%',
                    opacity: 0.65,
                    filter: 'blur(4px)',
                  }}
                  whileDrag={{
                    width: '116%',
                    height: '32%',
                    left: '-8%',
                    bottom: '-18%',
                    opacity: 0.32,
                    filter: 'blur(8px)',
                  }}
                  style={{
                    backgroundColor: '#0D0806',
                  }}
                />

                {/* 3D Ball Sphere with Pre-Break Breathing Float Micro-Animation */}
                <motion.div
                  animate={
                    !isBroken && !shouldReduceMotion
                      ? {
                          y: [0, -2.5, 0, 2.5, 0],
                          transition: {
                            duration: 3.2 + (index % 4) * 0.35,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (index * 0.22) % 1.5,
                          },
                        }
                      : { y: 0 }
                  }
                  className="w-full h-full rounded-full relative overflow-hidden border-[3px] sm:border-4 border-[#FBF7F1] transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: '#1F1612',
                    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Photo with explicit dimensions to prevent layout shift */}
                  <img
                    src={ball.src}
                    alt={ball.title}
                    width={ballSize}
                    height={ballSize}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />

                  {/* Billiard Stripe Band (for balls 9+, if present) */}
                  {isStriped && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[38%] bg-[#FBF7F1]/90 border-y border-[#1F1612]/30 pointer-events-none" />
                  )}

                  {/* Realistic Glossy Sphere Highlight (Soft white radial highlight top-left) */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.35) 18%, rgba(255, 255, 255, 0.08) 38%, transparent 60%)',
                    }}
                  />

                  {/* Sphere Inner Shadow on Bottom-Right for Full 3D Curvature */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: 'inset -6px -8px 16px rgba(10, 6, 4, 0.75), inset 3px 3px 6px rgba(255, 255, 255, 0.25)',
                    }}
                  />

                  {/* Classic Billiard Cream Circle Badge with Serif Ball Number */}
                  <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FBF7F1] text-[#1F1612] font-playfair font-bold text-[9px] sm:text-[11px] flex items-center justify-center shadow-md border border-[#C9A27E]/60">
                    {ballNumber}
                  </div>
                </motion.div>

                {/* Hover Caption Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                  <span className="bg-[#1F1612]/90 text-[#FBF7F1] text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full shadow-lg border border-[#C9A27E]/30">
                    {ball.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Action Controls & Sound Mute Toggle (Min 44px tap targets) */}
      <div className="min-h-[110px] mt-8 sm:mt-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {!isBroken ? (
              <motion.button
                key="btn-break"
                type="button"
                onClick={handleBreak}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group relative inline-flex items-center justify-center min-h-[48px] px-10 sm:px-14 py-3.5 sm:py-4 rounded-full font-playfair font-bold text-lg sm:text-2xl tracking-[0.2em] text-[#FBF7F1] bg-gradient-to-b from-[#B56D38] via-[#A8612E] to-[#8C4F24] border-2 border-[#C9A27E] shadow-[0_10px_25px_rgba(168,97,46,0.45),0_4px_8px_rgba(0,0,0,0.3)] hover:from-[#C27842] hover:via-[#B56D38] hover:to-[#965427] active:translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3 drop-shadow">
                  BREAK
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ) : (
              <motion.button
                key="btn-reset"
                type="button"
                onClick={handleResetRack}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group relative inline-flex items-center justify-center min-h-[48px] px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-playfair font-bold text-base sm:text-xl tracking-[0.15em] text-[#FBF7F1] bg-gradient-to-b from-[#8C4F24] via-[#A8612E] to-[#7D421C] border-2 border-[#C9A27E] shadow-[0_10px_25px_rgba(168,97,46,0.4),0_4px_8px_rgba(0,0,0,0.3)] hover:from-[#9B5528] hover:to-[#8C4F24] active:translate-y-0.5 transition-all duration-200 cursor-pointer gap-2.5"
              >
                <RotateCcw className="w-5 h-5 text-[#FBF7F1]/90 transition-transform group-hover:-rotate-90 duration-300" />
                <span className="relative z-10 flex items-center drop-shadow">
                  RESET RACK
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Sound Mute Toggle Icon Button (Min 44px tap target) */}
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? 'Unmute pool break sound' : 'Mute pool break sound'}
            title={isMuted ? 'Unmute break sound' : 'Mute break sound'}
            className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center bg-[#1F1612]/75 hover:bg-[#A8612E] text-[#FBF7F1] border border-[#C9A27E]/40 backdrop-blur-sm shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A8612E]"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-[#EADBC8]/70" />
            ) : (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FBF7F1]" />
            )}
          </button>
        </div>

        {/* Status Hint */}
        <span className="mt-3 text-xs uppercase tracking-widest text-[#1F1612]/60 font-medium text-center">
          {!isBroken
            ? '8 Handcrafted Moments Racked • Press Break to Scatter'
            : 'Table Open • Drag balls freely across felt or click to preview'}
        </span>
      </div>

      {/* Connected Full-Screen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        images={galleryImages}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
