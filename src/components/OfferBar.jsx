import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { OFFER_BAR_MESSAGE } from '../config';

const SESSION_KEY = 'rb_offer_bar_dismissed';

/**
 * OfferBar — thin top announcement bar.
 * Reads the message from OFFER_BAR_MESSAGE in config.js.
 * Returns null if message is empty or user has dismissed.
 * Calls onHeightChange(height) so Layout can offset the navbar.
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
      className="w-full bg-ink text-foam text-sm py-2.5 px-4 flex items-center justify-center gap-3 relative z-[60]"
    >
      <p className="text-center leading-snug font-inter font-medium pr-6 sm:pr-0">
        {OFFER_BAR_MESSAGE}
      </p>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-foam/70 hover:text-foam hover:bg-foam/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default OfferBar;
