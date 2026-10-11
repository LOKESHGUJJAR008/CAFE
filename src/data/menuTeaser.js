/**
 * Menu teaser data built from docs/client-menu.txt
 * Note: This static snapshot will later derive directly from menu.js.
 */
export const menuTeaserData = {
  eyebrow: "Menu",
  title: "Our Menu",
  categories: [
    {
      id: "coffee",
      name: "Coffee",
      icon: "Coffee",
      items: [
        { name: "Espresso", price: "₹99" },
        { name: "Double Espresso", price: "₹129" },
        { name: "Americano", price: "₹119" }
      ]
    },
    {
      id: "cold-coffee",
      name: "Cold Coffee",
      icon: "CupSoda",
      items: [
        { name: "Classic Cold Coffee", price: "₹149" },
        { name: "Iced Americano", price: "₹139" },
        { name: "Iced Latte", price: "₹159" }
      ]
    },
    {
      id: "tea",
      name: "Tea",
      icon: "Leaf",
      items: [
        { name: "Masala Chai", price: "₹79" },
        { name: "Classic Milk Tea", price: "₹69" },
        { name: "Green Tea", price: "₹99" }
      ]
    },
    {
      id: "bakery",
      name: "Bakery",
      icon: "Croissant",
      items: [
        { name: "Butter Croissant", price: "₹119" },
        { name: "Chocolate Croissant", price: "₹149" },
        { name: "Cheese Croissant", price: "₹159" }
      ]
    },
    {
      id: "quick-bites",
      name: "Quick Bites",
      icon: "Pizza",
      items: [
        { name: "Veg. Pizza", price: "₹199" },
        { name: "Cheese & Corn Pizza", price: "₹219" },
        { name: "Paneer Tikka Pizza", price: "₹239" }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: "CakeSlice",
      items: [
        { name: "Classic Chocolate Brownie", price: "₹129" },
        { name: "Brownie with Ice Cream", price: "₹179" },
        { name: "Chocolate Pastry", price: "₹139" }
      ]
    }
  ]
};

export default menuTeaserData;
