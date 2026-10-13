import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { moods } from '../../data/moods';
import { menuData } from '../../data/menu';
import DietBadge from '../DietBadge';

const EASE = [0.22, 1, 0.36, 1];

/**
 * MoodRecommendations — "Perfect for this mood" recommendation strip.
 *
 * Displays 3 compact dish cards corresponding to the selected mood on the Gallery page.
 * Reuses existing CartContext logic, links to /menu/:slug, adapts to mood theme,
 * supports mobile horizontal snap-scroll row, and respects prefers-reduced-motion.
 */
export const MoodRecommendations = ({ selectedMood = 'slow-mornings' }) => {
  const prefersReducedMotion = useReducedMotion();
  const { cart, addToCart, updateQty, removeFromCart } = useCart();

  // Find active mood object
  const currentMood = useMemo(() => {
    return moods.find((m) => m.id === selectedMood) || moods[0];
  }, [selectedMood]);

  // Flatten all menu items once for fast slug resolution
  const allMenuItems = useMemo(() => {
    if (!menuData || !menuData.categories) return [];
    return menuData.categories.flatMap((cat) => cat.items || []);
  }, []);

  // Resolve 3 real dish objects from menuData based on current mood slugs
  const recommendedDishes = useMemo(() => {
    const slugMap = new Map(allMenuItems.map((item) => [item.slug, item]));
    const slugs = currentMood.recommendedSlugs || [];
    return slugs.map((slug) => slugMap.get(slug)).filter(Boolean);
  }, [allMenuItems, currentMood]);

  // Determine dark vs light styling based on current mood visual treatment
  const isDarkMood = currentMood.visualTreatment.bgTint === '#1F1612';
  const headingColor = isDarkMood ? '#FBF7F1' : '#1F1612';
  const textColor = isDarkMood ? 'rgba(251, 247, 241, 0.75)' : 'rgba(31, 22, 18, 0.75)';
  const borderColor = isDarkMood ? 'rgba(201, 162, 126, 0.25)' : 'rgba(201, 162, 126, 0.35)';
  const cardBg = isDarkMood ? '#1F1612' : '#FBF7F1';

  const handleAddToCart = (e, dish) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const handleIncrement = (e, dish) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const handleDecrement = (e, dish, currentQty) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentQty <= 1) {
      removeFromCart(dish.slug);
    } else {
      updateQty(dish.slug, -1);
    }
  };

  return (
    <section
      className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-12 border-t bg-transparent text-[var(--gallery-text)] transition-colors duration-700 overflow-hidden"
      style={{ borderColor: 'var(--gallery-border)' }}
      aria-label="Mood dish recommendations"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated strip container keyed to selectedMood */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMood.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="w-full"
          >
            {/* Header row: title, mood descriptor, and link to full menu */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] mb-2 font-inter transition-colors duration-500"
                  style={{ color: 'var(--gallery-accent)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Perfect For This Mood</span>
                </div>
                <h2
                  className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight transition-colors duration-500"
                  style={{ color: 'var(--gallery-text)' }}
                >
                  {currentMood.recommendationTitle || 'Pair with your coffee'}
                </h2>
                {currentMood.recommendationSubtitle && (
                  <p
                    className="font-inter text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed transition-colors duration-500"
                    style={{ color: 'var(--gallery-subtext)' }}
                  >
                    {currentMood.recommendationSubtitle}
                  </p>
                )}
              </div>

              <Link
                to="/menu"
                className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs sm:text-sm font-semibold font-inter transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] rounded-md"
                style={{ color: 'var(--gallery-accent)' }}
              >
                <span>Browse Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 Compact Cards: Horizontal snap-scroll row on mobile, 3-col grid on sm+ */}
            <div
              tabIndex={0}
              aria-label="Recommended dishes list. Use horizontal scroll on mobile"
              className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A27E]"
            >
              {recommendedDishes.map((dish, idx) => {
                const cartItem = cart.find((i) => i.slug === dish.slug);
                const qty = cartItem ? cartItem.qty : 0;

                return (
                  <motion.div
                    key={dish.slug}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: prefersReducedMotion ? 0 : idx * 0.08,
                    }}
                    className="flex-shrink-0 w-[80vw] max-w-[310px] sm:w-auto snap-center sm:snap-align-none flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {/* Dish Image + Badges */}
                    <Link
                      to={`/menu/${dish.slug}`}
                      className="relative block w-full h-44 sm:h-48 overflow-hidden bg-[#EADBC8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Subtle gradient treatment */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612]/30 via-transparent to-transparent pointer-events-none" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          {dish.bestseller && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#A8612E] text-[#FBF7F1] shadow-sm font-inter">
                              Bestseller
                            </span>
                          )}
                          {dish.badge && !dish.bestseller && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FBF7F1]/95 text-[#A8612E] shadow-sm font-inter">
                              {dish.badge}
                            </span>
                          )}
                        </div>

                        {/* Diet marker */}
                        <div className="bg-[#FBF7F1]/95 p-1 rounded-sm shadow-sm backdrop-blur-xs">
                          <DietBadge diet={dish.diet} size="xs" />
                        </div>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <Link
                        to={`/menu/${dish.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E] rounded-xs"
                      >
                        <h3
                          className="font-playfair font-bold text-lg sm:text-xl line-clamp-1 group-hover:text-[#A8612E] transition-colors leading-snug"
                          style={{ color: headingColor }}
                        >
                          {dish.name}
                        </h3>
                      </Link>

                      <p
                        className="font-inter text-xs sm:text-sm line-clamp-2 mt-1.5 mb-4 leading-relaxed flex-1"
                        style={{ color: textColor }}
                      >
                        {dish.description}
                      </p>

                      {/* Bottom row: Price + Cart button */}
                      <div
                        className="flex items-center justify-between pt-3 mt-auto border-t"
                        style={{ borderColor }}
                      >
                        <span className="font-playfair font-bold text-lg sm:text-xl text-[#A8612E]">
                          {dish.formattedPrice || `₹${dish.price}`}
                        </span>

                        {qty > 0 ? (
                          <div
                            className="inline-flex items-center gap-2 rounded-full px-2 py-1 shadow-xs"
                            style={{
                              backgroundColor: isDarkMood ? 'rgba(234, 219, 200, 0.15)' : '#EADBC8',
                              border: `1px solid ${borderColor}`,
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => handleDecrement(e, dish, qty)}
                              aria-label={`Decrease quantity of ${dish.name}`}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FBF7F1] text-[#1F1612] hover:bg-[#A8612E] hover:text-[#FBF7F1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span
                              className="font-inter text-xs font-bold min-w-[14px] text-center"
                              style={{ color: headingColor }}
                            >
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleIncrement(e, dish)}
                              aria-label={`Increase quantity of ${dish.name}`}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FBF7F1] text-[#1F1612] hover:bg-[#A8612E] hover:text-[#FBF7F1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(e, dish)}
                            aria-label={`Add ${dish.name} to cart`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-inter text-xs font-bold transition-all shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8612E]"
                            style={{
                              backgroundColor: isDarkMood ? '#A8612E' : '#FBF7F1',
                              color: isDarkMood ? '#FBF7F1' : '#1F1612',
                              border: isDarkMood
                                ? '1px solid #A8612E'
                                : '1px solid rgba(201, 162, 126, 0.4)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#A8612E';
                              e.currentTarget.style.color = '#FBF7F1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isDarkMood ? '#A8612E' : '#FBF7F1';
                              e.currentTarget.style.color = isDarkMood ? '#FBF7F1' : '#1F1612';
                            }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MoodRecommendations;
