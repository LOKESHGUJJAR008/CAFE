import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   NEWSLETTER — Frontend-only. No data is sent anywhere.
   To connect a real service, replace the handleSubmit body below with a
   fetch/POST call to Mailchimp, Formspree, ConvertKit, etc.
   ───────────────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Beans image with a left-to-right gradient mask that fades into ink ─── */
const BeansImage = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-full min-h-[220px] overflow-hidden rounded-2xl">
      {/* Gradient mask: fades left edge into ink background */}
      <div
        className="absolute inset-0 z-10 pointer-events-none
                   bg-gradient-to-r from-ink via-ink/40 to-transparent md:via-ink/20"
        aria-hidden="true"
      />

      {!imgFailed ? (
        <img
          src="/images/beans.webp"
          alt="Fresh coffee beans"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        /* ── Fallback: dark gradient with a subtle dotted bean SVG pattern ── */
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#2a1e17] to-caramel/40">
          <svg
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="newsletter-bean-pattern"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
              >
                {/* Bean shape */}
                <path
                  d="M16 12 C9 12 5 19 12 26 C19 33 27 29 27 22 C27 15 23 12 16 12 Z"
                  stroke="#EADBC8"
                  strokeWidth="1.1"
                  fill="none"
                />
                {/* Bean crease */}
                <path
                  d="M13 16 Q 18 19 19 24"
                  stroke="#EADBC8"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Second bean, offset */}
                <path
                  d="M44 38 C37 38 33 45 40 52 C47 59 55 55 55 48 C55 41 51 38 44 38 Z"
                  stroke="#EADBC8"
                  strokeWidth="1.1"
                  fill="none"
                />
                <path
                  d="M41 42 Q 46 45 47 50"
                  stroke="#EADBC8"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#newsletter-bean-pattern)" />
          </svg>
        </div>
      )}
    </div>
  );
};

/* ─── Section ─────────────────────────────────────────────────────────────── */
export const Newsletter = () => {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const validate = (val) => {
    if (!val.trim()) return 'Please enter your email address.';
    if (!EMAIL_RE.test(val.trim())) return 'That doesn\'t look like a valid email.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) { setError(err); return; }
    setError('');
    setBusy(true);

    /* ── TODO: replace this timeout with a real API call ──────────────────
       Example (Formspree):
       await fetch('https://formspree.io/f/YOUR_FORM_ID', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email }),
       });
       ────────────────────────────────────────────────────────────────── */
    setTimeout(() => {
      setBusy(false);
      setSuccess(true);
    }, 700);
  };

  return (
    <section
      id="newsletter"
      className="bg-foam py-16 md:py-24 px-3 sm:px-6 overflow-hidden"
      aria-label="Newsletter sign-up"
    >
      {/* Ink rounded container */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="bg-ink mx-auto max-w-7xl rounded-3xl overflow-hidden
                   grid grid-cols-1 md:grid-cols-2 shadow-warm-lg border border-white/5"
      >
        {/* ── Left: form ── */}
        <div className="px-8 sm:px-12 py-12 sm:py-16 flex flex-col justify-center">
          <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-caramel mb-4 font-inter">
            Newsletter
          </span>

          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foam tracking-tight mb-3">
            Stay in the Loop
          </h2>

          <p className="text-foam/70 text-sm sm:text-base leading-relaxed mb-8 font-inter max-w-sm">
            Be the first to hear about new brews, events and offers.
          </p>

          {success ? (
            /* ── Success state ── */
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl
                         bg-caramel/20 border border-caramel/40 text-foam
                         font-inter text-sm font-semibold"
              role="status"
              aria-live="polite"
            >
              <Mail className="w-5 h-5 text-caramel flex-shrink-0" />
              Thank you, see you soon! ☕
            </motion.div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate aria-label="Email subscription form">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    aria-invalid={!!error}
                    className="w-full px-5 py-3.5 rounded-xl
                               bg-foam text-ink placeholder-ink/40
                               text-sm font-inter font-medium
                               border-2 border-transparent
                               focus:border-caramel focus:outline-none
                               transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2
                             px-7 py-3.5 rounded-xl
                             bg-caramel hover:bg-caramel/80 disabled:opacity-60
                             text-ink text-xs font-bold tracking-wide
                             transition-all shadow-warm
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foam"
                >
                  {busy ? (
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Inline error */}
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400 font-inter"
                >
                  {error}
                </p>
              )}
            </form>
          )}

          {/* Tagline */}
          <p className="mt-6 text-latte text-xs italic font-inter">
            fresh brews, no spam, just soul.
          </p>
        </div>

        {/* ── Right: beans image — stacked on mobile ── */}
        <div className="relative order-first md:order-last">
          <BeansImage />
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
