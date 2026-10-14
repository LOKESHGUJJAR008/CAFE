import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Coffee, Search, X, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { menuData } from '../../data/menu';
import DietBadge from '../DietBadge';

const TABS = ['All', 'Coffee', 'Cold Coffee', 'Tea', 'Bakery', 'Quick Bites', 'Desserts', 'Specials'];

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349, saved: 'Save ₹39', badge: 'Chef Choice' },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359, saved: 'Save ₹29', badge: 'Sweet Pairing' },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Tea Time Combo', description: 'Royal Masala Chai + Paneer Tikka Panini', price: 269, saved: 'Save ₹19', badge: 'Classic Duo' },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Combo', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589, saved: 'Save ₹37', badge: 'Crowd Favorite' },
];

const catSlugMap = {
  Coffee: 'coffee', 'Cold Coffee': 'cold-coffee', Tea: 'tea',
  Bakery: 'desserts', 'Quick Bites': 'snacks', Desserts: 'desserts', Specials: 'specials',
};
const catQueryMap = {
  coffee: 'Coffee', 'cold-coffee': 'Cold Coffee', tea: 'Tea',
  bakery: 'Bakery', 'quick-bites': 'Quick Bites', desserts: 'Desserts', specials: 'Specials',
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

/* ─── Luxury Editorial Dish Card ─────────────────────────────────────── */
const DishCard = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link
      to={`/menu/${item.slug}`}
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012]
        transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(31,22,18,0.04)]
        hover:shadow-[0_16px_40px_rgba(201,160,18,0.18)] hover:-translate-y-1.5 h-full"
    >
      {/* Visual Image Frame */}
      <div className="w-full aspect-[4/3] bg-[#F7F2EB] overflow-hidden relative border-b border-[#1F1612]/10">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F7F2EB] to-[#EADBC8]">
            <Coffee className="w-12 h-12 text-[#C9A27E]/60" />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {item.bestseller && (
            <span className="px-2.5 py-1 text-[9px] font-grotesk font-bold uppercase tracking-[0.2em] bg-[#1F1612] text-[#C9A012] border border-[#C9A012]/50 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A012] animate-pulse" />
              Bestseller
            </span>
          )}
          {item.badge && item.badge !== 'Bestseller' && (
            <span className="px-2.5 py-1 text-[9px] font-grotesk font-bold uppercase tracking-[0.2em] bg-[#C9A012] text-[#1F1612] font-semibold shadow-sm">
              {item.badge}
            </span>
          )}
        </div>

        {/* Diet indicator top right */}
        {item.diet && (
          <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm p-1 border border-[#1F1612]/10 shadow-sm">
            <DietBadge diet={item.diet} size="sm" />
          </div>
        )}

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-[#C9A012]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 bg-[#FFFFFF]">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-grotesk text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
            {item.categoryId ? item.categoryId.replace('-', ' ') : 'Botanical Brew'}
          </span>
          {item.calories && (
            <span className="font-grotesk text-[9px] text-[#1F1612]/40 tracking-wider">
              {item.calories} kcal
            </span>
          )}
        </div>

        <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] group-hover:text-[#A8612E] transition-colors leading-tight mb-2 line-clamp-1">
          {item.name}
        </h3>

        <p className="font-grotesk text-xs text-[#1F1612]/70 line-clamp-2 leading-relaxed mb-6 flex-1">
          {item.description}
        </p>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1F1612]/10">
          <div className="flex flex-col">
            <span className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-[#1F1612]/40">
              Price
            </span>
            <span className="font-cormorant text-2xl font-bold text-[#1F1612] group-hover:text-[#A8612E] transition-colors">
              {item.formattedPrice || `₹${item.price}`}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${item.name} to order`}
            className={`px-4 py-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 z-10 ${
              added
                ? 'bg-[#2E7D32] text-white border border-[#2E7D32]'
                : 'bg-[#1F1612] hover:bg-[#C9A012] text-[#FBF7F1] hover:text-[#1F1612] border border-[#1F1612] hover:border-[#C9A012]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default function FullMenuGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catQuery  = searchParams.get('cat');
  const dietQuery = searchParams.get('diet');

  const initialTab = useMemo(() => catQueryMap[catQuery] || 'All', [catQuery]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [vegOnly, setVegOnly]     = useState(dietQuery === 'veg');
  const [rawSearch, setRawSearch] = useState('');
  const searchQuery = useDebounce(rawSearch, 200);
  const searchRef = useRef(null);
  const { addToCart } = useCart();
  const [comboAdded, setComboAdded] = useState({});

  const [prevInitialTab, setPrevInitialTab] = React.useState(initialTab);
  if (prevInitialTab !== initialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  const [prevDietQuery, setPrevDietQuery] = React.useState(dietQuery);
  if (prevDietQuery !== dietQuery) {
    setPrevDietQuery(dietQuery);
    setVegOnly(dietQuery === 'veg');
  }

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    if (tab === 'All') { next.delete('cat'); } else { next.set('cat', catSlugMap[tab] || tab.toLowerCase()); }
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleVegToggle = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    if (vegOnly) { next.delete('diet'); } else { next.set('diet', 'veg'); }
    setSearchParams(next, { replace: true });
    setVegOnly(v => !v);
  }, [vegOnly, searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
    setActiveTab('All');
    setVegOnly(false);
    setRawSearch('');
    searchRef.current?.focus();
  }, [setSearchParams]);

  // Flatten all items from menuData
  const allItems = useMemo(() => {
    const items = [];
    menuData.categories.forEach(cat => {
      cat.items.forEach(item => { items.push({ ...item, categoryId: cat.id }); });
    });
    return items;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = allItems;

    // Category filter
    if (activeTab !== 'All') {
      if (activeTab === 'Specials') {
        items = items.filter(i => i.badge === 'Special' || i.badge === 'Signature' || i.badge === 'TATVA Special');
      } else {
        const cat = catSlugMap[activeTab];
        items = items.filter(i => i.categoryId === cat);
      }
    }

    // Veg filter
    if (vegOnly) {
      items = items.filter(i => i.diet === 'veg');
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        (i.ingredients || []).some(ing => ing.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeTab, vegOnly, searchQuery, allItems]);

  const handleComboAdd = (combo) => {
    addToCart({ ...combo, formattedPrice: `₹${combo.price}` }, 1);
    setComboAdded(prev => ({ ...prev, [combo.id]: true }));
    setTimeout(() => {
      setComboAdded(prev => ({ ...prev, [combo.id]: false }));
    }, 1400);
  };

  const hasActiveFilters = activeTab !== 'All' || vegOnly || rawSearch.trim();

  return (
    <section className="bg-[#FBF7F1] py-14" id="full-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Editorial Section Header ── */}
        <div className="text-center mb-10">
          <span className="bd-eyebrow block mb-2">Artisan Collection</span>
          <h2 className="font-cormorant font-semibold text-[#1F1612] text-4xl sm:text-5xl leading-tight">
            Handcrafted for Mind & Palate
          </h2>
          <p className="font-grotesk text-xs sm:text-sm text-[#1F1612]/60 uppercase tracking-[0.15em] mt-2 max-w-md mx-auto">
            Select any dish to view botanical notes or add directly to order
          </p>
        </div>

        {/* ── Sticky Filter Bar ── */}
        <div className="sticky top-20 z-30 bg-[#FBF7F1]/95 backdrop-blur-md py-4 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-[#1F1612]/10">

          {/* Category tabs + Veg toggle row */}
          <div
            className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory mb-3 pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`snap-start whitespace-nowrap px-4 py-2 text-xs font-grotesk font-semibold uppercase tracking-[0.16em] transition-all duration-200 focus-visible:outline-none flex-shrink-0 ${
                    isActive
                      ? 'bg-[#1F1612] text-[#C9A012] border border-[#C9A012]/40 shadow-sm'
                      : 'bg-[#FFFFFF] text-[#1F1612]/75 hover:text-[#1F1612] border border-[#1F1612]/15 hover:border-[#1F1612]/40'
                  }`}
                >
                  {tab}
                </button>
              );
            })}

            {/* Divider */}
            <span className="flex-shrink-0 w-px h-6 bg-[#1F1612]/20 mx-1" aria-hidden="true" />

            {/* Veg-only toggle */}
            <button
              onClick={handleVegToggle}
              aria-pressed={vegOnly}
              className={`snap-start flex-shrink-0 flex items-center gap-2 whitespace-nowrap px-4 py-2 text-xs font-grotesk font-semibold uppercase tracking-[0.14em] transition-all border focus-visible:outline-none ${
                vegOnly
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#1F1612]/75 hover:text-[#1F1612] border-[#1F1612]/15'
              }`}
            >
              <span
                className="inline-flex items-center justify-center flex-shrink-0"
                style={{ width: 12, height: 12, border: '1.5px solid currentColor', borderRadius: 1 }}
                aria-hidden="true"
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    display: 'block',
                  }}
                />
              </span>
              Veg only
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1612]/40 pointer-events-none" />
            <input
              ref={searchRef}
              type="search"
              value={rawSearch}
              onChange={e => setRawSearch(e.target.value)}
              placeholder="Search dishes, ingredients, single-origin roasts…"
              aria-label="Search menu items"
              className="w-full pl-11 pr-10 py-2.5 bg-[#FFFFFF] border border-[#1F1612]/15
                text-sm text-[#1F1612] placeholder:text-[#1F1612]/40 font-grotesk
                focus:outline-none focus:border-[#C9A012] focus:ring-1 focus:ring-[#C9A012]
                transition-all"
            />
            {rawSearch && (
              <button
                onClick={() => setRawSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#1F1612]/40 hover:text-[#1F1612] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Item Cards Grid ── */}
        <motion.div layout className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-[#1F1612]/60 gap-4"
              >
                <Coffee className="w-12 h-12 text-[#C9A27E]" />
                <p className="font-cormorant text-3xl font-semibold text-[#1F1612] text-center">
                  No items matched your selection.
                </p>
                <p className="font-grotesk text-xs uppercase tracking-[0.15em] text-[#1F1612]/50 text-center max-w-xs">
                  Try clearing filters or search for another brew or pastry.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bd-btn bd-btn-caramel mt-2"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                layout
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                <AnimatePresence>
                  {filteredItems.map(item => (
                    <motion.div
                      layout
                      key={item.slug}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <DishCard item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Combos Section: Luxury Editorial Split Cards ── */}
        <div className="mt-24 pt-16 border-t border-[#1F1612]/15">
          <div className="text-center mb-12">
            <span className="bd-eyebrow block mb-2">Curated Pairings</span>
            <h2 className="font-cormorant font-semibold text-[#1F1612] text-4xl sm:text-5xl">
              TATVA Tasting Combos
            </h2>
            <p className="font-grotesk text-xs uppercase tracking-[0.15em] text-[#1F1612]/60 mt-2">
              Harmonious pairings designed for shared warmth and special savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COMBOS.map(combo => (
              <div
                key={combo.slug}
                className="group flex flex-col sm:flex-row bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.16)]"
              >
                {/* Visual side */}
                <div className="w-full sm:w-2/5 min-h-[160px] sm:min-h-full bg-gradient-to-br from-[#1F1612] to-[#3A2518] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <Coffee className="w-10 h-10 text-[#C9A012] group-hover:scale-110 transition-transform duration-500 mb-2 relative z-10" />
                  <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A27E] relative z-10">
                    {combo.badge}
                  </span>
                  <div className="absolute inset-0 bg-[#C9A012]/5 pointer-events-none" />
                </div>

                {/* Details side */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] group-hover:text-[#A8612E] transition-colors leading-tight">
                        {combo.name}
                      </h3>
                      {combo.saved && (
                        <span className="bg-[#C9A012] text-[#1F1612] font-grotesk text-[9px] font-bold px-2 py-0.5 tracking-[0.15em] uppercase whitespace-nowrap shadow-xs">
                          {combo.saved}
                        </span>
                      )}
                    </div>
                    <p className="font-grotesk text-xs text-[#1F1612]/70 mb-5 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1F1612]/10 mt-auto">
                    <span className="font-cormorant text-2xl font-bold text-[#1F1612]">
                      ₹{combo.price}
                    </span>
                    <button
                      onClick={() => handleComboAdd(combo)}
                      aria-label={`Add ${combo.name} to cart`}
                      className={`px-4 py-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 ${
                        comboAdded[combo.id]
                          ? 'bg-[#2E7D32] text-white border border-[#2E7D32]'
                          : 'bg-[#1F1612] hover:bg-[#C9A012] text-[#FBF7F1] hover:text-[#1F1612] border border-[#1F1612]'
                      }`}
                    >
                      {comboAdded[combo.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add Pairing
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
