import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { useReducedMotion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  Sparkles
} from 'lucide-react';
import { menuData } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import DietBadge from '../DietBadge';
import { OPENING_HOURS, CAFE_ADDRESS } from '../../config';
import { TatvaCrest } from '../Logo';

// Synthesized Realistic Paper Flutter / Page Turn Sound via Web Audio API
const playPageTurnSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const duration = 0.22;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t, 0.7);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.16;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.onended = () => {
      ctx.close().catch(() => {});
    };
  } catch {
    // Audio unavailable or blocked by browser policy
  }
};

// Ornate Corner Brass Flourish
const CornerFlourish = ({ position = 'top-left' }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right': return 'rotate-90 top-1 right-1';
      case 'bottom-right': return 'rotate-180 bottom-1 right-1';
      case 'bottom-left': return '-rotate-90 bottom-1 left-1';
      default: return 'top-1 left-1';
    }
  };

  return (
    <div className={`absolute pointer-events-none w-5 h-5 text-caramel/50 ${getRotation()}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M2 12C2 6.477 6.477 2 12 2" strokeLinecap="round" />
        <path d="M2 2L8 8" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <path d="M2 6C3 6 4 5 4 4" strokeLinecap="round" />
        <path d="M6 2C6 3 5 4 4 4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Aesthetic Minimalist TATVA Divider
const TatvaDivider = () => (
  <div className="flex items-center justify-center gap-2 my-2 w-full opacity-70">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-caramel/40 to-caramel/60" />
    <span className="text-[9px] text-caramel tracking-[0.3em] font-serif uppercase select-none">✦ TATVA ✦</span>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-caramel/40 to-caramel/60" />
  </div>
);

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349, badge: 'Popular' },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359, badge: 'Favorite' },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Tea Time Combo', description: 'Royal Masala Chai + Paneer Tikka Panini', price: 269, badge: 'Classic' },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Combo', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589, badge: 'Bestseller' },
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
    <div className="flex flex-col mb-3 group transition-colors duration-150">
      <div className="flex items-end w-full">
        <div className="flex items-center gap-1.5 z-10 pr-2 shrink-0 max-w-[65%]">
          {item.diet && <DietBadge diet={item.diet} size="sm" />}
          <a 
            href={`/menu/${item.slug}`} 
            className="font-playfair font-semibold text-ink text-sm sm:text-[15px] group-hover:text-caramel transition-colors truncate"
            onClick={e => e.stopPropagation()}
            title={item.name}
          >
            {item.name}
          </a>
          {item.badge && (
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider bg-caramel/10 text-caramel px-1.5 py-0.5 rounded font-inter font-medium shrink-0">
              {item.badge}
            </span>
          )}
        </div>
        
        {/* Fine Dotted Leader Line */}
        <div className="flex-1 border-b-2 border-dotted border-caramel/30 mx-1.5 relative top-[-4px]" />
        
        <div className="flex items-center gap-2 z-10 pl-1 shrink-0">
          {item.price && (
            <span className="font-inter font-bold text-caramel text-sm sm:text-base tracking-tight">
              {item.formattedPrice || `₹${item.price}`}
            </span>
          )}
          <button
            type="button"
            aria-label={`Add ${item.name} to order`}
            onClick={handleAdd}
            onPointerDown={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full ${
              added ? 'bg-[#2E7D32] text-white scale-110 shadow-sm' : 'bg-almond/80 hover:bg-caramel hover:text-foam text-ink border border-caramel/20'
            } flex items-center justify-center transition-all duration-200 pointer-events-auto shrink-0`}
          >
            {added ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span className="font-bold text-xs leading-none relative -top-[0.5px]">+</span>
            )}
          </button>
        </div>
      </div>
      {item.description && (
        <p className="font-inter text-ink/65 text-[11px] sm:text-xs mt-0.5 pr-8 line-clamp-1 italic">
          {item.description}
        </p>
      )}
    </div>
  );
};

