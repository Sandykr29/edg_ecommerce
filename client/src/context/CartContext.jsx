import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { ADD_TO_CART } from "../utils/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { token } = useContext(AuthContext);

  const addToCart = async (product, quantity) => {
    try {
      

      setProducts((prevProducts) => [...prevProducts, product]);
      setQuantities((prevQuantities) => [...prevQuantities, quantity]);

      console.log(product)

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
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
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, products, quantities }}>
      {children}
    </CartContext.Provider>
  );
};
