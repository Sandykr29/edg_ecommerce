const express = require("express");
const { getProducts, updateProductTotalItems, increaseProductTotalItems } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products or a specific product by ID
router.get("/:id?", getProducts);

// Update totalItems of a product (PATCH request)
router.patch("/:id",authMiddleware, updateProductTotalItems);


router.put("/:id", increaseProductTotalItems);


module.exports = router;
