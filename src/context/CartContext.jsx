import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(i => i.slug === action.payload.slug);
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].qty += action.payload.qty;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.slug !== action.payload) };
    case 'UPDATE_QTY': {
      const { slug, delta } = action.payload;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.slug === slug) {
            return { ...item, qty: Math.max(1, item.qty + delta) };
          }
          return item;
        })
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'INIT_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  useEffect(() => {
    const handleOpen = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handleOpen);
    return () => window.removeEventListener('open-cart', handleOpen);
  }, []);

  useEffect(() => {
    try {
      const localData = localStorage.getItem('royal_bean_cart');
      if (localData) {
        dispatch({ type: 'INIT_CART', payload: JSON.parse(localData) });
      }
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('royal_bean_cart', JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [state.items]);

  const addToCart = (item, qty = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { 
        slug: item.slug, 
        name: item.name, 
        price: item.price,
        formattedPrice: item.formattedPrice,
        image: item.image,
        diet: item.diet,
        qty 
      }
    });
  };

  const removeFromCart = (slug) => dispatch({ type: 'REMOVE_ITEM', payload: slug });
  const updateQty = (slug, delta) => dispatch({ type: 'UPDATE_QTY', payload: { slug, delta } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const fallbackCart = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  return ctx || fallbackCart;
}
