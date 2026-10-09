import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, Phone, ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/site';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-espresso/95 backdrop-blur-md shadow-warm border-b border-roast/50 py-3.5 sm:py-4'
            : 'bg-gradient-to-b from-espresso/80 via-espresso/40 to-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-lg"
            aria-label={`${siteData.name} - Home`}
          >
            <div className="w-10 h-10 rounded-full bg-roast/60 border border-caramel/40 flex items-center justify-center text-caramel group-hover:scale-105 group-hover:border-caramel transition-transform shadow-warm-sm">
              <Coffee className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-cream group-hover:text-caramel transition-colors">
                {siteData.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-caramel -mt-1 font-inter">
                {siteData.address.area} • {siteData.address.city}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {siteData.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider text-beige/85 hover:text-cream hover:bg-roast/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-caramel"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action: Phone / Reservation CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteData.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-beige/80 hover:text-caramel transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-caramel" />
              <span>{siteData.phone}</span>
            </a>
            <a
              href="#menu"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-caramel hover:bg-caramel-light text-espresso shadow-warm hover:shadow-glow-caramel transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Menu
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-roast/50 border border-beige/20 text-cream hover:text-caramel hover:border-caramel/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-espresso/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 overflow-y-auto"
          >
            {/* Nav Links Stack */}
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
              }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest text-caramel mb-2">
                Navigation
              </span>
              {siteData.navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 }
                  }}
                  className="group flex items-center justify-between py-2 border-b border-roast/40 text-cream hover:text-caramel transition-colors"
                >
                  <span className="font-playfair text-2xl font-bold tracking-tight">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-beige/40 group-hover:text-caramel transition-colors" />
                </motion.a>
              ))}
            </motion.nav>

            {/* Mobile Footer Info & Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 pt-6 border-t border-roast/50 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1 text-xs text-beige/80">
                <span className="font-semibold text-cream">{siteData.name}</span>
                <span>{siteData.address.formatted}</span>
                <span className="text-caramel font-medium mt-1">{siteData.openingHours.timeDisplay}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${siteData.phoneRaw}`}
                  className="py-3 px-4 rounded-full text-xs font-semibold bg-roast/60 border border-beige/25 text-cream flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-caramel" />
                  Call Us
                </a>
                <a
                  href={`https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-full text-xs font-semibold bg-caramel text-espresso font-bold flex items-center justify-center gap-2 shadow-warm"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
