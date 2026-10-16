import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ContactHero,
  ConversationStarter,
  Telemetry3DCard,
  InquiryForm,
  TransitGuide,
  ContactFAQ,
  ContactClosingCTA,
  BackgroundScrollText,
} from '../components/contact/index';

const EASE = [0.22, 1, 0.36, 1];

const ContactPage = () => {
  useDocumentMeta({
    title: 'Get in Touch & Dispatch Dossier | TATVA Café Kota',
    description: 'Find TATVA Café in Talwandi, Kota. Interactive 3D telemetry, kinetic compass matrix, direct phone line, and WhatsApp dispatch portal.',
  });

  const { isOpen, label } = useOpenStatus();
  const prefersReducedMotion = useReducedMotion();

  const [toast, setToast] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, message, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setToast(message);

    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);

    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14100E] overflow-x-clip selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Background Moving Parallax Typography Layer ("CONTACT") ── */}
      <BackgroundScrollText />

      {/* ── Section 1: "Get in touch." Hero with Dot Matrix & Archival Directory (Module 1) ── */}
      <ContactHero
        isOpen={isOpen}
        statusLabel={label}
        onCopy={handleCopy}
        copiedKey={copiedKey}
      />

      {/* ── Section 2: "Start a conversation." + Interactive Kinetic Needle Grid (Module 2) ── */}
      <ConversationStarter />

      {/* ── Section 3: 3D Perspective Coffee Dial-In Telemetry Card (Module 3) ── */}
      <Telemetry3DCard
        isOpen={isOpen}
        statusLabel={label}
      />

      {/* ── Section 4: Interactive WhatsApp Dispatch Telemetry Portal ── */}
      <InquiryForm onCopy={handleCopy} />

      {/* ── Section 5: Cartographic & Transit Guide (Talwandi, Kota) ── */}
      <TransitGuide />

      {/* ── Section 6: Concierge Frequently Enquired Specimens ── */}
      <ContactFAQ />

      {/* ── Section 7: Swiss Inverted Closing Poster CTA ── */}
      <ContactClosingCTA />

      {/* ── Interactive Telemetry Toast Notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 right-6 z-50 bg-[#14100E] text-[#FAF7F2] border-2 border-[#14100E] px-5 py-3.5 shadow-[4px_4px_0px_#A8612E] flex items-center gap-3 font-grotesk text-xs font-black uppercase tracking-wider"
            role="status"
            aria-live="polite"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 text-[#FAF7F2]/60 hover:text-[#FAF7F2] text-xs font-bold"
              aria-label="Close notification"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ContactPage;
