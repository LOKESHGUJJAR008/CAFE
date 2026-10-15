import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { menuData } from '../data/menu';
import { useCart } from '../context/CartContext';
import Reveal from '../components/Reveal';
import DietBadge from '../components/DietBadge';

export default function DishDetail() {
  const { slug } = useParams();
  const prefersReducedMotion = useReducedMotion();
  const [qty, setQty] = useState(1);
  const [addedState, setAddedState] = useState(false);
  const { addToCart } = useCart();

  // Find item and its category
  let item = null;
  let category = null;
  for (const cat of menuData.categories) {
    const foundItem = cat.items.find(i => i.slug === slug);
    if (foundItem) {
      item = foundItem;
      category = cat;
      break;
    }
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-foam flex flex-col items-center justify-center p-6 text-center pt-28">
        <Coffee className="w-16 h-16 text-caramel mb-6 opacity-80" />
        <h1 className="font-playfair text-3xl md:text-4xl text-ink font-bold mb-4">Dish not found</h1>
        <p className="text-ink/70 mb-8 max-w-md">
          We couldn't find the menu item you're looking for. It might have been removed or the link is incorrect.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-latte text-ink hover:bg-latte hover:text-foam font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
      </div>
    );
  }

  // Related items (max 3, excluding current)
  const relatedItems = category.items
    .filter(i => i.slug !== item.slug)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(item, qty);
    setAddedState(true);
    setTimeout(() => setAddedState(false), 1500);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const handleQtyChange = (delta) => {
    setQty(prev => Math.max(1, Math.min(20, prev + delta)));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-[#FAF7F2] text-[#14100E] pb-32 md:pb-16 flex flex-col selection:bg-[#14100E] selection:text-[#FAF7F2]"
    >
      {/* ── Top Running Archival Ticker (Flush with Navbar) ── */}
      <div className="w-full border-b-2 border-[#14100E] bg-[#FAF7F2] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none mb-6">
        <div className="w-full flex items-center justify-between gap-6 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.28em] text-[#14100E]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#14100E]" />
            <span>TATVA CULINARY ARCHIVE // SPECIMEN #{item.slug.toUpperCase()}</span>
          </div>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>CATEGORY: {category.title.toUpperCase()}</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>DIAL-IN CRAFT & FRESH BAKE</span>
          <span className="text-[#14100E]/30 font-normal">/</span>
          <span>TALWANDI, KOTA</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* LEFT COLUMN: Image & Animations */}
        <motion.div 
          variants={imageVariants}
          className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center"
        >
          {/* Radial glow background */}
          <div className="absolute inset-0 bg-gradient-radial from-almond via-almond/30 to-transparent rounded-full blur-3xl opacity-70 scale-90" aria-hidden="true" />
          
          {/* Outer rotating decorative ring */}
          <motion.div 
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-8 rounded-full border border-latte/20 border-dashed"
            aria-hidden="true"
          />

          {/* Floating Image */}
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [-10, 10] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="relative z-10 w-3/4 h-3/4 rounded-full flex items-center justify-center p-6 bg-foam/40 backdrop-blur-sm border border-foam shadow-warm-lg"
          >
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            ) : (
              <Coffee className="w-1/2 h-1/2 text-latte/50" />
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Details */}
        <motion.div variants={textContainerVariants} className="flex flex-col gap-6">
          <motion.nav variants={textItemVariants} aria-label="Breadcrumb" className="text-xs font-bold uppercase tracking-widest text-latte flex items-center gap-2">
            <Link to="/menu" className="hover:text-caramel transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-caramel rounded-sm">Menu</Link>
            <span className="opacity-50">/</span>
            <span className="text-caramel">{category.name}</span>
          </motion.nav>

          <motion.div variants={textItemVariants}>
            <div className="flex items-center gap-3 mb-2">
              <DietBadge diet={item.diet} size="sm" />
              <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
                {item.name}
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-playfair font-bold text-2xl md:text-3xl text-caramel">
                {item.formattedPrice}
              </span>
              <div className="flex gap-2">
                {item.bestseller && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-caramel text-foam border border-caramel shadow-sm">
                    Bestseller
                  </span>
                )}
                {item.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-caramel/10 text-caramel border border-caramel/20">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.p variants={textItemVariants} className="text-ink/80 text-base md:text-lg leading-relaxed max-w-lg">
            {item.description}
          </motion.p>

          <motion.div variants={textItemVariants} className="pt-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 mb-3">Ingredients & Profile</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients && item.ingredients.map((ing, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-full bg-almond/50 text-ink text-xs font-medium border border-latte/30">
                  {ing}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Desktop Controls (hidden on mobile, replaced by sticky bar) */}
          <motion.div variants={textItemVariants} className="hidden md:flex flex-col gap-5 mt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-almond/40 rounded-full border border-latte/40 p-1">
                <button 
                  onClick={() => handleQtyChange(-1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-latte/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-ink">{qty}</span>
                <button 
                  onClick={() => handleQtyChange(1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-latte/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-caramel hover:bg-[#92541f] text-foam font-bold text-sm tracking-wide shadow-warm transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
              >
                {addedState ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added ✓
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
            
            <Link 
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-latte text-ink hover:bg-almond/50 font-semibold text-sm transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Link>
          </motion.div>

        </motion.div>
      </main>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-foam/95 backdrop-blur-md border-t border-latte/30 px-5 py-4 shadow-[0_-10px_30px_rgba(31,22,18,0.05)] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase text-ink/50 tracking-wider">Total</span>
          <span className="font-playfair font-bold text-xl text-caramel">
            ₹{item.price * qty}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-almond/60 rounded-full border border-latte/40 p-0.5 mr-2">
            <button onClick={() => handleQtyChange(-1)} className="w-8 h-8 flex items-center justify-center text-ink" aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
            <span className="w-6 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => handleQtyChange(1)} className="w-8 h-8 flex items-center justify-center text-ink" aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 px-5 py-3 rounded-full bg-caramel text-foam font-bold text-sm tracking-wide shadow-warm active:scale-95 transition-transform text-center whitespace-nowrap"
          >
            {addedState ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <section className="mt-20 border-t border-latte/20 bg-almond/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
            <Reveal>
              <div className="text-center mb-10">
                <span className="bd-eyebrow block mb-2">You May Also Savor</span>
                <h2 className="font-cormorant font-semibold text-4xl text-[#1F1612]">
                  Pairing Recommendations
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedItems.map((relItem, idx) => (
                <Reveal key={relItem.slug} delay={idx * 0.1}>
                  <Link 
                    to={`/menu/${relItem.slug}`}
                    className="flex flex-col bg-[#FFFFFF] border border-[#1F1612]/15 hover:border-[#C9A012] transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(31,22,18,0.04)] hover:shadow-[0_16px_36px_rgba(201,160,18,0.18)] hover:-translate-y-1.5 group h-full"
                  >
                    <div className="w-full aspect-[4/3] bg-[#F7F2EB] p-6 flex items-center justify-center overflow-hidden relative border-b border-[#1F1612]/10">
                       <motion.img 
                         src={relItem.image} 
                         alt={relItem.name}
                         className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                       />
                       {relItem.badge && (
                         <div className="absolute top-3 left-3 bg-[#1F1612] text-[#C9A012] border border-[#C9A012]/40 px-2.5 py-0.5 font-grotesk text-[8px] font-bold uppercase tracking-[0.2em]">
                           {relItem.badge}
                         </div>
                       )}
                       {relItem.diet && (
                         <div className="absolute top-3 right-3 bg-white/95 p-1 border border-[#1F1612]/10 shadow-xs">
                           <DietBadge diet={relItem.diet} size="xs" />
                         </div>
                       )}
                    </div>

                    <div className="p-5 flex flex-col flex-1 bg-[#FFFFFF]">
                      <h3 className="font-cormorant font-semibold text-2xl text-[#1F1612] group-hover:text-[#A8612E] transition-colors leading-tight mb-1">
                        {relItem.name}
                      </h3>
                      <p className="font-grotesk text-xs text-[#1F1612]/70 line-clamp-2 mt-1 mb-4 flex-1">
                        {relItem.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1F1612]/10">
                        <span className="font-cormorant font-bold text-2xl text-[#1F1612]">
                          {relItem.formattedPrice}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(relItem, 1);
                          }}
                          aria-label={`Add ${relItem.name} to cart`}
                          className="px-3 py-1.5 bg-[#1F1612] hover:bg-[#C9A012] text-[#FBF7F1] hover:text-[#1F1612] font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] transition-all flex items-center gap-1 z-10"
                        >
                          <Plus className="w-3 h-3" /> Quick Add
                        </button>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
