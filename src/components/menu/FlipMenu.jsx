import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { menuData } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import DietBadge from '../DietBadge';
import { OPENING_HOURS, CAFE_ADDRESS } from '../../config';

// Reusing Logo styles for the cover
const CoverLogo = () => (
  <div className="flex flex-col items-center">
    <div className="font-playfair font-bold text-4xl text-ink tracking-tight flex items-center gap-1">
      Royal
      <span className="text-caramel font-serif italic text-[1.1em] font-normal leading-none -ml-0.5 relative top-1">
        Bean
      </span>
    </div>
  </div>
);

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349 },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359 },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Tea Time Combo', description: 'Royal Masala Chai + Paneer Tikka Panini', price: 269 },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Combo', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589 },
];

const FlipItemRow = ({ item, addToCart }) => {
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-end w-full">
        <div className="flex items-center gap-1.5 bg-foam z-10 pr-2">
          <DietBadge diet={item.diet} size="sm" />
          <a href={`/menu/${item.slug}`} className="font-inter font-medium text-ink text-sm sm:text-base hover:text-caramel transition-colors"
            onClick={e => { e.stopPropagation(); }}>
            {item.name}
          </a>
        </div>
        <div className="flex-1 border-b border-latte/40 mx-2 relative top-[-6px] border-dotted" />
        <div className="flex items-center gap-3 bg-foam z-10 pl-2 shrink-0">
          {item.price && <span className="font-inter font-bold text-caramel text-sm sm:text-base">{item.formattedPrice || `₹${item.price}`}</span>}
          <button
            aria-label={`Add ${item.name} to order`}
            onClick={handleAdd}
            className={`w-5 h-5 rounded-full ${added ? 'bg-[#2E7D32] text-white' : 'bg-almond hover:bg-caramel hover:text-foam text-ink'} flex items-center justify-center transition-colors pointer-events-auto`}
            onPointerDown={e => e.stopPropagation()} // Stop drag
          >
            {added ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              '+'
            )}
          </button>
        </div>
      </div>
      {item.description && <p className="font-inter text-ink/60 text-[11px] sm:text-xs mt-1 pr-10 line-clamp-1">{item.description}</p>}
    </div>
  );
};

export const FlipMenu = () => {
  const containerRef = useRef(null);
  const flipRef = useRef(null);
  const rm = useReducedMotion();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const initAttemptsRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const flipInstanceRef = useRef(null);
  const initFnRef = useRef(null);

  // Auto-pagination logic
  const pages = useMemo(() => {
    const bookPages = [];
    
    // 1. Cover
    bookPages.push(
      <div key="cover" className="page w-full h-full bg-foam p-8 flex flex-col items-center justify-center text-center shadow-[inset_-20px_0_40px_rgba(0,0,0,0.02)]" data-density="hard">
        <CoverLogo />
        <p className="font-inter text-ink/70 text-sm mt-3 uppercase tracking-[0.2em]">Artisan coffee & small plates</p>
        <div className="mt-12 flex flex-col gap-6 w-full max-w-[220px]">
          <div className="flex items-center gap-4 text-ink">
            <div className="w-8 h-8 rounded-full bg-almond flex items-center justify-center shrink-0">☕</div>
            <span className="font-inter text-sm font-medium">Coffee</span>
          </div>
          <div className="flex items-center gap-4 text-ink">
            <div className="w-8 h-8 rounded-full bg-almond flex items-center justify-center shrink-0">🥐</div>
            <span className="font-inter text-sm font-medium">Fresh bakes</span>
          </div>
          <div className="flex items-center gap-4 text-ink">
            <div className="w-8 h-8 rounded-full bg-almond flex items-center justify-center shrink-0">🍰</div>
            <span className="font-inter text-sm font-medium">Something sweet</span>
          </div>
        </div>
      </div>
    );

    const ITEMS_PER_PAGE = 7;
    
    const renderItem = (item) => (
      <FlipItemRow key={item.id || item.slug} item={item} addToCart={addToCart} />
    );

    const renderCategoryPages = (cat) => {
      if (!cat.items || cat.items.length === 0) return [];
      const catPages = [];
      for (let i = 0; i < cat.items.length; i += ITEMS_PER_PAGE) {
        const slice = cat.items.slice(i, i + ITEMS_PER_PAGE);
        const title = i === 0 ? cat.name : `${cat.name} (continued)`;
        catPages.push(
          <div key={`${cat.id}-page-${i}`} className="page w-full h-full bg-foam p-6 sm:p-10 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.02)] relative flex flex-col">
            <h2 className="font-playfair font-bold text-2xl text-ink mb-1">{title}</h2>
            {i === 0 && cat.description && <p className="font-playfair italic text-ink/70 text-xs sm:text-sm mb-6">{cat.description}</p>}
            {!cat.description && <div className="h-6" />}
            <div className="flex flex-col flex-1">
              {slice.map(renderItem)}
            </div>
          </div>
        );
      }
      return catPages;
    };

    menuData.categories.forEach(cat => {
      bookPages.push(...renderCategoryPages(cat));
    });

    // Combos
    const comboPages = [];
    for (let i = 0; i < COMBOS.length; i += ITEMS_PER_PAGE) {
      const slice = COMBOS.slice(i, i + ITEMS_PER_PAGE);
      const title = i === 0 ? 'Combos' : 'Combos (continued)';
      comboPages.push(
        <div key={`combos-page-${i}`} className="page w-full h-full bg-foam p-6 sm:p-10 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.02)] relative flex flex-col">
          <h2 className="font-playfair font-bold text-2xl text-ink mb-6">{title}</h2>
          <div className="flex flex-col flex-1">
            {slice.map(renderItem)}
          </div>
        </div>
      );
    }
    bookPages.push(...comboPages);

    // Endpaper if odd before back cover to ensure even total pages
    if ((bookPages.length + 1) % 2 !== 0) {
      bookPages.push(
        <div key="endpaper" className="page w-full h-full bg-almond/20 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.02)]" />
      );
    }

    // Back cover
    bookPages.push(
      <div key="back-cover" className="page w-full h-full bg-almond p-8 flex flex-col items-center justify-center text-center shadow-[inset_20px_0_40px_rgba(0,0,0,0.02)]" data-density="hard">
        <h2 className="font-playfair font-bold text-2xl text-ink mb-4">Thank You</h2>
        {OPENING_HOURS && (
          <div className="mb-4 text-ink/80 text-sm font-inter">
            <p className="font-bold mb-1">Hours</p>
            <p>Mon - Thu: 10:00 AM - 10:30 PM</p>
            <p>Friday: 10:00 AM - 11:00 PM</p>
            <p>Sat - Sun: 9:00 AM - 11:00 PM</p>
          </div>
        )}
        {CAFE_ADDRESS && (
          <div className="mb-8 text-ink/80 text-sm font-inter max-w-[200px]">
            <p className="font-bold mb-1">Location</p>
            <p>{CAFE_ADDRESS}</p>
          </div>
        )}
        <p className="font-playfair italic text-ink/90 text-lg mb-8">The Royal Bean Team</p>
        <p className="text-[9px] text-ink/50 mt-auto px-4 leading-tight font-inter">
          Ingredients and allergens: please ask our team before ordering.
        </p>
      </div>
    );

    return bookPages;
  }, [addToCart]);

  // Initialize PageFlip
  const initializePageFlip = useCallback(() => {
    initFnRef.current = initializePageFlip;
    if (!containerRef.current || flipInstanceRef.current) return;
    
    const el = containerRef.current;
    if (el.clientWidth === 0 || el.clientHeight === 0) {
      if (initAttemptsRef.current < 20) {
        initAttemptsRef.current++;
        requestAnimationFrame(() => initFnRef.current?.());
      }
      return;
    }

    document.fonts.ready.then(() => {
      if (!containerRef.current || flipInstanceRef.current) return;

      let flip = null;
      try {
        flip = new PageFlip(containerRef.current, {
          width: 450,
          height: 620,
          size: "stretch",
          minWidth: 280,
          maxWidth: 520,
          minHeight: 420,
          maxHeight: 720,
          showCover: true,
          maxShadowOpacity: 0.5,
          drawShadow: true,
          flippingTime: rm ? 1 : 900,
          usePortrait: true,
          mobileScrollSupport: true,
          clickEventForward: true,
          useMouseEvents: !rm,
          swipeDistance: rm ? 0 : 30,
          showPageCorners: !rm,
        });

        flip.loadFromHTML(Array.from(containerRef.current.children));
        flipInstanceRef.current = flip;
        flipRef.current = flip;

        setTotalPages(flip.getPageCount());

        flip.on('flip', (e) => {
          setCurrentPage(e.data);
        });

      } catch (e) {
        console.error("PageFlip init failed", e);
        flipInstanceRef.current = null;
      }
    });
  }, [rm]);

  // Safe init with retries
  useEffect(() => {
    initAttemptsRef.current = 0;
    initializePageFlip();

    return () => {
      try {
        if (flipInstanceRef.current) {
          flipInstanceRef.current.destroy();
        }
      } catch {
        // ignore
      }
      flipInstanceRef.current = null;
      flipRef.current = null;
    };
  }, [pages.length, rm, initializePageFlip]);

  // Resize handler with debounce
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      if (flipInstanceRef.current && containerRef.current) {
        flipInstanceRef.current.update();
      }
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [handleResize]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!flipRef.current) return;
      if (e.key === 'ArrowLeft') flipRef.current.flipPrev();
      if (e.key === 'ArrowRight') flipRef.current.flipNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Compact header above the book */}
      <div className="text-center mb-8 relative z-10">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-caramel mb-1 font-inter">
          Our Menu
        </span>
        <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ink mb-1 flex items-center justify-center gap-2">
          Flip Menu
          <svg className="w-6 h-6 text-caramel/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l7-7-7-7"></path>
            <path d="M5 12c0-3.3 2.7-6 6-6"></path>
          </svg>
        </h2>
        <p className="text-sm text-ink/60 font-inter">Turn the pages like a real café menu.</p>
      </div>

      {/* Book wrapper - overflow-visible for page curl, 24px side padding on desktop */}
      <div className="relative w-full max-w-5xl mx-auto px-6 md:px-24 pb-12 pt-8 overflow-visible">
        {/* The Book - explicit aspect ratio and min/max height */}
        <div 
          ref={containerRef} 
          className="relative z-10 drop-shadow-[0_20px_40px_rgba(31,22,18,0.15)] w-full aspect-[1.45/1] md:aspect-[1.45/1] max-w-5xl min-h-[420px] max-h-[720px] md:min-h-[520px] md:max-h-[720px] bg-foam"
          style={{ height: '100%' }}
        >
          {pages.map((page, i) => (
            <div key={page.key} className="page w-full h-full" style={{ width: '100%', height: '100%' }}>
              {page}
              {i > 0 && i < pages.length - 1 && (
                <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
                  <span className="font-inter text-[10px] text-ink/40 tracking-widest">Page {i}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 z-20 mt-4 bg-foam/90 backdrop-blur-sm px-6 py-3 rounded-full border border-latte/30 shadow-sm">
        <button
          onClick={() => flipRef.current?.flipPrev()}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className="w-10 h-10 rounded-full bg-almond hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-almond disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="font-inter text-sm font-medium text-ink/70 w-16 text-center">
          {currentPage + 1} / {totalPages || pages.length}
        </span>

        <button
          onClick={() => flipRef.current?.flipNext()}
          disabled={currentPage >= (totalPages || pages.length) - (rm ? 1 : 2)}
          aria-label="Next page"
          className="w-10 h-10 rounded-full bg-almond hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-almond disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlipMenu;
