import React from 'react';
import { Link } from 'react-router-dom';
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
  { to: '/',        label: 'Home'    },
  { to: '/menu',    label: 'Menu'    },
  { to: '/about',   label: 'About'   },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/reserve', label: 'Reserve' },
];

export const Footer = () => {
  return (
    <footer id="footer" className="bg-[#1F1612] text-[#FBF7F1] pt-20 pb-10 relative">

      {/* ── Top separator ── */}
      <div className="w-full h-[1px] bg-[#FBF7F1]/10 mb-16" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* ── Main grid: logo + 3 columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">

          {/* Brand */}
          <div className="md:col-span-4">
            <Logo size="md" theme="dark" className="mb-6" />
            <p className="font-cormorant italic text-[#C9A27E] text-lg sm:text-xl leading-snug max-w-xs mb-6">
              "{footerData.tagline}"
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {siteData.socials.instagram && (
                <a
                  href={siteData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#FBF7F1]/40 hover:text-[#FBF7F1] transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {GOOGLE_REVIEW_URL && (
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-grotesk text-[10px] tracking-[0.2em] uppercase text-[#A8612E] hover:text-[#C9A27E] transition-colors font-semibold border-b border-[#A8612E]/40 hover:border-[#C9A27E] pb-0.5"
                >
                  ★ Rate on Google
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="font-grotesk text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A8612E] mb-6">
              Navigate
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-grotesk text-sm text-[#FBF7F1]/60 hover:text-[#FBF7F1] transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-grotesk text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A8612E] mb-6">
              Find Us
            </h3>
            <div className="flex flex-col gap-4">
              {/* Location name — BD underlined style */}
              <div>
                <p className="font-grotesk text-sm font-semibold tracking-[0.1em] uppercase text-[#FBF7F1] underline underline-offset-4 decoration-[#FBF7F1]/30 mb-1">
                  Talwandi, Kota
                </p>
                {GOOGLE_MAPS_URL && (
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-grotesk text-xs text-[#FBF7F1]/50 hover:text-[#FBF7F1] transition-colors leading-relaxed"
                  >
                    {footerData.contact.address}
                  </a>
                )}
              </div>
              <a
                href={`tel:${siteData.phoneRaw}`}
                className="font-grotesk text-xs text-[#FBF7F1]/50 hover:text-[#FBF7F1] transition-colors tracking-wide"
              >
                {footerData.contact.phone}
              </a>
              <a
                href={`mailto:${footerData.contact.email}`}
                className="font-grotesk text-xs text-[#FBF7F1]/50 hover:text-[#FBF7F1] transition-colors"
              >
                {footerData.contact.email}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <h3 className="font-grotesk text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A8612E] mb-6">
              Hours
            </h3>
            <div className="flex flex-col gap-3">
              {footerData.hours.map((h, idx) => (
                <div key={idx} className="flex items-baseline justify-between gap-4">
                  <span className="font-grotesk text-xs font-semibold text-[#FBF7F1]/80 uppercase tracking-wide">
                    {h.days}
                  </span>
                  <span className="font-grotesk text-xs text-[#FBF7F1]/40">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom separator ── */}
        <div className="w-full h-[1px] bg-[#FBF7F1]/10 mb-8" />

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-grotesk text-[10px] tracking-[0.15em] text-[#FBF7F1]/30 uppercase">
            {footerData.copyright}
          </p>
          <p className="font-grotesk text-[10px] tracking-[0.15em] text-[#FBF7F1]/30 uppercase">
            Talwandi · Kota · Rajasthan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
