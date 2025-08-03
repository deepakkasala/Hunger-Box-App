// models/Order.js
const mongoose = require("mongoose");
const itemDetailsSchema = require("./ItemDetails");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    locationName: { type: String, required: true },
    deliveryStatus: {
      type: String,
      enum: ["pending", "preparing", "ready", "delivered"],
      default: "pending",
    },
    stall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stall",
      required: true,
    },
    items: [itemDetailsSchema],
    totalPrice: { type: Number, required: true },
    orderedAt: { type: Date, default: Date.now },
    orderRating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
