import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, BookOpen, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { heroData } from '../data/hero';
import Reveal from './Reveal';
import WaveDivider from './WaveDivider';

// Helper to map icon names from heroData
const iconMap = {
  Coffee: Coffee,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Compass: Compass,
};

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative bg-espresso text-cream overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-0"
    >
      {/* Ambient Lighting & Glow Accents */}
      <div
        className="absolute top-1/4 right-0 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full bg-caramel/15 blur-[120px] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 left-[-10%] w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full bg-roast/30 blur-[100px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start">
            <Reveal delay={0.1}>
              {/* Brand Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-roast/40 border border-caramel/40 text-caramel text-xs tracking-wider uppercase font-semibold shadow-warm-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-caramel animate-pulse" />
                <span>{heroData.badge}</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Large Elegant Serif Headline */}
              <h1 className="mt-6 font-playfair font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-cream tracking-tight leading-[1.12]">
                {heroData.headline.split('Home.').length > 1 ? (
                  <>
                    {heroData.headline.replace('Home.', '')}
                    <span className="italic font-normal text-caramel underline decoration-caramel/30 underline-offset-8">
                      Home.
                    </span>
                  </>
                ) : (
                  heroData.headline
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              {/* Warm Subheadline */}
              <p className="mt-6 text-beige/85 text-base sm:text-lg max-w-xl font-inter leading-relaxed">
                {heroData.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.4} className="w-full sm:w-auto">
              {/* Thumb-Friendly CTA Action Row */}
              <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href={heroData.ctaPrimary.href}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-caramel hover:bg-caramel-light text-espresso shadow-warm-lg hover:shadow-glow-caramel transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
                >
                  <span>{heroData.ctaPrimary.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={heroData.ctaSecondary.href}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider bg-roast/30 hover:bg-roast/60 text-cream border border-beige/30 hover:border-caramel/60 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-caramel" />
                  <span>{heroData.ctaSecondary.label}</span>
                </a>
              </div>
            </Reveal>

            {/* Feature Highlights Strip (Mobile-first responsive row) */}
            <Reveal delay={0.5} className="w-full">
              <div className="mt-12 pt-8 border-t border-roast/40 w-full">
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  {heroData.highlights.map((item, idx) => {
                    const IconComponent = iconMap[item.icon] || Coffee;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-espresso-light/40 border border-roast/40 backdrop-blur-sm shadow-warm-sm"
                      >
                        <div className="w-7 h-7 rounded-full bg-caramel/15 flex items-center justify-center text-caramel flex-shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-beige/90 whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual with Large Coffee Cup Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <Reveal delay={0.3} className="relative w-full max-w-[480px] lg:max-w-none">
              {/* Outer Amber Halo */}
              <div
                className="absolute inset-0 m-auto w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-gradient-to-tr from-caramel/30 to-roast/40 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Coffee Cup Artwork with Gentle Motion */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut'
                }}
                className="relative z-10 w-full flex justify-center"
              >
                <img
                  src={heroData.heroImage}
                  alt={heroData.heroImageAlt}
                  className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] h-auto object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.45)]"
                  loading="eager"
                />
              </motion.div>

              {/* Subtle Aesthetic Floating Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-4 right-4 sm:right-8 z-20 px-4 py-2.5 rounded-2xl bg-espresso/90 border border-caramel/40 backdrop-blur-md shadow-warm-lg flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-caramel animate-ping" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-caramel">
                    Freshly Dialed In
                  </span>
                  <span className="text-xs font-semibold text-cream">
                    100% Arabica Roast
                  </span>
                </div>
              </motion.div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Organic Wavy Transition to the next Cream Section (Featured Coffee) */}
      <div className="relative mt-12 sm:mt-16 z-20">
        <WaveDivider color="#F5EBDD" height="72px" />
      </div>
    </section>
  );
};

export default Hero;
