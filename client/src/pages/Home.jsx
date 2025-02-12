import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../utils/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(GET_PRODUCTS)
      .then((response) => setProducts(response.data))
      .catch(() => setError("Failed to load products."));
  }, []);

  return (
    <div className="home">
      <h2>Our Products</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="product-card-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
