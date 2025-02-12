import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, addToCart, cartTotal } = useContext(CartContext);

  const incrementQuantity = (item) => {
    addToCart(item, 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(item)}>-</button>
                <button onClick={() => incrementQuantity(item)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Amount: ${cartTotal}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;