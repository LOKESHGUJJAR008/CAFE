import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Check, ArrowRight, Eye, X, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Product images generated to match reference aesthetic
import canEspressoImg from '../../assets/images/products/can-espresso.jpg';
import canCappuccinoImg from '../../assets/images/products/can-cappuccino.jpg';
import canFlatwhiteImg from '../../assets/images/products/can-flatwhite.jpg';
import canMacchiatoImg from '../../assets/images/products/can-macchiato.jpg';
import heroCanImg from '../../assets/images/products/hero-can.jpg';
import pouchMochaImg from '../../assets/images/products/pouch-mocha.jpg';
import pouchFlatwhiteImg from '../../assets/images/products/pouch-flatwhite.jpg';
import pouchMacchiatoImg from '../../assets/images/products/pouch-macchiato.jpg';
import pouchIvoryImg from '../../assets/images/products/pouch-ivory.jpg';

/* ─── Product Catalog Data ──────────────────────────────────────────────── */
const CAN_PRODUCTS = [
  {
    id: 'can-espresso-vogue',
    slug: 'espresso-vogue',
    name: 'ESPRESSO VOGUE',
    price: 210,
    formattedPrice: '₹210',
    altPrice: '$10.00',
    image: canEspressoImg,
    category: 'Coffee Can',
    volume: '250 ml',
    tag: 'Nitro Cold Brew',
    description: 'Concentrated single-origin double shot cold brew with velvety micro-crema and ultra-smooth chocolate finish.',
    notes: ['Dark Cocoa', 'Toasted Hazelnut', 'Velvety Crema'],
  },
  {
    id: 'can-hit-cappuccino',
    slug: 'hit-cappuccino',
    name: 'HIT CAPPUCCINO',
    price: 180,
    formattedPrice: '₹180',
    altPrice: '$8.00',
    image: canCappuccinoImg,
    category: 'Coffee Can',
    volume: '250 ml',
    tag: 'Oat Milk Infusion',
    description: 'Slow-steeped espresso combined with silky oat emulsion and subtle hints of dusted Ceylon cinnamon.',
    notes: ['Oat Cream', 'Ceylon Cinnamon', 'Toasted Malt'],
  },
  {
    id: 'can-silk-flat-white',
    slug: 'silk-flat-white',
    name: 'SILK FLAT WHITE',
    price: 190,
    formattedPrice: '₹190',
    altPrice: '$8.00',
    image: canFlatwhiteImg,
    category: 'Coffee Can',
    volume: '250 ml',
    tag: 'Microfoam Ristretto',
    description: 'Micro-filtered cold brew ristretto blended with farm fresh milk for an exceptionally delicate mouthfeel.',
    notes: ['Caramel Wafer', 'Fresh Sweet Cream', 'Blonde Roast'],
  },
  {
    id: 'can-modish-macchiato',
    slug: 'modish-macchiato',
    name: 'MODISH MACCIATO',
    price: 220,
    formattedPrice: '₹220',
    altPrice: '$10.00',
    image: canMacchiatoImg,
    category: 'Coffee Can',
    volume: '250 ml',
    tag: 'Salted Caramel',
    description: 'Intense espresso marked with rich caramel undertones and cold-press sea salt froth in a ready-to-sip can.',
    notes: ['Salted Toffee', 'Wild Molasses', 'Golden Crema'],
  },
];

const HERO_PRODUCT = {
  id: 'can-chic-latte-cache',
  slug: 'chic-latte-cache',
  name: 'CHIC LATTE CACHE',
  price: 230,
  formattedPrice: '₹230',
  altPrice: '$11.00',
  image: heroCanImg,
  category: 'Urban Reserve Can',
  volume: '250 ml',
  tag: 'Signature Reserve Edition',
  description: 'Limited summer edition. 18-hour cold steeped Arabica infused with raw Madagascar vanilla bean and chilled oat cream.',
  notes: ['Bourbon Vanilla', 'Raw Cane Sugar', 'Almond Milk'],
};

