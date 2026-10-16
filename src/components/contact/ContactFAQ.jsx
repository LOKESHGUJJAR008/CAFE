import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scroll3DEmerge from './Scroll3DEmerge';

const EASE = [0.22, 1, 0.36, 1];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Are quiet study sessions permitted, and is high-speed Wi-Fi provided?',
    answer: (
      <>
        Yes. We offer dedicated study nooks equipped with universal power sockets and high-speed fiber Wi-Fi (200 Mbps). Our daily <strong className="text-[#14100E]">Silent Study Hours</strong> run every morning from 9:00 AM to 12:00 PM, creating a serene, distraction-free environment for exam preparation and focused deep work.
      </>
    ),
  },
  {
    id: 'faq-2',
    question: 'Do I need a reservation beforehand, or can I simply walk in?',
    answer: (
      <>
        Walk-ins are always welcomed warmly for pour-overs, espresso, and casual seating. If you are visiting during peak evening hours or bringing a party of 4 or more, we recommend booking via our <Link to="/reserve" className="text-[#A8612E] font-bold underline hover:text-[#14100E] transition-colors">Table Reservation Portal</Link> or WhatsApp dispatch to ensure seamless seating.
      </>
    ),
  },
  {
    id: 'faq-3',
    question: 'What dietary and dairy-free alternatives are available?',
    answer: (
      <>
        Every item in our menu includes transparent dietary labeling (100% Vegetarian, Egg-based, or Non-vegetarian). For all hot coffees and iced brews, we provide creamy oat milk and almond milk substitutions upon request.
      </>
    ),
  },
  {
    id: 'faq-4',
    question: 'Where can guests park their vehicles in Talwandi?',
    answer: (
      <>
        We provide free dedicated storefront parking for two-wheelers right at our entry steps. For four-wheelers and cars, there are ample calm curbside parking bays along the quiet Talwandi avenue directly outside the café.
      </>
    ),
  },
  {
    id: 'faq-5',
    question: 'Can we organize private book clubs, poetry readings, or team meetups?',
    answer: (
      <>
        Yes. Our contemporary lounge accommodates intimate gatherings, book clubs, and creative workshops during off-peak hours. Select the <strong className="text-[#14100E]">"Group / Workshop"</strong> preset in our dispatch form above or chat directly on WhatsApp with your date and headcount.
      </>
    ),
  },
  {
    id: 'faq-6',
    question: 'Are takeaway orders and scheduled pre-orders supported?',
    answer: (
      <>
        Yes! You can assemble your order using our interactive digital menu and cart drawer, choose <strong className="text-[#14100E]">Takeaway</strong> with your preferred pickup time, and dispatch it to WhatsApp so your single-origin brew is freshly extracted when you arrive.
      </>
    ),
  },
];

export const ContactFAQ = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq-accordion" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Ground Rift Line ── */}
      <div className="w-full max-w-5xl mx-auto mb-10 flex items-center justify-between border-b-2 border-dashed border-[#14100E]/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A8612E] rotate-45 animate-pulse" />
          <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.28em] text-[#A8612E]">
            TECTONIC SECTOR // FAQ CONCIERGE RISE
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] text-[#14100E]/60 uppercase tracking-widest">
          <span>STEPPED 3D ELEVATION</span>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3">
            <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
              CONCIERGE INQUIRY REPOSITORY
            </span>
          </div>
          <h2 className="font-grotesk font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#14100E] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 leading-relaxed">
            Everything you need to know regarding seating, study hours, parking, and reservations before dropping in.
          </p>
        </div>

        {/* 3D Emergent Accordion Stack */}
        <Scroll3DEmerge side="center" depth={70} pitchAngle={14}>
          <div className="border-2 border-[#14100E] bg-[#FAF7F2] divide-y-2 divide-[#14100E] shadow-[6px_6px_0px_#14100E]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              const contentId = `faq-content-${item.id}`;
              const headerId = `faq-header-${item.id}`;

              return (
                <div key={item.id} className="transition-colors hover:bg-[#EADBC8]/20">
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggle(item.id)}
                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left font-grotesk transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-black text-[#A8612E]">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#14100E] uppercase tracking-tight">
                        {item.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 border-2 border-[#14100E] flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#14100E] text-[#FAF7F2]' : 'bg-[#FAF7F2] text-[#14100E]'
                    }`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#A8612E]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 pt-1 border-t-2 border-[#14100E]/15 font-inter text-xs sm:text-sm text-[#14100E]/80 leading-relaxed max-w-3xl">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Scroll3DEmerge>

        {/* Small Bottom Tip */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center font-grotesk text-xs text-[#14100E]/60 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#A8612E]" />
          <span>Have a question not listed here? Dispatch a note on WhatsApp anytime.</span>
        </div>

      </div>
    </section>
  );
};

export default ContactFAQ;
