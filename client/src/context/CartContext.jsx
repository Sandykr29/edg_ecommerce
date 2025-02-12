import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { ADD_TO_CART, GET_CART } from "../utils/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useContext(AuthContext);

  const addToCart = (product) => {
    axios.post(ADD_TO_CART, { productId: product._id }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log("Response from addToCart API:", response.data);
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item._id === product._id);
          if (existingItem) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      })
      .catch((err) => {
        console.error("Failed to add to cart:", err);
      });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};