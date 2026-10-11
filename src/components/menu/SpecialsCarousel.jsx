import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import DietBadge from '../DietBadge';

/* Reusable easing */
const EASE = [0.22, 1, 0.36, 1];

export const SpecialsCarousel = ({ specials = [] }) => {
  const rm = useReducedMotion();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState({});

  // Auto-scroll loop when not hovered or dragged
  useEffect(() => {
    if (rm || isHovered) return;
    const container = scrollRef.current;
    if (!container) return;

    let animId;
    const scrollStep = () => {
      if (container) {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.8;
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [rm, isHovered]);

  const handleAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setRecentlyAdded(prev => ({ ...prev, [item.slug]: true }));
    setTimeout(() => {
      setRecentlyAdded(prev => ({ ...prev, [item.slug]: false }));
    }, 1200);
  };

  if (!specials || specials.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12 border-t border-latte/30">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-caramel fill-caramel" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-caramel font-inter">
              Handcrafted Highlights
            </span>
          </div>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ink">
            Today's Specials
          </h2>
        </div>
        <p className="text-ink/60 text-xs sm:text-sm font-inter max-w-xs">
          Chef's signature recommendations freshly prepped for this season.
        </p>
      </div>

      {/* Carousel container */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {specials.map((dish, idx) => {
          const isAdded = recentlyAdded[dish.slug];
          const inCart = cart.some(i => i.slug === dish.slug);

          return (
            <motion.div
              key={`${dish.slug}-${idx}`}
              whileHover={rm ? {} : { y: -6, transition: { duration: 0.25, ease: EASE } }}
              onClick={() => navigate(`/menu/${dish.slug}`)}
              className="snap-start shrink-0 w-[270px] sm:w-[290px] bg-foam border border-latte/40 rounded-2xl p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(31,22,18,0.06)] hover:shadow-[0_16px_32px_rgba(31,22,18,0.12)] transition-shadow cursor-pointer relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-latte via-caramel to-latte opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Visual line art or image slot */}
                <div className="w-full h-36 rounded-xl bg-almond/30 border border-latte/20 mb-3.5 overflow-hidden relative flex items-center justify-center">
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-latte">
                      <svg className="w-12 h-12 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                      <span className="text-[10px] tracking-widest uppercase font-inter mt-1 opacity-70">Royal Bean</span>
                    </div>
                  )}

                  {/* Chef's Pick Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-caramel text-foam text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 font-inter">
                    <Star className="w-2.5 h-2.5 fill-foam" />
                    <span>Chef's Pick</span>
                  </div>
                </div>

                {/* Diet + Title */}
                <div className="flex items-start gap-1.5 mb-1.5">
                  <span className="relative top-1">
                    <DietBadge diet={dish.diet} size="sm" />
                  </span>
                  <h3 className="font-playfair font-bold text-ink text-base line-clamp-1 group-hover:text-caramel transition-colors">
                    {dish.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-inter text-xs text-ink/70 line-clamp-2 mb-3">
                  {dish.description}
                </p>
              </div>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between pt-3 border-t border-latte/20 mt-auto">
                <span className="font-inter font-bold text-caramel text-base">
                  {dish.formattedPrice || `₹${dish.price}`}
                </span>

                <button
                  type="button"
                  aria-label={`Add ${dish.name} to cart`}
                  onClick={(e) => handleAdd(e, dish)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-inter transition-all ${
                    isAdded
                      ? 'bg-[#2E7D32] text-white'
                      : inCart
                      ? 'bg-almond text-ink border border-latte/40 hover:bg-caramel hover:text-foam'
                      : 'bg-caramel text-foam hover:bg-ink shadow-sm'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{inCart ? 'Add More' : '+ Add'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SpecialsCarousel;
