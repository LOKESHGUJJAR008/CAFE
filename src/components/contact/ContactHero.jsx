import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  Copy,
  Check,
  ExternalLink,
  PhoneCall,
  MessageCircle,
  Compass
} from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_RAW,
  CAFE_ADDRESS,
  CAFE_EMAIL,
  MAPS_LINK,
  INSTAGRAM,
  WHATSAPP_URL
} from '../../config';
import Scroll3DEmerge from './Scroll3DEmerge';
import InteractiveSplitHeading from './InteractiveSplitHeading';

const EASE = [0.22, 1, 0.36, 1];

export const ContactHero = ({ isOpen, statusLabel, onCopy, copiedKey }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#FAF7F2] text-[#14100E] overflow-hidden pt-4 sm:pt-6 pb-16 sm:pb-20 border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Top Running Archival Ticker (Flush with Gallery & About style) ── */}
      <div className="w-full border-y-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 mb-10 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA ARCHIVE // COMMUNICATIONS DOSSIER NO. 05</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>LOCATION: TALWANDI, KOTA (LAT 25.18° N)</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>PHONE: {PHONE_DISPLAY}</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>DISPATCH: ACTIVE</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
            <span>{statusLabel.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main Constructivist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN (6 COLS): Headline "Get in touch." + Dot Matrix
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-6"
              >
                <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                  COMMUNICATIONS & TELEMETRY REGISTRY
                </span>
              </motion.div>

              {/* Exact reference headline: "Get in touch." with kinetic cursor split */}
              <InteractiveSplitHeading />

              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
                className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 leading-relaxed max-w-md mb-8"
              >
                Drop by for slow single-origin sips, book a quiet study desk, or dispatch an instant inquiry to our Kota baristas.
              </motion.p>
            </div>

            {/* ── Dot Matrix Grid (Constructivist Gallery Palette) ── */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
              className="border-2 border-[#14100E] bg-[#FAF7F2] p-6 shadow-[4px_4px_0px_#14100E] max-w-md select-none"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#14100E]/20 text-[9px] font-grotesk font-black uppercase tracking-widest text-[#14100E]/70">
                <span>SIGNAL MATRIX // GRID 12x4</span>
                <span className="font-mono text-[#A8612E]">ACTIVE TELEMETRY</span>
              </div>

              <div className="grid grid-cols-12 gap-3 sm:gap-3.5 place-items-center">
                {Array.from({ length: 48 }).map((_, i) => {
                  const col = i % 12;
                  const row = Math.floor(i / 12);
                  const opacity = Math.max(0.18, 1 - (col * 0.05 + row * 0.12));
                  return (
                    <span
                      key={i}
                      style={{ opacity }}
                      className="w-1.5 h-1.5 rounded-full bg-[#14100E] transition-all duration-300 hover:scale-150 hover:bg-[#A8612E]"
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN (6 COLS): Framed Clean Contact Directory Specs
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6">
            <Scroll3DEmerge side="right" depth={60} pitchAngle={12}>
              <div className="border-2 border-[#14100E] bg-[#FAF7F2] p-6 sm:p-10 shadow-[6px_6px_0px_#14100E] divide-y-2 divide-[#14100E]/15">
            
            {/* Item 1: Address */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
              className="pb-6 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E] group-hover:bg-[#14100E] group-hover:text-[#FAF7F2] transition-colors">
                <MapPin className="w-5 h-5 text-[#A8612E] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-grotesk font-black text-xl text-[#14100E] uppercase tracking-tight">
                    Address
                  </h3>
                  <button
                    type="button"
                    onClick={() => onCopy(CAFE_ADDRESS, 'Address copied to clipboard', 'address')}
                    className="p-1 border border-[#14100E] bg-[#FAF7F2] text-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] shadow-[1px_1px_0px_#14100E] transition-colors"
                    aria-label="Copy Address"
                  >
                    {copiedKey === 'address' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#A8612E]" />
                    )}
                  </button>
                </div>
                <p className="font-grotesk font-bold text-xs uppercase text-[#A8612E] mb-1">
                  Talwandi, Kota
                </p>
                <p className="font-grotesk text-xs text-[#14100E]/80 leading-relaxed mb-2">
                  {CAFE_ADDRESS}
                </p>
                {MAPS_LINK && (
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-grotesk text-[11px] font-black uppercase tracking-wider text-[#A8612E] hover:text-[#14100E] border-b-2 border-[#A8612E] pb-0.5 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Item 2: Phone */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="py-6 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E] group-hover:bg-[#14100E] group-hover:text-[#FAF7F2] transition-colors">
                <Phone className="w-5 h-5 text-[#A8612E] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-grotesk font-black text-xl text-[#14100E] uppercase tracking-tight">
                    Phone
                  </h3>
                  <button
                    type="button"
                    onClick={() => onCopy(PHONE_RAW, 'Phone number copied to clipboard', 'phone')}
                    className="p-1 border border-[#14100E] bg-[#FAF7F2] text-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] shadow-[1px_1px_0px_#14100E] transition-colors"
                    aria-label="Copy Phone"
                  >
                    {copiedKey === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#A8612E]" />
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="font-mono font-bold text-base text-[#14100E] hover:text-[#A8612E] transition-colors tracking-tight inline-block mb-1"
                >
                  {PHONE_DISPLAY}
                </a>
                <p className="font-grotesk text-xs text-[#14100E]/70">
                  Direct line for table checks, takeout orders & quick queries.
                </p>
              </div>
            </motion.div>

            {/* Item 3: Mail */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
              className="py-6 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E] group-hover:bg-[#14100E] group-hover:text-[#FAF7F2] transition-colors">
                <Mail className="w-5 h-5 text-[#A8612E] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-grotesk font-black text-xl text-[#14100E] uppercase tracking-tight">
                    Mail
                  </h3>
                  <button
                    type="button"
                    onClick={() => onCopy(CAFE_EMAIL, 'Email address copied to clipboard', 'email')}
                    className="p-1 border border-[#14100E] bg-[#FAF7F2] text-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] shadow-[1px_1px_0px_#14100E] transition-colors"
                    aria-label="Copy Email"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#A8612E]" />
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${CAFE_EMAIL}`}
                  className="font-mono text-sm font-bold text-[#14100E] hover:text-[#A8612E] transition-colors inline-block mb-1"
                >
                  {CAFE_EMAIL}
                </a>
                <p className="font-grotesk text-xs text-[#14100E]/70">
                  Collaborations, brand sessions & community feedback.
                </p>
              </div>
            </motion.div>

            {/* Item 4: Follow Us (Exact circular social buttons) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
              className="pt-6 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E] group-hover:bg-[#14100E] group-hover:text-[#FAF7F2] transition-colors">
                <Share2 className="w-5 h-5 text-[#A8612E] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-grotesk font-black text-xl text-[#14100E] uppercase tracking-tight mb-3">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] text-[#14100E] shadow-[2px_2px_0px_#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] flex items-center justify-center transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <span className="font-grotesk font-black text-xs uppercase">ig</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] text-[#14100E] shadow-[2px_2px_0px_#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] flex items-center justify-center transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Direct Call */}
                  <a
                    href={`tel:${PHONE_RAW}`}
                    className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] text-[#14100E] shadow-[2px_2px_0px_#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] flex items-center justify-center transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                    title="Call"
                    aria-label="Call"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>

                  {/* Google Maps Coordinates */}
                  {MAPS_LINK && (
                    <a
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] text-[#14100E] shadow-[2px_2px_0px_#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] flex items-center justify-center transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                      title="Google Maps"
                      aria-label="Google Maps"
                    >
                      <Compass className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

              </div>
            </Scroll3DEmerge>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
