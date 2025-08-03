// controllers/cartController.js
// const addToCart = async (req, res) => {
//   try {
//     const user = req.user;
//     const { stallId, items, estimatedTimeToEnterCafe, instructions } = req.body;

//     user.cart = {
//       locationName: user.location,
//       estimatedTimeToEnterCafe,
//       stall: stallId,
//       items,
//       instructions,
//       paymentMode: "online",
//       deliveryStatus: "pending",
//     };

//     await user.save();
//     res.status(200).json({ message: "Cart updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to cart" });
//   }
// };

// controllers/user/cartController.js
const User = require("../models/User");
const FoodItem = require("../models/FoodItem");

const addOrUpdateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;

    if (!itemId || quantity == null || quantity < 0) {
      return res.status(400).json({ message: "Invalid item or quantity." });
    }

    const user = await User.findById(userId).populate("cart.items.itemId");

    // Fetch item details for price, name, etc.
    const item = await FoodItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const existingIndex = user.cart.items.findIndex((i) =>
      i.itemId._id.equals(itemId)
    );

    if (existingIndex >= 0) {
      // Update quantity
      if (quantity === 0) {
        user.cart.items.splice(existingIndex, 1); // Remove item if quantity 0
      } else {
        user.cart.items[existingIndex].quantity = quantity;
      }
    } else {
      if (quantity > 0) {
        user.cart.items.push({
          itemId,
          name: item.name,
          price: item.price,
          quantity,
        });
      }
    }

    await user.save();

    res.status(200).json({ message: "Cart updated", cart: user.cart.items });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/cartController.js
// const viewCart = (req, res) => {
//   try {
//     const cart = req.user.cart;
//     if (!cart || cart.items.length === 0) {
//       return res.status(404).json({ message: "Cart is empty" });
//     }
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching cart" });
//   }
// };

const viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cart.items.itemId");

    res.status(200).json({
      cart: user.cart.items,
      paymentMode: user.cart.paymentMode,
      instructions: user.cart.instructions,
    });
  } catch (error) {
    console.error("View cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addOrUpdateCartItem, viewCart };
