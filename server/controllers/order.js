// controllers/orderController.js
const Order = require("../models/Order");

// const placeOrder = async (req, res) => {
//   try {
//     const user = req.user;
//     if (!user.cart || user.cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const newOrder = new Order({
//       user: user._id,
//       stall: user.cart.stall,
//       items: user.cart.items,
//       instructions: user.cart.instructions,
//       totalAmount: user.cart.items.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       ),
//       deliveryStatus: user.cart.deliveryStatus,
//       estimatedTimeToEnterCafe: user.cart.estimatedTimeToEnterCafe,
//       locationName: user.cart.locationName,
//       paymentMode: user.cart.paymentMode,
//     });

//     await newOrder.save();

//     // Save reference in user payment history (optional)
//     user.payments.push({
//       orderId: newOrder._id,
//       amount: newOrder.totalAmount,
//       status: "Paid",
//       paidAt: new Date(),
//     });

//     // Clear cart
//     user.cart = null;

//     await user.save();
//     res
//       .status(201)
//       .json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Error placing order" });
//   }
// };

// controllers/orderController.js

const User = require("../models/User");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMode, instructions, estimatedTimeToEnterCafe } = req.body;

    const user = await User.findById(userId);

    if (!user.cart || !user.cart.items.length) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const totalAmount = user.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: userId,
      items: user.cart.items,
      totalAmount,
      paymentMode: paymentMode || "online",
      instructions,
      locationName: user.cart.locationName,
      estimatedTimeToEnterCafe: estimatedTimeToEnterCafe || 10,
      stall: user.cart.stall,
      status: "placed",
    });

    await newOrder.save();

    // Clear user cart
    user.cart.items = [];
    await user.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

module.exports = { placeOrder, getMyOrders };
