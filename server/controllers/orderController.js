const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, totalPrice, products } = req.body;

    const order = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await order.save();
    await Cart.deleteMany({ userId });

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
