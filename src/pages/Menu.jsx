import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, Plus, Minus } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menu';
import DietBadge from '../components/DietBadge';
import DishTrain from '../components/menu/DishTrain';
import FlipBook from '../components/menu/FlipBook';
import SpecialsCarousel from '../components/menu/SpecialsCarousel';
import MenuHero from '../components/menu/MenuHero';

/* ─── Shared easing ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0, rm = false) => ({
  initial: rm ? { opacity: 0 } : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const rowVariants = (index, rm = false) => ({
  hidden:   rm ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: Math.min(index * 0.06, 0.4) } },
  exit:     { opacity: 0,        transition: { duration: 0.2 } },
});

/* ─── Combos ────────────────────────────────────────────────────────── */
const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo',  name: 'Morning Ritual Combo',   description: 'Royal Cappuccino + Sourdough Guacamole Toast',           price: 349, saved: 'Save ₹39' },
  { id: 'combo-2', slug: 'sweet-tooth-combo',     name: 'Sweet Tooth Combo',      description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry',       price: 359, saved: 'Save ₹29' },
  { id: 'combo-3', slug: 'tea-time-combo',        name: 'Tea Time Combo',         description: 'Royal Masala Chai + Paneer Tikka Panini',                price: 269, saved: 'Save ₹19' },
  { id: 'combo-4', slug: 'friends-share-combo',   name: 'Friends Share Combo',    description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589, saved: 'Save ₹37' },
];

/* ─── useDebounce ───────────────────────────────────────────────────── */
function useDebounce(value, delay) {
  const [dv, setDv] = useState(value);
  useEffect(() => {
    const h = setTimeout(() => setDv(value), delay);
    return () => clearTimeout(h);
  }, [value, delay]);
  return dv;
}

/* ─── isInViewport — synchronous check ─────────────────────────────── */
function isNearViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight + 200; // within 200px below fold
}

