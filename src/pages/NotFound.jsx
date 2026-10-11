import React from 'react';
import { siteData } from '../data/site';
import Logo from '../components/Logo';

/**
 * * — 404 Not Found page.
 * Shown for any route that doesn't match.
 */
const NotFound = () => (
  <section className="min-h-screen bg-ink text-foam flex flex-col
                      items-center justify-center gap-6 px-6 py-32">
    {/* Brand Logo */}
    <Logo size="lg" className="mb-2" />

    {/* Giant caramel 404 */}
    <span className="font-playfair font-bold text-[120px] sm:text-[160px] leading-none
                     text-caramel/20 select-none" aria-hidden="true">
      404
    </span>

    <div className="flex flex-col items-center gap-3 -mt-8">
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-caramel
                       bg-caramel/10 border border-caramel/25 px-4 py-1.5 rounded-full">
        Page Not Found
      </span>
      <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-foam text-center
                     leading-tight max-w-sm">
        This seat seems to be empty.
      </h1>
      <p className="text-almond/55 text-sm text-center max-w-xs leading-relaxed">
        The page you're looking for doesn't exist, but your perfect cup at{' '}
        <span className="text-caramel font-semibold">{siteData.name}</span> is waiting.
      </p>
    </div>

    <a
      href="/"
      className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                 bg-caramel text-ink font-bold text-sm tracking-wide
                 hover:bg-foam transition-colors shadow-warm"
    >
      ← Back to Home
    </a>
  </section>
);

export default NotFound;
