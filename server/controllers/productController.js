const Product = require("../models/Product");

// ✅ Get all products or a specific product by ID
exports.getProducts = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from URL

        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        }

        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Update "totalItems" for a specific product
exports.updateProductTotalItems = async (req, res) => {
    try {
        const { id } = req.params;  // Get product ID from URL
        const { totalItems } = req.body; // Get decrement value

        if (!totalItems || totalItems < 0) {
            return res.status(400).json({ message: "Invalid totalItems value" });
        }

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Calculate the new totalItems (subtract the given value)
        let newTotalItems = product.totalItems - totalItems;
        newTotalItems = Math.max(newTotalItems, 0); // Ensure it doesn't go below 0

        // ✅ Update only `totalItems`, disabling full validation
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { totalItems: newTotalItems },
            { new: true, runValidators: false } // Disable validation
        );

        res.json({ message: "Product totalItems updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// private purpose
exports.increaseProductTotalItems = async (req, res) => {
    try {
        const { id } = req.params;  // Get product ID from URL
        const { totalItems } = req.body; // Get increment value

        if (!totalItems || totalItems < 0) {
            return res.status(400).json({ message: "Invalid totalItems value" });
        }

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Calculate the new totalItems (add the given value)
        let newTotalItems = product.totalItems + totalItems;

        // ✅ Update only `totalItems`, disabling full validation
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { totalItems: newTotalItems },
            { new: true, runValidators: false } // Disable validation
        );

        res.json({ message: "Product totalItems increased", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
