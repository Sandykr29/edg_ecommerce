import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {  ADD_TO_CART, GET_PRODUCTS } from "../utils/api";

const Checkout = () => {
  const { cart, cartTotal, setCart } = useContext(CartContext);
  const { userName, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [number,setNumber] = useState(1);

  

  const handlePlaceOrder = async () => {
   
    
    alert(`Order placed successfully! with items ${number}`);
    if (!shippingAddress) {
      alert("Shipping address is required.");
      return;
    }

    const order = {
      userName,
      products: cart.map((item) => ({
        productId: item._id,
        totalItems: item.totalItems,
        price: item.price,
      })),
      totalPrice: cartTotal,
      shippingAddress,
      paymentStatus: "Pending",
    };

    console.log("Order placed:", order);
    setOrderDetails(order);
    setMessage("Order successfully placed!");

    // Make PATCH requests to update the database
    try {
      const responses = await Promise.all(
        cart.map((item) => {
          // console.log(${ADD_TO_CART}/${item._id}, "this is the url");
          console.log(`${ADD_TO_CART(item._id)}`, "this is the url");

          return axios.patch(
            `${ADD_TO_CART(item._id)}`,
            { totalItems: 2 },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        })
      );
      console.log("PATCH responses:", responses);
      setResponseMessage("Database updated successfully!");
      setCart([]);
    } catch (error) {
      console.error("Failed to update the database:", error);
      setResponseMessage("Failed to update the database.");
    }

    // Automatically redirect to home after 3 seconds
    setTimeout(() => {
      setCart([]); // Ensure cart is emptied
      navigate("/");
    }, 3000);
  };

  const handleDismissMessage = () => {
    setMessage("");
    setCart([]);
    navigate("/");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ${cartTotal}</p>
      <div>
        <label>Shipping Address:</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {message && (
        <div>
          <p>{message}</p>
          <button onClick={handleDismissMessage}>OK</button>
          {orderDetails && (
            <div>
              <h3>Order Details:</h3>
              <p>User Name: {orderDetails.userName}</p>
              <p>Shipping Address: {orderDetails.shippingAddress}</p>
              <p>Total Price: ${orderDetails.totalPrice}</p>
              <p>Payment Status: {orderDetails.paymentStatus}</p>
              <h4>Products:</h4>
              <ul>
                {orderDetails.products.map((product, index) => (
                  <li key={index}>
                    Product ID: {product.productId}, totalItems: {product.totalItems}, Price: ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
