import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../config';
import { useLocation } from 'react-router-dom';
import DietBadge from './DietBadge';

const STORAGE_KEY = 'rb_cart_order_mode';

function loadMode() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      mode: saved.mode || 'dine-in',
      customerName: saved.customerName || '',
      tableNumber: saved.tableNumber || '',
      pickupTime: saved.pickupTime || '',
    };
  } catch {
    return { mode: 'dine-in', customerName: '', tableNumber: '', pickupTime: '' };
  }
}

function saveMode(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, subtotal, totalItems, updateQty, removeFromCart } = useCart();
  const drawerRef = React.useRef(null);
  const location = useLocation();

  const [orderMeta, setOrderMeta] = useState(loadMode);

  const setMeta = (key, val) => {
    setOrderMeta(prev => {
      const next = { ...prev, [key]: val };
      saveMode(next);
      return next;
    });
  };

  // Close on route change
  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname, isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Esc
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const nameValid = orderMeta.customerName.trim().length > 0;

  const handleOrder = () => {
    if (cart.length === 0 || !nameValid) return;

    const modeLabel = orderMeta.mode === 'dine-in' ? 'Dine-in' : 'Takeaway';
    const tableInfo = orderMeta.mode === 'dine-in' && orderMeta.tableNumber.trim()
      ? `\nTable: ${orderMeta.tableNumber.trim()}`
      : '';
    const pickupInfo = orderMeta.mode === 'takeaway' && orderMeta.pickupTime.trim()
      ? `\nPickup time: ${orderMeta.pickupTime.trim()}`
      : '';

    let message = `Hi Royal Bean Café, I'd like to order!\n\nOrder type: ${modeLabel}`;
    message += `\nName: ${orderMeta.customerName.trim()}`;
    message += tableInfo + pickupInfo;
    message += `\n\nItems:\n`;
    cart.forEach(item => {
      message += `• ${item.qty}× ${item.name}  ₹${item.price * item.qty}\n`;
    });
    message += `\nTotal: ₹${subtotal}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const segCls = (active) =>
    `flex-1 py-2 rounded-full text-xs font-bold tracking-wide transition-all
     ${active ? 'bg-caramel text-foam shadow-warm' : 'text-ink/60 hover:text-ink'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-label="Your Cart"
            aria-modal="true"
            ref={drawerRef}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-foam shadow-2xl z-[51] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-almond flex items-center justify-between bg-foam">
              <div className="flex items-center gap-3 text-ink">
                <ShoppingBag className="w-5 h-5 text-caramel" />
                <h2 className="font-playfair font-bold text-xl">Your Cart</h2>
                <span className="bg-caramel text-foam text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-ink/60 hover:text-ink hover:bg-almond rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <Coffee className="w-12 h-12 text-latte mb-4" />
                  <p className="font-playfair text-lg text-ink font-semibold">Your cart is empty</p>
                  <p className="text-sm text-ink/70 mt-1">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                      key={item.slug}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-almond flex items-center justify-center p-2 flex-shrink-0 border border-latte/20">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <Coffee className="w-8 h-8 text-latte/50" />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex items-start gap-1.5">
                              <div className="mt-1"><DietBadge diet={item.diet} size="xs" /></div>
                              <h3 className="font-semibold text-ink text-sm line-clamp-2 leading-tight">
                                {item.name}
                              </h3>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.slug)}
                              className="text-ink/40 hover:text-caramel p-1 -mr-1 transition-colors"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-playfair font-bold text-caramel mt-1">
                            ₹{item.price * item.qty}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-almond rounded-full border border-latte/30 px-1 py-0.5">
                            <button onClick={() => updateQty(item.slug, -1)} className="w-6 h-6 flex items-center justify-center text-ink hover:text-caramel transition-colors" aria-label="Decrease quantity">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-ink">{item.qty}</span>
                            <button onClick={() => updateQty(item.slug, 1)} className="w-6 h-6 flex items-center justify-center text-ink hover:text-caramel transition-colors" aria-label="Increase quantity">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — order meta + checkout */}
            {cart.length > 0 && (
              <div className="px-6 pb-6 pt-4 border-t border-almond bg-foam/95 backdrop-blur-md flex flex-col gap-4">
                {/* Dine-in / Takeaway segmented control */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink/50 mb-2 font-inter">Order Type</p>
                  <div className="flex gap-1 bg-almond rounded-full p-1" role="radiogroup" aria-label="Order type">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={orderMeta.mode === 'dine-in'}
                      onClick={() => setMeta('mode', 'dine-in')}
                      className={segCls(orderMeta.mode === 'dine-in')}
                    >
                      Dine-in
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={orderMeta.mode === 'takeaway'}
                      onClick={() => setMeta('mode', 'takeaway')}
                      className={segCls(orderMeta.mode === 'takeaway')}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>

                {/* Contextual input */}
                <AnimatePresence mode="wait">
                  {orderMeta.mode === 'dine-in' ? (
                    <motion.div key="dine" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                      <label htmlFor="cart-table" className="text-[10px] font-bold uppercase tracking-widest text-ink/50 block mb-1.5 font-inter">
                        Table Number (optional)
                      </label>
                      <input
                        id="cart-table"
                        type="text"
                        placeholder="e.g. 5 or Window seat"
                        value={orderMeta.tableNumber}
                        onChange={e => setMeta('tableNumber', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-latte/50 bg-foam focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition-colors"
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="pickup" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                      <label htmlFor="cart-pickup" className="text-[10px] font-bold uppercase tracking-widest text-ink/50 block mb-1.5 font-inter">
                        Pickup Time (optional)
                      </label>
                      <input
                        id="cart-pickup"
                        type="text"
                        placeholder="e.g. 3:30 PM"
                        value={orderMeta.pickupTime}
                        onChange={e => setMeta('pickupTime', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-latte/50 bg-foam focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Customer name — required */}
                <div>
                  <label htmlFor="cart-name" className="text-[10px] font-bold uppercase tracking-widest text-ink/50 block mb-1.5 font-inter">
                    Your Name <span className="text-caramel">*</span>
                  </label>
                  <input
                    id="cart-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Required to confirm order"
                    value={orderMeta.customerName}
                    onChange={e => setMeta('customerName', e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-foam focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition-colors
                      ${!nameValid && orderMeta.customerName !== '' ? 'border-red-400' : 'border-latte/50'}`}
                    aria-required="true"
                  />
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink/70">Subtotal</span>
                  <span className="font-playfair font-bold text-2xl text-ink">₹{subtotal}</span>
                </div>

                {/* Order button */}
                <button
                  onClick={handleOrder}
                  disabled={!nameValid}
                  className="w-full py-4 rounded-full bg-caramel hover:bg-[#92541f] text-foam font-bold tracking-wide shadow-warm flex items-center justify-center gap-2
                             transition-transform transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  aria-disabled={!nameValid}
                >
                  <Coffee className="w-4 h-4" />
                  Order on WhatsApp
                </button>
                {!nameValid && (
                  <p role="alert" className="text-center text-[11px] text-caramel font-semibold -mt-2">
                    Please enter your name to continue
                  </p>
                )}
                <p className="text-center text-[10px] text-ink/50 uppercase tracking-wider font-semibold -mt-2">
                  Payment processed via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
