const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!req.user) {
      console.error("User information is missing in the request.");
      return res.status(400).json({ message: "User not authenticated" });
    }
    const userId = req.user.id;
    console.log("this is userID from cartController", userId);
    console.log("this is productId and quantity from cartController", productId, quantity);

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      console.log("Product exists in cart, updated quantity:", cartItem.quantity);
    } else {
      cartItem = new Cart({ userId, productId, quantity });
      console.log("Product added to cart:", cartItem);
    }

    await cartItem.save();
    res.json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: error.message });
  }
};
