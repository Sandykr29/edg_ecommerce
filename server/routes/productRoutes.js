const express = require("express");
const { getProducts, updateProductTotalItems } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products or a specific product by ID
router.get("/:id?", getProducts);

// Update totalItems of a product (PATCH request)
router.patch("/:id",authMiddleware, updateProductTotalItems);

module.exports = router;
