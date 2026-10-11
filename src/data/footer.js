import { siteData } from './site';

export const footerData = {
  tagline: siteData.tagline,
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" }
  ],
  contact: {
    address: siteData.address.formatted,
    phone: siteData.phone,
    email: siteData.email
  },
  hours: [
    { days: "Mon – Thu", time: "10:00 AM – 10:30 PM" },
    { days: "Fri", time: "10:00 AM – 11:00 PM" },
    { days: "Sat – Sun", time: "9:00 AM – 11:00 PM" }
  ],
  copyright: "© 2026 TATVA Café. All Rights Reserved."
};

export default footerData;
