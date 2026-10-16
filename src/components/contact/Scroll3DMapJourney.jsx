import React, { useRef, useState } from 'react';
import { motion, useTransform, useMotionValueEvent, useReducedMotion, useSpring, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  ExternalLink,
  Sparkles,
  Crosshair,
  Volume2,
  VolumeX,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MAPS_LINK, CAFE_ADDRESS, CAFE_NAME } from '../../config';

import exteriorSanctuaryImg from '../../assets/images/tatva-cafe-3d-sanctuary.jpg';
import innerLoungeImg from '../../assets/images/tatva-cafe-inner-lounge.jpg';
import topViewImg from '../../assets/images/tatva-cafe-top-view.jpg';
import kitchenBrewBarImg from '../../assets/images/tatva-cafe-kitchen.jpg';
import studyLoftImg from '../../assets/images/tatva-cafe-study-loft.jpg';

const ARCHITECTURAL_VIEWS = [
  {
    id: 'exterior',
    label: '01 EXTERIOR',
    shortLabel: 'EXTERIOR',
    title: 'STREET ELEVATION // SECTOR 4 TALWANDI',
    category: 'FACADE & ENTRY SANCTUARY',
    src: exteriorSanctuaryImg,
    badge: '3D FACADE ELEVATION',
    specs: 'DOUBLE-HEIGHT GLASS · FLUTED WOOD & TRAVERTINE',
  },
  {
    id: 'inner',
    label: '02 INNER LOUNGE',
    shortLabel: 'INNER LOUNGE',
    title: 'MAIN SEATING // FLUTED OAK ESPRESSO BAR',
    category: 'ACOUSTIC BANQUETTE LOUNGE',
    src: innerLoungeImg,
    badge: 'INNER ARCHITECTURAL VIEW',
    specs: 'BEIGE LINEN BOOTHS · AMBER GLASS PENDANTS',
  },
  {
    id: 'top',
    label: '03 TOP CUTAWAY',
    shortLabel: 'TOP VIEW',
    title: '3D ISOMETRIC FLOORPLAN // COMPLETE ZONING',
    category: 'ARCHITECTURAL ISOMETRIC SPECIMEN',
    src: topViewImg,
    badge: '3D TOP CUTAWAY VIEW',
    specs: 'COURTYARD CORE · ESPRESSO ISLAND & STUDY PODS',
  },
  {
    id: 'kitchen',
    label: '04 ARTISAN KITCHEN',
    shortLabel: 'KITCHEN & ROASTERY',
    title: 'OPEN COMMERCIAL KITCHEN & BREW BAR',
    category: 'CULINARY WORKSHOP & ESPRESSO LAB',
    src: kitchenBrewBarImg,
    badge: 'ARTISAN KITCHEN VIEW',
    specs: 'LA MARZOCCO DUAL-BOILER · PASTRY PREP PASS',
  },
  {
    id: 'loft',
    label: '05 STUDY LOFT',
    shortLabel: 'STUDY LOFT',
    title: 'MEZZANINE STUDY PODS // COURTYARD GLASS',
    category: 'DEEP WORK FOCUS WORKSTATIONS',
    src: studyLoftImg,
    badge: 'ACOUSTIC STUDY LOFT VIEW',
    specs: 'INDIVIDUAL OAK DESKS · BRASS TASK LAMPS',
  },
];

