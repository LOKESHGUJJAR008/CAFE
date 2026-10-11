import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Coffee, Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { menuData } from '../../data/menu';
import DietBadge from '../DietBadge';

const TABS = ['All', 'Coffee', 'Cold Coffee', 'Tea', 'Bakery', 'Quick Bites', 'Desserts', 'Specials'];

const COMBOS = [
  { id: 'combo-1', slug: 'morning-ritual-combo', name: 'Morning Ritual Combo', description: 'Royal Cappuccino + Sourdough Guacamole Toast', price: 349, saved: 'Save ₹39', image: null },
  { id: 'combo-2', slug: 'sweet-tooth-combo', name: 'Sweet Tooth Combo', description: 'Caramel Crunch Frappé + Belgian Chocolate Pastry', price: 359, saved: 'Save ₹29', image: null },
  { id: 'combo-3', slug: 'tea-time-combo', name: 'Tea Time Combo', description: 'Royal Masala Chai + Paneer Tikka Panini', price: 269, saved: 'Save ₹19', image: null },
  { id: 'combo-4', slug: 'friends-share-combo', name: 'Friends Share Combo', description: '2x Classic Iced Latte + Truffle Fries + Cheese Poppers', price: 589, saved: 'Save ₹37', image: null },
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

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
  };

  const hasActiveFilters = activeTab !== 'All' || vegOnly || rawSearch.trim();

  return (
    <section className="bg-foam py-16" id="full-menu">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Sticky Filter Bar ── */}
        <div className="sticky top-24 z-30 bg-foam/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 border-b border-latte/20">

          {/* Category tabs + Veg toggle row */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory mb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel flex-shrink-0
                    ${isActive ? 'bg-caramel text-foam shadow-warm' : 'bg-almond/60 hover:bg-almond text-ink'}`}
                >
                  {tab}
                </button>
              );
            })}

            {/* Divider */}
            <span className="flex-shrink-0 w-px h-6 bg-latte/30 mx-1" aria-hidden="true" />

            {/* Veg-only toggle */}
            <button
              onClick={handleVegToggle}
              aria-pressed={vegOnly}
              className={`snap-start flex-shrink-0 flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel
                ${vegOnly ? 'bg-[#2E7D32] text-white shadow-md' : 'bg-almond/60 hover:bg-almond text-ink'}`}
            >
              <span
                className="inline-flex items-center justify-center flex-shrink-0"
                style={{ width: 13, height: 13, border: '1.5px solid #2E7D32', borderRadius: 2, backgroundColor: '#fff' }}
                aria-hidden="true"
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: vegOnly ? '#fff' : '#2E7D32', display: 'block' }} />
              </span>
              Veg only
            </button>
          </div>
          
          <p className="text-[10px] text-ink/50 mb-3 ml-1">
            Ingredients and allergens: please ask our team before ordering.
          </p>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none" />
            <input
              ref={searchRef}
              type="search"
              value={rawSearch}
              onChange={e => setRawSearch(e.target.value)}
              placeholder="Search by name, ingredient…"
              aria-label="Search menu items"
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-almond/60 border border-latte/30
                text-sm text-ink placeholder:text-ink/40 font-inter
                focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent
                transition-colors"
            />
            {rawSearch && (
              <button
                onClick={() => setRawSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-ink/40
                  hover:text-ink hover:bg-almond transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-ink/60 gap-4"
              >
                <Coffee className="w-12 h-12 text-latte" />
                <p className="font-playfair text-xl font-bold text-center">No dishes found.</p>
                <p className="text-sm text-ink/50 text-center max-w-xs">
                  Try a different search term or category.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 px-6 py-2.5 rounded-full bg-caramel text-foam text-sm font-bold
                      hover:bg-caramel/90 transition-colors shadow-warm
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                layout
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                <AnimatePresence>
                  {filteredItems.map(item => (
                    <motion.div
                      layout
                      key={item.slug}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={`/menu/${item.slug}`}
                        className="group flex flex-col bg-almond rounded-2xl overflow-hidden shadow-sm
                          hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel h-full border border-latte/10"
                      >
                        <div className="w-full aspect-[4/3] bg-foam/50 overflow-hidden relative">
                          {item.image ? (
                            <img src={item.image} alt={item.name}
                              className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Coffee className="w-12 h-12 text-latte/40" />
                            </div>
                          )}

                          {/* Badges — stacked vertically top-left */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {item.bestseller && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-caramel text-foam shadow-md">
                                Bestseller
                              </span>
                            )}
                            {item.badge && (item.badge === 'Special' || item.badge === 'Signature' || item.badge === 'TATVA Special') && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-caramel text-foam shadow-md">
                                TATVA Special
                              </span>
                            )}
                            {item.badge && item.badge !== 'Special' && item.badge !== 'Signature' && item.badge !== 'TATVA Special' && item.badge !== 'Bestseller' && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-foam/90 backdrop-blur-sm text-caramel shadow-sm">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            <DietBadge diet={item.diet} size="sm" />
                            <h3 className="font-playfair font-bold text-xl text-ink group-hover:text-caramel transition-colors line-clamp-1 leading-tight">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-sm text-ink/75 line-clamp-2 mb-4 leading-relaxed flex-1">{item.description}</p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-latte/20">
                            <span className="font-playfair font-bold text-xl text-caramel">
                              {item.formattedPrice || `₹${item.price}`}
                            </span>
                            <button
                              onClick={(e) => handleAddToCart(e, item)}
                              aria-label={`Add ${item.name} to cart`}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-foam text-ink text-sm font-bold
                                hover:bg-caramel hover:text-foam border border-latte/30 hover:border-caramel transition-colors z-10"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Combos Section ── */}
        <div className="mt-24 pt-16 border-t border-latte/30">
          <div className="text-center mb-10">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-ink mb-3">Royal Combos</h2>
            <p className="text-ink/70">Perfectly paired selections for a complete experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COMBOS.map(combo => (
              <div key={combo.slug}
                className="flex flex-col sm:flex-row bg-foam rounded-2xl border-2 border-latte/40 overflow-hidden shadow-warm-sm hover:border-caramel transition-colors group">
                <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto bg-almond/40 flex items-center justify-center p-4">
                  <Coffee className="w-12 h-12 text-latte/60 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col justify-center flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-playfair font-bold text-xl text-ink leading-tight">{combo.name}</h3>
                    {combo.saved && (
                      <span className="bg-caramel/10 text-caramel text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap ml-2">
                        {combo.saved}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/70 mb-5 leading-relaxed">{combo.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-playfair font-bold text-2xl text-caramel">₹{combo.price}</span>
                    <button
                      onClick={(e) => handleAddToCart(e, { ...combo, formattedPrice: `₹${combo.price}` })}
                      aria-label={`Add ${combo.name} to cart`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-caramel text-foam text-sm font-bold hover:bg-[#92541f] transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
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
