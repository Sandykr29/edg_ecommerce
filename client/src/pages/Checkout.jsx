import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const { userName } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");

  const handlePlaceOrder = () => {
    alert(`Congratulations Mr. ${userName},Order successfully placed!`)

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
    setMessage("Order successfully placed!");
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
