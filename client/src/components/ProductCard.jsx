import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { isLoggedIn, userName } = useContext(AuthContext);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (added) {
        removeFromCart(product._id);
        setAdded(false);
      } else {
        console.log("Adding product to cart:", product, "Quantity:", quantity);
        addToCart({ ...product, quantity });
        console.log("this is from addtocart", product, quantity);
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
          <button onClick={handleAddToCart} className={added ? "cancel-btn" : ""}>
            {added ? "Cancel" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;