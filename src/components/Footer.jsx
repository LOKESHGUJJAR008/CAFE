import React from 'react';
import { siteData } from '../data/site';
import { footerData } from '../data/footer';

export const Footer = () => {
  return (
    <footer id="footer" className="py-14 px-6 bg-espresso-dark text-cream border-t border-roast/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="font-playfair text-xl font-bold text-cream tracking-tight">
            {siteData.name}
          </div>
          <p className="text-xs text-beige/70 mt-1 max-w-sm leading-relaxed">
            {footerData.aboutText}
          </p>
        </div>
        <div className="text-xs text-beige/60 flex flex-col items-center md:items-end gap-1">
          <div>{footerData.copyright}</div>
          <div className="text-caramel">{footerData.locationBadge}</div>
          <span className="font-mono text-[10px] text-beige/40">[Placeholder: Footer Section]</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
