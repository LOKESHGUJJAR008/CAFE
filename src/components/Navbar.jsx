import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import { WHATSAPP_URL } from '../config';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const NAV_LINKS = [
  { to: '/',        label: 'Home'    },
  { to: '/menu',    label: 'Menu'    },
  { to: '/about',   label: 'About'   },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = ({ barVisible = false }) => {
  const [scrolled,   setScrolled]   = useState(false);
  const [hidden,     setHidden]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY  = useRef(0);
  const location     = useLocation();
  const { totalItems, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [prevPath, setPrevPath] = React.useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
  }
  
  useEffect(() => {
    // Other side effects on mount if any, or empty
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (isCartOpen) return; // CartDrawer handles its own body lock
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, isCartOpen]);

  const pillClass = scrolled
    ? 'py-2 px-4 sm:px-6 bg-[#FBF7F1]/90 shadow-[0_8px_30px_rgba(31,22,18,0.16)] backdrop-blur-xl'
    : 'py-3 px-5 sm:px-8 bg-[#FBF7F1]/85 shadow-[0_4px_16px_rgba(31,22,18,0.08)] backdrop-blur-xl';

  return (
    <>
      <div
        className="fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ top: barVisible ? '2.75rem' : '1rem' }}
      >
        <motion.header
          role="banner"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: hidden ? -100 : 0, opacity: 1 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full border border-[#C9A27E]/50 transition-all duration-300 ${pillClass}`}
        >
          <div className="flex items-center justify-between gap-4">
            <Logo size="md" theme="light" className="flex-shrink-0" />

            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => {
                    const isMenuActive = to === '/menu' && location.pathname.startsWith('/menu');
                    const active = isActive || isMenuActive;
                    return `relative text-sm font-medium tracking-wide transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]
                     rounded-sm group
                     ${active ? 'text-[#A8612E]' : 'text-[#1F1612] hover:text-[#A8612E]'}`;
                  }}
                >
                  {({ isActive }) => {
                    const isMenuActive = to === '/menu' && location.pathname.startsWith('/menu');
                    const active = isActive || isMenuActive;
                    return (
                    <>
                      {label}
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#A8612E] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      {active && <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A8612E]" />}
                    </>
                  )}}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold
                           bg-[#A8612E] hover:bg-[#92541f] text-[#FBF7F1]
                           shadow-[0_4px_14px_rgba(168,97,46,0.35)]
                           transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] whitespace-nowrap"
              >
                <Coffee className="w-3.5 h-3.5 opacity-80" />
                Order on WhatsApp
              </a>

              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                className="relative p-2.5 rounded-full bg-[#EADBC8]/60 hover:bg-[#EADBC8] border border-[#C9A27E]/30
                           text-[#1F1612] hover:text-[#A8612E] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#A8612E] text-[#FBF7F1] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FBF7F1]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden p-2 rounded-full bg-[#EADBC8]/60 border border-[#C9A27E]/30
                           text-[#1F1612] hover:text-[#A8612E] hover:border-[#A8612E]/40
                           transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="close" initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.18 }} className="block">
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ opacity: 0, rotate: 90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.7 }} transition={{ duration: 0.18 }} className="block">
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-[#1F1612]/20 backdrop-blur-[2px] md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1,    y: 0   }}
              exit={{   opacity: 0, scale: 0.94, y: -12  }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed top-[80px] inset-x-4 z-50 md:hidden mx-auto max-w-sm
                         bg-[#FBF7F1]/96 backdrop-blur-xl border border-[#C9A27E]/40
                         shadow-[0_16px_48px_rgba(31,22,18,0.15)] rounded-3xl p-6 flex flex-col gap-5"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div key={to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.2 }}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => {
                        const isMenuActive = to === '/menu' && location.pathname.startsWith('/menu');
                        const active = isActive || isMenuActive;
                        return `block w-full text-2xl font-playfair font-bold py-2 px-2 rounded-xl transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]
                         ${active ? 'text-[#A8612E]' : 'text-[#1F1612] hover:text-[#A8612E]'}`;
                      }}
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <hr className="border-[#C9A27E]/30" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full py-4 rounded-full text-base font-bold bg-[#A8612E] hover:bg-[#92541f] text-[#FBF7F1]
                           flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(168,97,46,0.35)]
                           transition-all hover:scale-[1.02] active:scale-[0.98]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <Coffee className="w-4 h-4 opacity-80" />
                Order on WhatsApp
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
