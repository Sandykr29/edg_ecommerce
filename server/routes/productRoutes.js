const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

// Route to fetch all products
router.get("/", getAllProducts);

module.exports = router;
