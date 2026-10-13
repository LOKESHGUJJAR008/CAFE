import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { heroImage } from '../../data/moods';
import slowMornings02 from '../../assets/images/gallery/slow-mornings/02-sunlit-wooden-table.png';
import KineticHeadline from './KineticHeadline';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1];

export const GalleryHero = () => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToMoods = (e) => {
    e.preventDefault();
    const target = document.getElementById('moods');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const fadeInUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const photoReveal = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay: 0.2 },
  };

  return (
    <section className="relative bg-transparent text-[var(--gallery-text)] pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden transition-colors duration-700">
      {/* Background soft ambient warmth using palette tokens */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full pointer-events-none -z-10 blur-3xl opacity-50 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at center, var(--gallery-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Action */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow */}
            <motion.div
              {...fadeInUp(0.05)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 transition-colors duration-500"
              style={{
                backgroundColor: 'var(--gallery-panel)',
                borderColor: 'var(--gallery-border)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--gallery-accent)' }} />
              <span
                className="font-inter text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase"
                style={{ color: 'var(--gallery-accent)' }}
              >
                A LITTLE MOMENT OF YOU
              </span>
            </motion.div>

            {/* Headline */}
            <KineticHeadline
              as="h1"
              text="Every Mood Has Its Coffee."
              delay={0.12}
              className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight mb-6 transition-colors duration-500"
              style={{ color: 'var(--gallery-text)' }}
            />

            {/* Subtitle Text */}
            <motion.p
              {...fadeInUp(0.24)}
              className="font-inter text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-9 font-normal transition-colors duration-500"
              style={{ color: 'var(--gallery-subtext)' }}
            >
              Find the moments, flavours, and little rituals that feel like you.
            </motion.p>

            {/* CTA + Scroll indicator */}
            <motion.div
              {...fadeInUp(0.32)}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 w-full sm:w-auto"
            >
              <MagneticButton>
                <a
                  href="#moods"
                  onClick={handleScrollToMoods}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#A8612E] hover:bg-[#A8612E]/90 text-[#FBF7F1] font-inter font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(168,97,46,0.28)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F1]"
                >
                  <span>Explore Your Mood</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </MagneticButton>

              {/* Subtle Scroll Indicator */}
              <a
                href="#moods"
                onClick={handleScrollToMoods}
                className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] rounded-md px-1 py-1"
                style={{ color: 'var(--gallery-subtext)' }}
                aria-label="Scroll down to mood selection"
              >
                <span
                  className="w-6 h-10 rounded-full border flex items-start justify-center p-1.5 transition-colors group-hover:border-[#A8612E]"
                  style={{ borderColor: 'var(--gallery-border)' }}
                >
                  <motion.span
                    animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [0.9, 0.3, 0.9] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--gallery-accent)' }}
                  />
                </span>
                <span className="font-inter font-medium text-[11px]">Scroll down</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Layered Photography & Steam */}
          <motion.div
            {...photoReveal}
            className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Composition Wrapper */}
            <div className="relative w-full max-w-[460px] sm:max-w-[500px]">
              {/* Back subtle glow backdrop */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(201, 162, 126, 0.35) 0%, rgba(168, 97, 46, 0.25) 100%)' }}
                aria-hidden="true"
              />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C9A27E]/30 bg-[#EADBC8] shadow-[0_24px_60px_rgba(31,22,18,0.14)] aspect-[4/5] sm:aspect-[4/5]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  style={{ objectPosition: heroImage.objectPosition || 'center' }}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle shared warm tone overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 97, 46, 0.14) 0%, rgba(201, 162, 126, 0.08) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Warm foam-to-coffee gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(251, 247, 241, 0.08) 0%, rgba(201, 162, 126, 0.15) 50%, rgba(31, 22, 18, 0.45) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Subtle grain texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-overlay"
                  style={{
                    backgroundImage: 'radial-gradient(#1F1612 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                  }}
                  aria-hidden="true"
                />

                {/* Lightweight CSS Steam Animation rising from the cup */}
                {!prefersReducedMotion && (
                  <div
                    className="absolute bottom-[44%] right-[22%] pointer-events-none z-20 flex gap-2"
                    aria-hidden="true"
                  >
                    {/* Wisp 1 */}
                    <div
                      className="w-1.5 h-10 rounded-full blur-[1.5px] opacity-25"
                      style={{
                        background: 'linear-gradient(to top, rgba(251, 247, 241, 0.7), transparent)',
                        animation: 'steamRise 3.6s ease-in-out infinite',
                        animationDelay: '0s',
                      }}
                    />
                    {/* Wisp 2 */}
                    <div
                      className="w-1.5 h-12 rounded-full blur-[1.5px] opacity-20"
                      style={{
                        background: 'linear-gradient(to top, rgba(251, 247, 241, 0.8), transparent)',
                        animation: 'steamRise 3.8s ease-in-out infinite',
                        animationDelay: '1.2s',
                      }}
                    />
                    {/* Wisp 3 */}
                    <div
                      className="w-1.5 h-9 rounded-full blur-[1.5px] opacity-20"
                      style={{
                        background: 'linear-gradient(to top, rgba(251, 247, 241, 0.6), transparent)',
                        animation: 'steamRise 4.0s ease-in-out infinite',
                        animationDelay: '2.4s',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Smaller Offset Layered Image */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
                className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden border-[3px] border-[#FBF7F1] shadow-[0_16px_36px_rgba(31,22,18,0.22)] bg-[#EADBC8] z-20"
              >
                <img
                  src={slowMornings02}
                  alt="Sunlit minimalist wooden table with fresh morning cake and black coffee"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                  loading="lazy"
                />
                {/* Subtle shared warm tone overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 97, 46, 0.14) 0%, rgba(201, 162, 126, 0.08) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(31, 22, 18, 0.4) 100%)',
                  }}
                  aria-hidden="true"
                />
                <span className="absolute bottom-2 left-2.5 font-inter text-[10px] font-bold uppercase tracking-wider text-[#FBF7F1] drop-shadow-sm">
                  The Sanctuary
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Embedded keyframe styles for rising steam wisps */}
      <style>{`
        @keyframes steamRise {
          0% {
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          30% {
            opacity: 0.35;
          }
          70% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-28px) scaleX(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default GalleryHero;
