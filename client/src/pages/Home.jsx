import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../utils/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(GET_PRODUCTS)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError("Failed to load products.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home">
      <h2>Our Products</h2>
      <div className="product-card-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;