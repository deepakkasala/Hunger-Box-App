const mongoose = require("mongoose");

const StallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    location: String,
    city: String,

    // Realtime fields — can be updated via triggers/websockets
    rating: {
      type: Number,
      default: 0,
    },
    pendingOrdersCount: {
      type: Number,
      default: 0,
    },
    pickupStatus: {
      type: String,
      enum: ["open", "closed", "busy"],
      default: "open",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Stall = mongoose.model("Stall", StallSchema);
module.exports = Stall;
