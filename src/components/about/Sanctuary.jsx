import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Volume2, Sun, Wifi, BookOpen, Coffee, Sparkles } from 'lucide-react';
import studyLoftImg from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import espressoBarImg from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import sunlitImg from '../../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import loungeImg from '../../assets/images/gallery/late-night/02-candle-string-lights.png';

export const Sanctuary = ({
  eyebrow = 'Spatial Architecture',
  heading = 'Four Distinct Sanctuary Spaces',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeZone, setActiveZone] = useState('loft');

  const SPACES = [
    {
      id: 'loft',
      code: 'ZONE-A',
      name: 'The Study Loft & Focus Retreat',
      badge: 'SILENT COGNITION',
      image: studyLoftImg,
      tagline: 'Engineered for high-focus academics and creative contemplation.',
      description: 'Dedicated to Kota\'s students, scholars, and deep-work professionals. Sound-absorbing acoustic baffles, individual brass gooseneck task lamps, dedicated power outlets at every desk, and enterprise gigabit Wi-Fi.',
      telemetry: {
        acoustics: '38–42 dB (Library Level)',
        illumination: '3000K Soft Focus Glow',
        connectivity: 'Gigabit Fiber (Low Latency)',
        pairing: 'Royal Cappuccino & Sourdough Panini',
      },
    },
    {
      id: 'bar',
      code: 'ZONE-B',
      name: 'The Espresso Bar & Cupping Counter',
      badge: 'EXTRACTION THEATRE',
      image: espressoBarImg,
      tagline: 'An open laboratory of single-origin coffee craft.',
      description: 'Where dialogue between guest and barista unfolds. Witness the 9.0 bar hydraulic extraction, dialled-in pour-overs, and sensory tasting flights on solid honed marble surfaces.',
      telemetry: {
        acoustics: '52 dB (Gentle Steam & Steam Chime)',
        illumination: '4000K Neutral Precision',
        connectivity: 'High Counter Seating',
        pairing: 'Single-Origin Pour-Over Flight',
      },
    },
    {
      id: 'courtyard',
      code: 'ZONE-C',
      name: 'The Sunlit Courtyard & Veranda',
      badge: 'NATURAL DAYLIGHT',
      image: sunlitImg,
      tagline: 'Warm morning rays, terracotta pots, and natural breeze.',
      description: 'Filled with lush indoor botanical greenery and sunbeams streaming through textured linen blinds. The ideal setting for slow morning journals, casual rendezvous, and weekend decompressions.',
      telemetry: {
        acoustics: '45 dB (Gentle Birdsong & Foliage)',
        illumination: '5500K Filtered Natural Sky',
        connectivity: 'Low Scandinavian Wooden Tables',
        pairing: 'Classic Iced Latte & Blueberry Cheesecake',
      },
    },
    {
      id: 'salon',
      code: 'ZONE-D',
      name: 'The Vinyl & Reading Salon',
      badge: 'ANALOG SANCTUARY',
      image: loungeImg,
      tagline: 'Analog warm acoustics, deep leather seating, and curated literature.',
      description: 'Sink into mid-century leather armchairs while rare vinyl pressings of Miles Davis and Nils Frahm gently spin on our Pro-Ject turntable. Browse architectural and culinary monographs at your own unhurried tempo.',
      telemetry: {
        acoustics: '40 dB (Warm Analog Vinyl Warmth)',
        illumination: '2200K Evening Amber Filament',
        connectivity: 'Deep Leather Lounge Club Chairs',
        pairing: 'Belgian Truffle Mocha & Warm Brownie',
      },
    },
  ];

  const currentSpace = SPACES.find((s) => s.id === activeZone) || SPACES[0];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-[#14100E]">
          <div>
            <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3">
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-5xl uppercase tracking-tighter text-[#14100E]">
              {heading}
            </h2>
          </div>
          <div className="font-grotesk text-xs uppercase tracking-widest text-[#14100E]/70 max-w-xs sm:text-right">
            ARCHITECTURAL ZONES DESIGNED FOR DISTINCT INTENTIONS
          </div>
        </div>

        {/* ── Zone Selection Tabs (Constructivist Buttons) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8">
          {SPACES.map((space) => {
            const isActive = space.id === activeZone;
            return (
              <button
                key={space.id}
                onClick={() => setActiveZone(space.id)}
                type="button"
                className={`p-3 sm:p-4 text-left border-2 border-[#14100E] transition-all duration-200 ${
                  isActive
                    ? 'bg-[#14100E] text-[#FAF7F2] shadow-[4px_4px_0px_#A8612E]'
                    : 'bg-[#FAF7F2] text-[#14100E] hover:bg-[#14100E]/5 shadow-[2px_2px_0px_#14100E]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#C9A012]' : 'text-[#A8612E]'}`}>
                    {space.code}
                  </span>
                  <span className={`text-[8px] font-grotesk font-black uppercase px-1.5 py-0.5 border ${
                    isActive ? 'border-[#C9A012] text-[#C9A012]' : 'border-[#14100E]/30 text-[#14100E]/70'
                  }`}>
                    {space.badge}
                  </span>
                </div>
                <div className="font-grotesk font-black text-xs sm:text-sm uppercase tracking-tight line-clamp-1">
                  {space.name.split(' & ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Zone Custom Showcase Frame ── */}
        <div className="border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_20px_50px_rgba(20,16,14,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* Left 7 Columns: Archival Full-Height Photo Plate */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#14100E] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSpace.id}
                  src={currentSpace.image}
                  alt={currentSpace.name}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 transition-all duration-700"
                />
              </AnimatePresence>

              {/* Stamped Live Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E]">
                <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.2em] text-[#14100E]">
                  SPATIAL ARCHIVE // {currentSpace.code}
                </span>
              </div>

              {/* Bottom Tagline Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-sm border-2 border-[#14100E] p-3.5 shadow-[3px_3px_0px_#14100E]">
                <p className="font-grotesk text-xs font-black uppercase tracking-wider text-[#14100E]">
                  {currentSpace.tagline}
                </p>
              </div>
            </div>

            {/* Right 5 Columns: Architectural Telemetry & Blueprint Ledger */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#FAF7F2]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#14100E] pb-3 mb-6">
                  <span className="font-mono text-xs font-black text-[#A8612E]">
                    SPECIFICATION BLUEPRINT
                  </span>
                  <span className="font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#14100E]/60">
                    TALWANDI • KOTA
                  </span>
                </div>

                <h3 className="font-grotesk font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-tight text-[#14100E] mb-4">
                  {currentSpace.name}
                </h3>

                <p className="font-grotesk text-xs sm:text-sm text-[#14100E]/80 leading-relaxed mb-8">
                  {currentSpace.description}
                </p>
              </div>

              {/* Telemetry Key-Value Matrix */}
              <div className="pt-6 border-t-2 border-[#14100E] space-y-3 font-grotesk">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#14100E]/15">
                  <span className="font-bold uppercase tracking-wider text-[#14100E]/60 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#A8612E]" /> Acoustic Range
                  </span>
                  <span className="font-black uppercase text-[#14100E]">
                    {currentSpace.telemetry.acoustics}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#14100E]/15">
                  <span className="font-bold uppercase tracking-wider text-[#14100E]/60 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#A8612E]" /> Illumination
                  </span>
                  <span className="font-black uppercase text-[#14100E]">
                    {currentSpace.telemetry.illumination}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#14100E]/15">
                  <span className="font-bold uppercase tracking-wider text-[#14100E]/60 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#A8612E]" /> Work Infrastructure
                  </span>
                  <span className="font-black uppercase text-[#14100E]">
                    {currentSpace.telemetry.connectivity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-bold uppercase tracking-wider text-[#14100E]/60 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#A8612E]" /> Recommended Cup
                  </span>
                  <span className="font-black uppercase text-[#A8612E]">
                    {currentSpace.telemetry.pairing}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Sanctuary;