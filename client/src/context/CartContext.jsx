import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [message, setMessage] = useState(""); // State to store the message
  const { token } = useContext(AuthContext);

  const addToCart = (product, quantity) => {
    try {
      const existingItem = cart.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity + quantity > product.totalItems) {
          setMessage(`You have reached the maximum stock for ${product.name}`);
          alert(`You have reached the maximum stock for ${product.name}`); // Alert inside the provider
          return;
        }
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...product, quantity }]);
      }
      setMessage(""); // Reset message when a new item is added
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
    setMessage(""); // Reset message when item is removed
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, quantities, message }}>
      {children}
    </CartContext.Provider>
  );
};
