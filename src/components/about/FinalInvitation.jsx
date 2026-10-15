import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Coffee, ShieldCheck } from 'lucide-react';
import closingImg from '../../assets/images/gallery/slow-mornings/03-latte-heart-croissant.png';

export const FinalInvitation = ({
  eyebrow = 'Final Invitation',
  quote = 'We reserve a table for those who appreciate the quieter luxuries.',
  buttonText = 'Reserve Your Experience',
  buttonLink = '/reserve',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#14100E] text-[#FAF7F2] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 border-t-2 border-[#14100E] overflow-hidden selection:bg-[#FAF7F2] selection:text-[#14100E]">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF7F20A_1px,transparent_1px),linear-gradient(to_bottom,#FAF7F20A_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto border-2 border-[#FAF7F2]/20 bg-[#14100E] p-8 sm:p-14 lg:p-16 relative z-10 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7">
            <div className="inline-block bg-[#14100E] border border-[#C9A012] px-3 py-1 mb-6 shadow-[2px_2px_0px_#C9A012]">
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A012]">
                {eyebrow}
              </span>
            </div>

            <h2 className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.95] text-[#FAF7F2] mb-6">
              Step Inside The<br />
              <span className="font-cormorant italic font-semibold text-[#C9A012] lowercase text-4xl sm:text-6xl block">
                sanctuary.
              </span>
            </h2>

            <p className="font-grotesk text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-xl">
              {quote} Fresh single-origin roasts, peaceful study corners, and warm handmade ceramic cups await you in Talwandi.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={buttonLink}
                className="inline-flex items-center gap-3 bg-[#C9A012] text-[#14100E] px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-grotesk font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_#FAF7F2] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#FAF7F2] transition-all"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 border-2 border-[#FAF7F2] text-[#FAF7F2] px-6 py-3.5 text-xs sm:text-sm font-grotesk font-black uppercase tracking-[0.2em] hover:bg-[#FAF7F2] hover:text-[#14100E] transition-colors"
              >
                <span>Explore Menu</span>
              </Link>
            </div>
          </div>

          {/* Right Photographic Specimen */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] border-2 border-[#FAF7F2]/40 overflow-hidden shadow-[6px_6px_0px_#C9A012] group">
              <img
                src={closingImg}
                alt="TATVA Café artisan coffee and croissant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-2 left-2 bg-[#14100E]/90 border border-[#C9A012] px-2.5 py-1">
                <span className="font-grotesk text-[8px] font-black uppercase tracking-wider text-[#C9A012]">
                  TALWANDI • KOTA
                </span>
              </div>
            </div>

            {/* Micro Details */}
            <div className="mt-4 flex items-center justify-between font-grotesk text-[10px] uppercase tracking-wider text-[#FAF7F2]/60">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#C9A012]" /> 08:00 — 23:00 Daily
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#C9A012]" /> Talwandi, Kota
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalInvitation;