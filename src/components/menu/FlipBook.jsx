import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PageFlip } from 'page-flip';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import DietBadge from '../DietBadge';
import { CAFE_ADDRESS } from '../../config';

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349 },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359 },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Tea Time Combo', description: 'Royal Masala Chai + Paneer Tikka Panini', price: 269 },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Combo', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589 },
];

/* Category illustration icons (minimal SVG line-art) */
const CategoryLineArt = ({ catId }) => {
  switch (catId) {
    case 'coffee':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M36 16h4a4 4 0 0 1 0 8h-4" />
          <path d="M6 16h30v18a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V16z" />
          <line x1="14" y1="8" x2="14" y2="12" />
          <line x1="21" y1="6" x2="21" y2="12" />
          <line x1="28" y1="8" x2="28" y2="12" />
          <path d="M4 42h34" />
        </svg>
      );
    case 'cold-coffee':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 14h24l-3 28H15L12 14z" />
          <path d="M10 14h28" />
          <path d="M24 6l6 8" />
          <line x1="18" y1="22" x2="30" y2="22" strokeDasharray="2 2" />
          <line x1="17" y1="30" x2="31" y2="30" strokeDasharray="2 2" />
        </svg>
      );
    case 'tea':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20h28v14a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V20z" />
          <path d="M38 24h4a3 3 0 0 1 0 6h-4" />
          <path d="M24 8c-4 4-4 8 0 12c4-4 4-8 0-12z" />
          <line x1="24" y1="12" x2="24" y2="20" />
        </svg>
      );
    case 'bakery':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 26c4-12 28-12 32 0" />
          <path d="M6 26c4 10 12 12 18 12s14-2 18-12" />
          <path d="M14 24c2-4 8-6 10-6s8 2 10 6" />
          <path d="M20 22c1-2 3-3 4-3s3 1 4 3" />
        </svg>
      );
    case 'desserts':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 36h32" />
          <path d="M12 36l3-14h18l3 14" />
          <path d="M15 22c0-5 4-8 9-8s9 3 9 8" />
          <circle cx="24" cy="10" r="3" />
        </svg>
      );
    case 'snacks':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="14" width="32" height="6" rx="3" />
          <rect x="8" y="28" width="32" height="6" rx="3" />
          <path d="M10 20h28v8H10z" strokeDasharray="3 3" />
          <path d="M14 20v8" />
          <path d="M24 20v8" />
          <path d="M34 20v8" />
        </svg>
      );
    case 'combos':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="24" r="12" />
          <circle cx="30" cy="24" r="12" />
          <path d="M24 16v16" strokeDasharray="2 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-latte" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 16v16M16 24h16" />
        </svg>
      );
  }
};

