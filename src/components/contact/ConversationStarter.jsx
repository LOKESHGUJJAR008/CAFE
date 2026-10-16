import React, { useRef, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { MessageSquare, ArrowDown, PhoneCall, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_RAW, MAPS_LINK } from '../../config';
import Scroll3DMapJourney from './Scroll3DMapJourney';
import Scroll3DEmerge from './Scroll3DEmerge';

/**
 * ConversationStarter
 *
 * Houses the sticky scroll-locked 3D Map-to-Sanctuary flight simulator:
 * - Locks the viewport as the user scrolls through a 360vh track
 * - Progressively flies into Kota, traces the route to Talwandi, and unlocks 5 3D Cafe Sanctuary views
 * - Reverses cleanly when scrolling backwards
 */
export const ConversationStarter = () => {
  const containerRef = useRef(null);

  // Sticky scroll progress tracker for the pinned sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttery dreamy spring damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 18,
    mass: 0.7,
    restDelta: 0.0004,
  });

  const [currentStage, setCurrentStage] = useState(1);
  const [scrollPct, setScrollPct] = useState(0);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    setScrollPct(Math.round(clamped * 100));

    if (clamped < 0.28) {
      setCurrentStage(1);
    } else if (clamped < 0.72) {
      setCurrentStage(2);
    } else {
      setCurrentStage(3);
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAF7F2] text-[#14100E] min-h-[360vh] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]"
    >
      {/* ── Sticky Viewport Frame: Locks viewport 100% while scrubbing through 3D Map ── */}
      <div className="sticky top-0 h-screen max-h-screen pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center overflow-hidden">
        
        {/* ── Ground Rift Fracture Line (Visual 3D Ground Splitting) ── */}
        <div className="w-full max-w-7xl mx-auto mb-3 sm:mb-4 flex items-center justify-between border-b-2 border-dashed border-[#14100E]/20 pb-1.5 sm:pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#A8612E] rotate-45 animate-pulse" />
            <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-[#A8612E]">
              TECTONIC SECTOR // 3D MAP-TO-SANCTUARY ENGINE
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[9px] text-[#14100E]/70 uppercase tracking-widest">
            <span className="hidden sm:inline">STAGE {currentStage}/3:</span>
            <span className="text-[#A8612E] font-bold">
              {currentStage === 1 && 'AIRSPACE APPROACH'}
              {currentStage === 2 && 'TALWANDI CORRIDOR ROUTE'}
              {currentStage === 3 && '3D SANCTUARY ACTIVE'}
            </span>
            <span>·</span>
            <span>{scrollPct}%</span>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ══════════════════════════════════════════════════════════════
                LEFT COLUMN (5 COLS): Emerges from ground with Dossier
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Scroll3DEmerge side="left" depth={80} pitchAngle={14}>
                <div className="border-2 border-[#14100E] bg-[#FAF7F2] p-6 sm:p-8 shadow-[6px_6px_0px_#14100E]">
                  
                  {/* Top Protocol Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[2px_2px_0px_#14100E]">
                      <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                        REAL-TIME DISPATCH PROTOCOL
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-[#A8612E] font-bold">
                      {scrollPct < 100 ? 'PINNED' : 'COMPLETE'}
                    </div>
                  </div>

                  <h2 className="font-grotesk font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tighter leading-[0.92] text-[#14100E] mb-4">
                    Start a<br />
                    <span className="text-[#14100E]">conversation</span>
                    <span className="text-[#A8612E]">.</span>
                  </h2>

                  <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 leading-relaxed mb-6">
                    Scroll down to initiate the 3D cartographic flight. Follow the illuminated Talwandi corridor directly to TATVA Café to unlock 5 architectural perspectives: Exterior, Inner Lounge, 3D Top Cutaway, Kitchen, and Study Loft.
                  </p>

                  {/* ── Synchronized Flight Stage Breadcrumbs ── */}
                  <div className="space-y-2 mb-6 border-y-2 border-dashed border-[#14100E]/20 py-3 font-grotesk text-xs">
                    <div className={`flex items-center justify-between px-2 py-1 transition-colors ${currentStage === 1 ? 'bg-[#14100E] text-[#FAF7F2]' : 'text-[#14100E]/60'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold">01</span>
                        <span className="font-black uppercase tracking-wider text-[11px]">KOTA REGIONAL RADAR</span>
                      </div>
                      <span className="font-mono text-[10px]">{currentStage === 1 ? 'ACTIVE' : 'READY'}</span>
                    </div>

                    <div className={`flex items-center justify-between px-2 py-1 transition-colors ${currentStage === 2 ? 'bg-[#14100E] text-[#FAF7F2]' : 'text-[#14100E]/60'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold">02</span>
                        <span className="font-black uppercase tracking-wider text-[11px]">TALWANDI VECTOR ROUTE</span>
                      </div>
                      <span className="font-mono text-[10px]">{currentStage === 2 ? 'ACTIVE' : 'LOCK'}</span>
                    </div>

                    <div className={`flex items-center justify-between px-2 py-1 transition-colors ${currentStage === 3 ? 'bg-[#A8612E] text-[#FAF7F2]' : 'text-[#14100E]/60'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold">03</span>
                        <span className="font-black uppercase tracking-wider text-[11px]">3D SANCTUARY (5 VIEWS)</span>
                      </div>
                      <span className="font-mono text-[10px]">{currentStage === 3 ? 'UNLOCKED' : 'PENDING'}</span>
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 font-grotesk text-xs">
                    <a
                      href="#dispatch-form"
                      className="py-2.5 px-5 bg-[#14100E] hover:bg-[#A8612E] text-[#FAF7F2] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-[3px_3px_0px_#A8612E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#A8612E] transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Jump To Form</span>
                      <ArrowDown className="w-3 h-3 animate-bounce" />
                    </a>

                    <a
                      href={`tel:${PHONE_RAW}`}
                      className="py-2.5 px-4 border-2 border-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] text-[#14100E] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#A8612E]" />
                      <span>{PHONE_DISPLAY}</span>
                    </a>

                    <a
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 border border-[#14100E]/40 hover:border-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] text-[#14100E] font-mono text-[11px] flex items-center gap-1.5 transition-colors"
                      title="Open Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#A8612E]" />
                      <span>Maps</span>
                    </a>
                  </div>

                </div>
              </Scroll3DEmerge>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT COLUMN (7 COLS): Sticky 3D Map Flight + Sanctuary Card
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Scroll3DMapJourney scrollYProgress={smoothProgress} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ConversationStarter;
