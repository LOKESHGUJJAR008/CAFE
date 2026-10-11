import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee, ArrowRight, BookOpen, Croissant } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveDivider from './WaveDivider';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { getImage } from '../data/images';
import FloatingElements from './FloatingElements';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isOpen, label } = useOpenStatus();

  const photoVariants = {
    hidden: { scale: 1.06 },
    visible: { scale: 1, transition: { duration: 1.4, ease: 'easeOut' } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const chipContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const chips = [
    { label: '100% Single-Origin Arabica', icon: Coffee },
    { label: 'Cozy Student & Study Hub', icon: BookOpen },
    { label: 'Artisan Bakes & Snacks', icon: Croissant }
  ];

  return (
    <section className="bg-foam">
      <div className="mx-3 md:mx-6 mt-3 relative overflow-hidden rounded-3xl min-h-[90svh] md:min-h-[88vh] bg-gradient-to-br from-almond to-latte flex flex-col justify-end md:justify-center pt-32 pb-8 md:py-32">
        
        {/* Background Image & Overlay */}
        <motion.div 
          variants={photoVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={getImage('latteArt')} 
            alt="Coffee and french press at Royal Bean Café" 
            loading="eager" 
            fetchpriority="high"
            className="w-full h-full object-cover object-center md:object-right"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-foam/80 via-transparent to-transparent md:bg-gradient-to-r md:from-foam/70 md:via-foam/20 md:to-transparent" aria-hidden="true" />
        
        <FloatingElements />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-start h-full justify-end md:justify-center">
          
          {/* Left Glass Card */}
          <motion.div 
            variants={cardVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            className="w-full max-w-xl p-6 md:p-10 rounded-3xl bg-foam/60 backdrop-blur-md border border-foam/60 shadow-[0_20px_60px_rgba(31,22,18,0.12)] flex flex-col items-start"
          >
            {/* Open status badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foam/80 border border-latte/30 mb-3">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOpen ? 'bg-green-600' : 'bg-caramel'}`} aria-hidden="true" />
              <span className="text-[11px] font-semibold text-ink font-inter">{label}</span>
            </div>

            {/* Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-almond text-caramel text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-5 shadow-sm">
              ARTISAN COFFEE HAVEN • TALWANDI, KOTA
            </div>

            {/* Headline */}
            <h1 className="font-playfair font-bold text-4xl md:text-6xl text-ink leading-[1.15] mb-5">
              Where Every Sip Feels Like <em className="text-caramel font-normal underline decoration-latte decoration-1 underline-offset-8">Home.</em>
            </h1>

            {/* Paragraph */}
            <p className="text-ink/80 text-base max-w-md mb-8 leading-relaxed font-medium">
              Experience the perfect blend of rich, single-origin roasts, warm hospitality, and a cozy atmosphere. Your daily escape in the heart of Talwandi.
            </p>

            {/* Buttons */}
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
              <Link 
                to="/menu"
                className="w-full md:w-auto px-8 py-3.5 rounded-full bg-caramel text-foam text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
              >
                <span>EXPLORE OUR MENU</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link 
                to="/about"
                className="w-full md:w-auto px-8 py-3.5 rounded-full bg-transparent text-ink border border-latte text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center hover:bg-almond/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
              >
                Experience The Vibe
              </Link>
            </div>
            
            {/* Bottom Feature Row */}
            <motion.div 
              variants={chipContainerVariants}
              initial={prefersReducedMotion ? "visible" : "hidden"}
              animate="visible"
              className="mt-8 pt-6 border-t border-latte/30 w-full flex overflow-x-auto snap-x scrollbar-none md:flex-wrap gap-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {chips.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={chipVariants}
                    className="snap-start flex items-center gap-2 px-4 py-2 rounded-full bg-foam/70 backdrop-blur border border-foam/50 whitespace-nowrap flex-shrink-0 shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-caramel" />
                    <span className="text-xs font-bold text-ink">{chip.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Badge (Desktop Only) */}
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [-6, 6] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-3 px-5 py-3 rounded-full bg-foam/80 backdrop-blur-md border border-latte/40 shadow-[0_8px_30px_rgba(31,22,18,0.08)]"
        >
          <div className="relative flex items-center justify-center">
            <Coffee className="w-5 h-5 text-caramel" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-caramel rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-caramel rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-widest text-caramel">Freshly dialed in</span>
            <span className="text-xs font-bold text-ink">100% Arabica Roast</span>
          </div>
        </motion.div>
      </div>

      {/* Organic Wavy Transition to the next Almond Section (Featured Coffee) */}
      <div className="relative mt-8 sm:mt-12 z-20">
        <WaveDivider color="#EADBC8" height="72px" />
      </div>
    </section>
  );
};

export default Hero;
