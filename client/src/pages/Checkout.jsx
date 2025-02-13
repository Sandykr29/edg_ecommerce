import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { cart, cartTotal, setCart } = useContext(CartContext);
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    if (!shippingAddress) {
      alert("Shipping address is required.");
      return;
    }

    const order = {
      userName,
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cartTotal,
      shippingAddress,
      paymentStatus: "Pending",
    };

    console.log("Order placed:", order);
    setOrderDetails(order);
    setMessage("Order successfully placed!");
    setCart([]);

    // Automatically redirect to home after 3 seconds
    setTimeout(() => {
      setCart([]); // Ensure cart is emptied
      navigate("/");
    }, 3000);
  };

  const handleDismissMessage = () => {
    setMessage("");
    setCart([]); // Ensure cart is emptied
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
                    Product ID: {product.productId}, Quantity: {product.quantity}, Price: ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
