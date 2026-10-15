import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, MapPin, Phone, Mail, Star, Clock, Calendar, Check } from 'lucide-react';
import { siteData } from '../data/site';
import { footerData } from '../data/footer';
import { GOOGLE_REVIEW_URL, GOOGLE_MAPS_URL } from '../config';
import Logo from './Logo';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const NAV_LINKS = [
  { to: '/',        label: 'Home',          code: '01' },
  { to: '/menu',    label: 'Artisan Menu',  code: '02' },
  { to: '/about',   label: 'Our Story',     code: '03' },
  { to: '/gallery', label: 'Prime Archive', code: '04' },
  { to: '/reserve', label: 'Reserve Table', code: '05' },
  { to: '/contact', label: 'Contact & Lab', code: '06' },
];

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#14100E] text-[#FAF7F2] border-t-2 border-[#FAF7F2]/15 relative selection:bg-[#FAF7F2] selection:text-[#14100E] overflow-hidden">
      
      {/* ── Top Running Archival Ticker (Full Width Edge-to-Edge) ── */}
      <div className="w-full border-b border-[#FAF7F2]/15 bg-[#0D0A09] py-3 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-auto scrollbar-none">
        <div className="w-full flex items-center justify-between gap-8 whitespace-nowrap text-[10px] sm:text-xs font-grotesk font-black uppercase tracking-[0.25em] text-[#FAF7F2]/70">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#C9A27E]" />
            <span className="text-[#FAF7F2]">TATVA ARTISAN COFFEE HOUSE</span>
          </div>
          <span className="text-[#FAF7F2]/30">/</span>
          <span>TALWANDI, KOTA, RAJASTHAN</span>
          <span className="text-[#FAF7F2]/30">/</span>
          <span>LAT: 25.18° N · ELEVATION 271M</span>
          <span className="text-[#FAF7F2]/30">/</span>
          <span>SINGLE-ORIGIN ROASTERY & BOTANICAL APOTHECARY</span>
          <span className="text-[#FAF7F2]/30">/</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400">OPEN DAILY · 10:00 AM — 11:00 PM</span>
          </div>
        </div>
      </div>

      {/* ── Main Full-Width Content Container (Expanded, No Awkward Side Margins) ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#FAF7F2]/15">
          
          {/* ── Col 1: Brand Identity & Newsletter (4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Logo size="md" theme="dark" />
              </div>

              <p className="font-cormorant italic text-[#C9A27E] text-xl sm:text-2xl leading-snug max-w-sm mb-4">
                "{footerData.tagline}"
              </p>

              <p className="font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2]/60 leading-relaxed max-w-sm mb-7">
                A serene brutalist sanctuary devoted to slow extraction, single-origin peaberry coffees, and intentional conversation in Talwandi.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6 max-w-sm">
                <span className="block font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF7F2]/80 mb-2">
                  JOIN THE TATVA ARCHIVE
                </span>
                <form onSubmit={handleSubscribe} className="flex items-stretch border-2 border-[#FAF7F2]/30 focus-within:border-[#C9A27E] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL..."
                    required
                    className="w-full bg-[#1A1412] px-3.5 py-2.5 font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2] placeholder-[#FAF7F2]/30 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] hover:text-[#14100E] font-grotesk font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center shrink-0"
                  >
                    {subscribed ? <Check className="w-4 h-4 text-emerald-800" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
                {subscribed && (
                  <span className="block text-[10px] font-grotesk text-emerald-400 mt-1 uppercase tracking-wider">
                    ✓ Welcome to the Tatva Circle.
                  </span>
                )}
              </div>
            </div>

            {/* Social & Ratings */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {siteData.socials.instagram && (
                <a
                  href={siteData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#FAF7F2]/20 hover:border-[#FAF7F2] hover:bg-[#FAF7F2]/10 text-xs font-grotesk uppercase tracking-wider text-[#FAF7F2]/80 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>@tatvacafe</span>
                </a>
              )}
              {GOOGLE_REVIEW_URL && (
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#FAF7F2]/20 hover:border-[#C9A27E] hover:bg-[#C9A27E]/10 text-xs font-grotesk uppercase tracking-wider text-[#C9A27E] transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-[#C9A27E]" />
                  <span>4.9 / 5 on Google</span>
                </a>
              )}
            </div>
          </div>

          {/* ── Col 2: Navigation Links (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
              <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                DIRECTORY
              </h3>
            </div>
            <ul className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2.5 font-grotesk text-xs uppercase tracking-[0.16em] text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                  >
                    <span className="font-mono text-[9px] text-[#FAF7F2]/30 group-hover:text-[#C9A27E] transition-colors">
                      {link.code}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Location & Coordinates (3 cols) ── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
              <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                SANCTUARY
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block font-grotesk text-[11px] font-black uppercase tracking-[0.2em] text-[#FAF7F2] mb-1">
                  TALWANDI, KOTA
                </span>
                {GOOGLE_MAPS_URL && (
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-grotesk text-xs uppercase tracking-wider text-[#FAF7F2]/60 hover:text-[#FAF7F2] leading-relaxed transition-colors border-b border-[#FAF7F2]/15 pb-2"
                  >
                    {footerData.contact.address}
                  </a>
                )}
              </div>

              <div className="space-y-2 pt-1 text-xs font-grotesk uppercase tracking-wider">
                <a
                  href={`tel:${siteData.phoneRaw}`}
                  className="flex items-center gap-2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>{footerData.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>{footerData.contact.email}</span>
                </a>
              </div>

              {GOOGLE_MAPS_URL && (
                <div className="pt-2">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2] hover:text-[#14100E] text-[10px] font-grotesk font-black uppercase tracking-[0.2em] border border-[#FAF7F2]/20 transition-all group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C9A27E] group-hover:text-[#14100E]" />
                    <span>GET DIRECTIONS</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ── Col 4: Timetable & Quick Reservation (3 cols) ── */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 bg-[#C9A27E]" />
                <h3 className="font-grotesk text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A27E]">
                  OPERATING HOURS
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {footerData.hours.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]/10 text-xs font-grotesk uppercase">
                    <span className="font-black text-[#FAF7F2]/80 tracking-wider">
                      {h.days}
                    </span>
                    <span className="text-[#FAF7F2]/60 tracking-widest font-mono text-[11px]">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Booking Quick Action */}
            <div className="p-4 bg-[#1C1613] border border-[#FAF7F2]/20">
              <span className="block font-grotesk text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A27E] mb-1">
                INTENTIONAL SEATING
              </span>
              <span className="block font-grotesk font-black text-xs uppercase tracking-tight text-[#FAF7F2] mb-3">
                PRIVATE BREW BAR & CORNERS
              </span>
              <Link
                to="/reserve"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F2] text-[#14100E] hover:bg-[#C9A27E] font-grotesk font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK A TABLE →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ── Bottom Strip: Legal, Architecture Note, Back to Top ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-grotesk uppercase tracking-[0.18em] text-[#FAF7F2]/40">
          <div>
            <span>{footerData.copyright}</span>
          </div>

          <div className="hidden md:block text-center">
            <span>DISCIPLINED EXTRACTION · RAW STONE · ARABICA TRADITION</span>
          </div>

          <div className="flex items-center gap-6">
            <span>KOTA · RAJASTHAN</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors cursor-pointer border-b border-transparent hover:border-[#FAF7F2]/60 pb-0.5"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
