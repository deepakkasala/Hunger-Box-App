// models/FoodItem.js
const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    category: {
      type: String, // e.g., 'snacks', 'main course', 'dessert'
      required: true,
    },

    stall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stall",
      required: true,
    },

    favoriteByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    itemsLeft: {
      type: Number,
      default: 0,
    },

    preparationTime: {
      type: Number, // in minutes
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodItem", FoodItemSchema);
