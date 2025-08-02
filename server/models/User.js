const mongoose = require("mongoose");
const itemDetailsSchema = require("./ItemDetails");

const cartSchema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    estimatedTimeToEnterCafe: { type: Number }, // in minutes
    deliveryStatus: {
      type: String,
      enum: ["pending", "in progress", "delivered"],
      default: "pending",
    },
    stall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stall",
      required: true,
    },
    items: [itemDetailsSchema],
    instructions: { type: String },
    paymentMode: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "online",
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "owner"],
      default: "user",
    },
    approved: {
      type: Boolean,
      default: function () {
        return this.role !== "owner"; // auto-approved if not an owner
      },
    },
    location: { type: String },
    cart: {
      type: cartSchema,
      required: function () {
        return this.role === "user";
      },
    },
    payments: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        amount: Number,
        status: String,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
