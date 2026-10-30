"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  grandTotal: 0
});

const STORAGE_KEY = "sheta_perfumes_cart_v1";

export function CartProvider({ children }) {
 
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to read cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);


  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        // Product exists; increment quantity
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        // New product; append to cart list
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cart storage:", error);
    }
  };

  // Dynamic calculations:
  // Total bottle count (for badges in navbar)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Exact subtotal: sum of (unit price * quantity)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Complimentary luxury shipping on orders over $150; otherwise $15 flat rate
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;

  // Standard sales tax (e.g., 5%)
  const tax = Number((subtotal * 0.05).toFixed(2));

  // Grand Total calculation
  const grandTotal = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        tax,
        shipping,
        grandTotal,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
