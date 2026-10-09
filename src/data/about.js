import aboutImage from '../assets/images/about-cafe.svg';
import aboutInteriorImg from '../assets/images/about-interior.svg';
import aboutBeansImg from '../assets/images/about-beans.svg';

export const aboutData = {
  badge: "Our Story & Philosophy",
  title: "Crafted With Soul In The Heart of Talwandi",
  subtitle: "More than just a café—a space to slow down, connect, and savor the finer notes of life.",
  paragraphs: [
    "Nestled in the bustling student city of Kota, Royal Bean Café was founded with a singular aspiration: to offer a warm, aesthetic refuge where time slows down. We bring together artisanal coffee culture and heartfelt Rajasthani hospitality.",
    "Every batch of single-origin beans is roasted with precision and dialed in daily by our passionate baristas. Whether you are studying for high-stakes exams, catching up with old friends, or seeking a quiet corner with a sketchbook, you'll always find your cozy spot here."
  ],
  stats: [
    {
      id: "varieties",
      value: 15,
      suffix: "+",
      label: "Artisan Brew Varieties",
      description: "From manual pour-overs to cold brews"
    },
    {
      id: "happy-guests",
      value: 50,
      suffix: "k+",
      label: "Cups Of Warmth Served",
      description: "Delighting students & locals daily"
    },
    {
      id: "rating",
      value: 4.9,
      suffix: "★",
      label: "Customer Rating",
      description: "Rated on Google Reviews & Zomato"
    },
    {
      id: "arabica",
      value: 100,
      suffix: "%",
      label: "Single-Origin Arabica",
      description: "Ethically sourced from Chikmagalur estates"
    }
  ],
  // 4 items preserved from Why section for a compact strip inside About
  whyStrip: {
    title: "The Royal Bean Standard",
    items: [
      {
        id: "ethically-sourced",
        icon: "ShieldCheck",
        title: "Direct Trade Arabica",
        description: "We source sustainably cultivated beans directly from Chikmagalur estates, roasted in small batches to preserve delicate aromatics."
      },
      {
        id: "master-baristas",
        icon: "Award",
        title: "Certified Baristas",
        description: "Our brewing team meticulously calibrates grind size, water mineral balance, and extraction temperature for every single shot."
      },
      {
        id: "fresh-in-house",
        icon: "Sparkles",
        title: "Fresh Baked Daily",
        description: "From buttery croissants to indulgent cheesecakes, every treat on our counter is crafted fresh without artificial preservatives."
      },
      {
        id: "community-first",
        icon: "Heart",
        title: "A Genuine Community Hub",
        description: "A welcoming, zero-rush sanctuary where Kota's students, teachers, creators, and families feel valued and at home."
      }
    ]
  },
  image: aboutImage,
  imageAlt: "The warm, cozy interior of Royal Bean Café in Talwandi",
  interiorImage: aboutInteriorImg,
  interiorImageAlt: "Warm amber-lit café interior with pendant lamps and cozy wooden furniture",
  beansImage: aboutBeansImg,
  beansImageAlt: "Freshly roasted single-origin Arabica coffee beans from Chikmagalur estates"
};

export default aboutData;
