import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { token } = useContext(AuthContext);

  const addToCart = (product, quantity) => {
    console.log("this is the product", product);
    try {
      const existingItem = cart.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity + quantity > product.totalItems) {
          console.log("Cannot add more than available items");
          return;
        }
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
        setQuantities((prevQuantities) =>
          prevQuantities.map((q, index) =>
            cart[index]._id === product._id ? q + quantity : q
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...product, quantity }]);
        setQuantities((prevQuantities) => [...prevQuantities, quantity]);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    setQuantities((prevQuantities) =>
      prevQuantities.filter((_, index) => cart[index]._id !== productId)
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, quantities }}>
      {children}
    </CartContext.Provider>
  );
};
