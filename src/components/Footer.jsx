import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { siteData } from '../data/site';
import { footerData } from '../data/footer';
import { GOOGLE_REVIEW_URL, GOOGLE_MAPS_URL, DEMO_MODE } from '../config';
import Logo from './Logo';

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  const [demoBannerVisible, setDemoBannerVisible] = React.useState(DEMO_MODE);
  
  return (
    <footer id="footer" className="bg-ink text-foam border-t border-ink/30 pt-16 pb-12 px-6 sm:px-10 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* ── Top Grid: Brand + 4 Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand & Tagline: lg:col-span-4 */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo size="md" theme="dark" className="mb-3" />
            <p className="font-playfair italic text-sm sm:text-base text-almond/80 max-w-xs mt-1">
              “{footerData.tagline}”
            </p>
          </div>

          {/* Quick Links: lg:col-span-2, 2 cols on mobile */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-caramel mb-4 font-inter">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-xs sm:text-sm font-medium text-almond/80">
              {footerData.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="hover:text-foam hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/reserve" className="hover:text-foam hover:underline underline-offset-4 transition-colors">
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact: lg:col-span-3 */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-caramel mb-4 font-inter">
              Contact
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-almond/80">
              {GOOGLE_MAPS_URL && (
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-foam transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-caramel shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed">{footerData.contact.address}</span>
                </a>
              )}

              <a
                href={`tel:${siteData.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-foam transition-colors group"
              >
                <Phone className="w-4 h-4 text-caramel shrink-0 group-hover:scale-110 transition-transform" />
                <span>{footerData.contact.phone}</span>
              </a>

              <a
                href={`mailto:${footerData.contact.email}`}
                className="flex items-center gap-2.5 hover:text-foam transition-colors group"
              >
                <Mail className="w-4 h-4 text-caramel shrink-0 group-hover:scale-110 transition-transform" />
                <span>{footerData.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Hours & Social: lg:col-span-3 */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-caramel mb-4 font-inter">
              Hours
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-almond/80 mb-6">
              {footerData.hours.map((h, idx) => (
                <div key={idx} className="flex justify-between gap-4">
                  <span className="font-semibold text-foam/90">{h.days}</span>
                  <span className="text-almond/70">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel mb-3 font-inter">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {siteData.socials.instagram && (
                  <a
                    href={siteData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram @royalbeancafe"
                    className="w-9 h-9 rounded-full bg-ink/40 border border-almond/20 hover:border-caramel hover:bg-ink text-foam flex items-center justify-center transition-all group"
                  >
                    <InstagramIcon className="w-4 h-4 text-caramel group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {/* Facebook icon hidden unless a real URL exists */}
                {siteData.socials.facebook && (
                  <a
                    href={siteData.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-ink/40 border border-almond/20 hover:border-caramel hover:bg-ink text-foam flex items-center justify-center transition-all group"
                  >
                    <FacebookIcon className="w-4 h-4 text-caramel group-hover:scale-110 transition-transform" />
                  </a>
                )}
              </div>
              {GOOGLE_REVIEW_URL && (
                <div className="mt-4">
                  <a 
                    href={GOOGLE_REVIEW_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-caramel/40 text-caramel hover:bg-caramel hover:text-foam text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>★</span> Rate us on Google
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="border-t border-ink/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-almond/60 gap-4 text-center sm:text-left font-inter">
          <div>{footerData.copyright}</div>
          <div className="text-almond/50">
            Talwandi, Kota, Rajasthan
          </div>
        </div>
      </div>
      {demoBannerVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-caramel text-foam text-center text-xs py-2 px-4 z-50 flex items-center justify-center gap-4 shadow-lg border-t border-foam/20">
          <span>Demo preview: contact details, prices and reviews are samples</span>
          <button 
            onClick={() => setDemoBannerVisible(false)}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-foam/20 hover:bg-foam/30 transition-colors focus:outline-none"
            aria-label="Dismiss demo banner"
          >
            ×
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
