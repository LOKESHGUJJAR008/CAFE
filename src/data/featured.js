import caramelLatteImg from '../assets/images/featured-caramel-latte.svg';
import coldBrewImg from '../assets/images/featured-cold-brew.svg';
import cortadoImg from '../assets/images/featured-cortado.svg';
import mochaImg from '../assets/images/featured-mocha.svg';

export const featuredData = {
  badge: "Barista's Signature Selection",
  title: "Handcrafted Coffee Favorites",
  subtitle: "Carefully calibrated roasts, velvety textures, and balanced flavor notes that have become Kota's top favorites.",
  items: [
    {
      id: "royal-caramel-macchiato",
      name: "Royal Caramel Macchiato",
      tagline: "House Signature",
      description: "Steamed whole milk marked with a bold double shot of espresso, layered with house-made salted caramel and bourbon vanilla.",
      price: 189,
      formattedPrice: "₹189",
      rating: 4.9,
      reviewCount: 340,
      badge: "Bestseller",
      tags: ["Hot", "Sweet", "Signature"],
      image: caramelLatteImg
    },
    {
      id: "hazelnut-silk-cold-brew",
      name: "Hazelnut Silk Cold Brew",
      tagline: "Slow-Steeped 18 Hours",
      description: "Single-origin beans steeped in chilled water for 18 hours, infused with toasted hazelnut essence and a velvety vanilla cold foam top.",
      price: 199,
      formattedPrice: "₹199",
      rating: 4.8,
      reviewCount: 280,
      badge: "Must Try",
      tags: ["Cold", "Low Acidity", "Refreshing"],
      image: coldBrewImg
    },
    {
      id: "cortado-royal",
      name: "Cortado Royal",
      tagline: "Pure Coffee Purist",
      description: "Equal balance of double ristretto espresso cuts through an equal measure of warm, silky textured milk. Notes of roasted nuts and dark cocoa.",
      price: 169,
      formattedPrice: "₹169",
      rating: 4.9,
      reviewCount: 195,
      badge: "Barista Pick",
      tags: ["Hot", "Strong", "Unsweetened"],
      image: cortadoImg
    },
    {
      id: "belgian-truffle-mocha",
      name: "Belgian Dark Truffle Mocha",
      tagline: "Indulgent & Rich",
      description: "70% melted Belgian chocolate ganache paired with rich espresso shots, steamed velvet milk, and dusted Dutch cocoa.",
      price: 219,
      formattedPrice: "₹219",
      rating: 5.0,
      reviewCount: 410,
      badge: "Indulgence",
      tags: ["Hot", "Chocolate", "Decadent"],
      image: mochaImg
    }
  ]
};

export default featuredData;
