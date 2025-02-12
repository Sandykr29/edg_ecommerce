const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ userId, productId, quantity });
    }

    await cartItem.save();
    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
