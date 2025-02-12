import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../utils/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${GET_PRODUCTS}/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError("Failed to load product details.");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
};

export default ProductDetails;
