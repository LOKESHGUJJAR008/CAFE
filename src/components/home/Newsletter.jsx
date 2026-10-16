import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Newsletter = () => {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(true);
      setEmail('');
    }, 800);
  };

  return (
    <section
      id="newsletter"
      className="w-full bg-[#14100E] text-[#FAF7F2] border-b-2 border-[#14100E] selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden"
      aria-label="Newsletter Dispatch"
    >
      {/* ── Top Archival Ticker ── */}
      <div className="border-b border-[#FAF7F2]/20 py-2.5 px-6 overflow-hidden bg-[#0D0907] select-none">
        <div className="flex items-center justify-between gap-6 whitespace-nowrap text-xs text-[#FAF7F2]/60 font-grotesk">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#FAF7F2]/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A27E]">
                DISPATCH · THE TATVA TELEGRAPH
              </span>
              <span className="w-8 h-[1px] bg-[#FAF7F2]/30" />
              <span className="font-cormorant italic text-sm text-[#FAF7F2]">
                Micro-Lot Drops & Secret Tastings
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full Width 2-Column Split (No Wasted Space) ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#FAF7F2]/20">
        
        {/* Left Manifesto Column (~55%) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="inline-block bg-[#FAF7F2] text-[#14100E] px-3 py-1 font-grotesk font-black text-[9px] uppercase tracking-[0.25em] mb-4">
              MEMBERSHIP & BULLETINS
            </div>
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#FAF7F2] leading-[0.95] mb-4">
              Stay in<br />
              <span className="font-cormorant italic font-normal text-[#C9A27E]">
                the Loop.
              </span>
            </h2>
            <p className="font-grotesk text-xs sm:text-sm text-[#FAF7F2]/75 max-w-lg leading-relaxed">
              Be the first to receive releases of small-batch seasonal roast drops, access to silent study block reservations, and private coffee cupping invitations in Talwandi.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#FAF7F2]/15 flex items-center gap-6 text-[10px] font-grotesk uppercase tracking-wider text-[#FAF7F2]/50">
            <span>• NO SPAM EVER</span>
            <span>• BI-WEEKLY DISPATCH</span>
            <span>• UNBEATABLE FRESH BREWS</span>
          </div>
        </div>

        {/* Right Interactive Form Column (~45%) */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#191310]">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border-2 border-[#FAF7F2] bg-[#14100E] text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#14100E] flex items-center justify-center mx-auto mb-4">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-grotesk font-black text-xl uppercase tracking-tight text-[#FAF7F2] mb-1">
                Welcome to the Sanctuary.
              </h3>
              <p className="font-grotesk text-xs text-[#FAF7F2]/70 mt-2">
                Your archive membership is active. Check your inbox for your welcome dispatch and coffee notes.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-[10px] font-grotesk uppercase tracking-widest text-[#C9A27E] hover:underline"
              >
                Register another email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A27E] block">
                SUBSCRIBE TO DISPATCH
              </span>

              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-[#FAF7F2] text-[#14100E] px-5 py-3.5 font-grotesk text-xs tracking-wide placeholder-[#14100E]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A27E] border-2 border-[#FAF7F2]"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="px-8 py-3.5 bg-[#C9A012] hover:bg-[#E5B815] text-[#14100E] font-grotesk text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {busy ? (
                    <span>JOINING...</span>
                  ) : (
                    <>
                      <span>JOIN</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <span className="text-red-400 font-grotesk text-[11px] mt-1 block">
                  {error}
                </span>
              )}

              <p className="font-grotesk text-[10px] text-[#FAF7F2]/45 tracking-wide mt-2">
                By subscribing, you agree to receive editorial releases from TATVA Café Talwandi. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
