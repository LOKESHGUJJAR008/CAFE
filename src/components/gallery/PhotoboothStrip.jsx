import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Camera } from 'lucide-react';
import slowMornings01 from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import coffeeConversations01 from '../../assets/images/gallery/coffee-conversations/01-barista-pouring.png';
import sweetCravings01 from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import lateNight01 from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import MagneticButton from './MagneticButton';
import KineticHeadline from './KineticHeadline';

const EASE = [0.22, 1, 0.36, 1];

const PHOTO_FRAMES = [
  {
    src: slowMornings01,
    alt: 'Tulip latte art and warm croissant on marble table in morning sunlight',
    caption: '01 · Morning Bloom',
  },
  {
    src: coffeeConversations01,
    alt: 'Barista carefully pouring artisanal brew',
    caption: '02 · Craft & Pour',
  },
  {
    src: sweetCravings01,
    alt: 'Handcrafted patisserie paired with rich espresso',
    caption: '03 · Sweet Pause',
  },
  {
    src: lateNight01,
    alt: 'Steaming cup of coffee beside open book in warm ambient lamp light',
    caption: '04 · Night Stillness',
  },
];

/**
 * PhotoboothStrip — Vertical 4-frame photobooth strip with soft flash reveals,
 * cream paper background, gentle hover/tap wiggle, and responsive layout.
 */
export const PhotoboothStrip = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isWiggled, setIsWiggled] = useState(false);

  const handleStripTap = () => {
    if (prefersReducedMotion) return;
    setIsWiggled(true);
    setTimeout(() => setIsWiggled(false), 750);
  };

  return (
    <section
      aria-label="Photobooth memory strip"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-12 bg-transparent text-[var(--gallery-text)] overflow-hidden transition-colors duration-700"
    >
      {/* Background ambient warmth glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[540px] h-[540px] rounded-full pointer-events-none -z-10 blur-3xl opacity-35"
        style={{
          background:
            'radial-gradient(circle at center, var(--gallery-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-24">
          {/* Photobooth Strip (Placed on top on mobile, on the left on desktop) */}
          <div className="relative shrink-0 flex items-center justify-center">
            {/* Soft decorative shadow backdrop */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-40 blur-xl pointer-events-none -z-10"
              style={{ backgroundColor: 'var(--gallery-glow)' }}
              aria-hidden="true"
            />

            <motion.div
              onClick={handleStripTap}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      rotate: [-2.5, 0.8, -4.2, -1.2, -2.5],
                      transition: { duration: 0.65, ease: 'easeInOut' },
                    }
              }
              animate={
                isWiggled && !prefersReducedMotion
                  ? {
                      rotate: [-2.5, 1.8, -5.2, -1, -2.5],
                      transition: { duration: 0.75, ease: 'easeInOut' },
                    }
                  : { rotate: -2.5 }
              }
              data-cursor="view"
              tabIndex={0}
              role="region"
              aria-label="Interactive 4-frame photobooth strip. Hover or tap to wiggle."
              className="relative w-[230px] sm:w-[260px] bg-[#FBF7F1] text-[#1F1612] rounded-2xl p-3.5 sm:p-4 border border-[#C9A27E]/40 shadow-[0_20px_50px_rgba(31,22,18,0.18),0_6px_18px_rgba(31,22,18,0.08)] select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] will-change-transform"
            >
              {/* Photobooth top hanging hole cutout */}
              <div
                className="w-3.5 h-3.5 rounded-full mx-auto mb-3 border border-[#C9A27E]/50 shadow-inner"
                style={{ backgroundColor: 'var(--gallery-bg)' }}
                aria-hidden="true"
              />

              {/* 4 Photo Frames */}
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {PHOTO_FRAMES.map((frame, index) => {
                  const frameDelay = 0.15 + index * 0.3;
                  return (
                    <motion.div
                      key={index}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.94 }
                      }
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.3 : 0.5,
                        delay: prefersReducedMotion ? 0 : frameDelay,
                        ease: EASE,
                      }}
                      className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#EADBC8]/40 border border-[#C9A27E]/30"
                    >
                      <img
                        src={frame.src}
                        alt={frame.alt}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover"
                      />

                      {/* Warm photobooth film tint */}
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(168,97,46,0.1) 0%, rgba(31,22,18,0.3) 100%)',
                        }}
                        aria-hidden="true"
                      />

                      {/* Soft Flash Effect (Low intensity soft white overlay, once per frame) */}
                      {!prefersReducedMotion && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: [0, 0.45, 0] }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{
                            duration: 0.28,
                            delay: frameDelay + 0.05,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 bg-[#FBF7F1] pointer-events-none z-10"
                          aria-hidden="true"
                        />
                      )}

                      {/* Frame index marker */}
                      <span className="absolute bottom-1.5 right-1.5 font-mono text-[9px] text-[#FBF7F1] font-semibold bg-[#1F1612]/60 px-1.5 py-0.5 rounded-xs pointer-events-none select-none">
                        0{index + 1}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Strip Label & Date */}
              <div className="mt-4 pt-3 border-t border-[#C9A27E]/30 text-center">
                <p className="font-playfair font-bold text-[11px] sm:text-xs tracking-[0.22em] text-[#1F1612] uppercase mb-1">
                  TATVA CAFÉ · 4 moments
                </p>
                <p
                  className="font-caveat text-sm sm:text-base text-[#A8612E] font-semibold tracking-wide"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  today &amp; always ✦ 12 · 10 · 26
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Text, handwritten line, and CTA) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 transition-colors duration-500"
              style={{
                backgroundColor: 'var(--gallery-panel)',
                borderColor: 'var(--gallery-border)',
              }}
            >
              <Camera className="w-3.5 h-3.5" style={{ color: 'var(--gallery-accent)' }} />
              <span
                className="font-inter text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: 'var(--gallery-accent)' }}
              >
                PHOTOBOOTH STRIP
              </span>
            </div>

            {/* Kinetic Headline */}
            <KineticHeadline
              as="h2"
              text="Four Moments. One Feeling."
              delay={0.1}
              className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 transition-colors duration-500"
              style={{ color: 'var(--gallery-text)' }}
            />

            {/* Handwritten line: "come make some memories" */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="font-caveat text-3xl sm:text-4xl lg:text-5xl text-[#A8612E] font-semibold mb-4 leading-tight -rotate-1 select-none"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              come make some memories ✦
            </motion.p>

            {/* Description */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
              className="font-inter text-sm sm:text-base leading-relaxed mb-8 max-w-md transition-colors duration-500"
              style={{ color: 'var(--gallery-subtext)' }}
            >
              Every table has a story, and every cup captures a stillness. Take a strip of memories with you when you visit our sanctuary in Talwandi.
            </motion.p>

            {/* CTA Button: Visit Our Café */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
            >
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#A8612E] hover:bg-[#A8612E]/90 text-[#FBF7F1] font-inter font-semibold text-sm sm:text-base tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F1]"
                >
                  <MapPin className="w-4 h-4 text-[#EADBC8]" />
                  <span>Visit Our Café</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoboothStrip;
