import coffeeImg from '../assets/images/featured-caramel-latte.svg';
import coldCoffeeImg from '../assets/images/featured-cold-brew.svg';
import teaImg from '../assets/images/featured-cortado.svg';
import dessertsImg from '../assets/images/featured-mocha.svg';
import snacksImg from '../assets/images/cat-snacks.svg';
import { getImage } from './images';

export const menuData = {
  badge: "Curated Menu",
  title: "Explore Our Offerings",
  subtitle: "Every beverage and plate is prepared fresh using pure ingredients and authentic techniques.",
  categories: [
    {
      id: "coffee",
      name: "Coffee",
      description: "Hot artisan espresso and filter brews crafted from single-origin Arabica",
      image: coffeeImg,
      theme: {
        bg: "#1F1612",       // espresso
        blob: "#C9A27E",     // roast
        accent: "#A8612E",   // caramel
        blobPath: "M 70 250 C 70 110, 160 50, 290 60 C 420 70, 460 180, 440 310 C 420 440, 270 460, 150 430 C 70 400, 70 340, 70 250 Z",
        textColor: "text-foam",
        subtextColor: "text-almond/80",
        priceColor: "text-caramel",
        cardBg: "bg-ink/30 border-ink/50",
        isDark: true
      },
      items: [
        {
          id: "espresso-solo",
          slug: "espresso-solo",
          name: "Espresso Classico",
          description: "A concentrated, full-bodied double shot with thick golden crema.",
          price: 119,
          formattedPrice: "₹119",
          isVeg: true,
          diet: "veg",
          badge: "Classic",
          bestseller: false,
          image: coffeeImg,
          ingredients: ["Double Shot Espresso", "Arabica Beans"]
        },
        {
          id: "americano-caff",
          slug: "americano-caff",
          name: "Caffè Americano",
          description: "Hot water topped with rich double espresso, preserving the delicate aromatics.",
          price: 139,
          formattedPrice: "₹139",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: false,
          image: coffeeImg,
          ingredients: ["Double Espresso", "Hot Water", "Aromatics"]
        },
        {
          id: "cappuccino-royal",
          slug: "cappuccino-royal",
          name: "Royal Cappuccino",
          description: "Equal layers of espresso, steamed milk, and dense micro-foam, dusted with cinnamon.",
          price: 159,
          formattedPrice: "₹159",
          isVeg: true,
          diet: "veg",
          badge: "Bestseller",
          bestseller: true,
          image: coffeeImg,
          ingredients: ["Espresso", "Steamed Milk", "Micro-foam", "Cinnamon"]
        },
        {
          id: "cafe-latte",
          slug: "cafe-latte",
          name: "Silky Vanilla Café Latte",
          description: "Smooth espresso melded into lightly texturized milk with natural vanilla bean syrup.",
          price: 179,
          formattedPrice: "₹179",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: true,
          image: coffeeImg,
          ingredients: ["Espresso", "Texturized Milk", "Vanilla Bean Syrup"]
        },
        {
          id: "flat-white",
          slug: "flat-white",
          name: "Artisan Flat White",
          description: "Expertly poured ristretto micro-foam with an intense, silky coffee profile.",
          price: 169,
          formattedPrice: "₹169",
          isVeg: true,
          diet: "veg",
          badge: "Barista's Choice",
          bestseller: false,
          image: coffeeImg,
          ingredients: ["Ristretto", "Micro-foam"]
        },
        {
          id: "irish-cream-mocha",
          slug: "irish-cream-mocha",
          name: "Irish Cream Mocha",
          description: "Espresso, non-alcoholic Irish cream syrup, steamed milk, and cocoa.",
          price: 209,
          formattedPrice: "₹209",
          isVeg: true,
          diet: "veg",
          badge: "Special",
          bestseller: false,
          image: coffeeImg,
          ingredients: ["Espresso", "Irish Cream Syrup", "Steamed Milk", "Cocoa"]
        }
      ]
    },
    {
      id: "cold-coffee",
      name: "Cold Coffee",
      description: "Chilled blends, iced lattes, and long-steeped cold brews for sunny Kota afternoons",
      image: coldCoffeeImg,
      theme: {
        bg: "#C9A27E",       // roast
        blob: "#1F1612",     // espresso
        accent: "#EADBC8",   // beige
        blobPath: "M 90 230 C 80 130, 200 40, 320 80 C 440 120, 470 220, 420 340 C 370 460, 240 450, 130 400 C 60 350, 100 300, 90 230 Z",
        textColor: "text-foam",
        subtextColor: "text-almond/80",
        priceColor: "text-caramel",
        cardBg: "bg-ink/40 border-ink/60",
        isDark: true
      },
      items: [
        {
          id: "classic-iced-latte",
          slug: "classic-iced-latte",
          name: "Classic Iced Café Latte",
          description: "Fresh espresso poured over cold milk and crystalline ice cubes.",
          price: 159,
          formattedPrice: "₹159",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: false,
          image: getImage('icedCoffee'),
          ingredients: ["Espresso", "Cold Milk", "Ice Cubes"]
        },
        {
          id: "vietnamese-cold-brew",
          slug: "vietnamese-cold-brew",
          name: "Vietnamese Shaken Iced Coffee",
          description: "Slow drip roast shaken over condensed milk and crushed ice.",
          price: 189,
          formattedPrice: "₹189",
          isVeg: true,
          diet: "veg",
          badge: "Popular",
          bestseller: false,
          image: coldCoffeeImg,
          ingredients: ["Slow Drip Roast", "Condensed Milk", "Ice"]
        },
        {
          id: "caramel-frappe",
          slug: "caramel-frappe",
          name: "Caramel Crunch Frappé",
          description: "Blended coffee shake crowned with whipped cream and butterscotch crisps.",
          price: 219,
          formattedPrice: "₹219",
          isVeg: true,
          diet: "veg",
          badge: "Bestseller",
          bestseller: true,
          image: coldCoffeeImg,
          ingredients: ["Coffee Shake", "Whipped Cream", "Butterscotch Crisps"]
        },
        {
          id: "mocha-chiller",
          slug: "mocha-chiller",
          name: "Dark Chocolate Mocha Chiller",
          description: "Blended espresso with rich cocoa fudge and whole cold milk.",
          price: 209,
          formattedPrice: "₹209",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: false,
          image: coldCoffeeImg,
          ingredients: ["Espresso", "Cocoa Fudge", "Cold Milk"]
        },
        {
          id: "nitro-cold-brew",
          slug: "nitro-cold-brew",
          name: "Signature Nitro Cold Brew",
          description: "Cold brew infused with nitrogen bubbles for a draft-pour Guinness-like silkiness.",
          price: 229,
          formattedPrice: "₹229",
          isVeg: true,
          diet: "veg",
          badge: "Signature",
          bestseller: false,
          image: coldCoffeeImg,
          ingredients: ["Cold Brew", "Nitrogen Bubbles"]
        }
      ]
    },
    {
      id: "tea",
      name: "Tea",
      description: "Soothing artisanal infusions, classic royal chai, and floral tisanes",
      image: teaImg,
      theme: {
        bg: "#EADBC8",       // beige
        blob: "#FBF7F1",     // cream
        accent: "#A8612E",   // caramel
        blobPath: "M 60 260 C 60 140, 180 70, 300 50 C 420 30, 450 160, 450 280 C 450 400, 310 470, 180 440 C 80 410, 60 360, 60 260 Z",
        textColor: "text-ink",
        subtextColor: "text-ink/85",
        priceColor: "text-ink",
        cardBg: "bg-foam/60 border-foam",
        isDark: false
      },
      items: [
        {
          id: "royal-kulhad-chai",
          slug: "royal-kulhad-chai",
          name: "Royal Masala Kulhad Chai",
          description: "Slow-brewed Assam leaves with crushed cardamom, ginger, cloves, and whole milk.",
          price: 99,
          formattedPrice: "₹99",
          isVeg: true,
          diet: "veg",
          badge: "Local Favorite",
          bestseller: true,
          image: teaImg,
          ingredients: ["Assam Leaves", "Cardamom", "Ginger", "Cloves", "Milk"]
        },
        {
          id: "kashmiri-kahwa",
          slug: "kashmiri-kahwa",
          name: "Kashmiri Saffron Kahwa",
          description: "Green tea simmered with pure saffron strands, crushed almonds, and cinnamon bark.",
          price: 149,
          formattedPrice: "₹149",
          isVeg: true,
          diet: "veg",
          badge: "Special",
          bestseller: false,
          image: teaImg,
          ingredients: ["Green Tea", "Saffron", "Almonds", "Cinnamon"]
        },
        {
          id: "earl-grey",
          slug: "earl-grey",
          name: "Imperial Earl Grey",
          description: "Black whole tea leaves naturally scented with Italian bergamot oil.",
          price: 129,
          formattedPrice: "₹129",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: false,
          image: teaImg,
          ingredients: ["Black Tea", "Bergamot Oil"]
        },
        {
          id: "chamomile-blossom",
          slug: "chamomile-blossom",
          name: "Chamomile Citrus Tisane",
          description: "Caffeine-free soothing Egyptian chamomile flowers with subtle notes of orange peel.",
          price: 139,
          formattedPrice: "₹139",
          isVeg: true,
          diet: "veg",
          badge: "Calming",
          bestseller: false,
          image: teaImg,
          ingredients: ["Chamomile Flowers", "Orange Peel"]
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Freshly baked artisan pastries, warm pies, and decadent confections",
      image: dessertsImg,
      theme: {
        bg: "#A8612E",       // caramel
        blob: "#1F1612",     // espresso
        accent: "#FBF7F1",   // cream
        blobPath: "M 80 220 C 100 100, 220 60, 340 70 C 460 80, 440 200, 430 330 C 420 460, 280 440, 160 420 C 70 380, 60 310, 80 220 Z",
        textColor: "text-foam",
        subtextColor: "text-foam/80",
        priceColor: "text-foam",
        cardBg: "bg-ink/30 border-ink/40",
        isDark: true
      },
      items: [
        {
          id: "belgian-chocolate-truffle-cake",
          slug: "belgian-chocolate-truffle-cake",
          name: "Belgian Chocolate Truffle Pastry",
          description: "Layers of moist cocoa sponge and velvety chocolate ganache.",
          price: 159,
          formattedPrice: "₹159", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Bestseller",
          bestseller: true,
          image: getImage('chocolatePastry'),
          ingredients: ["Cocoa Sponge", "Chocolate Ganache"]
        },
        {
          id: "blueberry-cheesecake",
          slug: "blueberry-cheesecake",
          name: "New York Blueberry Cheesecake",
          description: "Creamy baked Philadelphia-style cheesecake with compote on a biscuit crust.",
          price: 189,
          formattedPrice: "₹189", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Must Try",
          bestseller: false,
          image: getImage('blueberryCheesecake'),
          ingredients: ["Cheesecake", "Blueberry Compote", "Biscuit Crust"]
        },
        {
          id: "tiramisu-jar",
          slug: "tiramisu-jar",
          name: "Artisanal Espresso Tiramisu Jar",
          description: "Savoiardi ladyfingers soaked in TATVA espresso with mascarpone cream.",
          price: 199,
          formattedPrice: "₹199", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Signature",
          bestseller: false,
          image: dessertsImg,
          ingredients: ["Ladyfingers", "Espresso", "Mascarpone Cream"]
        },
        {
          id: "warm-walnut-brownie",
          slug: "warm-walnut-brownie",
          name: "Sizzling Walnut Brownie with Gelato",
          description: "Warm fudgy brownie topped with Madagascar vanilla gelato and hot fudge.",
          price: 219,
          formattedPrice: "₹219", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Comfort",
          bestseller: false,
          image: getImage('walnutBrownie'),
          ingredients: ["Fudgy Brownie", "Vanilla Gelato", "Walnuts", "Hot Fudge"]
        }
      ]
    },
    {
      id: "snacks",
      name: "Snacks",
      description: "Gourmet grilled sandwiches, sourdough toasts, and crunchy finger foods",
      image: snacksImg,
      theme: {
        bg: "#FBF7F1",       // cream
        blob: "#EADBC8",     // beige
        accent: "#C9A27E",   // roast
        blobPath: "M 100 240 C 80 120, 170 50, 310 60 C 450 70, 460 210, 420 320 C 380 430, 250 470, 140 430 C 70 390, 110 320, 100 240 Z",
        textColor: "text-ink",
        subtextColor: "text-ink/80",
        priceColor: "text-caramel",
        cardBg: "bg-foam/70 border-almond/60",
        isDark: false
      },
      items: [
        {
          id: "paneer-tikka-sandwich",
          slug: "paneer-tikka-sandwich",
          name: "Smoked Paneer Tikka Panini",
          description: "Tandoori marinated cottage cheese, charred bell peppers, and mint mayo in herbed focaccia.",
          price: 199,
          formattedPrice: "₹199", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Bestseller",
          bestseller: true,
          image: getImage('paneerPanini'),
          ingredients: ["Paneer Tikka", "Bell Peppers", "Mint Mayo", "Focaccia"]
        },
        {
          id: "cheese-corn-nuggets",
          slug: "cheese-corn-nuggets",
          name: "Crispy Peri-Peri Cheese Poppers",
          description: "Golden crumbed jalapeño and molten cheese bites served with roasted garlic dip.",
          price: 179,
          formattedPrice: "₹179", // PROPOSED, owner approval pending
          isVeg: true,
          diet: "unconfirmed", // CONFIRM WITH CLIENT: egg/eggless
          badge: "Youth Favorite",
          bestseller: false,
          image: getImage('cheesePoppers'),
          ingredients: ["Jalapeño", "Cheese", "Garlic Dip"]
        },
        {
          id: "avocado-toast",
          slug: "avocado-toast",
          name: "Sourdough Guacamole Toast",
          description: "Toasted artisan sourdough, seasoned mashed avocado, cherry tomatoes, and micro-greens.",
          price: 229,
          formattedPrice: "₹229",
          isVeg: true,
          diet: "veg",
          badge: "Healthy Choice",
          bestseller: false,
          image: snacksImg,
          ingredients: ["Sourdough", "Avocado", "Cherry Tomatoes", "Micro-greens"]
        },
        {
          id: "classic-french-fries",
          slug: "classic-french-fries",
          name: "Truffle & Parmesan French Fries",
          description: "Crispy potato fries tossed in herb truffle oil and seasoned shaved cheese.",
          price: 149,
          formattedPrice: "₹149",
          isVeg: true,
          diet: "veg",
          badge: null,
          bestseller: false,
          image: snacksImg,
          ingredients: ["Potato Fries", "Truffle Oil", "Parmesan"]
        }
      ]
    }
  ]
};

export default menuData;
