import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { GOOGLE_REVIEW_URL, DEMO_MODE, VERIFIED_STATS } from '../../config';

const REVIEWS = [
  {
    id: 1,
    name: 'Anika Sharma',
    role: 'Medical Aspirant & Daily Patron',
    rating: 5,
    tag: 'Royal Cappuccino',
    quote: 'The Royal Cappuccino is absolutely divine — the microfoam layers are perfection every single morning. The atmosphere feels like a warm sanctuary after grueling coaching hours.',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Tech Lead & Weekend Regular',
    rating: 5,
    tag: 'Signature Nitro Cold Brew',
    quote: 'Best cold brew in Kota, bar none. The caramel cold foam is on another level. High-speed Wi-Fi, quiet corners, and unmatched single-origin consistency.',
  },
  {
    id: 3,
    name: 'Priya Joshi',
    role: 'Architecture Student',
    rating: 5,
    tag: 'Hazelnut Latte & Bakes',
    quote: 'Stunning minimalist brutalist interior with natural limestone and oak wood. The Hazelnut Latte with fresh pain au chocolat is an unmatched morning ritual.',
  },
  {
    id: 4,
    name: 'Karan Mehta',
    role: 'JEE Scholar · Kota Alum',
    rating: 5,
    tag: 'Espresso Classico',
    quote: 'Discovered TATVA during intensive prep and it became my second home. Acoustic quiet, power outlets at every seat, and baristas who genuinely care about craft.',
  },
];

export const Reviews = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="reviews"
      className="w-full bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2] overflow-hidden"
      aria-label="Patron Testimonials"
    >
      {/* ── Top Running Archival Ticker ── */}
      <div className="border-b-2 border-[#14100E] py-2.5 px-6 overflow-hidden bg-[#FAF7F2] select-none">
        <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#14100E]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#A8612E]">
                COMMUNITY DOSSIER · VOL. 04
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-cormorant italic text-base font-medium text-[#14100E]">
                What Our <span className="font-semibold not-italic">Guests Say</span>
              </span>
              <span className="w-8 h-[1px] bg-[#14100E]/40" />
              <span className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-[#14100E]/80">
                4.9 ★ Verified Google Reviews (650+)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section Header (Full Width Edge-to-Edge) ── */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-8 border-b-2 border-[#14100E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="inline-block bg-[#14100E] text-[#FAF7F2] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-2 shadow-sm">
            VERIFIED PATRON REVIEWS
          </span>
          <h2 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#14100E]">
            Voices of the Sanctuary
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 font-grotesk text-xs uppercase tracking-wider text-[#14100E]/70 font-semibold">
            <div className="flex gap-1 text-[#A8612E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.9 · 650+ REVIEWS</span>
          </div>
          {GOOGLE_REVIEW_URL && (
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#14100E] font-grotesk text-[11px] font-bold uppercase tracking-[0.18em] text-[#14100E] hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
            >
              <span>RATE ON GOOGLE ★</span>
            </a>
          )}
        </div>
      </div>

      {/* ── 4-Column Full-Width Edge-to-Edge Review Grid with Opposite Color Hover ── */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-[#14100E] border-b-2 border-[#14100E]">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-8 sm:p-10 flex flex-col justify-between bg-[#FAF7F2] hover:bg-[#14100E] transition-all duration-300 group cursor-default select-none min-h-[340px]"
          >
            <div>
              {/* Stars & Tag */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex gap-1 text-[#A8612E] group-hover:text-[#C9A27E] transition-colors">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-grotesk text-[9px] font-bold tracking-[0.2em] uppercase text-[#14100E]/50 group-hover:text-[#FAF7F2]/50 border border-[#14100E]/15 group-hover:border-[#FAF7F2]/20 px-2 py-0.5 transition-colors">
                  {rev.tag}
                </span>
              </div>

              {/* Quote */}
              <p className="font-cormorant italic text-lg sm:text-xl text-[#14100E] group-hover:text-[#FAF7F2] leading-snug transition-colors duration-300">
                “{rev.quote}”
              </p>
            </div>

            {/* Author Stamp */}
            <div className="pt-6 border-t border-[#14100E]/15 group-hover:border-[#FAF7F2]/20 flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 border border-[#14100E] group-hover:border-[#FAF7F2] font-grotesk font-black flex items-center justify-center text-xs text-[#14100E] group-hover:text-[#FAF7F2] bg-[#FAF7F2] group-hover:bg-[#14100E] transition-colors">
                {rev.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <span className="font-grotesk font-bold text-xs uppercase tracking-wider text-[#14100E] group-hover:text-[#FAF7F2] block transition-colors">
                  {rev.name}
                </span>
                <span className="font-grotesk text-[10px] text-[#14100E]/50 group-hover:text-[#FAF7F2]/50 tracking-wide block transition-colors">
                  {rev.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