export const FlipMenu = () => {
  const containerRef = useRef(null);
  const flipRef = useRef(null);
  const rm = useReducedMotion();
  const { addToCart } = useCart();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCornerHint, setShowCornerHint] = useState(true);

  const initAttemptsRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const flipInstanceRef = useRef(null);
  const initFnRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Jump to specific page
  const jumpToPage = useCallback((targetPage) => {
    if (!flipRef.current) return;
    try {
      if (soundEnabled) playPageTurnSound();
      flipRef.current.flip(targetPage, 'bottom');
    } catch {
      flipRef.current.turnToPage(targetPage);
    }
  }, [soundEnabled]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      if (!flipRef.current) return;
      const count = flipRef.current.getPageCount();
      const current = flipRef.current.getCurrentPageIndex();
      if (current >= count - 2) {
        flipRef.current.flip(0, 'bottom');
      } else {
        if (soundEnabled) playPageTurnSound();
        flipRef.current.flipNext('bottom');
      }
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, soundEnabled]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    const el = document.getElementById('tatva-menu-book-wrapper');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Category definitions for quick bookmark tabs
  const BOOK_CATEGORIES = [
    { title: 'Cover', page: 0, icon: '📖' },
    { title: 'Coffee', page: 1, icon: '☕' },
    { title: 'Cold Brew', page: 2, icon: '🧊' },
    { title: 'Teas', page: 3, icon: '🍵' },
    { title: 'Bakes & Bites', page: 4, icon: '🥐' },
    { title: 'Combos', page: 5, icon: '🏷️' },
    { title: 'Desserts', page: 6, icon: '🍰' },
    { title: 'Visit Us', page: 7, icon: '📍' },
  ];

  // Build the 8 Masterpiece Book Pages
  const pages = useMemo(() => {
    const bookPages = [];

    // PAGE 0 (Spread 0 Left): Grand Frontispiece & Menu Directory
    bookPages.push(
      <div 
        key="cover-spread-left" 
        className="page w-full h-full book-paper-texture book-gutter-left p-6 sm:p-9 relative flex flex-col justify-between overflow-hidden select-none"
        data-density="soft"
      >
        <div className="page-filigree-border w-full h-full p-4 sm:p-6 flex flex-col justify-between relative bg-foam/30">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          {/* Header Crest */}
          <div className="flex flex-col items-center text-center pt-1">
            <TatvaCrest size={46} className="text-caramel mb-1.5" />
            <span className="text-[9.5px] uppercase font-bold tracking-[0.3em] text-latte font-inter">
              ESTD. 2024 • TALWANDI, KOTA
            </span>
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-ink tracking-[0.16em] mt-0.5">
              TATVA
            </h1>
            <p className="font-playfair italic text-ink/75 text-xs sm:text-sm mt-0.5">
              Artisan Coffee, Patisserie &amp; Contemporary Lounge
            </p>
            <TatvaDivider />
          </div>

          {/* Curated Table of Contents (Directory) */}
          <div className="flex-1 my-3 flex flex-col justify-center px-1 sm:px-3">
            <div className="text-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 font-inter">
                — Compendium Index —
              </span>
            </div>

            <div className="flex flex-col gap-2 font-inter text-xs sm:text-[13px]">
              <div 
                onClick={() => jumpToPage(1)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>☕</span> Hot Espresso &amp; Artisan Brews
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page I</span>
              </div>

              <div 
                onClick={() => jumpToPage(2)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>🧊</span> Chilled Frappés &amp; Nitro Brews
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page II</span>
              </div>

              <div 
                onClick={() => jumpToPage(3)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>🍵</span> Royal Kulhad Chai &amp; Tisanes
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page III</span>
              </div>

              <div 
                onClick={() => jumpToPage(4)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>🥐</span> Sourdough Bakes &amp; Paninis
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page IV</span>
              </div>

              <div 
                onClick={() => jumpToPage(5)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>🏷️</span> Curated Sharing Combos
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page V</span>
              </div>

              <div 
                onClick={() => jumpToPage(6)}
                className="flex items-baseline justify-between cursor-pointer hover:text-caramel transition-colors group"
              >
                <span className="font-medium flex items-center gap-1.5">
                  <span>🍰</span> Belgian Pastries &amp; Desserts
                </span>
                <span className="flex-1 border-b border-dotted border-caramel/30 mx-2" />
                <span className="font-serif italic text-caramel group-hover:underline">Page VI</span>
              </div>
            </div>
          </div>

          {/* Footer Artisanal Promise */}
          <div className="text-center pt-2 border-t border-caramel/20">
            <p className="font-playfair italic text-[11px] sm:text-xs text-ink/75 leading-relaxed">
              "Crafted with 100% single-origin Arabica. Every sip feels like home."
            </p>
            <span className="text-[10px] text-caramel font-semibold uppercase tracking-widest mt-1 inline-block">
              Turn page to begin ➔
            </span>
          </div>
        </div>
      </div>
    );

    // Helper for category pages
    const renderCategoryPage = ({ cat, pageIndex, isEven = false, customTitle, customDesc }) => {
      const items = cat.items || [];
      const title = customTitle || cat.name;
      const desc = customDesc || cat.description;
      const gutterClass = isEven ? 'book-gutter-left' : 'book-gutter-right';
      const romanPage = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][pageIndex - 1] || `${pageIndex}`;

      return (
        <div 
          key={`page-${cat.id || pageIndex}`} 
          className={`page w-full h-full book-paper-texture ${gutterClass} p-6 sm:p-9 relative flex flex-col justify-between overflow-hidden select-none`}
          data-density="soft"
        >
          <div className="page-filigree-border w-full h-full p-4 sm:p-6 flex flex-col justify-between relative bg-foam/20">
            <CornerFlourish position="top-left" />
            <CornerFlourish position="top-right" />
            <CornerFlourish position="bottom-left" />
            <CornerFlourish position="bottom-right" />

            {/* Category Header */}
            <div className="text-center mb-2">
              <span className="text-[9px] uppercase tracking-[0.28em] text-latte font-bold font-inter">
                TATVA • CURATED COLLECTION
              </span>
              <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-ink tracking-tight mt-0.5">
                {title}
              </h2>
              {desc && (
                <p className="font-playfair italic text-ink/70 text-xs mt-1 line-clamp-1 max-w-[90%] mx-auto">
                  {desc}
                </p>
              )}
              <TatvaDivider />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col flex-1 justify-center my-1">
              {items.map(item => (
                <FlipItemRow key={item.id || item.slug} item={item} addToCart={addToCart} />
              ))}
            </div>

            {/* Page Bottom Lining */}
            <div className="flex items-center justify-between pt-2 border-t border-caramel/20 text-[10px] text-ink/50 font-inter">
              <span className="tracking-wider uppercase text-[9px]">Handcrafted Fresh</span>
              <span className="font-playfair italic text-xs text-caramel font-medium tracking-widest">
                — Page {romanPage} —
              </span>
              <span className="tracking-wider uppercase text-[9px]">Talwandi, Kota</span>
            </div>
          </div>
        </div>
      );
    };

    // PAGE 1 (Spread 0 Right): Hot Coffee
    const coffeeCat = menuData.categories.find(c => c.id === 'coffee') || menuData.categories[0];
    bookPages.push(
      renderCategoryPage({ cat: coffeeCat, pageIndex: 1, isEven: false, customTitle: 'Coffee & Espresso' })
    );

    // PAGE 2 (Spread 1 Left): Cold Coffee
    const coldCat = menuData.categories.find(c => c.id === 'cold-coffee') || menuData.categories[1];
    bookPages.push(
      renderCategoryPage({ cat: coldCat, pageIndex: 2, isEven: true, customTitle: 'Chilled & Cold Brew' })
    );

    // PAGE 3 (Spread 1 Right): Tea & Infusions
    const teaCat = menuData.categories.find(c => c.id === 'tea') || menuData.categories[2];
    bookPages.push(
      renderCategoryPage({ cat: teaCat, pageIndex: 3, isEven: false, customTitle: 'Artisan Teas & Chai' })
    );

    // PAGE 4 (Spread 2 Left): Snacks & Bakes
    const snacksCat = menuData.categories.find(c => c.id === 'snacks') || menuData.categories[3];
    bookPages.push(
      renderCategoryPage({ cat: snacksCat, pageIndex: 4, isEven: true, customTitle: 'Fresh Bakes & Savory' })
    );

    // PAGE 5 (Spread 2 Right): Combos & Sharing Platters
    bookPages.push(
      renderCategoryPage({ 
        cat: { id: 'combos', name: 'Curated Combos', description: 'Chef-paired favorites designed for sharing and savoring', items: COMBOS }, 
        pageIndex: 5, 
        isEven: false, 
        customTitle: 'Chef’s Curated Combos' 
      })
    );

    // PAGE 6 (Spread 3 Left): Desserts
    const dessertsCat = menuData.categories.find(c => c.id === 'desserts') || menuData.categories[4];
    bookPages.push(
      renderCategoryPage({ cat: dessertsCat, pageIndex: 6, isEven: true, customTitle: 'Desserts & Patisserie' })
    );

    // PAGE 7 (Spread 3 Right): Grand Finale & Back Cover
    bookPages.push(
      <div 
        key="back-cover" 
        className="page w-full h-full book-paper-texture book-gutter-right p-6 sm:p-9 relative flex flex-col justify-between overflow-hidden select-none"
        data-density="soft"
      >
        <div className="page-filigree-border w-full h-full p-4 sm:p-6 flex flex-col justify-between relative bg-foam/30">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          {/* Header */}
          <div className="text-center pt-2">
            <TatvaCrest size={40} className="text-caramel mx-auto mb-1.5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-latte font-inter">
              Warmest Welcome
            </span>
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-ink tracking-tight mt-0.5">
              Thank You
            </h2>
            <p className="font-playfair italic text-ink/75 text-xs sm:text-sm mt-0.5">
              From our sanctuary to your coffee moments.
            </p>
            <TatvaDivider />
          </div>

          {/* Cafe Information & Cards */}
          <div className="flex flex-col gap-3 my-2 text-ink/80 text-xs font-inter">
            {OPENING_HOURS && (
              <div className="p-3 bg-almond/25 rounded-md border border-caramel/20 flex flex-col items-center text-center">
                <span className="font-bold text-caramel uppercase text-[10px] tracking-widest mb-1 flex items-center gap-1">
                  <span>⏱</span> Operating Hours
                </span>
                <p className="font-medium text-ink">Mon - Thu: 10:00 AM – 10:30 PM</p>
                <p className="font-medium text-ink">Fri - Sun: 9:00 AM – 11:00 PM</p>
              </div>
            )}

            {CAFE_ADDRESS && (
              <div className="p-3 bg-almond/25 rounded-md border border-caramel/20 flex flex-col items-center text-center">
                <span className="font-bold text-caramel uppercase text-[10px] tracking-widest mb-1 flex items-center gap-1">
                  <span>📍</span> Talwandi Sanctuary
                </span>
                <p className="font-medium text-ink max-w-[240px] leading-relaxed">
                  {CAFE_ADDRESS}
                </p>
              </div>
            )}

            {/* Amenities badge bar */}
            <div className="flex items-center justify-center gap-3 text-[11px] text-ink/70 pt-1">
              <span className="flex items-center gap-1">📶 Free High-Speed Wi-Fi</span>
              <span>•</span>
              <span className="flex items-center gap-1">🐾 Pet Friendly Patio</span>
            </div>
          </div>

          {/* Authenticity Seal */}
          <div className="text-center pt-2 border-t border-caramel/20 flex flex-col items-center">
            <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-caramel tracking-widest">
              <span>⚜</span> 100% Single-Origin Certified <span>⚜</span>
            </div>
            <p className="text-[10px] text-ink/50 mt-1 font-inter">
              Allergens notice: please inform our baristas before placing custom orders.
            </p>
          </div>
        </div>
      </div>
    );

    return bookPages;
  }, [addToCart, jumpToPage]);

  // Initialize PageFlip
  const initializePageFlip = useCallback(() => {
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
          width: 460,
          height: 640,
          size: "stretch",
          minWidth: 280,
          maxWidth: 540,
          minHeight: 420,
          maxHeight: 740,
          showCover: false, // Ensures both Left and Right pages are shown on every spread!
          maxShadowOpacity: 0.65,
          drawShadow: true,
          flippingTime: rm ? 1 : 850,
          usePortrait: true,
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
          setCurrentPage(e.data);
          if (soundEnabled) {
            playPageTurnSound();
          }
          setShowCornerHint(false);
        });

      } catch (e) {
        console.error("PageFlip init failed", e);
        flipInstanceRef.current = null;
      }
    });
  }, [rm, soundEnabled]);

  // Safe init
  useEffect(() => {
    initFnRef.current = initializePageFlip;
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

  // Resize handler
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!flipRef.current) return;
      if (e.key === 'ArrowLeft') {
        if (soundEnabled) playPageTurnSound();
        flipRef.current.flipPrev('bottom');
      }
      if (e.key === 'ArrowRight') {
        if (soundEnabled) playPageTurnSound();
        flipRef.current.flipNext('bottom');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  const handleNextPage = () => {
    if (!flipRef.current) return;
    if (soundEnabled) playPageTurnSound();
    flipRef.current.flipNext('bottom');
  };

  const handlePrevPage = () => {
    if (!flipRef.current) return;
    if (soundEnabled) playPageTurnSound();
    flipRef.current.flipPrev('bottom');
  };

  return (
    <div 
      id="tatva-menu-book-wrapper"
      className="w-full flex flex-col items-center relative py-4 select-none"
    >
      {/* Title Header above the book */}
      <div className="text-center mb-6 relative z-10 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-[11px] font-bold tracking-[0.25em] uppercase font-inter mb-2">
          <Sparkles className="w-3.5 h-3.5 text-caramel" />
          <span>TATVA Interactive Compendium</span>
        </div>
        <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ink tracking-[0.08em] flex items-center justify-center gap-2">
          The TATVA Menu Book
        </h2>
        <p className="text-xs sm:text-sm text-ink/70 font-inter mt-1 max-w-md mx-auto">
          Turn authentic artisan pages, explore botanical brews, and add favorites directly to your order.
        </p>
      </div>

      {/* Bookmark Ribbon Tabs for Quick Section Jumps */}
      <div className="w-full max-w-5xl px-6 md:px-16 flex items-center justify-center gap-1 sm:gap-2 mb-[-6px] relative z-20 overflow-x-auto scrollbar-none py-1">
        {BOOK_CATEGORIES.map((cat) => {
          const isActive = currentPage === cat.page || (currentPage === cat.page + 1 && cat.page % 2 === 0);
          return (
            <button
              key={cat.title}
              onClick={() => jumpToPage(cat.page)}
              className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-t-lg font-inter text-xs font-semibold transition-all duration-200 border-t border-x ${
                isActive
                  ? 'bg-[#FAF5ED] text-caramel border-caramel/50 shadow-sm translate-y-[-2px]'
                  : 'bg-[#2E1F16] text-foam/80 hover:text-foam border-white/10 hover:bg-[#3D2B20]'
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Physical Hardcover Leather Folio Outer Casing */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-12 pb-6 pt-2 overflow-visible">
        <div className="relative w-full p-2.5 sm:p-4 rounded-2xl leather-folio-casing border border-[#4A3022]/80">
          
          {/* Antique Rose-Gold Corner Brackets */}
          <div className="absolute top-1 left-1 w-6 h-6 rounded-tl-lg border-t-2 border-l-2 border-[#C48B9F] shadow-[inset_1px_1px_0_rgba(255,255,255,0.4)] pointer-events-none" />
          <div className="absolute top-1 right-1 w-6 h-6 rounded-tr-lg border-t-2 border-r-2 border-[#C48B9F] shadow-[inset_-1px_1px_0_rgba(255,255,255,0.4)] pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-6 h-6 rounded-bl-lg border-b-2 border-l-2 border-[#C48B9F] shadow-[inset_1px_-1px_0_rgba(255,255,255,0.4)] pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-br-lg border-b-2 border-r-2 border-[#C48B9F] shadow-[inset_-1px_-1px_0_rgba(255,255,255,0.4)] pointer-events-none" />

          {/* Radiant Rose Silk Bookmark Ribbon Hanging from Top Spine */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-14 bg-gradient-to-b from-[#EA5C89] to-[#C43E69] rounded-b shadow-md z-30 pointer-events-none flex flex-col justify-end">
            <div className="w-full h-2 bg-[#C43E69] clip-ribbon-tail" />
          </div>

          {/* 3D Stacked Deckle Paper Outer Edges Wrapper */}
          <div className="relative w-full rounded-lg overflow-hidden deckle-edge-left deckle-edge-right">
            
            {/* The Book Stage */}
            <div 
              ref={containerRef} 
              className="relative z-10 w-full aspect-[1.44/1] min-h-[440px] max-h-[740px] md:min-h-[540px] md:max-h-[740px]"
              style={{ height: '100%' }}
            >
              {pages.map((page) => (
                <div key={page.key} className="page w-full h-full" style={{ width: '100%', height: '100%' }}>
                  {page}
                </div>
              ))}
            </div>

            {/* 3D Center Spine Crease Seam Overlay */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 book-spine-crease z-20 pointer-events-none hidden md:block">
              {/* Dashed Sewn Thread Stitch Line down the exact fold */}
              <div className="w-[1px] h-full mx-auto border-r border-dashed border-[#8C6D23]/50" />
            </div>

            {/* Interactive Corner Curl Hint */}
            {showCornerHint && currentPage === 0 && (
              <div 
                onClick={handleNextPage}
                className="absolute bottom-3 right-3 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-caramel text-foam text-xs font-semibold shadow-lg cursor-pointer corner-curl-hint hover:scale-105 transition-transform"
              >
                <span>Click corner to turn page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Master Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 z-20 mt-2 bg-foam/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-caramel/30 shadow-md">
        
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className="w-9 h-9 rounded-full bg-almond/80 hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-almond/80 disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Page / Spread Indicator */}
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="font-playfair font-bold text-sm text-ink">
            Pages {currentPage + 1} - {Math.min(currentPage + 2, totalPages || 8)}
          </span>
          <span className="text-[10px] text-ink/60 uppercase tracking-widest font-inter">
            of {totalPages || 8} pages
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage >= (totalPages || 8) - (rm ? 1 : 2)}
          aria-label="Next page"
          className="w-9 h-9 rounded-full bg-almond/80 hover:bg-caramel hover:text-foam text-ink flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-almond/80 disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="h-4 w-[1px] bg-caramel/30 hidden sm:block" />

        {/* Audio Sound Toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playPageTurnSound();
          }}
          title={soundEnabled ? 'Mute Page Flip Sound' : 'Enable Page Flip Sound'}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter font-medium transition-colors ${
            soundEnabled ? 'bg-caramel/15 text-caramel' : 'bg-ink/5 text-ink/60 hover:text-ink'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
        </button>

        {/* Auto Play / Presentation Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          title={isAutoPlay ? 'Pause Auto Flip' : 'Start Auto Flip'}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter font-medium transition-colors ${
            isAutoPlay ? 'bg-caramel text-foam shadow-sm' : 'bg-ink/5 text-ink/60 hover:text-ink'
          }`}
        >
          {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isAutoPlay ? 'Playing' : 'Auto Flip'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          className="w-8 h-8 rounded-full bg-ink/5 hover:bg-caramel hover:text-foam text-ink/70 flex items-center justify-center transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default FlipMenu;

