import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, ArrowRight, PhoneCall } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_RAW } from '../../config';
import Scroll3DEmerge from './Scroll3DEmerge';

export const ContactClosingCTA = () => {
  return (
    <section className="bg-[#14100E] text-[#FAF7F2] py-16 sm:py-24 border-t-2 border-[#14100E] selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main Swiss Poster Box (Emerged from Subterranean Tectonic Depth) */}
        <Scroll3DEmerge side="center" depth={90} pitchAngle={16}>
          <div className="border-2 border-[#FAF7F2]/40 bg-[#14100E] shadow-[0_24px_70px_rgba(0,0,0,0.6)] max-w-7xl mx-auto p-8 sm:p-14 lg:p-16">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Stamp */}
              <div className="inline-flex items-center gap-3 mb-6 bg-[#FAF7F2]/10 border border-[#FAF7F2]/30 px-3 py-1">
                <div className="w-2 h-2 bg-[#FAF7F2]" />
                <span className="font-grotesk font-black text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#FAF7F2]/80">
                  SANCTUARY INVITATION · EST. KOTA
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.94] text-[#FAF7F2] mb-6">
                Experience The<br />
                Sanctuary In Person.
              </h2>

              <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#FAF7F2]/75 max-w-xl mx-auto leading-relaxed mb-10">
                From slow morning pour-overs to midnight espresso sessions. Step into our contemporary lounge in Talwandi and taste coffee the way it was engineered to be experienced.
              </p>

              {/* Brutalist Button Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/reserve"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAF7F2] text-[#14100E] font-grotesk font-black text-xs uppercase tracking-[0.22em] border-2 border-[#FAF7F2] hover:bg-transparent hover:text-[#FAF7F2] transition-colors group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>01 / RESERVE YOUR TABLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.22em] border-2 border-[#FAF7F2]/40 hover:border-[#FAF7F2] hover:bg-[#FAF7F2]/10 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>02 / EXPLORE MENU</span>
                </Link>

                <a
                  href={`tel:${PHONE_RAW}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#FAF7F2]/20 hover:border-[#FAF7F2] text-[#FAF7F2]/80 hover:text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.16em] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#A8612E]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>

              {/* Lower Ticker Stamp */}
              <div className="mt-12 pt-6 border-t border-[#FAF7F2]/15 flex flex-wrap items-center justify-between gap-4 text-[9px] font-grotesk uppercase tracking-widest text-[#FAF7F2]/50">
                <span>TATVA CAFÉ · TALWANDI, KOTA (324005)</span>
                <span>KITCHEN HOURS 08:00 — 23:00</span>
              </div>

            </div>
          </div>
        </Scroll3DEmerge>

      </div>
    </section>
  );
};

export default ContactClosingCTA;
