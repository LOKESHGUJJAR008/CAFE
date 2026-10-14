import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import slowMornings01 from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import slowMornings02 from '../../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import sweetCravings02 from '../../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import lateNight02 from '../../assets/images/gallery/late-night/02-candle-string-lights.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import GalleryLightbox from './GalleryLightbox';

const CONTACT_FRAMES = [
  {
    frameNo: '21A',
    time: '08:14:02',
    src: slowMornings01,
    title: 'THE MORNING CROISSANT & LATTE RITUAL',
    spec: 'NATURAL LIGHT · F/2.0 · 1/250S',
    cropMark: 'TOP-RIGHT',
  },
  {
    frameNo: '22A',
    time: '11:32:15',
    src: slowMornings02,
    title: 'SUNLIT WOODEN BENCH & FLAT WHITE',
    spec: '35MM LENS · F/2.8 · 1/500S',
    cropMark: 'CENTER',
  },
  {
    frameNo: '23A',
    time: '15:40:50',
    src: coffeeConversations01,
    title: 'BARISTA MICROFOAM POUR AT COUNTER',
    spec: '50MM LENS · F/1.8 · 1/320S',
    cropMark: 'BOTTOM-LEFT',
  },
  {
    frameNo: '24A',
    time: '18:15:30',
    src: sweetCravings02,
    title: 'ARTISANAL DESSERT & ESPRESSO PAIRING',
    spec: 'MACRO 85MM · F/4.0 · 1/160S',
    cropMark: 'TOP-LEFT',
  },
  {
    frameNo: '25A',
    time: '21:05:44',
    src: lateNight02,
    title: 'CANDLELIT NIGHT LOUNGE & COFFEE',
    spec: 'LOW LIGHT · F/1.4 · 1/60S',
    cropMark: 'CENTER',
  },
];

export const PrimeContactSheet = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems = CONTACT_FRAMES.map((f) => ({
    src: f.src,
    alt: f.title,
  }));

  return (
    <section className="bg-[#14100E] text-[#FAF7F2] py-14 sm:py-20 border-b-2 border-[#14100E] overflow-hidden selection:bg-[#FAF7F2] selection:text-[#14100E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#FAF7F2]/30 pb-5 mb-8">
          <div>
            <div className="inline-block bg-[#FAF7F2] text-[#14100E] px-3 py-1 font-grotesk font-black text-[10px] uppercase tracking-[0.25em] mb-2 shadow-sm">
              DARKROOM ARCHIVE · 35MM GELATIN
            </div>
            <h3 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#FAF7F2]">
              The Contact Sheet
            </h3>
          </div>
          <div className="text-right">
            <span className="block font-grotesk text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/60">
              ROLL NO: KODAK TRI-X 400 · PROOF SHEET 01
            </span>
            <span className="block font-grotesk text-[10px] uppercase tracking-wider text-[#A8612E] mt-0.5">
              ALL FRAMES UNRETOUCHED CAMERA NEGATIVES
            </span>
          </div>
        </div>

        {/* ── 35mm Filmstrip Wrapper ── */}
        <div className="border-2 border-[#FAF7F2]/40 bg-[#0B0908] p-4 sm:p-6 shadow-2xl">
          
          {/* Top Film Sprocket Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]/20 mb-4 select-none">
            <div className="flex items-center gap-3 overflow-hidden text-[9px] font-mono tracking-widest text-[#FAF7F2]/40">
              <span>■ ■ ■</span>
              <span>KODAK SAFETY FILM 5063</span>
              <span>■ ■ ■</span>
              <span>TATVA PRIME KOTA</span>
              <span>■ ■ ■</span>
              <span>ISO 400</span>
              <span>■ ■ ■</span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#FAF7F2]/40 hidden sm:inline">
              EMULSION NO. 4022-B
            </span>
          </div>

          {/* Negative Frames Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CONTACT_FRAMES.map((frame, idx) => (
              <div
                key={frame.frameNo}
                onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                className="group relative bg-[#14100E] border border-[#FAF7F2]/20 p-2 cursor-pointer hover:border-[#FAF7F2] transition-colors"
              >
                {/* Frame Edge Marking */}
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#FAF7F2]/50 mb-1 px-1">
                  <span>▲ {frame.frameNo}</span>
                  <span>{frame.time}</span>
                </div>

                {/* Photo Frame with High Contrast Silver Gelatin Look */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={frame.src}
                    alt={frame.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:contrast-150 transition-all duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Red grease-pencil proof mark (authentic darkroom look) */}
                  <div className="absolute top-2 right-2 text-red-500 font-mono text-[10px] font-bold border border-red-500 px-1 py-0.5 rotate-6 bg-black/40 pointer-events-none">
                    ✓ SELECT
                  </div>

                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-[#FAF7F2] text-[#14100E] p-2 rounded-none border border-[#14100E] flex items-center gap-1.5 text-[10px] font-grotesk font-black uppercase tracking-wider">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>INSPECT</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Frame Caption */}
                <div className="mt-2 px-1">
                  <span className="block font-grotesk font-bold text-[10px] uppercase tracking-wide text-[#FAF7F2] truncate">
                    {frame.title}
                  </span>
                  <span className="block font-mono text-[8px] text-[#FAF7F2]/50 mt-0.5 truncate">
                    {frame.spec}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Film Sprocket Row */}
          <div className="flex items-center justify-between pt-3 border-t border-[#FAF7F2]/20 mt-4 select-none">
            <div className="flex items-center gap-3 overflow-hidden text-[9px] font-mono tracking-widest text-[#FAF7F2]/40">
              <span>■ ■ ■</span>
              <span>FRAME 21A — 25A</span>
              <span>■ ■ ■</span>
              <span>PROCESS C-41 / B&W GELATIN</span>
              <span>■ ■ ■</span>
              <span>KOTA LABORATORY</span>
              <span>■ ■ ■</span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#A8612E]">
              ARCHIVED PROOF
            </span>
          </div>

        </div>

      </div>

      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        items={lightboxItems}
      />
    </section>
  );
};

export default PrimeContactSheet;