export const Scroll3DMapJourney = ({ scrollYProgress }) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);

  // ── Dreamy Physics-based Spring Interpolation ──
  // Dampens raw wheel ticks into fluid, organic floating momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 18,
    mass: 0.7,
    restDelta: 0.0004,
  });

  // Active architectural perspective view (0 to 4)
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [userSelectedView, setUserSelectedView] = useState(false);

  // ── Derived numeric states for telemetry HUD ──
  const [telemetry, setTelemetry] = useState({
    altitude: 6400,
    distance: 1850,
    phase: 'REGIONAL APPROACH',
    phaseIndex: 1,
    pct: 0,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const pct = Math.round(clamped * 100);

    let altitude;
    let distance;
    let phase;
    let phaseIndex;

    if (clamped < 0.28) {
      const p = clamped / 0.28;
      altitude = Math.round(6400 - p * 4800); // 6400m -> 1600m
      distance = Math.round(1850 - p * 600); // 1850m -> 1250m
      phase = 'REGIONAL AIRSPACE APPROACH';
      phaseIndex = 1;
    } else if (clamped < 0.68) {
      const p = (clamped - 0.28) / 0.4;
      altitude = Math.round(1600 - p * 1560); // 1600m -> 40m
      distance = Math.round(1250 - p * 1230); // 1250m -> 20m
      phase = 'TALWANDI CORRIDOR ROUTE';
      phaseIndex = 2;
    } else if (clamped < 0.74) {
      altitude = 0;
      distance = 0;
      phase = 'TARGET LOCK // TATVA PIN';
      phaseIndex = 3;
    } else {
      altitude = 0;
      distance = 0;
      phase = '3D SANCTUARY ACTIVE';
      phaseIndex = 4;

      if (!userSelectedView) {
        if (clamped < 0.79) {
          setActiveViewIdx(0);
        } else if (clamped < 0.85) {
          setActiveViewIdx(1);
        } else if (clamped < 0.91) {
          setActiveViewIdx(2);
        } else if (clamped < 0.96) {
          setActiveViewIdx(3);
        } else {
          setActiveViewIdx(4);
        }
      }
    }

    setTelemetry({ altitude, distance, phase, phaseIndex, pct });
  });

  // ── Dreamy 3D Camera & Map Transforms ──
  const mapScale = useTransform(smoothProgress, [0, 0.35, 0.72], [0.88, 1.08, 1.28]);
  const mapRotateX = useTransform(smoothProgress, [0, 0.35, 0.7], [28, 14, 0]);
  const mapRotateZ = useTransform(smoothProgress, [0, 0.45, 0.72], [-6, -2, 0]);
  const mapTranslateY = useTransform(smoothProgress, [0, 0.4, 0.7], [-30, 0, 20]);
  const mapTranslateX = useTransform(smoothProgress, [0, 0.4, 0.7], [20, 0, -15]);

  // Dreamy Cinematic Rack Focus
  const mapBlur = useTransform(smoothProgress, [0.66, 0.76], ['blur(0px)', 'blur(8px)']);
  const cafeBlur = useTransform(smoothProgress, [0.70, 0.78], ['blur(8px)', 'blur(0px)']);

  // Route drawing progression
  const pathLength = useTransform(smoothProgress, [0.12, 0.65], [0, 1]);

  // Destination beacon pulse & visibility
  const beaconOpacity = useTransform(smoothProgress, [0.55, 0.68], [0, 1]);
  const beaconScale = useTransform(smoothProgress, [0.55, 0.72], [0.3, 1.15]);

  // Phase 3-4 Transition: Map folds away, 3D Architectural Cafe image emerges
  const mapContainerOpacity = useTransform(smoothProgress, [0.7, 0.75], [1, 0]);
  const mapContainerPointerEvents = useTransform(smoothProgress, (v) => (v > 0.74 ? 'none' : 'auto'));

  const cafeCardOpacity = useTransform(smoothProgress, [0.71, 0.76], [0, 1]);
  const cafeCardScale = useTransform(smoothProgress, [0.71, 0.78, 1], [0.88, 1, 1.02]);
  const cafeCardRotateX = useTransform(smoothProgress, [0.71, 0.78], [24, 0]);
  const cafeCardTranslateZ = useTransform(smoothProgress, [0.71, 0.78], [-60, 0]);

  // Smooth mouse parallax physics
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });
  const springMouseX = useSpring(targetMouse.x * -18, { stiffness: 90, damping: 22 });
  const springMouseY = useSpring(targetMouse.y * -18, { stiffness: 90, damping: 22 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTargetMouse({ x, y });
  };

  const handleSelectView = (idx) => {
    setUserSelectedView(true);
    setActiveViewIdx(idx);
  };

  const handleNextView = () => {
    setUserSelectedView(true);
    setActiveViewIdx((prev) => (prev + 1) % ARCHITECTURAL_VIEWS.length);
  };

  const handlePrevView = () => {
    setUserSelectedView(true);
    setActiveViewIdx((prev) => (prev - 1 + ARCHITECTURAL_VIEWS.length) % ARCHITECTURAL_VIEWS.length);
  };

  const currentView = ARCHITECTURAL_VIEWS[activeViewIdx];

  return (
    <div className="relative w-full border-2 border-[#14100E] bg-[#FAF7F2] shadow-[8px_8px_0px_#14100E] flex flex-col overflow-hidden select-none">
      
      {/* ── Top Architectural Telemetry Header Bar ── */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#14100E] bg-[#FAF7F2] px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-grotesk z-20">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8612E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A8612E]" />
          </span>
          <span className="font-black uppercase tracking-[0.2em] text-[#14100E] text-[10px] sm:text-xs">
            LIVE 3D GPS FLIGHT
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#A8612E] border border-[#A8612E]/40 px-1.5 py-0.5 bg-[#A8612E]/5">
            {telemetry.phase}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs text-[#14100E]">
          <div className="flex items-center gap-1.5 bg-[#14100E]/5 px-2 py-0.5 border border-[#14100E]/20">
            <span className="text-[#14100E]/60">ALT:</span>
            <span className="font-bold text-[#14100E] min-w-[36px] sm:min-w-[42px] text-right">
              {telemetry.altitude}M
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#14100E]/5 px-2 py-0.5 border border-[#14100E]/20">
            <span className="text-[#14100E]/60">DIST:</span>
            <span className="font-bold text-[#A8612E] min-w-[34px] sm:min-w-[40px] text-right">
              {telemetry.distance}M
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-1 border border-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
            aria-label={soundMuted ? 'Telemetry hum muted' : 'Telemetry hum active'}
            title="Telemetry Audio Simulation"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#A8612E]" />}
          </button>
        </div>
      </div>

      {/* ── Real-Time Scroll Scrubber Track (Top Edge Indicator) ── */}
      <div className="w-full bg-[#14100E]/10 h-1 relative overflow-hidden z-20">
        <motion.div
          className="h-full bg-[#A8612E]"
          style={{ width: `${telemetry.pct}%` }}
        />
      </div>

      {/* ── Main 3D Perspective Stage Viewport ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] xl:h-[450px] max-h-[52vh] bg-[#FAF7F2] overflow-hidden [perspective:1200px]"
      >

        {/* ════════════════════════════════════════════════════════════════
            LAYER A: 3D VECTOR BLUEPRINT & SATELLITE MAP MATRIX
            ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: mapContainerOpacity,
            pointerEvents: mapContainerPointerEvents,
            scale: mapScale,
            rotateX: mapRotateX,
            rotateZ: mapRotateZ,
            y: mapTranslateY,
            x: mapTranslateX,
            filter: mapBlur,
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
        >
          {/* Topographic Cartesian Grid Background with soft atmospheric haze */}
          <div className="absolute inset-[-40%] bg-[linear-gradient(to_right,#14100E08_1px,transparent_1px),linear-gradient(to_bottom,#14100E08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(201,162,126,0.14),transparent_70%)] pointer-events-none" />

          {/* SVG Vector Map of Kota & Talwandi Corridor */}
          <svg
            viewBox="0 0 800 600"
            className="w-[140%] h-[140%] max-w-none text-[#14100E]"
            aria-label="Map Route to TATVA Café Talwandi"
          >
            <defs>
              <pattern id="diagHatch" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="16" stroke="#14100E" strokeWidth="0.75" strokeOpacity="0.06" />
              </pattern>
              
              <filter id="caramelGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#A8612E" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* Chambal River Ribbon (Kota Natural Landmark) */}
            <path
              d="M 20,40 C 140,80 180,180 230,240 C 290,320 280,440 220,580"
              fill="none"
              stroke="#C9A27E"
              strokeWidth="44"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            <path
              d="M 20,40 C 140,80 180,180 230,240 C 290,320 280,440 220,580"
              fill="none"
              stroke="#A8612E"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
            />
            <text x="130" y="210" fill="#14100E" opacity="0.4" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
              CHAMBAL RIVER WATERWAY
            </text>

            {/* Kota Urban Grid Zones */}
            <rect x="260" y="110" width="160" height="100" fill="url(#diagHatch)" stroke="#14100E" strokeWidth="1" strokeOpacity="0.15" />
            <text x="270" y="130" fill="#14100E" opacity="0.4" fontSize="9" fontFamily="monospace" fontWeight="bold">
              KOTA AERODROME ZONE
            </text>

            <rect x="440" y="230" width="220" height="150" fill="url(#diagHatch)" stroke="#14100E" strokeWidth="1" strokeOpacity="0.18" />
            <text x="455" y="252" fill="#14100E" opacity="0.5" fontSize="10" fontFamily="monospace" fontWeight="bold">
              TALWANDI SECTOR 4 / COACHING CORRIDOR
            </text>

            {/* Major Arterial Roads */}
            <line x1="200" y1="50" x2="650" y2="520" stroke="#14100E" strokeWidth="7" strokeOpacity="0.2" />
            <line x1="200" y1="50" x2="650" y2="520" stroke="#FAF7F2" strokeWidth="1" strokeDasharray="6 6" />
            <text x="310" y="170" fill="#14100E" opacity="0.45" fontSize="9" fontFamily="monospace" transform="rotate(40 310 170)">
              NH-52 // JHALAWAR ROAD
            </text>

            <line x1="330" y1="180" x2="480" y2="180" stroke="#14100E" strokeWidth="5" strokeOpacity="0.15" />
            
            <circle cx="480" cy="180" r="18" fill="none" stroke="#14100E" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="480" cy="180" r="6" fill="#14100E" fillOpacity="0.2" />
            <text x="495" y="175" fill="#14100E" opacity="0.6" fontSize="9" fontFamily="monospace" fontWeight="bold">
              TALWANDI CIRCLE
            </text>

            <path
              d="M 480,180 L 480,310 L 590,310 L 590,410"
              fill="none"
              stroke="#14100E"
              strokeWidth="6"
              strokeOpacity="0.16"
              strokeLinecap="square"
            />
            <text x="500" y="302" fill="#14100E" opacity="0.5" fontSize="9" fontFamily="monospace">
              COMMERCE COLLEGE ROAD
            </text>

            <line x1="420" y1="360" x2="700" y2="360" stroke="#14100E" strokeWidth="2" strokeOpacity="0.1" />
            <line x1="420" y1="410" x2="700" y2="410" stroke="#14100E" strokeWidth="2" strokeOpacity="0.1" />
            <line x1="530" y1="230" x2="530" y2="450" stroke="#14100E" strokeWidth="2" strokeOpacity="0.1" />
            <line x1="640" y1="230" x2="640" y2="450" stroke="#14100E" strokeWidth="2" strokeOpacity="0.1" />

            {/* ── Active Animated Route Path (Golden Caramel Laser) ── */}
            <motion.path
              id="tatva-route-path"
              d="M 330,180 L 480,180 L 480,310 L 590,310 L 590,385"
              fill="none"
              stroke="#A8612E"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#caramelGlow)"
              style={{
                pathLength,
              }}
            />

            <motion.path
              d="M 330,180 L 480,180 L 480,310 L 590,310 L 590,385"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="2.5"
              strokeDasharray="12 16"
              style={{
                pathLength,
              }}
            />

            {/* Starting Origin Marker (Talwandi Entrance) */}
            <g transform="translate(330, 180)">
              <circle r="7" fill="#14100E" />
              <circle r="3" fill="#FAF7F2" />
              <text x="12" y="4" fill="#14100E" fontSize="9" fontFamily="monospace" fontWeight="bold">
                TRANSIT ORIGIN
              </text>
            </g>

            {/* ── Destination Pin at TATVA Café (590, 385) ── */}
            <motion.g
              transform="translate(590, 385)"
              style={{
                opacity: beaconOpacity,
                scale: beaconScale,
              }}
            >
              <circle r="36" fill="none" stroke="#A8612E" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '8s' }} />
              <circle r="22" fill="#A8612E" fillOpacity="0.15" stroke="#A8612E" strokeWidth="1.5" />
              <circle r="8" fill="#14100E" />
              <circle r="3.5" fill="#A8612E" />

              <g transform="translate(14, -28)">
                <rect x="0" y="0" width="150" height="34" fill="#FAF7F2" stroke="#14100E" strokeWidth="1.5" />
                <rect x="2" y="2" width="4" height="30" fill="#A8612E" />
                <text x="12" y="14" fill="#14100E" fontSize="9" fontFamily="monospace" fontWeight="900" letterSpacing="0.1em">
                  TATVA CAFÉ
                </text>
                <text x="12" y="26" fill="#A8612E" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  25.1388° N, 75.8362° E
                </text>
              </g>
            </motion.g>

          </svg>

          {/* Crosshair Reticle Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-64 h-64 border border-[#14100E]/15 rounded-full flex items-center justify-center">
              <Crosshair className="w-8 h-8 text-[#14100E]/20" />
              <div className="absolute top-1 font-mono text-[8px] text-[#14100E]/40 tracking-widest">
                RADAR AZIMUTH 042°
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            LAYER B: 3D PHOTOREALISTIC ARCHITECTURAL SANCTUARY REVEAL
            (5 Perspectives: Exterior, Inner Lounge, Top Cutaway, Kitchen, Study Loft)
            ════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: cafeCardOpacity,
            scale: cafeCardScale,
            rotateX: prefersReducedMotion ? 0 : cafeCardRotateX,
            z: cafeCardTranslateZ,
            filter: cafeBlur,
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-2 sm:inset-3 lg:inset-4 flex flex-col justify-between p-3 sm:p-5 border-2 border-[#14100E] bg-[#14100E] text-[#FAF7F2] shadow-[8px_8px_0px_#A8612E] overflow-hidden will-change-transform z-10"
        >
          {/* Background High-Res 3D Architectural Cafe Image (Smooth Crossfade between 5 Views) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentView.id}
                src={currentView.src}
                alt={`TATVA Café 3D Architectural - ${currentView.label}`}
                initial={{ opacity: 0, scale: 1.06, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: isHovered && !prefersReducedMotion ? 1.04 : 1.0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.05]"
                style={{
                  x: isHovered && !prefersReducedMotion ? springMouseX : 0,
                  y: isHovered && !prefersReducedMotion ? springMouseY : 0,
                }}
              />
            </AnimatePresence>

            {/* Vignette & Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-[#14100E]/20 to-[#14100E]/65 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,16,14,0.65)_100%)]" />
          </div>

          {/* ── Top Bar: Perspective Switcher & Badges ── */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="bg-[#FAF7F2] text-[#14100E] border-2 border-[#14100E] px-2.5 py-1 shadow-[2px_2px_0px_#A8612E] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#A8612E]" />
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                {currentView.badge}
              </span>
            </div>

            {/* 5-Angle Architectural Perspective Selector Pill Bar */}
            <div className="flex items-center gap-1 bg-[#14100E]/85 backdrop-blur-md border border-[#FAF7F2]/30 p-1">
              {ARCHITECTURAL_VIEWS.map((view, idx) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => handleSelectView(idx)}
                  className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider transition-all ${
                    activeViewIdx === idx
                      ? 'bg-[#A8612E] text-[#FAF7F2] font-black shadow-[1px_1px_0px_#FAF7F2]'
                      : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10'
                  }`}
                  aria-label={`Switch to ${view.label}`}
                >
                  {view.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* ── Middle: Quick Arrow Navigators ── */}
          <div className="relative z-10 flex items-center justify-between pointer-events-none px-1">
            <button
              type="button"
              onClick={handlePrevView}
              className="pointer-events-auto p-1.5 bg-[#14100E]/80 hover:bg-[#A8612E] text-[#FAF7F2] border border-[#FAF7F2]/40 transition-colors shadow-[2px_2px_0px_#14100E]"
              aria-label="Previous Perspective"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextView}
              className="pointer-events-auto p-1.5 bg-[#14100E]/80 hover:bg-[#A8612E] text-[#FAF7F2] border border-[#FAF7F2]/40 transition-colors shadow-[2px_2px_0px_#14100E]"
              aria-label="Next Perspective"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── Bottom Dossier & Action Strip ── */}
          <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-[#14100E]/75 backdrop-blur-sm p-3 border border-[#FAF7F2]/20">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 text-[#A8612E] font-mono text-[9px] tracking-widest uppercase mb-0.5">
                <Coffee className="w-3 h-3" />
                <span>{currentView.title}</span>
              </div>
              <h3 className="font-grotesk font-black text-xl sm:text-2xl uppercase tracking-tighter text-[#FAF7F2] leading-none mb-1">
                {CAFE_NAME} <span className="text-[#A8612E] text-sm font-mono font-normal">({activeViewIdx + 1}/5)</span>
              </h3>
              <p className="font-mono text-[9px] sm:text-[10px] text-[#FAF7F2]/80 uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-[#A8612E]">SPEC:</span>
                <span>{currentView.specs}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 sm:py-2 px-3 bg-[#A8612E] hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#14100E] border border-[#FAF7F2] font-grotesk font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-[2px_2px_0px_#14100E] transition-all"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Persistent HUD Telemetry Stamp (Bottom-Left) ── */}
        <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
          <div className="bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#14100E] px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#14100E] shadow-[2px_2px_0px_#14100E] flex items-center gap-1.5">
            <Compass className="w-2.5 h-2.5 text-[#A8612E] animate-spin" style={{ animationDuration: '14s' }} />
            <span>KOTA TECTONIC SECTOR 4</span>
            <span className="text-[#A8612E]">•</span>
            <span>{telemetry.pct}% COMPLETE</span>
          </div>
        </div>

        {/* ── Scroll Guide Prompt Pill (Fades once user scrolls) ── */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            pointerEvents: useTransform(scrollYProgress, (v) => (v > 0.1 ? 'none' : 'auto')),
          }}
          className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none"
        >
          <div className="bg-[#14100E] text-[#FAF7F2] px-2.5 py-0.5 font-grotesk font-black text-[9px] uppercase tracking-[0.2em] shadow-[2px_2px_0px_#A8612E] flex items-center gap-1 animate-pulse">
            <span>Scroll down to navigate map</span>
            <span>↓</span>
          </div>
        </motion.div>

      </div>

      {/* ── Bottom Dossier Footer Strip ── */}
      <div className="border-t-2 border-[#14100E] bg-[#FAF7F2] px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#14100E]/70">
        <div className="flex items-center gap-2 sm:gap-3">
          <span>5-PERSPECTIVE 3D ARCHITECTURAL DOSSIER</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#A8612E] font-bold">VIEW {activeViewIdx + 1}/5: {currentView.shortLabel}</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-[#14100E]">
          <span className="text-[#A8612E]">SCROLL REVERSIBLE:</span>
          <span>UP = RESET / DOWN = 3D REVEAL</span>
        </div>
      </div>

    </div>
  );
};

export default Scroll3DMapJourney;