const POUCH_PRODUCTS = [
  {
    id: 'pouch-stylish-mocha-1',
    slug: 'stylish-mocka-pouch',
    name: 'STYLISH MOCKA POUCH',
    price: 450,
    formattedPrice: '₹450',
    altPrice: '$45.00',
    image: pouchMochaImg,
    category: 'Coffee Pouch',
    weight: '350 g',
    tag: 'Whole Bean Roast',
    description: 'Artisanal medium-dark roast beans selected from Chikmagalur estates, featuring dense notes of single-estate dark cocoa.',
    notes: ['Dutch Cocoa', 'Dark Cherry', 'Roasted Pecan'],
  },
  {
    id: 'pouch-silk-flat-white',
    slug: 'silk-flat-white-pouch',
    name: 'SILK FLAT WHITE POUCH',
    price: 500,
    formattedPrice: '₹500',
    altPrice: '$50.00',
    image: pouchFlatwhiteImg,
    category: 'Coffee Pouch',
    weight: '350 g',
    tag: 'Light Blonde Roast',
    description: 'Gentle golden blonde roast with delicate floral aromatics, custom ground or whole bean for balanced morning extractions.',
    notes: ['Wild Honey', 'Orange Blossom', 'Almond Butter'],
  },
  {
    id: 'pouch-modish-macchiato',
    slug: 'modish-macciato-pouch',
    name: 'MODISH MACCIATO POUCH',
    price: 420,
    formattedPrice: '₹420',
    altPrice: '$40.00',
    image: pouchMacchiatoImg,
    category: 'Coffee Pouch',
    weight: '350 g',
    tag: 'Italian Dark Roast',
    description: 'Smoky, brooding dark roast beans yielding a heavy syrup crema, ideal for moka pot, aeropress, or espresso machines.',
    notes: ['Smoked Oak', 'Dark Chocolate Truffle', 'Clove'],
  },
  {
    id: 'pouch-stylish-mocha-2',
    slug: 'stylish-mocka-pouch-ivory',
    name: 'STYLISH MOCKA POUCH',
    price: 450,
    formattedPrice: '₹450',
    altPrice: '$45.00',
    image: pouchIvoryImg,
    category: 'Coffee Pouch',
    weight: '350 g',
    tag: 'Reserve Single Lot',
    description: 'Micro-lot harvested beans packaged in airtight kraft preservation pouches for maximum freshness and aromatics.',
    notes: ['Brown Sugar', 'Crisp Citrus', 'Milk Chocolate'],
  },
];

