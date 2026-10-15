import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle, Mail, ExternalLink, CalendarCheck, Compass, Sparkles } from 'lucide-react';
import {
  WHATSAPP_URL, PHONE_DISPLAY, PHONE_RAW,
  CAFE_ADDRESS, CAFE_EMAIL, MAPS_LINK, INSTAGRAM, HOURS,
  GOOGLE_REVIEW_URL
} from '../config';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const ContactPage = () => {
  useDocumentMeta({
    title: 'Contact & Dispatch Dossier | TATVA Café Kota',
    description: 'Find TATVA Café in Talwandi, Kota. Service hours, location map, direct telephone line, and instant WhatsApp reservation dispatch.',
  });

  const { isOpen, label } = useOpenStatus();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14100E] overflow-x-hidden selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Top Running Archival Ticker (Flush with Navbar, Zero Dead Space) ── */}
      <div className="w-full border-b-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA DISPATCH ARCHIVE // DOSSIER NO. 05</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>LOCATION: TALWANDI, KOTA</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>PHONE: {PHONE_DISPLAY}</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>WHATSAPP DISPATCH: ACTIVE</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
            <span>{label.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* ── Main Masthead Banner ── */}
      <header className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-[#14100E] bg-[#FAF7F2]">
        <div className="w-full max-w-6xl">
          <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-4">
            <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
              VISITATION & COMMUNICATIONS REGISTRY
            </span>
          </div>
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92] text-[#14100E] mb-3">
            Find The Sanctuary.<br />
            <span className="font-cormorant italic font-semibold text-[#A8612E] lowercase text-4xl sm:text-6xl">
              in Talwandi, Kota.
            </span>
          </h1>
          <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/70 max-w-xl">
            Drop by for slow single-origin sips, book a quiet study table, or dispatch an instant inquiry via WhatsApp.
          </p>
        </div>
      </header>

      {/* ── Constructivist Grid: Contact Details & Interactive Dispatch ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2]">
        <div className="w-full border-2 border-[#14100E] bg-[#FAF7F2] shadow-[0_20px_50px_rgba(20,16,14,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#14100E]">
            
            {/* ══════════════════════════════════════════════════════════════
                LEFT COLUMN (7 COLS): Archival Directory Cards
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 p-6 sm:p-10 divide-y-2 divide-[#14100E]/20 bg-[#FAF7F2]">
              
              {/* Item 1: Physical Sanctuary Coordinates */}
              <div className="pb-8 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-black text-[#A8612E]">SPECIMEN // LOC-01</span>
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-wider bg-[#14100E] text-[#FAF7F2] px-2 py-0.5">
                    PHYSICAL VENUE
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E]">
                    <MapPin className="w-5 h-5 text-[#A8612E]" />
                  </div>
                  <div>
                    <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#14100E] mb-1">
                      Our Café Sanctuary
                    </h3>
                    <p className="font-grotesk text-xs sm:text-sm text-[#14100E]/80 leading-relaxed mb-3">
                      {CAFE_ADDRESS}
                    </p>
                    {MAPS_LINK && (
                      <a
                        href={MAPS_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-grotesk text-[11px] font-black uppercase tracking-wider text-[#A8612E] hover:text-[#14100E] border-b-2 border-[#A8612E] pb-0.5 transition-colors"
                      >
                        <span>Open In Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Item 2: Service Hours Ledger */}
              <div className="py-8 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-black text-[#A8612E]">SPECIMEN // HRS-02</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                    <span className="font-grotesk text-[9px] font-black uppercase tracking-wider text-[#14100E]">
                      {label}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E]">
                    <Clock className="w-5 h-5 text-[#A8612E]" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#14100E] mb-2">
                      Operating Hours
                    </h3>
                    <div className="border border-[#14100E]/20 bg-[#14100E]/5 p-3 space-y-2 font-grotesk text-xs">
                      {HOURS.map(({ days, hours }) => (
                        <div key={days} className="flex justify-between items-center border-b border-[#14100E]/10 pb-1 last:border-none last:pb-0">
                          <span className="font-bold uppercase text-[#14100E]">{days}</span>
                          <span className="font-mono font-bold text-[#A8612E]">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3: Direct Telephone Line */}
              <div className="py-8 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-black text-[#A8612E]">SPECIMEN // TEL-03</span>
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-wider border border-[#14100E] px-2 py-0.5">
                    VOICE & INQUIRIES
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E]">
                    <Phone className="w-5 h-5 text-[#A8612E]" />
                  </div>
                  <div>
                    <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#14100E] mb-1">
                      Direct Telephone Line
                    </h3>
                    <p className="font-grotesk text-xs text-[#14100E]/70 mb-2">
                      For orders, lost & found, and immediate table inquiries.
                    </p>
                    <a
                      href={`tel:${PHONE_RAW}`}
                      className="font-grotesk font-black text-lg text-[#14100E] hover:text-[#A8612E] transition-colors tracking-tight"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 4: Digital Lounge & Email Registry */}
              <div className="pt-8 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-black text-[#A8612E]">SPECIMEN // NET-04</span>
                  <span className="font-grotesk text-[9px] font-black uppercase tracking-wider bg-[#14100E] text-[#FAF7F2] px-2 py-0.5">
                    DIGITAL
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-[#14100E] bg-[#FAF7F2] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#14100E]">
                    <Mail className="w-5 h-5 text-[#A8612E]" />
                  </div>
                  <div className="space-y-2 font-grotesk text-xs">
                    <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#14100E] mb-1">
                      Digital Lounge & Social
                    </h3>
                    <div>
                      <a href={`mailto:${CAFE_EMAIL}`} className="text-[#14100E] hover:text-[#A8612E] transition-colors flex items-center gap-2 font-bold">
                        <Mail className="w-3.5 h-3.5" /> {CAFE_EMAIL}
                      </a>
                    </div>
                    <div>
                      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-[#14100E] hover:text-[#A8612E] transition-colors flex items-center gap-2 font-bold">
                        <ExternalLink className="w-3.5 h-3.5" /> @royalbeancafe (Instagram)
                      </a>
                    </div>
                    {GOOGLE_REVIEW_URL && (
                      <div className="pt-2">
                        <a
                          href={GOOGLE_REVIEW_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#A8612E] hover:text-[#14100E] font-black uppercase tracking-wider text-[11px]"
                        >
                          <span>★ Rate TATVA on Google Reviews</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT COLUMN (5 COLS): Framed Map Plate + WhatsApp CTA Box
                ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF7F2]">
              
              {/* Map Plate */}
              <div className="mb-8">
                <div className="border-2 border-[#14100E] bg-[#FAF7F2] p-2 shadow-[4px_4px_0px_#14100E]">
                  <div className="border border-[#14100E]/20 aspect-[4/3] overflow-hidden relative">
                    <iframe
                      title="TATVA Café location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.123!2d75.8362!3d25.1388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA4JzE5LjciTiA3NcKwNTAnMTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 240 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#14100E]/20 flex items-center justify-between font-grotesk text-[9px] font-bold uppercase tracking-wider text-[#14100E]/70">
                    <span>GPS: 25.1388° N, 75.8362° E</span>
                    <span className="text-[#A8612E]">TALWANDI • KOTA</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Dispatch Card */}
              <div className="border-2 border-[#14100E] bg-[#14100E] text-[#FAF7F2] p-6 sm:p-8 shadow-[6px_6px_0px_#A8612E]">
                <div className="inline-block bg-[#14100E] border border-[#C9A012] px-2.5 py-0.5 mb-4">
                  <span className="font-grotesk text-[8px] font-black uppercase tracking-[0.2em] text-[#C9A012]">
                    INSTANT TELEMETRY DISPATCH
                  </span>
                </div>
                <h3 className="font-grotesk font-black text-2xl uppercase tracking-tight text-[#FAF7F2] mb-2">
                  Order or Inquire
                </h3>
                <p className="font-grotesk text-xs text-[#FAF7F2]/75 leading-relaxed mb-6">
                  Fastest way to connect with our baristas. Inquiries, table questions, and takeaway orders are typically confirmed within 3 minutes.
                </p>

                <div className="space-y-3 font-grotesk">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-[#C9A012] hover:bg-[#E5B815] text-[#14100E] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-[3px_3px_0px_#FAF7F2] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#FAF7F2] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Dispatch on WhatsApp</span>
                  </a>

                  <a
                    href="/reserve"
                    className="w-full py-3.5 border-2 border-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#14100E] text-[#FAF7F2] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Reserve A Table</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
