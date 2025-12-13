
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number; // Quantity in cart
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const cartKey = user ? `cart_${user.id}` : 'cart_guest';

  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart when user changes
  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  // Save cart when cart changes
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const decreaseQuantity = (id: number) => {
    setCart(prev => {
        const existing = prev.find(i => i.id === id);
        if (existing && existing.quantity > 1) {
            return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
        }
        return prev.filter(i => i.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
