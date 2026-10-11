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

/* ─── Card ─────────────────────────────────────────────────────────────────── */
const EventCard = ({ event }) => {
  const waMsg = encodeURIComponent(
    `Hi Royal Bean Café, I'd like to know about ${event.title}.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <article
      className="snap-start flex-shrink-0 w-[85%] md:w-[380px]
                 rounded-3xl bg-gradient-to-br from-ink via-ink to-caramel/80
                 border border-white/10 p-6 flex flex-col justify-between gap-5
                 shadow-warm-lg"
    >
      {/* Top: title + time chips */}
      <div>
        <h3 className="font-playfair font-bold text-xl sm:text-2xl text-foam leading-snug mb-4">
          {event.title}
        </h3>

        {/* Day + Time chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-foam/10 border border-foam/15
                           text-foam/80 text-xs font-semibold px-3 py-1.5 rounded-full font-inter">
            <Clock className="w-3 h-3 text-caramel flex-shrink-0" strokeWidth={2} />
            {event.day}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-foam/10 border border-foam/15
                           text-foam/80 text-xs font-semibold px-3 py-1.5 rounded-full font-inter">
            <Clock className="w-3 h-3 text-caramel flex-shrink-0" strokeWidth={2} />
            {event.time}
          </span>
        </div>

        <p className="text-foam/70 text-sm leading-relaxed font-inter">
          {event.description}
        </p>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2
                   w-full px-5 py-3 rounded-full
                   bg-caramel hover:bg-caramel/80 text-ink
                   text-xs font-bold tracking-wide transition-all shadow-warm
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foam"
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2} />
        Ask on WhatsApp
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
      className="bg-ink py-16 md:py-24 overflow-hidden"
      aria-label="Study Hub and Events"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* ── Header row with desktop arrow buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-3 font-inter">
              Happenings
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foam tracking-tight">
              Study Hub &amp; Events
            </h2>
            <p className="mt-3 text-foam/70 text-sm sm:text-base max-w-md font-inter">
              Quiet study hours every morning, and weekend meetups that bring the Royal Bean community together.
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
