import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Coffee,
  CupSoda,
  Leaf,
  Croissant,
  Pizza,
  CakeSlice,
  ArrowRight
} from 'lucide-react';
import { menuTeaserData } from '../../data/menuTeaser';

const iconMap = {
  Coffee,
  CupSoda,
  Leaf,
  Croissant,
  Pizza,
  CakeSlice
};

export const MenuTeaser = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth > 0) {
      const cardWidth = offsetWidth * 0.8;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(Math.max(index, 0), menuTeaserData.categories.length - 1));
    }
  };

  const scrollToCard = (idx) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[idx];
    if (card) {
      card.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveIndex(idx);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.1 }
        : { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="menu-teaser"
      className="bg-almond py-20 sm:py-24 px-6 sm:px-10 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-2 font-inter">
              {menuTeaserData.eyebrow}
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              {menuTeaserData.title}
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-6 py-2.5 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-foam text-xs sm:text-sm font-semibold tracking-wide transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 text-ink group-hover:text-foam group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* ── Cards: 3 columns x 2 rows on Desktop, Swipe Carousel on Mobile ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {menuTeaserData.categories.map((category) => {
            const Icon = iconMap[category.icon] || Coffee;
            return (
              <motion.article
                key={category.id}
                variants={cardVariants}
                className="w-[80vw] sm:w-[48vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center bg-[#FBF7F1] border border-[#EADBC8]/60 hover:border-caramel rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-warm-sm hover:shadow-warm transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-caramel"
              >
                <div>
                  {/* Round Icon Chip */}
                  <div className="w-12 h-12 rounded-full bg-caramel/15 border border-caramel/30 flex items-center justify-center text-caramel mb-5">
                    <Icon className="w-6 h-6 text-caramel" strokeWidth={1.5} />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-playfair font-bold text-xl sm:text-2xl text-ink mb-5 tracking-tight">
                    {category.name}
                  </h3>

                  {/* 3 Items with dotted leaders and mocha prices */}
                  <div className="space-y-3.5 mb-6">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-baseline justify-between gap-2 text-sm"
                      >
                        <span className="text-ink font-medium truncate">
                          {item.name}
                        </span>
                        <span
                          className="flex-1 border-b border-dotted border-ink/25 mx-1"
                          aria-hidden="true"
                        />
                        <span className="text-caramel font-semibold tabular-nums shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore Link */}
                <div className="pt-3 border-t border-ink/10">
                  <Link
                    to={`/menu?cat=${category.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink hover:text-ink transition-colors group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-caramel"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 text-caramel group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Mobile Dot Indicators ── */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {menuTeaserData.categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to category ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-6 bg-caramel'
                  : 'w-2 bg-ink/25 hover:bg-ink/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuTeaser;
