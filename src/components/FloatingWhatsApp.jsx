import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../config';

export const FloatingWhatsApp = () => (
  <motion.aside
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
    className="fixed bottom-6 right-6 z-50 flex items-center group"
    aria-label="Contact Royal Bean Café on WhatsApp"
  >
    {/* Tooltip */}
    <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full text-xs font-semibold
                     bg-[#1F1612]/90 text-[#FBF7F1] backdrop-blur-md shadow-warm border border-[#C9A27E]/30
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
      Chat on WhatsApp
    </span>

    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-11 h-11 rounded-full bg-[#1F1612] hover:bg-[#2e2118]
                 text-[#FBF7F1] flex items-center justify-center
                 shadow-[0_4px_20px_rgba(31,22,18,0.35)]
                 border border-[#C9A27E]/20 transition-colors"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" strokeWidth={1.8} />
      {/* small caramel dot */}
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#A8612E] rounded-full
                       border-2 border-[#FBF7F1] animate-pulse" />
    </motion.a>
  </motion.aside>
);

export default FloatingWhatsApp;
