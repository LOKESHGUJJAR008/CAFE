import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../config';

/* ─────────────────────────────────────────────────────────────────────────────
   EVENTS — replace with the client's real events before going live.
   Each entry: id (string), title, day, time, description (one line).
   ───────────────────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 'silent-study',
    title: 'Silent Study Hours',
    day: 'Daily',
    time: '9:00 AM – 12:00 PM',
    description: 'A distraction-free morning block for focused reading, writing and revision.',
  },
  {
    id: 'open-mic',
    title: 'Open Mic Evenings',
    day: 'Friday',
    time: '7:00 PM',
    description: 'Share poetry, music or spoken word in our warm café setting — all welcome.',
  },
  {
    id: 'coffee-tasting',
    title: 'Coffee Tasting Saturdays',
    day: 'Saturday',
    time: '5:00 PM',
    description: 'Explore single-origin roasts and learn tasting notes with our baristas.',
  },
  {
    id: 'board-games',
    title: 'Board Games & Chai Break',
    day: 'Sunday',
    time: '4:00 PM',
    description: 'Classic board games, laughter and a hot cup of masala chai — the perfect Sunday.',
  },
];

/* ─── Luxury Editorial Event Card ─────────────────────────────────────── */
const EventCard = ({ event }) => {
  const waMsg = encodeURIComponent(
    `Hi TATVA Café, I'd like to know about ${event.title}.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <article
      className="snap-start flex-shrink-0 w-[85%] md:w-[380px]
                 bg-[#1F1612] border border-[#C9A012]/25 hover:border-[#C9A012]
                 p-6 sm:p-8 flex flex-col justify-between gap-6
                 transition-all duration-500 shadow-lg hover:shadow-[0_16px_36px_rgba(201,160,18,0.2)] group"
    >
      {/* Top: title + time chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-grotesk text-[9px] uppercase tracking-[0.25em] text-[#C9A012] font-semibold">
            {event.day} Series
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C9A012]/80 group-hover:bg-[#C9A012] transition-colors" />
        </div>

        <h3 className="font-cormorant font-semibold text-2xl sm:text-3xl text-[#FBF7F1] leading-snug mb-4 group-hover:text-[#F3E5D8] transition-colors">
          {event.title}
        </h3>

        {/* Day + Time chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#FBF7F1]/5 border border-[#FBF7F1]/15
                           text-[#FBF7F1]/80 text-[10px] font-grotesk uppercase tracking-wider px-3 py-1.5">
            <Clock className="w-3 h-3 text-[#C9A012] flex-shrink-0" strokeWidth={2} />
            {event.day}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FBF7F1]/5 border border-[#FBF7F1]/15
                           text-[#FBF7F1]/80 text-[10px] font-grotesk uppercase tracking-wider px-3 py-1.5">
            <Clock className="w-3 h-3 text-[#C9A012] flex-shrink-0" strokeWidth={2} />
            {event.time}
          </span>
        </div>

        <p className="text-[#FBF7F1]/70 text-xs sm:text-sm leading-relaxed font-grotesk">
          {event.description}
        </p>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2
                   w-full px-5 py-3
                   bg-[#C9A012] hover:bg-[#E5B815] text-[#1F1612]
                   font-grotesk text-[10px] font-bold uppercase tracking-[0.18em] transition-all
                   focus-visible:outline-none"
      >
        <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
        Ask on WhatsApp →
      </a>
    </article>
  );
};

/* ─── Section ─────────────────────────────────────────────────────────────── */
export const StudyHub = () => {
  const scrollRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="study-hub"
      className="bg-[#1F1612] py-20 md:py-24 overflow-hidden border-t border-[#FBF7F1]/10"
      aria-label="Study Hub and Events"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* ── Header row with desktop arrow buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="bd-eyebrow block mb-3">
              Happenings &amp; Community
            </span>
            <h2 className="font-cormorant font-semibold text-5xl sm:text-6xl text-[#FBF7F1] leading-[1] tracking-[-0.02em]">
              Study Hub &amp; Gatherings
            </h2>
            <p className="mt-3 text-[#FBF7F1]/70 text-xs sm:text-sm font-grotesk uppercase tracking-wider max-w-md">
              Distraction-free morning study blocks, tasting sessions &amp; weekend community hours.
            </p>
          </motion.div>

          {/* Arrow buttons — desktop only */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 pb-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll events left"
              className="w-10 h-10 rounded-full border border-foam/20 text-foam/70
                         hover:border-caramel hover:text-caramel
                         flex items-center justify-center transition-all
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll events right"
              className="w-10 h-10 rounded-full border border-foam/20 text-foam/70
                         hover:border-caramel hover:text-caramel
                         flex items-center justify-center transition-all
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Scrollable cards row ── */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory
                     scrollbar-none pb-3 px-1 -mx-1"
        >
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StudyHub;
