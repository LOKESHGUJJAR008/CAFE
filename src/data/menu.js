export const menuData = {
  badge: "Curated Menu",
  title: "Explore Our Offerings",
  subtitle: "Every beverage and plate is prepared fresh using pure ingredients and authentic techniques.",
  categories: [
    {
      id: "coffee",
      name: "Coffee",
      description: "Hot artisan espresso and filter brews crafted from single-origin Arabica",
      items: [
        {
          id: "espresso-solo",
          name: "Espresso Classico",
          description: "A concentrated, full-bodied double shot with thick golden crema.",
          price: 119,
          formattedPrice: "₹119",
          isVeg: true,
          badge: "Classic"
        },
        {
          id: "americano-caff",
          name: "Caffè Americano",
          description: "Hot water topped with rich double espresso, preserving the delicate aromatics.",
          price: 139,
          formattedPrice: "₹139",
          isVeg: true,
          badge: null
        },
        {
          id: "cappuccino-royal",
          name: "Royal Cappuccino",
          description: "Equal layers of espresso, steamed milk, and dense micro-foam, dusted with cinnamon.",
          price: 159,
          formattedPrice: "₹159",
          isVeg: true,
          badge: "Bestseller"
        },
        {
          id: "cafe-latte",
          name: "Silky Vanilla Café Latte",
          description: "Smooth espresso melded into lightly texturized milk with natural vanilla bean syrup.",
          price: 179,
          formattedPrice: "₹179",
          isVeg: true,
          badge: null
        },
        {
          id: "flat-white",
          name: "Artisan Flat White",
          description: "Expertly poured ristretto micro-foam with an intense, silky coffee profile.",
          price: 169,
          formattedPrice: "₹169",
          isVeg: true,
          badge: "Barista's Choice"
        },
        {
          id: "irish-cream-mocha",
          name: "Irish Cream Mocha",
          description: "Espresso, non-alcoholic Irish cream syrup, steamed milk, and cocoa.",
          price: 209,
          formattedPrice: "₹209",
          isVeg: true,
          badge: "Special"
        }
      ]
    },
    {
      id: "cold-coffee",
      name: "Cold Coffee",
      description: "Chilled blends, iced lattes, and long-steeped cold brews for sunny Kota afternoons",
      items: [
        {
          id: "classic-iced-latte",
          name: "Classic Iced Café Latte",
          description: "Fresh espresso poured over cold milk and crystalline ice cubes.",
          price: 159,
          formattedPrice: "₹159",
          isVeg: true,
          badge: null
        },
        {
          id: "vietnamese-cold-brew",
          name: "Vietnamese Shaken Iced Coffee",
          description: "Slow drip roast shaken over condensed milk and crushed ice.",
          price: 189,
          formattedPrice: "₹189",
          isVeg: true,
          badge: "Popular"
        },
        {
          id: "caramel-frappe",
          name: "Caramel Crunch Frappé",
          description: "Blended coffee shake crowned with whipped cream and butterscotch crisps.",
          price: 219,
          formattedPrice: "₹219",
          isVeg: true,
          badge: "Bestseller"
        },
        {
          id: "mocha-chiller",
          name: "Dark Chocolate Mocha Chiller",
          description: "Blended espresso with rich cocoa fudge and whole cold milk.",
          price: 209,
          formattedPrice: "₹209",
          isVeg: true,
          badge: null
        },
        {
          id: "nitro-cold-brew",
          name: "Signature Nitro Cold Brew",
          description: "Cold brew infused with nitrogen bubbles for a draft-pour Guinness-like silkiness.",
          price: 229,
          formattedPrice: "₹229",
          isVeg: true,
          badge: "Signature"
        }
      ]
    },
    {
      id: "tea",
      name: "Tea",
      description: "Soothing artisanal infusions, classic royal chai, and floral tisanes",
      items: [
        {
          id: "royal-kulhad-chai",
          name: "Royal Masala Kulhad Chai",
          description: "Slow-brewed Assam leaves with crushed cardamom, ginger, cloves, and whole milk.",
          price: 99,
          formattedPrice: "₹99",
          isVeg: true,
          badge: "Local Favorite"
        },
        {
          id: "kashmiri-kahwa",
          name: "Kashmiri Saffron Kahwa",
          description: "Green tea simmered with pure saffron strands, crushed almonds, and cinnamon bark.",
          price: 149,
          formattedPrice: "₹149",
          isVeg: true,
          badge: "Special"
        },
        {
          id: "earl-grey",
          name: "Imperial Earl Grey",
          description: "Black whole tea leaves naturally scented with Italian bergamot oil.",
          price: 129,
          formattedPrice: "₹129",
          isVeg: true,
          badge: null
        },
        {
          id: "chamomile-blossom",
          name: "Chamomile Citrus Tisane",
          description: "Caffeine-free soothing Egyptian chamomile flowers with subtle notes of orange peel.",
          price: 139,
          formattedPrice: "₹139",
          isVeg: true,
          badge: "Calming"
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Freshly baked artisan pastries, warm pies, and decadent confections",
      items: [
        {
          id: "belgian-chocolate-truffle-cake",
          name: "Belgian Chocolate Truffle Pastry",
          description: "Layers of moist cocoa sponge and velvety chocolate ganache.",
          price: 169,
          formattedPrice: "₹169",
          isVeg: true,
          badge: "Bestseller"
        },
        {
          id: "blueberry-cheesecake",
          name: "New York Blueberry Cheesecake",
          description: "Creamy baked Philadelphia-style cheesecake with compote on a biscuit crust.",
          price: 199,
          formattedPrice: "₹199",
          isVeg: true,
          badge: "Must Try"
        },
        {
          id: "tiramisu-jar",
          name: "Artisanal Espresso Tiramisu Jar",
          description: "Savoiardi ladyfingers soaked in Royal Bean espresso with mascarpone cream.",
          price: 219,
          formattedPrice: "₹219",
          isVeg: true,
          badge: "Signature"
        },
        {
          id: "warm-walnut-brownie",
          name: "Sizzling Walnut Brownie with Gelato",
          description: "Warm fudgy brownie topped with Madagascar vanilla gelato and hot fudge.",
          price: 189,
          formattedPrice: "₹189",
          isVeg: true,
          badge: "Comfort"
        }
      ]
    },
    {
      id: "snacks",
      name: "Snacks",
      description: "Gourmet grilled sandwiches, sourdough toasts, and crunchy finger foods",
      items: [
        {
          id: "paneer-tikka-sandwich",
          name: "Smoked Paneer Tikka Panini",
          description: "Tandoori marinated cottage cheese, charred bell peppers, and mint mayo in herbed focaccia.",
          price: 189,
          formattedPrice: "₹189",
          isVeg: true,
          badge: "Bestseller"
        },
        {
          id: "cheese-corn-nuggets",
          name: "Crispy Peri-Peri Cheese Poppers",
          description: "Golden crumbed jalapeño and molten cheese bites served with roasted garlic dip.",
          price: 159,
          formattedPrice: "₹159",
          isVeg: true,
          badge: "Youth Favorite"
        },
        {
          id: "avocado-toast",
          name: "Sourdough Guacamole Toast",
          description: "Toasted artisan sourdough, seasoned mashed avocado, cherry tomatoes, and micro-greens.",
          price: 229,
          formattedPrice: "₹229",
          isVeg: true,
          badge: "Healthy Choice"
        },
        {
          id: "classic-french-fries",
          name: "Truffle & Parmesan French Fries",
          description: "Crispy potato fries tossed in herb truffle oil and seasoned shaved cheese.",
          price: 149,
          formattedPrice: "₹149",
          isVeg: true,
          badge: null
        }
      ]
    }
  ]
};

export default menuData;
