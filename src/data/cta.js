import { siteData } from './site';

export const ctaData = {
  heading: "Your Next Coffee Break Is Waiting.",
  text: "Come in, grab your favourite cup and make yourself at home.",
  address: siteData.address.formatted,
  phone: siteData.phone,
  directionsLink: siteData.directionsLink,
  whatsappUrl: `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent("Hello Royal Bean Café! I'd like to order or ask a question.")}`,
  // For backwards compatibility with menu pages:
  badge: "Visit Us in Talwandi",
  title: "Your Next Coffee Break Is Waiting.",
  subtitle: "Come in, grab your favourite cup and make yourself at home."
};

export default ctaData;
