import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle, Mail, ExternalLink, CalendarCheck } from 'lucide-react';
import {
  WHATSAPP_URL, PHONE_DISPLAY, PHONE_RAW,
  CAFE_ADDRESS, CAFE_EMAIL, MAPS_LINK, INSTAGRAM, HOURS,
  GOOGLE_REVIEW_URL
} from '../config';
import { useOpenStatus } from '../hooks/useOpenStatus';

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.48, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

const ContactPage = () => {
  const { isOpen, label } = useOpenStatus();
  return (
  <div className="bg-foam text-ink min-h-screen">
    {/* ── Hero Banner ── */}
    <section className="bg-ink text-foam py-24 px-6 sm:px-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,97,46,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-caramel bg-caramel/10 border border-caramel/25 px-4 py-1.5 rounded-full mb-6">
            Visit Us
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-foam leading-tight mb-4">
            Find TATVA<br />
            <span className="text-caramel italic font-normal">in Kota</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-almond/75 text-base sm:text-lg">
            Drop by, call us or send a WhatsApp — we'd love to see you.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ── Details + Map ── */}
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FBF7F1]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left: Info Cards */}
        <div className="flex flex-col gap-6">
          {/* Address */}
          <Reveal>
            <div className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-7 sm:p-8 shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.15)] hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start">
              <div className="w-11 h-11 bg-[#1F1612] text-[#C9A012] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-grotesk text-[9px] uppercase tracking-[0.25em] text-[#C9A27E] font-semibold block mb-1">
                  Location
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] mb-1">Our Café Sanctuary</h3>
                <p className="font-grotesk text-xs sm:text-sm text-[#1F1612]/75 leading-relaxed">{CAFE_ADDRESS}</p>
                {MAPS_LINK && (
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 font-grotesk text-xs uppercase tracking-wider font-semibold text-[#A8612E] hover:text-[#1F1612] border-b border-[#A8612E] pb-0.5"
                  >
                    Open in Google Maps →
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={0.07}>
            <div className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-7 sm:p-8 shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.15)] hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start">
              <div className="w-11 h-11 bg-[#1F1612] text-[#C9A012] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-full">
                <span className="font-grotesk text-[9px] uppercase tracking-[0.25em] text-[#C9A27E] font-semibold block mb-1">
                  Daily Rituals
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] mb-3">Service Hours</h3>
                <ul className="space-y-2 mb-4 font-grotesk text-xs text-[#1F1612]/75">
                  {HOURS.map(({ days, hours }) => (
                    <li key={days} className="flex justify-between border-b border-[#1F1612]/5 pb-1">
                      <span className="font-semibold text-[#1F1612]">{days}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
                {/* Open/Closed live badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FBF7F1] border border-[#1F1612]/15">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOpen ? 'bg-[#2E7D32]' : 'bg-[#C9A012]'}`} aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F1612] font-grotesk">{label}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Phone */}
          <Reveal delay={0.14}>
            <div className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-7 sm:p-8 shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.15)] hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start">
              <div className="w-11 h-11 bg-[#1F1612] text-[#C9A012] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-grotesk text-[9px] uppercase tracking-[0.25em] text-[#C9A27E] font-semibold block mb-1">
                  Direct Line
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] mb-1">Phone &amp; Orders</h3>
                <a href={`tel:${PHONE_RAW}`} className="font-grotesk text-sm font-semibold text-[#1F1612] hover:text-[#A8612E] transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Social / Email */}
          <Reveal delay={0.2}>
            <div className="bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] p-7 sm:p-8 shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.15)] hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start">
              <div className="w-11 h-11 bg-[#1F1612] text-[#C9A012] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2 font-grotesk text-xs">
                <span className="font-grotesk text-[9px] uppercase tracking-[0.25em] text-[#C9A27E] font-semibold block mb-1">
                  Digital Lounge
                </span>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] mb-1">Connect with Us</h3>
                <a href={`mailto:${CAFE_EMAIL}`} className="text-[#1F1612]/75 hover:text-[#A8612E] transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {CAFE_EMAIL}
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-[#1F1612]/75 hover:text-[#A8612E] transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> @royalbeancafe (Instagram)
                </a>
                {GOOGLE_REVIEW_URL && (
                  <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="text-[#A8612E] hover:text-[#1F1612] transition-colors flex items-center gap-2 mt-1 font-semibold uppercase tracking-wider">
                    <span>★</span> Rate us on Google Reviews
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Map embed + WhatsApp CTA */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="overflow-hidden shadow-sm bg-[#FFFFFF] border border-[#1F1612]/15 aspect-[4/3] flex items-center justify-center">
              <iframe
                title="TATVA Café location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.123!2d75.8362!3d25.1388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA4JzE5LjciTiA3NcKwNTAnMTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="bg-[#1F1612] border border-[#C9A012]/30 p-8 sm:p-10 text-center shadow-xl">
              <span className="bd-eyebrow block mb-2">Instant Dispatch</span>
              <h3 className="font-cormorant font-semibold text-3xl sm:text-4xl text-[#FBF7F1] mb-2">Order or Reserve</h3>
              <p className="font-grotesk text-xs text-[#FBF7F1]/70 uppercase tracking-wider mb-6">
                Fastest way to reach us is WhatsApp — we usually reply within minutes.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#C9A012] hover:bg-[#E5B815] text-[#1F1612] font-grotesk font-bold text-xs uppercase tracking-[0.2em]
                           flex items-center justify-center gap-2 transition-all mb-3"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp →
              </a>
              <a
                href="/reserve"
                className="w-full py-4 border border-[#FBF7F1]/30 hover:border-[#FBF7F1] text-[#FBF7F1] font-grotesk font-bold text-xs uppercase tracking-[0.2em]
                           flex items-center justify-center gap-2 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                Book a Table
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ContactPage;
