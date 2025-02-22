import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (added) {
        removeFromCart(id);
        setAdded(false);
      } else {
        addToCart(product, quantity);
        
        setAdded(true);
      }
    } else {
      alert("Please login to add items to the cart.");
    }
  };

  return (
    <div className={`product-card ${added ? "added" : ""}`}>
      <img src={product.image} alt={product.title} />
      <div className="product-card-info">
        <h3>{product.title}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <button onClick={() => handleAddToCart(product._id)} className={added ? "cancel-btn" : ""}>
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
          <span className="product-card-qty">Qty available: {product.totalItems}</span>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;