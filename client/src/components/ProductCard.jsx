import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({ ...product, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } else {
      alert("Please login to add items to the cart.");
    }
  };

  return (
    <div className={`product-card ${added ? "added" : ""}`}>
      <img src={product.image} alt={product.title} />
      <div className="product-card-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          {showQuantity && (
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          )}
          <button onClick={() => setShowQuantity(true)}>Add to Cart</button>
          <Link to={`/product/${product._id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;