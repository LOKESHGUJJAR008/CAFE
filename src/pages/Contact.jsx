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
            Find Royal Bean<br />
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
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Left: Info Cards */}
        <div className="flex flex-col gap-6">
          {/* Address */}
          <Reveal>
            <div className="bg-almond rounded-2xl p-7 sm:p-8 shadow-warm-sm flex gap-5 items-start">
              <div className="w-11 h-11 rounded-full bg-caramel/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-caramel" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg text-ink mb-1">Address</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{CAFE_ADDRESS}</p>
                {MAPS_LINK && (
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-xs font-semibold text-caramel hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={0.07}>
            <div className="bg-almond rounded-2xl p-7 sm:p-8 shadow-warm-sm flex gap-5 items-start">
              <div className="w-11 h-11 rounded-full bg-caramel/15 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-caramel" />
              </div>
              <div className="w-full">
                <h3 className="font-playfair font-bold text-lg text-ink mb-3">Opening Hours</h3>
                <ul className="space-y-1.5 mb-4">
                  {HOURS.map(({ days, hours }) => (
                    <li key={days} className="flex justify-between text-sm text-ink/75">
                      <span className="font-medium">{days}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
                {/* Open/Closed live badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foam border border-latte/30">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOpen ? 'bg-green-600' : 'bg-caramel'}`} aria-hidden="true" />
                  <span className="text-xs font-semibold text-ink font-inter">{label}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Phone */}
          <Reveal delay={0.14}>
            <div className="bg-almond rounded-2xl p-7 sm:p-8 shadow-warm-sm flex gap-5 items-start">
              <div className="w-11 h-11 rounded-full bg-caramel/15 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-caramel" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg text-ink mb-1">Phone</h3>
                <a href={`tel:${PHONE_RAW}`} className="text-ink/70 text-sm hover:text-caramel transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Social / Email */}
          <Reveal delay={0.2}>
            <div className="bg-almond rounded-2xl p-7 sm:p-8 shadow-warm-sm flex gap-5 items-start">
              <div className="w-11 h-11 rounded-full bg-caramel/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-caramel" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-playfair font-bold text-lg text-ink">Connect</h3>
                <a href={`mailto:${CAFE_EMAIL}`} className="text-ink/70 text-sm hover:text-caramel transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {CAFE_EMAIL}
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-ink/70 text-sm hover:text-caramel transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> @royalbeancafe (Instagram)
                </a>
                {GOOGLE_REVIEW_URL && (
                  <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="text-ink/70 text-sm hover:text-caramel transition-colors flex items-center gap-2 mt-1">
                    <span className="text-caramel">★</span> Rate us on Google
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Map embed + WhatsApp CTA */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            {/* Map placeholder — replace the src with your actual embed URL */}
            <div className="rounded-2xl overflow-hidden shadow-warm-sm bg-almond border border-latte/30 aspect-[4/3] flex items-center justify-center">
              <iframe
                title="Royal Bean Café location"
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
            <div className="bg-ink rounded-2xl p-8 text-center shadow-warm-lg">
              <h3 className="font-playfair font-bold text-xl text-foam mb-2">Order or Reserve</h3>
              <p className="text-almond/70 text-sm mb-6">Fastest way to reach us is WhatsApp — we usually reply in minutes.</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-full bg-caramel hover:bg-caramel/90 text-foam font-bold text-sm
                           flex items-center justify-center gap-2
                           shadow-[0_4px_14px_rgba(168,97,46,0.4)]
                           transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
              <a
                href="/reserve"
                className="w-full py-4 rounded-full border border-foam/40 hover:bg-foam/10 text-foam font-bold text-sm
                           flex items-center justify-center gap-2 transition-all mt-1"
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
