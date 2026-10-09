import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../data/site';

export const FloatingWhatsApp = () => {
  const whatsappUrl = `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappDefaultMessage)}`;

  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center group"
      aria-label="Contact Royal Bean Café on WhatsApp"
    >
      {/* Tooltip on desktop */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-espresso/90 text-cream backdrop-blur-md shadow-warm border border-caramel/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with us on WhatsApp
      </span>

      {/* Floating button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-warm-lg hover:shadow-glow-caramel border-2 border-cream transition-shadow relative"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-none" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-caramel rounded-full border-2 border-espresso animate-pulse" />
      </motion.a>
    </motion.aside>
  );
};

export default FloatingWhatsApp;