/* ─── AddButton ─────────────────────────────────────────────────────── */
const AddButton = ({ item }) => {
  const { cart, addToCart, updateQty } = useCart();
  const rm = useReducedMotion();
  const cartItem = cart.find(i => i.slug === item.slug);
  const press = rm ? {} : { whileTap: { scale: 0.97, transition: { duration: 0.1 } } };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {cartItem ? (
        <motion.div
          key="stepper"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-3 bg-foam border border-latte/30 rounded-full px-2 py-1 shadow-sm"
          onClick={e => e.stopPropagation()}
        >
          <motion.button {...press} onClick={e => { e.preventDefault(); updateQty(item.slug, -1); }}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-almond hover:bg-caramel hover:text-foam transition-colors text-ink">
            <Minus className="w-3 h-3" />
          </motion.button>
          <span className="text-sm font-bold text-ink min-w-[12px] text-center">{cartItem.qty}</span>
          <motion.button {...press} onClick={e => { e.preventDefault(); addToCart(item, 1); }}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-almond hover:bg-caramel hover:text-foam transition-colors text-ink">
            <Plus className="w-3 h-3" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          key="add" {...press}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(item, 1); }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foam text-ink text-sm font-bold hover:bg-caramel hover:text-foam border border-latte/30 hover:border-caramel transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ─── AnimatedRow ───────────────────────────────────────────────────── */
const AnimatedRow = ({ item, index, rm, onNavigate }) => {
  const ref = useRef(null);

  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (isNearViewport(ref.current)) {
      setVisible(true);
      return;
    }

    const safety = setTimeout(() => setVisible(true), 1500);

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
        clearTimeout(safety);
      }
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0 });

    if (ref.current) obs.observe(ref.current);

    return () => { obs.disconnect(); clearTimeout(safety); };
  }, []);

  const vars = rowVariants(index, rm);
  const hover = rm ? {} : { whileHover: { y: -2, transition: { duration: 0.2, ease: EASE } } };

  return (
    <motion.div
      ref={ref}
      variants={vars}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      exit="exit"
      {...hover}
      onClick={() => onNavigate(`/menu/${item.slug}`)}
      className="flex items-start gap-4 py-4 border-b border-latte/30 group cursor-pointer -mx-4 px-4 rounded-xl relative"
    >
      {/* Hover shadow overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ boxShadow: '0 10px 30px rgba(31,22,18,0.08)', background: 'rgba(234,219,200,0.5)' }}
        initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }}
      />

      {item.image && (
        <div className="overflow-hidden rounded-xl shrink-0 w-16 h-16">
          <motion.img
            src={item.image} alt={item.name}
            className="w-full h-full object-cover" loading="lazy"
            whileHover={rm ? {} : { scale: 1.04 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <DietBadge diet={item.diet} size="sm" />
          <span className="font-medium text-ink truncate max-w-[150px] sm:max-w-[200px]">{item.name}</span>
          {item.bestseller && (
            <span className="text-[9px] uppercase tracking-wider font-bold bg-caramel text-foam px-1.5 py-0.5 rounded-sm shrink-0">Bestseller</span>
          )}
          {item.badge && item.badge !== 'Bestseller' && (
            <span className="text-[9px] uppercase tracking-wider font-bold bg-almond text-caramel border border-latte/30 px-1.5 py-0.5 rounded-sm shrink-0 truncate">{item.badge}</span>
          )}
          <div className="hidden sm:block flex-1 border-b-[1.5px] border-dotted border-latte/50 mx-2 relative -top-1 opacity-40 group-hover:opacity-80 transition-opacity" />
          <span className="text-caramel font-bold shrink-0 ml-auto sm:ml-0">{item.formattedPrice || `₹${item.price}`}</span>
        </div>
        <p className="text-ink/70 text-sm line-clamp-2 pr-2">{item.description}</p>
      </div>

      <div className="shrink-0 self-center relative z-10">
        <AddButton item={item} />
      </div>
    </motion.div>
  );
};

/* ─── SpecialCard ────────────────────────────────────────────────────── */
const SpecialCard = ({ item, index, rm, onNavigate }) => {
  const hover = rm ? {} : { whileHover: { y: -2, transition: { duration: 0.2, ease: EASE } } };
  return (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(index * 0.07, 0.35) }}
      {...hover}
      className="snap-start shrink-0 w-64 bg-almond rounded-2xl p-4 border border-latte/20 flex flex-col cursor-pointer relative"
      onClick={() => onNavigate(`/menu/${item.slug}`)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: '0 10px 30px rgba(31,22,18,0.1)' }}
        initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }}
      />
      {item.image && (
        <div className="overflow-hidden rounded-xl w-full h-32 mb-3">
          <motion.img src={item.image} alt={item.name} className="w-full h-full object-cover"
            whileHover={rm ? {} : { scale: 1.04 }} transition={{ duration: 0.4, ease: EASE }} />
        </div>
      )}
      <div className="flex items-center gap-1.5 mb-1 relative z-10">
        <DietBadge diet={item.diet} size="sm" />
        <h3 className="font-bold text-ink line-clamp-1">{item.name}</h3>
      </div>
      <p className="text-caramel font-bold mb-3 relative z-10">{item.formattedPrice || `₹${item.price}`}</p>
      <div className="mt-auto self-end relative z-10"><AddButton item={item} /></div>
    </motion.div>
  );
};

