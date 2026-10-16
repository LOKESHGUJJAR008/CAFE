import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import sanctuaryImg from '../../assets/images/about-sanctuary.jpg';
import latteDetailImg from '../../assets/images/about-latte-detail.jpg';

export const Atmosphere = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="atmosphere"
      className="relative w-full bg-[#14100E] text-[#FAF7F2] border-b-2 border-[#14100E] overflow-hidden"
    >
      {/* ── Top Running Archival Ticker ── */}
      <div className="border-b border-[#FAF7F2]/20 py-2.5 px-6 overflow-hidden bg-[#0D0907] select-none">
        <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#FAF7F2]/60 font-grotesk">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#FAF7F2]/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A27E]">
                SPATIAL DOSSIER · ACOUSTICS & LIGHT
              </span>
              <span className="w-8 h-[1px] bg-[#FAF7F2]/30" />
              <span className="font-cormorant italic text-sm text-[#FAF7F2]">
                Where Design Meets the Roast
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full Width Content Grid (Edge to Edge) ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#FAF7F2]/20">
        
        {/* Left Manifesto Column (~55%) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-[#FAF7F2] text-[#14100E] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-4">
              ARCHITECTURAL SANCTUARY
            </span>
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#FAF7F2] leading-[0.95] mb-6">
              Where Design<br />
              <span className="font-cormorant italic font-normal text-[#C9A27E]">
                Meets the Roast.
              </span>
            </h2>
            <p className="text-[#FAF7F2]/75 text-xs sm:text-sm leading-relaxed max-w-lg font-grotesk mb-8">
              A comfortable sanctuary designed for coffee lovers, thinkers, and friends. Experience handcrafted brews, warm ambient lighting, and cozy corners crafted for your peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-6 border-t border-[#FAF7F2]/15 text-xs font-grotesk">
              <div>
                <span className="block font-bold text-sm text-[#C9A27E]">42 dB</span>
                <span className="text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest">Acoustic Quiet Level</span>
              </div>
              <div>
                <span className="block font-bold text-sm text-[#C9A27E]">100 Mbps</span>
                <span className="text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest">Dedicated Fiber WiFi</span>
              </div>
              <div>
                <span className="block font-bold text-sm text-[#C9A27E]">100% Arabica</span>
                <span className="text-[10px] text-[#FAF7F2]/50 uppercase tracking-widest">Single-Origin Roasts</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-md"
            >
              <span>VISIT OUR CAFÉ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Photo Stage (~45%) */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex items-center justify-center bg-[#191310] relative min-h-[440px]">
          <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden border-2 border-[#FAF7F2]/30 shadow-2xl group">
            <img
              src={sanctuaryImg}
              alt="TATVA Café Atmosphere"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4 bg-[#FAF7F2] text-[#14100E] px-3 py-1 font-grotesk text-[8px] font-black uppercase tracking-[0.2em]">
              SANCTUARY INTERIOR
            </div>
            <div className="absolute bottom-4 inset-x-4 bg-[#14100E]/80 backdrop-blur-md text-[#FAF7F2] p-3 text-[10px] font-grotesk tracking-wide flex items-center justify-between">
              <span>Talwandi, Kota</span>
              <span className="text-[#C9A27E]">Open till 23:00</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Atmosphere;
