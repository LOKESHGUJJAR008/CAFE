import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { useReducedMotion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
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

// Editorial Food & Sanctuary Photography Assets
import coffeePhoto from '../../assets/images/gallery/slow-mornings/01-marble-latte-croissant.png';
import coldCoffeePhoto from '../../assets/images/gallery/sweet-cravings/02-topview-dessert-latte.png';
import teaPhoto from '../../assets/images/gallery/late-night/01-lamp-steam-book.png';
import bakeryPhoto from '../../assets/images/about-latte-detail.jpg';
import combosPhoto from '../../assets/images/gallery/slow-mornings/03-latte-heart-croissant.png';
import dessertsPhoto from '../../assets/images/gallery/sweet-cravings/01-dessert-espresso-terracotta.png';
import sanctuaryPhoto from '../../assets/images/tatva-cafe-inner-lounge.jpg';

// Synthesized Realistic Paper Flutter / Page Turn Sound via Web Audio API
let sharedAudioCtx = null;
const getAudioContext = () => {
  try {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
};

const playPageTurnSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const duration = 0.2;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t, 0.7);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.14;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Audio unavailable or blocked by browser policy
  }
};

// Ornate Corner Brass Flourish
const CornerFlourish = ({ position = 'top-left' }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right': return 'rotate-90 top-1.5 right-1.5';
      case 'bottom-right': return 'rotate-180 bottom-1.5 right-1.5';
      case 'bottom-left': return '-rotate-90 bottom-1.5 left-1.5';
      default: return 'top-1.5 left-1.5';
    }
  };

  return (
    <div className={`absolute pointer-events-none w-5 h-5 text-[#B69A68]/60 ${getRotation()}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
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
  <div className="flex items-center justify-center gap-2 my-1.5 w-full opacity-75">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B69A68]/40 to-[#B69A68]/70" />
    <span className="text-[8.5px] text-[#A8612E] tracking-[0.3em] font-serif uppercase select-none font-bold">
      ✦ TATVA ✦
    </span>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B69A68]/40 to-[#B69A68]/70" />
  </div>
);

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349, formattedPrice: '₹349', badge: 'Signature Pairing', bestseller: true, diet: 'veg', ingredients: ['Royal Cappuccino', 'Sourdough Toast'] },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Platter', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589, formattedPrice: '₹589', badge: 'Bestseller', bestseller: true, diet: 'veg', ingredients: ['2x Iced Latte', 'Truffle Fries', 'Cheese Poppers'] },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359, formattedPrice: '₹359', badge: 'Favorite', bestseller: false, diet: 'unconfirmed', ingredients: ['Caramel Frappé', 'Belgian Pastry'] },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Royal Tea Time Combo', description: 'Royal Masala Chai + Smoked Paneer Tikka Panini', price: 269, formattedPrice: '₹269', badge: 'Classic', bestseller: false, diet: 'veg', ingredients: ['Kulhad Chai', 'Paneer Panini'] },
];

// Helper to sort category items with star/bestseller dishes having highest priority
const sortCategoryItems = (items = []) => {
  return [...items].sort((a, b) => {
    const aBest = a.bestseller || a.badge === 'Bestseller' ? 4 : 0;
    const bBest = b.bestseller || b.badge === 'Bestseller' ? 4 : 0;
    const aSig = a.badge === 'Signature' || a.badge === "Barista's Choice" ? 3 : 0;
    const bSig = b.badge === 'Signature' || b.badge === "Barista's Choice" ? 3 : 0;
    const aBadge = a.badge ? 1 : 0;
    const bBadge = b.badge ? 1 : 0;
    return (bBest + bSig + bBadge) - (aBest + aSig + aBadge);
  });
};

// Star Selection Hero Dish Display on each Category Page
const PriorityStarDishCard = ({ item }) => {
  const { addToCart } = useCart();
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

  const isVeg = item.diet === 'veg';

  return (
    <div 
      className={`priority-star-dish relative mb-1.5 p-2 sm:p-2.5 rounded-md border border-[#B69A68]/45 bg-[#FAF6F0] shadow-[0_2px_8px_rgba(56,39,31,0.06)] group hover:border-[#B69A68] hover:shadow-[0_4px_12px_rgba(56,39,31,0.12)] transition-all duration-200 select-auto shrink-0 ${
        isVeg ? 'veg-dish' : 'non-veg-dish'
      }`}
    >
      {/* Top Banner Row: Signature Pill & Badge */}
      <div className="flex items-center justify-between gap-1.5 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-[0.14em] bg-[#38271F] text-[#FBF7F1] shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-[#B69A68]" />
            <span>Chef's Signature</span>
          </span>
          {item.badge && item.badge !== 'Bestseller' && (
            <span className="text-[8px] uppercase tracking-wider bg-[#B69A68]/15 text-[#594132] font-semibold px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          )}
        </div>
        <span className="text-[8px] uppercase tracking-widest text-[#A8612E] font-bold font-inter">
          ★ Star Choice
        </span>
      </div>

      {/* Main Title, Diet & Price Action */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0 pr-1">
          {item.diet && <DietBadge diet={item.diet} size="sm" />}
          <a 
            href={`/menu/${item.slug}`}
            onClick={e => e.stopPropagation()}
            className="font-playfair font-bold text-[#38271F] text-xs sm:text-[14px] group-hover:text-[#A8612E] transition-colors truncate"
            title={item.name}
          >
            {item.name}
          </a>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-inter font-bold text-[#A8612E] text-xs sm:text-sm tracking-tight">
            {item.formattedPrice || `₹${item.price}`}
          </span>
          <button
            type="button"
            aria-label={`Add ${item.name} to order`}
            onClick={handleAdd}
            onPointerDown={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            className={`px-2 py-0.5 rounded-full text-[10px] font-inter font-bold transition-all duration-200 pointer-events-auto flex items-center gap-1 shadow-xs active:scale-90 ${
              added 
                ? 'bg-[#2E7D32] text-white scale-105' 
                : 'bg-[#A8612E] hover:bg-[#8C4E22] text-[#FBF7F1] hover:shadow-xs'
            }`}
          >
            {added ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-2.5 h-2.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                <span className="text-xs leading-none">+</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold">Order</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Description */}
      {item.description && (
        <p className="font-inter text-[#594132]/80 text-[10px] sm:text-[10.5px] mt-0.5 pr-2 line-clamp-1 italic">
          {item.description}
        </p>
      )}

      {/* Tasting notes / ingredients pills */}
      {item.ingredients && item.ingredients.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 mt-1 pt-1 border-t border-[#B69A68]/20 text-[8.5px] text-[#594132]/75 font-inter">
          <span className="uppercase tracking-wider text-[#A8612E] font-bold text-[8px]">Notes:</span>
          {item.ingredients.slice(0, 3).map((ing) => (
            <span key={ing} className="bg-[#B69A68]/15 text-[#594132] px-1 py-0.2 rounded text-[8px] font-medium">
              {ing}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const FlipItemRow = ({ item, isPriority = false }) => {
  const { addToCart } = useCart();
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

  const isVeg = item.diet === 'veg';

  return (
    <div className={`flex flex-col mb-1.5 group transition-all duration-150 rounded px-1.5 py-0.5 hover:bg-[#B69A68]/10 select-auto ${
      isPriority ? 'priority-dish' : 'non-priority-dish'
    } ${isVeg ? 'veg-dish' : 'non-veg-dish'}`}>
      <div className="flex items-end w-full">
        <div className="flex items-center gap-1.5 z-10 pr-2 shrink-0 max-w-[65%] group-hover:translate-x-0.5 transition-transform">
          {item.diet && <DietBadge diet={item.diet} size="sm" />}
          <a 
            href={`/menu/${item.slug}`} 
            className="font-playfair font-medium text-[#38271F] text-xs sm:text-[13.5px] group-hover:text-[#A8612E] transition-colors truncate"
            onClick={e => e.stopPropagation()}
            title={item.name}
          >
            {item.name}
          </a>
          {item.badge && (
            <span className="hidden sm:inline-block text-[8px] uppercase tracking-wider bg-[#B69A68]/15 text-[#594132] border border-[#B69A68]/30 px-1 py-0.2 rounded font-inter font-bold shrink-0">
              {item.badge === 'Bestseller' ? '★ Bestseller' : item.badge}
            </span>
          )}
        </div>
        
        {/* Fine Dotted Leader Line */}
        <div className="flex-1 border-b border-dotted border-[#B69A68]/40 mx-1.5 relative top-[-4px] group-hover:border-[#B69A68]/70 transition-colors" />
        
        <div className="flex items-center gap-1.5 z-10 pl-1 shrink-0">
          {item.price && (
            <span className="font-inter font-bold text-[#38271F] text-xs sm:text-[13px] tracking-tight">
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
            className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full ${
              added ? 'bg-[#2E7D32] text-white scale-110 shadow-sm' : 'bg-[#EADBC8]/70 hover:bg-[#A8612E] hover:text-[#FBF7F1] text-[#38271F] border border-[#B69A68]/30'
            } flex items-center justify-center transition-all duration-200 pointer-events-auto shrink-0 active:scale-90`}
          >
            {added ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-2.5 h-2.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span className="font-bold text-[11px] leading-none relative -top-[0.5px]">+</span>
            )}
          </button>
        </div>
      </div>
      {item.description && (
        <p className="font-inter text-[#594132]/75 text-[10px] sm:text-[10.5px] mt-0.2 pr-6 line-clamp-1 italic">
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCornerHint, setShowCornerHint] = useState(true);
  const [curatedFilter, setCuratedFilter] = useState('all'); // 'all' | 'signature' | 'veg'

  const initAttemptsRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const flipInstanceRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Jump to specific page
  const jumpToPage = useCallback((targetPage) => {
    if (!flipRef.current) return;
    if (flipRef.current.getCurrentPageIndex() === targetPage) return;
    try {
      flipRef.current.flip(targetPage, 'bottom');
    } catch {
      flipRef.current.turnToPage(targetPage);
    }
  }, []);

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
        playPageTurnSound();
        flipRef.current.flipNext('bottom');
      }
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay]);

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
    { title: 'Sanctuary', page: 7, icon: '📍' },
  ];

  // Build the 8 Masterpiece Book Pages
  const pages = useMemo(() => {
    const bookPages = [];

    // Category chapter directory with Star Dish highlights
    const DIRECTORY_CHAPTERS = [
      { page: 1, icon: '☕', title: 'Hot Espresso & Artisan Brews', star: 'Royal Cappuccino', price: '₹159', roman: 'I' },
      { page: 2, icon: '🧊', title: 'Chilled Frappés & Nitro Brews', star: 'Caramel Crunch Frappé', price: '₹219', roman: 'II' },
      { page: 3, icon: '🍵', title: 'Royal Kulhad Chai & Tisanes', star: 'Royal Masala Kulhad Chai', price: '₹99', roman: 'III' },
      { page: 4, icon: '🥐', title: 'Sourdough Bakes & Paninis', star: 'Smoked Paneer Tikka Panini', price: '₹199', roman: 'IV' },
      { page: 5, icon: '🏷️', title: 'Curated Sharing Combos', star: 'Morning Ritual Combo', price: '₹349', roman: 'V' },
      { page: 6, icon: '🍰', title: 'Belgian Pastries & Desserts', star: 'Belgian Truffle Pastry', price: '₹159', roman: 'VI' },
    ];

    // PAGE 0 (Spread 0 Left): Grand Frontispiece & Menu Directory with Star Highlights
    bookPages.push(
      <div 
        key="cover-spread-left" 
        className="page w-full h-full book-paper-texture book-gutter-left p-4 sm:p-7 relative flex flex-col justify-between overflow-hidden select-none"
        data-density="soft"
      >
        <div className="page-filigree-border w-full h-full p-3 sm:p-4.5 flex flex-col justify-between relative bg-[#F6F0E6]/50">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          {/* Header Crest */}
          <div className="flex flex-col items-center text-center pt-0.5 shrink-0">
            <TatvaCrest size={38} className="text-[#A8612E] mb-1" />
            <span className="text-[8.5px] uppercase font-bold tracking-[0.28em] text-[#B69A68] font-inter">
              ESTD. 2024 • TALWANDI, KOTA
            </span>
            <h1 className="font-playfair font-bold text-2xl sm:text-[30px] text-[#38271F] tracking-[0.14em]">
              TATVA
            </h1>
            <p className="font-playfair italic text-[#594132] text-[11px] mt-0.5">
              Artisan Coffee, Patisserie &amp; Contemporary Lounge
            </p>
            <TatvaDivider />
          </div>

          {/* Curated Table of Contents (Directory) with Star Highlights */}
          <div className="flex-1 my-1 flex flex-col justify-center px-0.5 sm:px-2">
            <div className="text-center mb-1">
              <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#B69A68] font-inter">
                — Compendium Index &amp; Star Selections —
              </span>
            </div>

            <div className="flex flex-col gap-1 font-inter text-xs">
              {DIRECTORY_CHAPTERS.map((item) => (
                <div 
                  key={item.page}
                  onClick={() => jumpToPage(item.page)}
                  className="flex flex-col p-1 sm:p-1.5 rounded hover:bg-[#B69A68]/10 transition-colors cursor-pointer group border border-transparent hover:border-[#B69A68]/30"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium flex items-center gap-1.5 text-xs text-[#38271F] group-hover:text-[#A8612E] font-inter transition-colors">
                      <span>{item.icon}</span> {item.title}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[#B69A68]/40 mx-2 group-hover:border-[#B69A68]/70" />
                    <span className="font-serif italic text-[#A8612E] text-xs font-bold group-hover:underline">Page {item.roman}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-5 mt-0.2 text-[9.5px]">
                    <span className="text-[#A8612E] font-bold uppercase tracking-wider text-[8px] flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-[#B69A68]" /> Star Dish:
                    </span>
                    <span className="font-playfair italic font-medium text-[#38271F]/85">{item.star}</span>
                    <span className="text-[#A8612E] font-bold font-inter text-[9px]">({item.price})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Artisanal Promise */}
          <div className="text-center pt-1 border-t border-[#B69A68]/25 shrink-0">
            <p className="font-playfair italic text-[10.5px] text-[#594132]/85 leading-tight">
              "Crafted with 100% single-origin Arabica. Every sip feels like home."
            </p>
            <span className="text-[9px] text-[#A8612E] font-semibold uppercase tracking-widest mt-0.5 inline-block">
              Turn page to explore ➔
            </span>
          </div>
        </div>
      </div>
    );

    // Helper for category pages with Editorial Photo Vignette & Priority Star Dish
    const renderCategoryPage = ({ cat, pageIndex, isEven = false, customTitle, customDesc, photo, vignetteTag }) => {
      const items = cat.items || [];
      const title = customTitle || cat.name;
      const desc = customDesc || cat.description;
      const gutterClass = isEven ? 'book-gutter-left' : 'book-gutter-right';
      const romanPage = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][pageIndex - 1] || `${pageIndex}`;

      const sorted = sortCategoryItems(items);
      const starDish = sorted[0];
      const remainingItems = sorted.slice(1);

      return (
        <div 
          key={`page-${cat.id || pageIndex}`} 
          className={`page w-full h-full book-paper-texture ${gutterClass} p-4 sm:p-7 relative flex flex-col justify-between overflow-hidden select-none`}
          data-density="soft"
        >
          <div className="page-filigree-border w-full h-full p-3 sm:p-4.5 flex flex-col justify-between relative bg-[#F6F0E6]/50">
            <CornerFlourish position="top-left" />
            <CornerFlourish position="top-right" />
            <CornerFlourish position="bottom-left" />
            <CornerFlourish position="bottom-right" />

            {/* Category Header */}
            <div className="text-center mb-1 shrink-0">
              <span className="text-[8.5px] uppercase tracking-[0.26em] text-[#B69A68] font-bold font-inter">
                TATVA • CURATED COLLECTION
              </span>
              <h2 className="font-playfair font-bold text-xl sm:text-[23px] text-[#38271F] tracking-tight mt-0.5">
                {title}
              </h2>
              {desc && (
                <p className="font-playfair italic text-[#594132]/80 text-[11px] mt-0.5 line-clamp-1 max-w-[90%] mx-auto">
                  {desc}
                </p>
              )}
              <TatvaDivider />
            </div>

            {/* Editorial Photography Vignette */}
            {photo && (
              <div className="relative w-full h-18 sm:h-20 rounded-md overflow-hidden mb-1.5 border border-[#B69A68]/35 group/vignette shadow-[0_2px_8px_rgba(56,39,31,0.06)] shrink-0">
                <img 
                  src={photo} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/vignette:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38271F]/70 via-[#38271F]/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between text-[#FBF7F1] pointer-events-none">
                  <span className="font-playfair italic text-[10.5px] sm:text-[11.5px] tracking-wide drop-shadow-sm text-[#FBF7F1]/95">
                    {vignetteTag || 'Single Origin & Freshly Crafted'}
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-inter font-bold text-[#B69A68] bg-[#1F1612]/75 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Artisan
                  </span>
                </div>
              </div>
            )}

            {/* Featured Star Dish */}
            {starDish && <PriorityStarDishCard item={starDish} />}

            {/* Artisan Selections Subtitle Divider */}
            {remainingItems.length > 0 && (
              <div className="flex items-center gap-2 my-0.5 opacity-70 shrink-0">
                <div className="h-[1px] flex-1 bg-[#B69A68]/30" />
                <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#B69A68] font-bold font-inter">
                  Artisan Selections
                </span>
                <div className="h-[1px] flex-1 bg-[#B69A68]/30" />
              </div>
            )}

            {/* Remaining Menu Items */}
            <div className="flex flex-col flex-1 justify-center my-0.5 overflow-hidden">
              {remainingItems.map(item => (
                <FlipItemRow 
                  key={item.id || item.slug} 
                  item={item} 
                  isPriority={item.bestseller || !!item.badge}
                />
              ))}
            </div>

            {/* Page Bottom Lining */}
            <div className="flex items-center justify-between pt-1 border-t border-[#B69A68]/25 text-[9.5px] text-[#594132]/60 font-inter mt-auto shrink-0">
              <span className="tracking-wider uppercase text-[8.5px]">Handcrafted Fresh</span>
              <span className="font-playfair italic text-[11px] text-[#A8612E] font-medium tracking-widest">
                — Page {romanPage} —
              </span>
              <span className="tracking-wider uppercase text-[8.5px]">Talwandi, Kota</span>
            </div>
          </div>
        </div>
      );
    };

    // PAGE 1 (Spread 0 Right): Hot Coffee
    const coffeeCat = menuData.categories.find(c => c.id === 'coffee') || menuData.categories[0];
    bookPages.push(
      renderCategoryPage({ 
        cat: coffeeCat, 
        pageIndex: 1, 
        isEven: false, 
        customTitle: 'Coffee & Espresso',
        photo: coffeePhoto,
        vignetteTag: '100% Single-Origin Arabica'
      })
    );

    // PAGE 2 (Spread 1 Left): Cold Coffee
    const coldCat = menuData.categories.find(c => c.id === 'cold-coffee') || menuData.categories[1];
    bookPages.push(
      renderCategoryPage({ 
        cat: coldCat, 
        pageIndex: 2, 
        isEven: true, 
        customTitle: 'Chilled & Cold Brew',
        photo: coldCoffeePhoto,
        vignetteTag: '18-Hour Slow Steeped Cold Brew'
      })
    );

    // PAGE 3 (Spread 1 Right): Tea & Infusions
    const teaCat = menuData.categories.find(c => c.id === 'tea') || menuData.categories[2];
    bookPages.push(
      renderCategoryPage({ 
        cat: teaCat, 
        pageIndex: 3, 
        isEven: false, 
        customTitle: 'Artisan Teas & Chai',
        photo: teaPhoto,
        vignetteTag: 'Clay Pot Kulhad & Whole Leaves'
      })
    );

    // PAGE 4 (Spread 2 Left): Snacks & Bakes
    const snacksCat = menuData.categories.find(c => c.id === 'snacks') || menuData.categories[3];
    bookPages.push(
      renderCategoryPage({ 
        cat: snacksCat, 
        pageIndex: 4, 
        isEven: true, 
        customTitle: 'Fresh Bakes & Savory',
        photo: bakeryPhoto,
        vignetteTag: 'Freshly Baked Daily'
      })
    );

    // PAGE 5 (Spread 2 Right): Combos & Sharing Platters
    bookPages.push(
      renderCategoryPage({ 
        cat: { id: 'combos', name: 'Curated Combos', description: 'Chef-paired favorites designed for sharing and savoring', items: COMBOS }, 
        pageIndex: 5, 
        isEven: false, 
        customTitle: 'Chef’s Curated Combos',
        photo: combosPhoto,
        vignetteTag: 'Signature Gourmet Pairings'
      })
    );

    // PAGE 6 (Spread 3 Left): Desserts
    const dessertsCat = menuData.categories.find(c => c.id === 'desserts') || menuData.categories[4];
    bookPages.push(
      renderCategoryPage({ 
        cat: dessertsCat, 
        pageIndex: 6, 
        isEven: true, 
        customTitle: 'Desserts & Patisserie',
        photo: dessertsPhoto,
        vignetteTag: 'Pure Belgian Cocoa & Whipped Creams'
      })
    );

    // PAGE 7 (Spread 3 Right): Grand Finale & Back Cover
    bookPages.push(
      <div 
        key="back-cover" 
        className="page w-full h-full book-paper-texture book-gutter-right p-4 sm:p-7 relative flex flex-col justify-between overflow-hidden select-none"
        data-density="soft"
      >
        <div className="page-filigree-border w-full h-full p-3 sm:p-4.5 flex flex-col justify-between relative bg-[#F6F0E6]/50">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          {/* Header */}
          <div className="text-center pt-0.5 shrink-0">
            <TatvaCrest size={36} className="text-[#A8612E] mx-auto mb-1" />
            <span className="text-[8.5px] font-bold uppercase tracking-[0.25em] text-[#B69A68] font-inter">
              Warmest Welcome
            </span>
            <h2 className="font-playfair font-bold text-xl sm:text-2xl text-[#38271F] tracking-tight mt-0.5">
              Talwandi Sanctuary
            </h2>
            <p className="font-playfair italic text-[#594132]/80 text-[11px] mt-0.5">
              From our sanctuary to your coffee moments.
            </p>
            <TatvaDivider />
          </div>

          {/* Sanctuary Interior Photograph Vignette */}
          <div className="relative w-full h-24 sm:h-28 rounded-md overflow-hidden border border-[#B69A68]/40 shadow-[0_2px_8px_rgba(56,39,31,0.08)] group/sanctuary shrink-0 my-1">
            <img 
              src={sanctuaryPhoto} 
              alt="TATVA Café Lounge Interior" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/sanctuary:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#38271F]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between text-[#FBF7F1] pointer-events-none">
              <span className="font-playfair italic text-[11px] drop-shadow-sm text-[#FBF7F1]/95">
                Living Room of Kota • Talwandi
              </span>
              <span className="text-[8px] uppercase tracking-wider font-inter font-bold text-[#B69A68] bg-[#1F1612]/75 px-1.5 py-0.5 rounded">
                Lounge
              </span>
            </div>
          </div>

          {/* Cafe Information & Cards */}
          <div className="flex flex-col gap-1.5 my-1 text-[#38271F]/90 text-[11px] font-inter shrink-0">
            {OPENING_HOURS && (
              <div className="p-2 bg-[#EADBC8]/30 rounded border border-[#B69A68]/25 flex flex-col items-center text-center">
                <span className="font-bold text-[#A8612E] uppercase text-[9px] tracking-widest mb-0.5 flex items-center gap-1">
                  <span>⏱</span> Operating Hours
                </span>
                <p className="font-medium text-[#38271F] text-[10.5px]">Mon - Thu: 10:00 AM – 10:30 PM</p>
                <p className="font-medium text-[#38271F] text-[10.5px]">Fri - Sun: 9:00 AM – 11:00 PM</p>
              </div>
            )}

            {CAFE_ADDRESS && (
              <div className="p-2 bg-[#EADBC8]/30 rounded border border-[#B69A68]/25 flex flex-col items-center text-center">
                <span className="font-bold text-[#A8612E] uppercase text-[9px] tracking-widest mb-0.5 flex items-center gap-1">
                  <span>📍</span> Address
                </span>
                <p className="font-medium text-[#38271F] text-[10px] max-w-[240px] leading-snug">
                  {CAFE_ADDRESS}
                </p>
              </div>
            )}

            {/* Amenities badge bar */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-[#594132] pt-0.5">
              <span className="flex items-center gap-1">📶 Free Wi-Fi</span>
              <span>•</span>
              <span className="flex items-center gap-1">🐾 Pet Friendly</span>
              <span>•</span>
              <span className="flex items-center gap-1">☕ Fresh Roast</span>
            </div>
          </div>

          {/* Authenticity Seal */}
          <div className="text-center pt-1 border-t border-[#B69A68]/25 flex flex-col items-center mt-auto shrink-0">
            <div className="inline-flex items-center gap-1 text-[9px] uppercase font-bold text-[#A8612E] tracking-widest">
              <span>⚜</span> 100% Single-Origin Certified <span>⚜</span>
            </div>
            <p className="text-[9px] text-[#594132]/65 mt-0.5 font-inter">
              Allergens notice: please inform our baristas before placing custom orders.
            </p>
          </div>
        </div>
      </div>
    );

    return bookPages;
  }, [jumpToPage]);

  // Safe PageFlip initialization once on mount
  useEffect(() => {
    let isCancelled = false;
    initAttemptsRef.current = 0;

    const tryInit = () => {
      if (isCancelled || flipInstanceRef.current || !containerRef.current) return;
      const el = containerRef.current;
      if (el.clientWidth === 0 || el.clientHeight === 0) {
        if (initAttemptsRef.current < 25) {
          initAttemptsRef.current++;
          requestAnimationFrame(tryInit);
        }
        return;
      }

      document.fonts.ready.then(() => {
        if (isCancelled || flipInstanceRef.current || !containerRef.current) return;

        try {
          const flip = new PageFlip(containerRef.current, {
            width: 460,
            height: 640,
            size: "stretch",
            minWidth: 280,
            maxWidth: 540,
            minHeight: 420,
            maxHeight: 740,
            showCover: false, // Ensures both Left and Right pages are shown on every spread
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
            playPageTurnSound();
            setShowCornerHint(false);
          });

        } catch (e) {
          console.error("PageFlip init failed", e);
          flipInstanceRef.current = null;
          flipRef.current = null;
        }
      });
    };

    tryInit();

    return () => {
      isCancelled = true;
      if (flipInstanceRef.current) {
        try {
          flipInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        flipInstanceRef.current = null;
        flipRef.current = null;
      }
    };
  }, [rm]);

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
        flipRef.current.flipPrev('bottom');
      }
      if (e.key === 'ArrowRight') {
        flipRef.current.flipNext('bottom');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextPage = () => {
    if (!flipRef.current) return;
    flipRef.current.flipNext('bottom');
  };

  const handlePrevPage = () => {
    if (!flipRef.current) return;
    flipRef.current.flipPrev('bottom');
  };

  return (
    <div 
      id="tatva-menu-book-wrapper"
      data-filter={curatedFilter}
      className="w-full flex flex-col items-center relative py-2 select-none"
    >
      {/* Curated Priority & Dietary Spotlight Filter Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-2.5 z-20 px-2 sm:px-4">
        <button
          type="button"
          onClick={() => setCuratedFilter('all')}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter font-semibold transition-all duration-200 border ${
            curatedFilter === 'all'
              ? 'bg-[#38271F] text-[#FBF7F1] border-[#38271F] shadow-sm'
              : 'bg-[#F6F0E6] text-[#38271F]/80 hover:text-[#38271F] border-[#B69A68]/30 hover:border-[#B69A68]/60'
          }`}
        >
          <span>✦ All Offerings</span>
        </button>
        <button
          type="button"
          onClick={() => setCuratedFilter('signature')}
          className={`flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-inter font-semibold transition-all duration-200 border ${
            curatedFilter === 'signature'
              ? 'bg-[#A8612E] text-[#FBF7F1] border-[#A8612E] shadow-sm'
              : 'bg-[#F6F0E6] text-[#A8612E] hover:text-[#38271F] border-[#B69A68]/30 hover:border-[#B69A68]/60'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#B69A68]" />
          <span>★ Star Signatures</span>
        </button>
        <button
          type="button"
          onClick={() => setCuratedFilter('veg')}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter font-semibold transition-all duration-200 border ${
            curatedFilter === 'veg'
              ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
              : 'bg-[#F6F0E6] text-[#2E7D32] hover:text-[#38271F] border-[#2E7D32]/30 hover:border-[#2E7D32]/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          <span>100% Pure Veg</span>
        </button>
      </div>

      {/* Bookmark Ribbon Tabs for Quick Section Jumps */}
      <div className="w-full max-w-5xl px-3 sm:px-12 flex items-center justify-center gap-1 sm:gap-2 mb-[-6px] relative z-20 overflow-x-auto scrollbar-none py-1">
        {BOOK_CATEGORIES.map((cat) => {
          const isActive = currentPage === cat.page || (currentPage === cat.page + 1 && cat.page % 2 === 0);
          return (
            <button
              key={cat.title}
              onClick={() => jumpToPage(cat.page)}
              className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-t-lg font-inter text-xs font-semibold transition-all duration-200 border-t border-x ${
                isActive
                  ? 'bg-[#FAF6F0] text-[#A8612E] border-[#B69A68]/60 shadow-md translate-y-[-2px] font-bold'
                  : 'bg-[#2A1D16] text-[#FBF7F1]/80 hover:text-[#FBF7F1] border-[#B69A68]/20 hover:bg-[#38271F]'
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Physical Hardcover Leather Folio Outer Casing */}
      <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-6 md:px-12 pb-6 pt-2 overflow-visible">
        <div className="relative w-full p-2 sm:p-3 md:p-4 rounded-2xl leather-folio-casing border border-[#4A3022]/80">
          
          {/* Antique Brass-Gold Corner Brackets */}
          <div className="absolute top-1 left-1 w-6 h-6 rounded-tl-lg border-t-2 border-l-2 border-[#B69A68] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)] pointer-events-none" />
          <div className="absolute top-1 right-1 w-6 h-6 rounded-tr-lg border-t-2 border-r-2 border-[#B69A68] shadow-[inset_-1px_1px_0_rgba(255,255,255,0.3)] pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-6 h-6 rounded-bl-lg border-b-2 border-l-2 border-[#B69A68] shadow-[inset_1px_-1px_0_rgba(255,255,255,0.3)] pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-br-lg border-b-2 border-r-2 border-[#B69A68] shadow-[inset_-1px_-1px_0_rgba(255,255,255,0.3)] pointer-events-none" />

          {/* Warm Amber Caramel Silk Bookmark Ribbon Hanging from Top Spine */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-14 bg-gradient-to-b from-[#A8612E] to-[#783F1A] rounded-b shadow-md z-30 pointer-events-none flex flex-col justify-end">
            <div className="w-full h-2 bg-[#783F1A] clip-ribbon-tail" />
          </div>

          {/* 3D Stacked Deckle Paper Outer Edges Wrapper */}
          <div className="relative w-full rounded-lg overflow-hidden deckle-edge-left deckle-edge-right">
            
            {/* The Book Stage */}
            <div 
              ref={containerRef} 
              className="relative z-10 w-full min-h-[480px] sm:min-h-[520px] md:aspect-[1.44/1] md:min-h-[540px] md:max-h-[740px]"
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
              <div className="w-[1px] h-full mx-auto border-r border-dashed border-[#B69A68]/60" />
            </div>

            {/* Interactive Corner Curl Hint */}
            {showCornerHint && currentPage === 0 && (
              <div 
                onClick={handleNextPage}
                className="absolute bottom-3 right-3 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#A8612E] text-[#FBF7F1] text-xs font-semibold shadow-lg cursor-pointer corner-curl-hint hover:scale-105 transition-transform"
              >
                <span>Click corner to turn page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Master Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 z-20 mt-3 bg-[#F6F0E6]/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#B69A68]/35 shadow-lg">
        
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className="w-9 h-9 rounded-full bg-[#EADBC8]/70 hover:bg-[#A8612E] hover:text-[#FBF7F1] text-[#38271F] flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-[#EADBC8]/70 disabled:hover:text-[#38271F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] shadow-sm active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Page / Spread Indicator */}
        <div className="flex flex-col items-center min-w-[130px]">
          <span className="font-playfair font-bold text-sm text-[#38271F] tracking-tight">
            {currentPage === 0 ? 'Frontispiece' : `Pages ${currentPage + 1} - ${Math.min(currentPage + 2, totalPages || 8)}`}
          </span>
          <span className="text-[10px] text-[#A8612E] font-semibold uppercase tracking-widest font-inter">
            Spread {Math.floor(currentPage / 2) + 1} of {Math.ceil((totalPages || 8) / 2)}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage >= (totalPages || 8) - (rm ? 1 : 2)}
          aria-label="Next page"
          className="w-9 h-9 rounded-full bg-[#EADBC8]/70 hover:bg-[#A8612E] hover:text-[#FBF7F1] text-[#38271F] flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-[#EADBC8]/70 disabled:hover:text-[#38271F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] shadow-sm active:scale-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="h-4 w-[1px] bg-[#B69A68]/35 hidden sm:block" />

        {/* Auto Play / Presentation Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          title={isAutoPlay ? 'Pause Auto Flip' : 'Start Auto Flip (6s per spread)'}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-inter font-medium transition-colors ${
            isAutoPlay ? 'bg-[#A8612E] text-[#FBF7F1] shadow-sm' : 'bg-[#38271F]/5 text-[#38271F]/80 hover:text-[#38271F] hover:bg-[#38271F]/10'
          }`}
        >
          {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isAutoPlay ? 'Playing' : 'Auto Flip'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          className="w-8 h-8 rounded-full bg-[#38271F]/5 hover:bg-[#A8612E] hover:text-[#FBF7F1] text-[#38271F]/70 flex items-center justify-center transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default FlipMenu;
