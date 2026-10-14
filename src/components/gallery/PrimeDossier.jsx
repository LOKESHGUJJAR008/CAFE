import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import slowMornings03 from '../../assets/images/gallery/slow-mornings/03-latte-heart-croissant.png';
import sweetCravings01 from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import lateNight01 from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import GalleryLightbox from './GalleryLightbox';

export const PrimeDossier = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const dossierImages = [
    { src: slowMornings03, alt: 'Artisan latte art craft' },
    { src: sweetCravings01, alt: 'Single-origin espresso extraction' },
    { src: lateNight01, alt: 'Quiet evening corner study' },
  ];

  return (
    <section className="bg-[#FAF7F2] text-[#14100E] py-14 sm:py-20 border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Ticker */}
        <div className="flex items-center justify-between border-b-2 border-[#14100E] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#14100E]" />
            <span className="font-grotesk font-black text-xs uppercase tracking-[0.28em] text-[#14100E]">
              CURATOR DOSSIER · FIELD SPECIMEN RECORD
            </span>
          </div>
          <span className="font-grotesk text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#A8612E]">
            VOL. IV / SECTION B
          </span>
        </div>

        {/* ── Swiss Constructivist 2-Column Spread ── */}
        <div className="border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_20px_50px_rgba(20,16,14,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* ── Left Column: "POINT IS LADIES AND GENTLEMEN THAT COFFEE_" Typography & Split Crop (7 cols) ── */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF7F2]">
              <div>
                {/* Stepped White Tag */}
                <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3.5 py-1.5 shadow-[3px_3px_0px_#14100E] mb-6">
                  <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                    CURATOR'S THESIS — 02
                  </span>
                </div>

                {/* Sliced Typography + Image Block (Reference Image Block 4 style) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-8">
                  <div className="sm:col-span-7">
                    <h3 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter leading-[0.92] text-[#14100E]">
                      POINT IS<br />
                      LADIES AND<br />
                      GENTLEMEN<br />
                      THAT COFFEE_
                    </h3>
                  </div>

                  {/* Geometric Split Photographic Crop */}
                  <div className="sm:col-span-5 relative aspect-[3/4] border-2 border-[#14100E] overflow-hidden group cursor-pointer"
                       onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
                    <img
                      src={slowMornings03}
                      alt="Coffee craft detail"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Stepped cut corner */}
                    <div className="absolute bottom-0 right-0 bg-[#FAF7F2] border-t-2 border-l-2 border-[#14100E] p-2 text-[9px] font-grotesk font-black uppercase tracking-widest">
                      FIG. 4A
                    </div>
                  </div>
                </div>

                <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 leading-relaxed max-w-lg">
                  Every extraction at Tatva Prime is calibrated against Kota's atmospheric pressure and temperature curves. We celebrate the brutal beauty of raw stone, high-density crema, and intentional silence.
                </p>
              </div>

              {/* Lower Spec Stamp */}
              <div className="pt-6 mt-8 border-t-2 border-[#14100E] flex items-center justify-between">
                <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-[#14100E]/60">
                  RECORD NO. 884-TP · 2026 ARCHIVE
                </span>
                <span className="font-grotesk font-black text-sm text-[#14100E]">
                  TATVA PRIME // CURATED
                </span>
              </div>
            </div>

            {/* ── Right Column: High Contrast Specimen Card & Display 8P (5 cols) ── */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF7F2]">
              
              {/* Photo Tile with "8P AMERICAN GREED —" Style Stepped Label */}
              <div className="relative aspect-[16/10] border-b-2 border-[#14100E] overflow-hidden group cursor-pointer bg-[#14100E]"
                   onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }}>
                <img
                  src={sweetCravings01}
                  alt="Espresso crema specimen"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-90"
                />

                {/* Stepped White Label: 8P ARTISAN CRAFT — */}
                <div className="absolute top-4 left-4 bg-[#FAF7F2] border-2 border-[#14100E] p-3 sm:p-4 shadow-md z-10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-grotesk font-black text-3xl sm:text-4xl text-[#14100E] leading-none">
                      8<span className="text-xl align-top">P</span>
                    </span>
                    <div className="border-l-2 border-[#14100E] pl-2">
                      <span className="block font-grotesk text-[8px] font-bold uppercase tracking-[0.25em] text-[#14100E]/60">
                        SESSION
                      </span>
                      <span className="block font-grotesk font-black text-xs uppercase tracking-tight text-[#14100E]">
                        ARTISAN CRAFT
                      </span>
                    </div>
                  </div>
                  <div className="w-6 h-[2px] bg-[#14100E] mt-2" />
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-1 text-xs">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="p-6 sm:p-8 space-y-3.5 bg-[#FAF7F2]">
                <div className="flex items-center justify-between pb-2 border-b border-[#14100E]/20 text-[11px] font-grotesk uppercase">
                  <span className="text-[#14100E]/60 font-bold">SPECIMEN A</span>
                  <span className="font-black text-[#14100E]">100% ARABICA PEABERRY</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#14100E]/20 text-[11px] font-grotesk uppercase">
                  <span className="text-[#14100E]/60 font-bold">ALTITUDE</span>
                  <span className="font-black text-[#14100E]">1,450 METERS / BABABUDANGIRI</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#14100E]/20 text-[11px] font-grotesk uppercase">
                  <span className="text-[#14100E]/60 font-bold">ROAST PROFILE</span>
                  <span className="font-black text-[#14100E]">NORDIC LIGHT · FIRST CRACK 204°C</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-grotesk uppercase">
                  <span className="text-[#14100E]/60 font-bold">BAROMETRIC</span>
                  <span className="font-black text-[#14100E]">9.0 BAR / 93.5°C EXTRACTION</span>
                </div>
              </div>

              {/* Brand Square Footnote */}
              <div className="p-4 border-t-2 border-[#14100E] bg-[#14100E] text-[#FAF7F2] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FAF7F2]" />
                  <span className="font-grotesk font-black text-xs uppercase tracking-[0.25em]">
                    TATVA PRIME
                  </span>
                </div>
                <span className="font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF7F2]/60">
                  SANCTUARY STANDARD
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        items={dossierImages}
      />
    </section>
  );
};

export default PrimeDossier;
