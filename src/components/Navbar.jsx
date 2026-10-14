import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
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
  const [cartOpen,   setCartOpen]   = useState(false);
  const lastScrollY  = useRef(0);
  const location     = useLocation();
  const { totalItems } = useCart();

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
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    const onOpenCart = () => setCartOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-cart', onOpenCart);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-cart', onOpenCart);
    };
  }, []);

  useEffect(() => {
    if (cartOpen) return;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, cartOpen]);

  return (
    <>
      {/* ── Full-width flat sticky navbar ── */}
      <motion.header
        role="banner"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF7F1]/98 shadow-[0_1px_0_0_rgba(31,22,18,0.12)] backdrop-blur-sm'
            : 'bg-[#FBF7F1]'
        }`}
        style={{ top: barVisible ? '2.5rem' : '0' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[68px]">
            
            {/* Logo */}
            <Logo size="md" theme="light" className="flex-shrink-0" />

            {/* ── Center Nav Links — ALL CAPS editorial ── */}
            <nav
              className="hidden md:flex items-center gap-8 lg:gap-10"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => {
                    const isMenuActive = to === '/menu' && location.pathname.startsWith('/menu');
                    const active = isActive || isMenuActive;
                    return `relative font-grotesk text-[11px] font-semibold tracking-[0.15em] uppercase
                     transition-colors duration-200 pb-0.5
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]
                     ${active ? 'text-[#1F1612]' : 'text-[#1F1612]/60 hover:text-[#1F1612]'}`;
                  }}
                >
                  {({ isActive }) => {
                    const isMenuActive = to === '/menu' && location.pathname.startsWith('/menu');
                    const active = isActive || isMenuActive;
                    return (
                      <>
                        {label}
                        {/* Underline */}
                        <span
                          className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#1F1612] transition-all duration-300 ${
                            active ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </>
                    );
                  }}
                </NavLink>
              ))}
            </nav>

            {/* ── Right Side Actions ── */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Reserve CTA — handwritten Caveat style */}
              <Link
                to="/reserve"
                className="hidden md:inline-flex items-center gap-1.5 px-5 py-2
                           border border-[#1F1612] text-[#1F1612] hover:bg-[#1F1612] hover:text-[#FBF7F1]
                           font-grotesk text-[11px] font-semibold tracking-[0.12em] uppercase
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                Reserve a Table
              </Link>

              {/* Handwritten "Order Online" à la BD */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 font-caveat text-base font-bold
                           text-[#A8612E] hover:text-[#1F1612] transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]
                           tracking-wide"
                aria-label="Order on WhatsApp"
              >
                Order Online
              </a>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
                className="relative p-2 text-[#1F1612]/70 hover:text-[#1F1612] transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-[#A8612E] text-[#FBF7F1] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden flex flex-col gap-[5px] p-2 text-[#1F1612] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                      <span className="flex flex-col gap-[5px]">
                        <span className="block w-5 h-[1.5px] bg-[#1F1612]" />
                        <span className="block w-4 h-[1.5px] bg-[#1F1612]" />
                        <span className="block w-5 h-[1.5px] bg-[#1F1612]" />
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="w-full h-[1px] bg-[#1F1612]/10" />
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#FBF7F1] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs md:hidden
                         bg-[#FBF7F1] border-l border-[#1F1612]/10 flex flex-col px-8 py-12"
            >
              {/* Close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#1F1612]/60 hover:text-[#1F1612]"
              >
                <X className="w-5 h-5" />
              </button>

              <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => {
                        const active = isActive || (to === '/menu' && location.pathname.startsWith('/menu'));
                        return `block font-cormorant text-4xl font-semibold py-2 transition-colors border-b border-[#1F1612]/8
                         focus-visible:outline-none
                         ${active ? 'text-[#A8612E]' : 'text-[#1F1612] hover:text-[#A8612E]'}`;
                      }}
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  to="/reserve"
                  onClick={() => setMobileOpen(false)}
                  className="bd-btn w-full justify-center"
                >
                  Reserve a Table
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="font-caveat text-xl text-[#A8612E] text-center py-2 font-bold"
                >
                  Order Online ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