/* ─── Main page ─────────────────────────────────────────────────────── */
export const MenuPage = () => {
  useDocumentMeta({
    title: 'Artisan Menu | Royal Bean Café • Talwandi, Kota',
    description: 'Explore the handcrafted menu at Royal Bean Café.',
  });

  const rm = useReducedMotion();
  const navigate = useNavigate();
  const { totalItems, subtotal } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const dietQuery = searchParams.get('diet');
  const [vegOnly, setVegOnly] = useState(dietQuery === 'veg');
  const qQuery = searchParams.get('q') || '';
  const [rawSearch, setRawSearch] = useState(qQuery);
  const searchQuery = useDebounce(rawSearch, 200);

  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const viewQuery = searchParams.get('view');
  const viewMode = (viewQuery === 'list' || viewQuery === 'flip') ? viewQuery : (isDesktop ? 'flip' : 'list');

  const toggleView = (mode) => {
    const next = new URLSearchParams(searchParams);
    next.set('view', mode);
    setSearchParams(next, { replace: true });
  };

  /* Sync URL params */
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (vegOnly) next.set('diet', 'veg'); else next.delete('diet');
    if (searchQuery) next.set('q', searchQuery); else next.delete('q');
    setSearchParams(next, { replace: true });
  }, [vegOnly, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Filtered data */
  const { categories, specials } = useMemo(() => {
    let allSpecials = [];
    const filteredCategories = [];
    menuData.categories.forEach(cat => {
      let items = cat.items;
      if (vegOnly) items = items.filter(i => i.diet === 'veg');
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        items = items.filter(i =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          (i.ingredients || []).some(ing => ing.toLowerCase().includes(q))
        );
      }
      if (items.length > 0) filteredCategories.push({ ...cat, items });
      allSpecials.push(...items.filter(i => i.badge === 'Special' || i.badge === 'Signature' || i.badge === 'Royal Bean Special' || i.bestseller));
    });
    return { categories: filteredCategories, specials: allSpecials.slice(0, 5) };
  }, [vegOnly, searchQuery]);

  /* ── Scroll-spy: single observer, updates observed elements ── */
  const [activeCat, setActiveCat] = useState('');
  const activeChipRef = useRef(null);
  const spyObserverRef = useRef(null);

  /* Set of section ids currently rendered (drives observer updates) */
  const renderedIds = useMemo(() => {
    const ids = new Set();
    if (specials.length > 0) ids.add('royal-bean-picks');
    categories.forEach(c => ids.add(`cat-${c.id}`));
    ids.add('combos');
    return ids;
  }, [categories, specials.length]);

  /* Create observer once */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      const hit = entries.filter(e => e.isIntersecting);
      if (hit.length > 0) setActiveCat(hit[0].target.id);
    }, { rootMargin: '-20% 0px -75% 0px' });

    spyObserverRef.current = obs;

    return () => obs.disconnect();
  }, []);

  /* Update observed elements when renderedIds changes */
  useEffect(() => {
    const obs = spyObserverRef.current;
    if (!obs) return;

    obs.disconnect();
    renderedIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }, [renderedIds]);

  /* Drop activeCat if its section no longer exists */
  const [prevRenderedIds, setPrevRenderedIds] = useState(renderedIds);
  if (prevRenderedIds !== renderedIds) {
    setPrevRenderedIds(renderedIds);
    if (activeCat && !renderedIds.has(activeCat)) {
      setActiveCat('');
    }
  }

  /* Auto-scroll active chip into view */
  useEffect(() => {
    activeChipRef.current?.scrollIntoView({
      behavior: rm ? 'auto' : 'smooth', inline: 'center', block: 'nearest',
    });
  }, [activeCat, rm]);

  const scrollToCat = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
  }, [rm]);

  const clearFilters = () => { setVegOnly(false); setRawSearch(''); };
  const openCart = () => window.dispatchEvent(new Event('open-cart'));

  const sidebarLinks = [
    ...(specials.length > 0 ? [{ id: 'royal-bean-picks', name: 'Royal Bean Picks', count: specials.length }] : []),
    ...categories.map(c => ({ id: `cat-${c.id}`, name: c.name, count: c.items.length })),
    { id: 'combos', name: 'Combos', count: COMBOS.length },
  ];

  const isEmpty = categories.length === 0 && specials.length === 0;

  return (
    <div className="bg-foam text-ink min-h-screen pb-32 overflow-x-hidden">

      {viewMode === 'flip' && (
        <MenuHero
          onScrollToBook={() => {
            const el = document.getElementById('royal-menu-book');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* ── HEADER / SEARCH & TOGGLE (For List Mode or general controls) ── */}
      {viewMode === 'list' && (
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-8 lg:pt-32 border-b border-latte/30">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <motion.span {...fadeUp(0, rm)} className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter">
                Our Menu
              </motion.span>
              <motion.h1 {...fadeUp(0.08, rm)} className="font-playfair font-bold text-4xl sm:text-5xl text-ink">
                Brewed fresh, served warm
              </motion.h1>
              <motion.p {...fadeUp(0.16, rm)} className="mt-2 text-ink/70">
                Artisan coffee, comforting bakes, and royal flavors.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.24, rm)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto relative">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none" />
                <input
                  type="search" value={rawSearch} onChange={e => setRawSearch(e.target.value)}
                  placeholder="Search..." aria-label="Search menu items"
                  className="w-full pl-10 pr-10 py-2.5 rounded-full bg-almond/30 border border-latte/40 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-caramel transition-colors"
                />
                {rawSearch && (
                  <button onClick={() => setRawSearch('')} aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink p-1">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setVegOnly(!vegOnly)} aria-pressed={vegOnly}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all border
                  ${vegOnly ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-md' : 'bg-almond/30 border-latte/40 text-ink hover:bg-almond/60'}`}
              >
                <span className="inline-flex items-center justify-center shrink-0 w-3.5 h-3.5 border-[1.5px] border-current rounded-sm bg-white">
                  <span className={`block w-1.5 h-1.5 rounded-full ${vegOnly ? 'bg-[#2E7D32]' : 'bg-transparent'}`} />
                </span>
                Veg only
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {/* Sticky Switch View bar */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col items-center border-b border-latte/20 mb-8 bg-foam/80 backdrop-blur-sm sticky top-[72px] z-30">
        <div className="flex gap-1 bg-almond/40 rounded-full p-1 border border-latte/30 shadow-inner mb-2">
          <button onClick={() => toggleView('flip')} className={`px-5 py-2 rounded-full font-inter text-sm font-bold transition-all ${viewMode === 'flip' ? 'bg-foam shadow-[0_2px_10px_rgba(31,22,18,0.1)] text-caramel border border-latte/50' : 'text-ink/60 hover:text-ink'}`}>Flip 3D Book</button>
          <button onClick={() => toggleView('list')} className={`px-5 py-2 rounded-full font-inter text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-foam shadow-[0_2px_10px_rgba(31,22,18,0.1)] text-caramel border border-latte/50' : 'text-ink/60 hover:text-ink'}`}>List View</button>
        </div>
        <p className="text-[10px] text-ink/50 italic text-center font-inter">
          Ingredients and allergens: please ask our team before ordering.
        </p>
      </div>

      {viewMode === 'flip' ? (
        <>
          <FlipBook />
          <SpecialsCarousel specials={specials} />
        </>
      ) : (
        <>
          <DishTrain />

          <div className="max-w-6xl mx-auto px-6 mt-8 lg:mt-12 flex flex-col lg:flex-row gap-10">

        {/* ── MOBILE CHIP NAV ─────────────────────────────────────── */}
        <LayoutGroup id="mobile-chips">
          <div
            className="lg:hidden sticky top-[88px] z-30 -mx-6 px-6 py-3 bg-foam/95 backdrop-blur border-b border-latte/20 flex overflow-x-auto snap-x gap-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sidebarLinks.map(link => {
              const isActive = activeCat === link.id;
              return (
                <button
                  key={link.id}
                  ref={isActive ? activeChipRef : null}
                  onClick={() => scrollToCat(link.id)}
                  className="snap-start relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors shrink-0 z-10"
                  style={{
                    color: isActive ? '#FBF7F1' : '#1F1612',
                    borderColor: isActive ? '#A8612E' : 'rgba(201,162,126,0.3)',
                  }}
                >
                  {isActive && !rm && (
                    <motion.span
                      layoutId="mobile-chip-bg"
                      className="absolute inset-0 rounded-full bg-caramel"
                      style={{ zIndex: -1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* ── DESKTOP SIDEBAR ─────────────────────────────────────── */}
        <LayoutGroup id="sidebar-indicator">
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start">
            <nav className="flex flex-col gap-1" aria-label="Menu categories">
              {sidebarLinks.map(link => {
                const isActive = activeCat === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToCat(link.id)}
                    className="flex justify-between items-center px-4 py-2.5 text-left text-sm font-bold transition-colors relative"
                  >
                    {isActive && !rm && (
                      <motion.span layoutId="sidebar-active-bar"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-caramel rounded-full"
                        transition={{ duration: 0.35, ease: EASE }} />
                    )}
                    {isActive && !rm && (
                      <motion.span layoutId="sidebar-active-bg"
                        className="absolute inset-0 rounded-r-lg bg-caramel/5"
                        transition={{ duration: 0.35, ease: EASE }} />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-caramel' : 'text-ink/70 hover:text-ink'}`}>{link.name}</span>
                    <span className="text-[10px] font-normal opacity-60 relative z-10">{link.count}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </LayoutGroup>

        {/* ── MAIN CONTENT — sections stay mounted, only rows animate ─ */}
        <div className="flex-1 min-w-0">

          {/* Empty state */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="py-20 text-center"
              >
                <p className="font-playfair font-bold text-2xl text-ink mb-2">No dishes found</p>
                <p className="text-ink/60 mb-6">Try a different search term or filter.</p>
                <button onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full bg-caramel text-foam font-bold shadow-sm hover:bg-caramel/90 transition-colors">
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isEmpty && (
            <div className="flex flex-col gap-16">

              {/* SPECIALS BAND — always mounted, only cards animate */}
              <section id="royal-bean-picks" data-cat className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-playfair font-bold text-2xl text-ink whitespace-nowrap">Royal Bean Picks</h2>
                  <div className="flex-1 h-px bg-latte/50" />
                </div>
                <div className="flex overflow-x-auto snap-x gap-4 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <AnimatePresence initial={false} mode="popLayout">
                    {specials.map((item, i) => (
                      <SpecialCard key={item.slug} item={item} index={i} rm={rm} onNavigate={navigate} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* CATEGORY SECTIONS — always mounted, only rows animate */}
              {menuData.categories.map(fullCat => {
                const cat = categories.find(c => c.id === fullCat.id);
                return (
                  <section
                    key={fullCat.id}
                    id={`cat-${fullCat.id}`} data-cat className="scroll-mt-32"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-1">
                        <h2 className="font-playfair font-bold text-2xl text-ink whitespace-nowrap">{fullCat.name}</h2>
                        <div className="flex-1 h-px bg-latte/50" />
                      </div>
                      {fullCat.description && <p className="italic text-ink/70 text-sm">{fullCat.description}</p>}
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
                      {/* AnimatePresence per category: stable keys, rows fade in/out individually */}
                      <AnimatePresence initial={false} mode="popLayout">
                        {cat?.items.map((item, i) => (
                          <AnimatedRow
                            key={item.id}
                            item={item}
                            index={i}
                            rm={rm}
                            onNavigate={navigate}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                );
              })}

              {/* COMBOS — always shown */}
              <section id="combos" data-cat className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-playfair font-bold text-2xl text-ink whitespace-nowrap">Combos</h2>
                  <div className="flex-1 h-px bg-latte/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {COMBOS.map((combo, i) => (
                    <motion.div
                      key={combo.slug}
                      initial={rm ? { opacity: 0 } : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                      className="relative bg-almond rounded-xl border border-dashed border-latte p-5 flex flex-col justify-between overflow-hidden"
                    >
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-foam rounded-full border border-dashed border-latte border-r-0" />
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-foam rounded-full border border-dashed border-latte border-l-0" />
                      <div className="pl-4 pr-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-playfair font-bold text-lg text-ink">{combo.name}</h3>
                          {combo.saved && (
                            <span className="bg-caramel/10 text-caramel text-[10px] font-bold px-2 py-0.5 rounded ml-2 whitespace-nowrap">{combo.saved}</span>
                          )}
                        </div>
                        <p className="text-sm text-ink/70 mb-4">{combo.description}</p>
                        <div className="flex items-center justify-between border-t border-dashed border-latte/50 pt-3">
                          <span className="font-bold text-caramel text-lg pr-2">₹{combo.price}</span>
                          <AddButton item={{ ...combo, formattedPrice: `₹${combo.price}` }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

            </div>
          )}
        </div>
      </div>
      </>
      )}

      {/* ── MOBILE CART BAR ─────────────────────────────────────────── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-4 inset-x-4 z-40 bg-foam/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(31,22,18,0.15)] border border-latte/30 p-4 flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-xs text-ink/70 font-medium uppercase tracking-wider">
                {totalItems} item{totalItems !== 1 && 's'}
              </span>
              <span className="font-bold text-ink text-lg">₹{subtotal}</span>
            </div>
            <button onClick={openCart}
              className="px-6 py-2.5 rounded-full bg-caramel text-foam font-bold shadow-warm hover:bg-caramel/90 transition-colors">
              View order
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
