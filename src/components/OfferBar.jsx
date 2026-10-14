import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { OFFER_BAR_MESSAGE } from '../config';

const SESSION_KEY = 'rb_offer_bar_dismissed';

/**
 * OfferBar — BD-style mustard yellow top announcement bar.
 * Reads the message from OFFER_BAR_MESSAGE in config.js.
 * Returns null if message is empty or user has dismissed.
 */
export function OfferBar({ onVisibilityChange }) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const visible = !!OFFER_BAR_MESSAGE && !dismissed;

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  if (!visible) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch { /* ignore */ }
    setDismissed(true);
  };

  return (
    <div
      id="offer-bar"
      role="banner"
      className="w-full bg-[#C9A012] text-[#1F1612] py-2.5 px-4 flex items-center justify-center gap-3 relative z-[60]"
    >
      <p
        className="text-center leading-snug font-grotesk text-xs sm:text-sm font-semibold tracking-wide pr-8 sm:pr-0"
        dangerouslySetInnerHTML={{ __html: OFFER_BAR_MESSAGE }}
      />
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#1F1612]/70 hover:text-[#1F1612] hover:bg-[#1F1612]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1612]/30"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default OfferBar;