/* Menu item row with leader lines, special badge, and add button */
const BookItemRow = ({ item, addToCart, onNavigate }) => {
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

  const isSpecial = item.special || item.badge === 'Royal Bean Special' || item.badge === 'Signature';

  return (
    <div
      onClick={() => onNavigate(`/menu/${item.slug}`)}
      className={`group relative flex flex-col py-2 px-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
        isSpecial ? 'bg-almond/30 border border-latte/30' : 'hover:bg-almond/20'
      }`}
    >
      <div className="flex items-baseline w-full">
        {/* Left: Diet badge, item name, special badge */}
        <div className="flex items-center gap-1.5 z-10 shrink-0 max-w-[62%] sm:max-w-[70%]">
          <DietBadge diet={item.diet} size="xs" />
          <span className="font-playfair font-semibold text-ink text-xs sm:text-[13px] tracking-wide group-hover:text-caramel transition-colors truncate">
            {item.name}
          </span>
          {isSpecial && (
            <span className="inline-flex items-center gap-0.5 bg-caramel text-foam text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shadow-xs shrink-0">
              <Star className="w-2 h-2 fill-foam" />
              <span>Special</span>
            </span>
          )}
        </div>

        {/* Dotted Leader Line */}
        <div className="flex-1 border-b border-dotted border-latte/60 mx-1.5 relative -top-1 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Right: Price + Add Button */}
        <div className="flex items-center gap-2 z-10 shrink-0 ml-auto">
          <span className="font-inter font-bold text-ink text-xs sm:text-[13px] group-hover:text-caramel transition-colors">
            {item.formattedPrice || `₹${item.price}`}
          </span>
          <button
            type="button"
            aria-label={`Add ${item.name} to order`}
            onClick={handleAdd}
            onPointerDown={(e) => e.stopPropagation()}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
              added
                ? 'bg-[#2E7D32] text-white scale-105'
                : 'bg-almond/80 hover:bg-caramel hover:text-foam text-ink'
            }`}
          >
            {added ? (
              <Check className="w-3 h-3 stroke-[3]" />
            ) : (
              <Plus className="w-3 h-3 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Muted Italic Description */}
      {item.description && (
        <p className="font-inter italic text-ink/65 text-[10.5px] sm:text-[11px] mt-0.5 pr-8 line-clamp-1">
          {item.description}
        </p>
      )}
    </div>
  );
};

export const FlipBook = () => {
  const containerRef = useRef(null);
  const flipRef = useRef(null);
  const flipInstanceRef = useRef(null);
  const rm = useReducedMotion();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState('coffee');
  const [isMobileView, setIsMobileView] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  // Listen to window size to adapt portrait vs two-page spreads
  useEffect(() => {
    const handleWinResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleWinResize);
    return () => window.removeEventListener('resize', handleWinResize);
  }, []);

  /* 7 distinct sections requested */
  const categorySections = useMemo(() => [
    { id: 'coffee', name: 'Hot Coffee', tagline: 'Single-origin espresso & velvety hand-poured roasts', items: menuData.categories.find(c => c.id === 'coffee')?.items || [] },
    { id: 'cold-coffee', name: 'Cold Coffee', tagline: 'Slow-steeped cold brews & chilled artisan frappes', items: menuData.categories.find(c => c.id === 'cold-coffee')?.items || [] },
    { id: 'tea', name: 'Tea & Beverages', tagline: 'Royal spiced kulhads, imperial leaves & floral tisanes', items: menuData.categories.find(c => c.id === 'tea')?.items || [] },
    { id: 'bakery', name: 'Bakery & Breakfast', tagline: 'Freshly baked buttery viennoiseries & morning toasts', items: menuData.categories.find(c => c.id === 'bakery')?.items || [] },
    { id: 'desserts', name: 'Desserts', tagline: 'Decadent chocolate gateaux & artisanal tiramisu', items: menuData.categories.find(c => c.id === 'desserts')?.items || [] },
    { id: 'snacks', name: 'Quick Bites', tagline: 'Gourmet pressed paninis & savoury comfort plates', items: menuData.categories.find(c => c.id === 'snacks')?.items || [] },
    { id: 'combos', name: 'Combos', tagline: 'Specially paired beverages and café favourites', items: COMBOS },
  ], []);

  /* Map each category to page index in the book */
  const categoryPageMap = useMemo(() => {
    // 0: Cover
    // 1: Hot Coffee Left (Spread 1), 2: Hot Coffee Right
    // 3: Cold Coffee Left (Spread 2), 4: Cold Coffee Right
    // 5: Tea Left (Spread 3), 6: Tea Right
    // 7: Bakery Left (Spread 4), 8: Bakery Right
    // 9: Desserts Left (Spread 5), 10: Desserts Right
    // 11: Quick Bites Left (Spread 6), 12: Quick Bites Right
    // 13: Combos Left (Spread 7), 14: Combos Right
    // 15: Back Cover (or Endpaper + Back cover)
    const map = {};
    categorySections.forEach((cat, index) => {
      // Each category gets 1 spread (2 pages). Cover is page 0.
      map[cat.id] = 1 + index * 2;
    });
    return map;
  }, [categorySections]);

  /* Build pages with paper grain texture, spine shadow, line art, and typography */
  const pages = useMemo(() => {
    const list = [];

    // PAGE 0: Front Cover - Dark Leather-like #1F1612 with Gold-Latte Embossed Logo
    list.push(
      <div
        key="front-cover"
        className="page w-full h-full bg-[#1F1612] text-foam flex flex-col items-center justify-between p-8 sm:p-12 relative overflow-hidden select-none"
        data-density="hard"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.85), inset 0 0 20px rgba(201,162,126,0.15)',
        }}
      >
        {/* Leather Grain Texture Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C9A27E 0.75px, transparent 0.75px), radial-gradient(#C9A27E 0.75px, #1F1612 0.75px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        />

        {/* Vintage Embossed Border */}
        <div className="absolute inset-4 sm:inset-6 border-[2px] border-[#C9A27E]/40 rounded-sm pointer-events-none flex items-center justify-center">
          <div className="absolute inset-1 border border-[#C9A27E]/20" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 text-center mt-4">
          <span className="text-[10px] sm:text-xs font-inter uppercase tracking-[0.35em] text-[#C9A27E] opacity-90">
            Artisan Roasters & Café
          </span>
        </div>

        {/* Center: Embossed Gold Logo */}
        <div className="relative z-10 flex flex-col items-center my-auto">
          {/* Coffee Crown / Bean Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full border border-[#C9A27E]/60 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] bg-[#1F1612]">
            <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[#C9A27E]" fill="none" strokeWidth="1.6">
              <circle cx="20" cy="20" r="14" strokeDasharray="3 3" />
              <path d="M15 15c4 0 6 5 10 5s6-5 10-5" />
              <path d="M20 10v20" />
            </svg>
          </div>

          <h1
            className="font-playfair text-3xl sm:text-5xl font-bold tracking-[0.12em] text-[#EADBC8] uppercase"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 1px #C9A27E',
            }}
          >
            Royal Bean
          </h1>
          <span className="h-0.5 w-16 bg-[#C9A27E]/60 my-3" />
          <p className="font-playfair italic text-[#C9A27E] text-sm sm:text-base tracking-widest">
            Handcrafted Menu
          </p>
        </div>

        {/* Bottom Hint */}
        <div className="relative z-10 text-center mb-2">
          <p className="text-[10px] font-inter uppercase tracking-[0.25em] text-[#EADBC8]/60">
            Talwandi, Kota • Open Daily
          </p>
          <p className="text-[9px] font-inter text-[#C9A27E]/70 mt-1">
            Click corner or swipe to open →
          </p>
        </div>
      </div>
    );

    // SPREADS: Each category has Left Page (Hero/Title) and Right Page (Item list)
    categorySections.forEach((cat) => {
      // LEFT PAGE: Title, Line-Art Icon, Tagline
      list.push(
        <div
          key={`${cat.id}-left`}
          className="page w-full h-full bg-[#FBF7F1] text-ink p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none"
          style={{
            backgroundImage: `radial-gradient(#1F1612 0.35px, transparent 0.35px)`,
            backgroundSize: '12px 12px',
          }}
        >
          {/* Page Spine Shadow (on the right for left pages in 2-page view) */}
          <div
            className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to left, rgba(31,22,18,0.12) 0%, rgba(31,22,18,0) 100%)',
            }}
          />

          {/* Top category label */}
          <div className="flex items-center justify-between border-b border-latte/30 pb-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-caramel font-inter">
              Royal Bean Selection
            </span>
            <span className="font-playfair italic text-xs text-ink/60">
              {cat.items.length} items
            </span>
          </div>

          {/* Center: Category Title in Serif + Line-Art Icon + Tagline */}
          <div className="flex flex-col items-center text-center my-auto py-6">
            <div className="w-20 h-20 rounded-full bg-almond/40 border border-latte/40 flex items-center justify-center mb-5 shadow-inner">
              <CategoryLineArt catId={cat.id} />
            </div>

            <h2 className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight mb-3">
              {cat.name}
            </h2>

            <div className="w-12 h-0.5 bg-caramel/40 mx-auto mb-4" />

            <p className="font-playfair italic text-ink/75 text-sm sm:text-base max-w-xs leading-relaxed">
              "{cat.tagline}"
            </p>
          </div>

          {/* Bottom Footer Note */}
          <div className="pt-3 border-t border-latte/20 flex items-center justify-between text-[10px] text-ink/50 font-inter">
            <span>Freshly prepared on order</span>
            <span className="italic">Page {list.length}</span>
          </div>
        </div>
      );

      // RIGHT PAGE: Item List with Dotted Leaders & Badges
      list.push(
        <div
          key={`${cat.id}-right`}
          className="page w-full h-full bg-[#FBF7F1] text-ink p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(#1F1612 0.35px, transparent 0.35px)`,
            backgroundSize: '12px 12px',
          }}
        >
          {/* Page Spine Shadow (on the left for right pages in 2-page view) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to right, rgba(31,22,18,0.12) 0%, rgba(31,22,18,0) 100%)',
            }}
          />

          {/* Page Top Header */}
          <div className="flex items-center justify-between border-b border-latte/30 pb-2 mb-3">
            <span className="font-playfair font-bold text-sm tracking-wide text-ink">
              {cat.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-caramel font-inter font-bold">
              Menu
            </span>
          </div>

          {/* Item List */}
          <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 justify-center overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
            {cat.items.map((item) => (
              <BookItemRow
                key={item.id || item.slug}
                item={item}
                addToCart={addToCart}
                onNavigate={navigate}
              />
            ))}
          </div>

          {/* Bottom allergens & page number */}
          <div className="pt-2 border-t border-latte/20 flex items-center justify-between text-[9.5px] text-ink/50 font-inter mt-auto">
            <span>Ask team for custom roasts & milks</span>
            <span className="italic">Page {list.length}</span>
          </div>
        </div>
      );
    });

    // BACK COVER - Dark Leather-like #1F1612
    list.push(
      <div
        key="back-cover"
        className="page w-full h-full bg-[#1F1612] text-foam flex flex-col items-center justify-between p-8 sm:p-12 relative overflow-hidden text-center select-none"
        data-density="hard"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.85), inset 0 0 20px rgba(201,162,126,0.15)',
        }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C9A27E 0.75px, transparent 0.75px), radial-gradient(#C9A27E 0.75px, #1F1612 0.75px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        />

        <div className="absolute inset-4 sm:inset-6 border-[2px] border-[#C9A27E]/40 rounded-sm pointer-events-none" />

        <div className="relative z-10 mt-4">
          <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-[#EADBC8] tracking-widest uppercase">
            Royal Bean
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A27E] mt-1 font-inter">
            A Haven for Coffee Lovers
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 my-auto max-w-xs text-xs font-inter text-[#EADBC8]/85">
          <div className="p-3 rounded-lg border border-[#C9A27E]/30 bg-[#1F1612]/60 w-full">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#C9A27E] mb-1">
              Visiting Hours
            </span>
            <p>Mon - Thu: 10:00 AM - 10:30 PM</p>
            <p>Fri - Sun: 9:00 AM - 11:00 PM</p>
          </div>

          <div className="p-3 rounded-lg border border-[#C9A27E]/30 bg-[#1F1612]/60 w-full">
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#C9A27E] mb-1">
              Location
            </span>
            <p>{CAFE_ADDRESS || 'Talwandi, Kota, Rajasthan'}</p>
          </div>
        </div>

        <div className="relative z-10 mb-2">
          <p className="font-playfair italic text-[#C9A27E] text-sm">
            Thank you for being part of our story.
          </p>
          <p className="text-[9px] text-[#EADBC8]/50 mt-1 font-inter">
            Ingredients & allergens: please consult our team.
          </p>
        </div>
      </div>
    );

    return list;
  }, [categorySections, addToCart, navigate]);

  /* Initialize PageFlip */
  useEffect(() => {
    let animId = null;
    let attempts = 0;

    const setupFlip = () => {
      if (!containerRef.current || flipInstanceRef.current) return;
      const el = containerRef.current;

      if (el.clientWidth === 0 || el.clientHeight === 0) {
        if (attempts < 25) {
          attempts += 1;
          animId = requestAnimationFrame(setupFlip);
        }
        return;
      }

      document.fonts.ready.then(() => {
        if (!containerRef.current || flipInstanceRef.current) return;

        try {
          const isMobile = window.innerWidth < 768;
          const bookWidth = isMobile ? 340 : 460;
          const bookHeight = isMobile ? 540 : 640;

          const flip = new PageFlip(containerRef.current, {
            width: bookWidth,
            height: bookHeight,
            size: "stretch",
            minWidth: 260,
            maxWidth: 540,
            minHeight: 400,
            maxHeight: 740,
            showCover: true,
            maxShadowOpacity: 0.5,
            drawShadow: true,
            flippingTime: rm ? 1 : 850,
            usePortrait: isMobile,
            startPage: 0,
            mobileScrollSupport: true,
            clickEventForward: true,
            useMouseEvents: !rm,
            swipeDistance: rm ? 0 : 25,
            showPageCorners: !rm,
          });

          flip.loadFromHTML(Array.from(containerRef.current.children));
          flipInstanceRef.current = flip;
          flipRef.current = flip;

          setTotalPages(flip.getPageCount());

          flip.on('flip', (e) => {
            const pageNum = e.data;
            setCurrentPage(pageNum);

            if (pageNum === 0) {
              setActiveCategoryTab('');
            } else {
              for (const cat of categorySections) {
                const targetPage = categoryPageMap[cat.id];
                if (pageNum >= targetPage && pageNum <= targetPage + 1) {
                  setActiveCategoryTab(cat.id);
                  break;
                }
              }
            }
          });
        } catch (err) {
          console.error('PageFlip initialization error:', err);
          flipInstanceRef.current = null;
        }
      });
    };

    setupFlip();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      try {
        if (flipInstanceRef.current) {
          flipInstanceRef.current.destroy();
        }
      } catch {
        // cleanup
      }
      flipInstanceRef.current = null;
      flipRef.current = null;
    };
  }, [pages.length, rm, categorySections, categoryPageMap]);

  /* Keyboard Arrow Navigation */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!flipRef.current) return;
      if (e.key === 'ArrowLeft') {
        flipRef.current.flipPrev();
      } else if (e.key === 'ArrowRight') {
        flipRef.current.flipNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* Jump to Category Bookmark */
  const jumpToCategory = (catId) => {
    const targetPage = categoryPageMap[catId];
    if (targetPage !== undefined && flipRef.current) {
      flipRef.current.flip(targetPage);
      setActiveCategoryTab(catId);
    }
  };

  return (
    <div id="royal-menu-book" className="w-full flex flex-col items-center relative py-6">
      {/* Category Bookmark Tabs (Floating Edge Bar / Sticky Chips) */}
      <div className="w-full max-w-4xl px-4 mb-6 z-20">
        <div
          className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto py-2 px-3 bg-foam/90 backdrop-blur-md rounded-full border border-latte/40 shadow-sm"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categorySections.map((cat) => {
            const isActive = activeCategoryTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => jumpToCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-inter font-bold tracking-wide transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-caramel text-foam shadow-sm'
                    : 'bg-almond/30 text-ink/75 hover:bg-almond hover:text-ink'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Frame with Soft Spine Shadow and Realistic Curl Space */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-12 md:px-20 py-4 overflow-visible">
        {/* Soft Ambient Depth under the book */}
        <div
          className="absolute inset-x-8 sm:inset-x-24 bottom-2 h-10 bg-ink/15 rounded-full blur-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* The 3D Book Container */}
        <div
          ref={containerRef}
          className="relative z-10 drop-shadow-[0_25px_50px_rgba(31,22,18,0.22)] w-full aspect-[1.42/1] min-h-[460px] max-h-[720px] bg-[#1F1612] rounded-sm"
          style={{ height: '100%' }}
        >
          {pages.map((page) => (
            <div key={page.key} className="page w-full h-full" style={{ width: '100%', height: '100%' }}>
              {page}
            </div>
          ))}
        </div>
      </div>

      {/* Controls Bar: Prev, Page Indicator, Next */}
      <div className="flex items-center gap-6 z-20 mt-6 bg-foam/95 backdrop-blur-sm px-6 py-2.5 rounded-full border border-latte/40 shadow-sm">
        <button
          type="button"
          onClick={() => flipRef.current?.flipPrev()}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className="w-9 h-9 rounded-full bg-almond hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-almond disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <span className="font-inter text-xs sm:text-sm font-semibold text-ink/80 tracking-wider min-w-[90px] text-center select-none">
          Page {currentPage + 1} / {totalPages || pages.length}
        </span>

        <button
          type="button"
          onClick={() => flipRef.current?.flipNext()}
          disabled={currentPage >= (totalPages || pages.length) - (isMobileView ? 1 : 2)}
          aria-label="Next page"
          className="w-9 h-9 rounded-full bg-almond hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-almond disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel active:scale-95"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};

export default FlipBook;
