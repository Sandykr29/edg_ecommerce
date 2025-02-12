import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      alert("Please login to add items to the cart.");
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;