/* ─── Product Card (Kuafi / Swiss Editorial Style) ──────────────────────── */
const ProductCard = ({ product, onQuickView, isTopRow = true }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      formattedPrice: product.formattedPrice,
      image: product.image,
      diet: 'veg',
    }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-[#FAF7F2] hover:bg-[#14100E] p-5 sm:p-7 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 select-none"
    >
      {/* Product Image Frame */}
      <div className="w-full aspect-square flex items-center justify-center p-3 relative overflow-hidden bg-[#FAF7F2] border border-[#14100E]/10 group-hover:border-[#FAF7F2]/30 transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Quick Add Floating Pill (shown on hover) */}
        <div className="absolute inset-x-4 bottom-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto">
          <button
            onClick={handleQuickAdd}
            aria-label={`Quick add ${product.name}`}
            className={`font-grotesk text-[10px] font-bold tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200 flex items-center gap-1.5 shadow-md ${
              added
                ? 'bg-[#2E7D32] text-white border border-[#2E7D32]'
                : 'bg-[#14100E] text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#14100E] hover:!bg-[#C9A27E] hover:!text-[#14100E]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3 text-[#FAF7F2]" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Typography & Price: Inverts to light on hover */}
      <div className="w-full mt-4 text-center">
        <h4 className="font-grotesk font-semibold text-xs sm:text-[13px] tracking-[0.12em] uppercase text-[#14100E] group-hover:text-[#FAF7F2] transition-colors duration-300">
          {product.name}
        </h4>
        <div className="mt-1 flex items-center justify-center gap-1.5 font-grotesk text-xs sm:text-[13px] transition-colors duration-300">
          <span className="font-medium text-[#14100E] group-hover:text-[#C9A27E] transition-colors duration-300">
            {product.formattedPrice}
          </span>
          <span className="text-[10px] text-[#14100E]/40 group-hover:text-[#FAF7F2]/60 transition-colors duration-300">
            ({product.altPrice})
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Detail Modal (Swiss Gallery Inspector) ────────────────────────────── */
const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      formattedPrice: product.formattedPrice,
      image: product.image,
      diet: 'veg',
    }, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#14100E]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FAF7F2] border-2 border-[#14100E] text-[#14100E] shadow-[0_24px_60px_rgba(20,16,14,0.3)] overflow-hidden relative"
      >
        {/* Top Bar with Archive Stamp */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#14100E] bg-[#FAF7F2]">
          <span className="font-grotesk font-bold text-[9px] uppercase tracking-[0.25em] text-[#A8612E]">
            TATVA PRIME ARCHIVE · {product.category}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="p-8 bg-[#F4EFE6] border-b md:border-b-0 md:border-r border-[#14100E] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 w-auto object-contain"
            />
          </div>

          {/* Right: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-[#14100E] text-[#FAF7F2] px-2.5 py-0.5 text-[9px] font-grotesk font-black uppercase tracking-[0.2em] mb-3">
                {product.tag || 'Artisanal Roast'}
              </span>
              <h3 className="font-grotesk font-bold text-2xl uppercase tracking-tight text-[#14100E]">
                {product.name}
              </h3>
              <p className="font-grotesk font-semibold text-lg text-[#A8612E] mt-1">
                {product.formattedPrice} <span className="text-xs font-normal text-[#14100E]/50">/ {product.volume || product.weight}</span>
              </p>
              <p className="font-grotesk text-xs text-[#14100E]/70 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Tasting Notes */}
              {product.notes && (
                <div className="mt-4 pt-4 border-t border-[#14100E]/20">
                  <span className="block font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-[#14100E]/60 mb-2">
                    Tasting Profile
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="font-grotesk text-[10px] px-2.5 py-1 border border-[#14100E]/30 bg-[#FAF7F2]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-6 pt-4 border-t border-[#14100E]/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.15em] text-[#14100E]/70">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#14100E]">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1 font-grotesk font-bold text-sm hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-grotesk font-bold text-xs">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1 font-grotesk font-bold text-sm hover:bg-[#14100E] hover:text-[#FAF7F2] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3 px-6 font-grotesk text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#14100E] text-[#FAF7F2] hover:bg-[#A8612E]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag · ₹{product.price * qty}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Main Section Component ────────────────────────────────────────────── */
export const SignatureDrinks = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [heroAdded, setHeroAdded] = useState(false);

  const handleHeroQuickAdd = () => {
    addToCart({
      slug: HERO_PRODUCT.slug,
      name: HERO_PRODUCT.name,
      price: HERO_PRODUCT.price,
      formattedPrice: HERO_PRODUCT.formattedPrice,
      image: HERO_PRODUCT.image,
      diet: 'veg',
    }, 1);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 1600);
  };

  return (
    <section
      id="signature-drinks"
      className="bg-[#FAF7F2] text-[#14100E] pt-8 sm:pt-12 pb-0 border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2] overflow-hidden w-full"
      aria-label="Artisanal Product Archive"
    >
      <div className="w-full">
        
        {/* ── Section Editorial Header (Full Width) ── */}
        <div className="w-full px-6 sm:px-10 lg:px-14 pb-6 mb-0 border-b-2 border-[#14100E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-block bg-[#14100E] text-[#FAF7F2] px-3 py-1 font-grotesk font-black text-[10px] uppercase tracking-[0.25em] mb-2 shadow-sm">
              EDITORIAL CRAFT COLLECTION · EST. KOTA
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#14100E]">
              Tatva Ready & Roast
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="block font-grotesk text-xs uppercase tracking-[0.25em] text-[#14100E]/70 font-semibold">
              CHIC COFFEE VIBES · URBAN FLAIR
            </span>
            <span className="block font-grotesk text-[10px] uppercase tracking-wider text-[#A8612E] mt-0.5">
              SINGLE-ORIGIN ALUMINUM CANS & SMALL-BATCH POUCHES
            </span>
          </div>
        </div>

        {/* ── Swiss Editorial Grid Container (Full Bleed Edge-to-Edge) ── */}
        <div className="w-full border-b-2 border-[#14100E] bg-[#FAF7F2]">
          
          {/* ══════════════════════════════════════════════════════════════
              TOP TICKER RIBBON: With Urban Flair / Chic Coffee Vibes
              ══════════════════════════════════════════════════════════════ */}
          <div className="border-b-2 border-[#14100E] py-2.5 px-6 overflow-hidden bg-[#FAF7F2] select-none">
            <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#14100E]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#14100E]/40" />
                  <span className="font-cormorant italic text-base sm:text-lg font-medium text-[#14100E]">
                    With <span className="font-semibold">Urban Flair</span>
                  </span>
                  <span className="w-8 h-[1px] bg-[#14100E]/40" />
                  <span className="font-grotesk text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#14100E]">
                    Chic Coffee Vibes
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              ROW 1: 4 Beverage Cans (ESPRESSO VOGUE, HIT CAPPUCCINO, etc.)
              ══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#14100E] border-b-2 border-[#14100E]">
            {CAN_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={setSelectedProduct}
                isTopRow={true}
              />
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              MIDDLE SECTION: Split 50/50 Feature Hero + Category Hub
              ══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#14100E] border-b-2 border-[#14100E]">
            
            {/* Left: Cinematic Hero Lifestyle Shot (Can on Concrete in Sunlight) */}
            <div
              onClick={() => setSelectedProduct(HERO_PRODUCT)}
              className="group relative bg-[#14100E] cursor-pointer overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-auto flex items-center justify-center min-h-[380px]"
            >
              <img
                src={HERO_PRODUCT.image}
                alt="TATVA Chic Latte Cache Can in Sunlight"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Minimalist Inset Corner Stamp */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#FAF7F2] text-[#14100E] px-3.5 py-2 border border-[#14100E] shadow-md z-10 transition-transform duration-300 group-hover:scale-105">
                <span className="block text-[8px] font-grotesk font-black tracking-[0.25em] uppercase text-[#14100E]/70">
                  SUMMER HARVEST
                </span>
                <span className="block text-xs font-grotesk font-black tracking-tight leading-none uppercase text-[#14100E] mt-0.5">
                  CHIC LATTE CACHE
                </span>
              </div>

              {/* Hover Floating Action */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                <div className="bg-[#FAF7F2] text-[#14100E] px-5 py-3 border border-[#14100E] shadow-xl flex items-center gap-3">
                  <span className="font-grotesk text-xs font-black uppercase tracking-[0.2em]">
                    VIEW RESERVE CAN
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Right: Stacked Category Feature Boxes (COFFEE CAN & COFFEE POUCH) */}
            <div className="flex flex-col divide-y-2 divide-[#14100E] bg-[#FAF7F2]">
              
              {/* Category Box 1: COFFEE CAN */}
              <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between flex-1 bg-[#FAF7F2] hover:bg-[#14100E] transition-all duration-300 group cursor-pointer">
                <div>
                  <h3 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14100E] group-hover:text-[#FAF7F2] uppercase mb-4 transition-colors duration-300">
                    COFFEE CAN
                  </h3>
                  <div className="space-y-1.5 font-grotesk text-xs sm:text-sm text-[#14100E]/70 group-hover:text-[#FAF7F2]/80 transition-colors duration-300">
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Latte Coffee
                    </p>
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Espresso Coffee
                    </p>
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Nitro Cold Brew
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/menu?category=cold-coffee"
                    className="inline-flex items-center justify-center rounded-full border border-[#14100E] group-hover:border-[#FAF7F2] px-8 py-2.5 text-[11px] font-grotesk font-bold uppercase tracking-[0.2em] text-[#14100E] group-hover:text-[#FAF7F2] group-hover:hover:!bg-[#FAF7F2] group-hover:hover:!text-[#14100E] transition-all duration-300 shadow-sm"
                  >
                    ALL PRODUCTS
                  </Link>
                </div>
              </div>

              {/* Category Box 2: COFFEE POUCH */}
              <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between flex-1 bg-[#FAF7F2] hover:bg-[#14100E] transition-all duration-300 group cursor-pointer">
                <div>
                  <h3 className="font-grotesk font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#14100E] group-hover:text-[#FAF7F2] uppercase mb-4 transition-colors duration-300">
                    COFFEE POUCH
                  </h3>
                  <div className="space-y-1.5 font-grotesk text-xs sm:text-sm text-[#14100E]/70 group-hover:text-[#FAF7F2]/80 transition-colors duration-300">
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Flat White Coffee
                    </p>
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Macciato Coffee
                    </p>
                    <p className="hover:text-[#C9A27E] transition-colors">
                      • Single-Origin Arabica
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/menu?category=coffee"
                    className="inline-flex items-center justify-center rounded-full border border-[#14100E] group-hover:border-[#FAF7F2] px-8 py-2.5 text-[11px] font-grotesk font-bold uppercase tracking-[0.2em] text-[#14100E] group-hover:text-[#FAF7F2] group-hover:hover:!bg-[#FAF7F2] group-hover:hover:!text-[#14100E] transition-all duration-300 shadow-sm"
                  >
                    ALL PRODUCTS
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              ROW 3: 4 Coffee Pouches (STYLISH MOCKA, SILK FLAT WHITE, etc.)
              ══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#14100E]">
            {POUCH_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={setSelectedProduct}
                isTopRow={false}
              />
            ))}
          </div>

        </div>

        {/* Bottom Navigation Link (Full Width) */}
        <div className="w-full px-6 sm:px-10 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-grotesk">
          <span className="text-[#14100E]/60 uppercase tracking-[0.2em]">
            TATVA CAFÉ KOTA · PACKAGED ARTISAN MERCHANDISE
          </span>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] text-[#14100E] hover:text-[#A8612E] transition-colors"
          >
            <span>DISCOVER COMPLETE COFFEE ARCHIVE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SignatureDrinks;
