// const Stall = require("../models/Stall");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// const JWT_SECRET = process.env.JWT_SECRET;

// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
//       return res.status(401).json({ message: "Invalid admin credentials" });
//     }

//     const token = jwt.sign({ role: "admin", email }, JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     return res.status(200).json({
//       message: "Admin login successful",
//       token,
//       admin: {
//         email,
//         role: "admin",
//       },
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

// const getPendingStalls = async (req, res) => {
//   const pending = await Stall.find({ approvalStatus: "pending" });
//   res.json(pending);
// };

// const approveStall = async (req, res) => {
//   const { id } = req.params;
//   const stall = await Stall.findById(id);
//   if (!stall) return res.status(404).json({ message: "Stall not found" });
//   stall.approvalStatus = "approved";
//   await stall.save();
//   res.json({ message: "Stall approved" });
// };

// const createStall = async (req, res) => {
//   const stall = new Stall(req.body);
//   await stall.save();
//   res.status(201).json(stall);
// };

// const deleteStall = async (req, res) => {
//   await Stall.findByIdAndDelete(req.params.id);
//   res.json({ message: "Stall deleted" });
// };

// const updateStall = async (req, res) => {
//   const updated = await Stall.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(updated);
// };

// const getAllStalls = async (req, res) => {
//   const stalls = await Stall.find();
//   res.json(stalls);
// };

// module.exports = {
//   loginAdmin,
//   getPendingStalls,
//   approveStall,
//   createStall,
//   deleteStall,
//   updateStall,
//   getAllStalls,
// };

// === /controllers/adminController.js ===
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Stall = require("../models/Stall");
const User = require("../models/User");
const Order = require("../models/Order");

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// --- Admin Login ---
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin", email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: { email, role: "admin" },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// --- Stall Management ---
const getPendingStalls = async (req, res) => {
  const pending = await Stall.find({ approvalStatus: "pending" });
  res.json(pending);
};

const approveStall = async (req, res) => {
  const { id } = req.params;
  const stall = await Stall.findById(id);
  if (!stall) return res.status(404).json({ message: "Stall not found" });
  stall.approvalStatus = "approved";
  await stall.save();
  res.json({ message: "Stall approved" });
};

const createStall = async (req, res) => {
  const stall = new Stall(req.body);
  await stall.save();
  res.status(201).json(stall);
};

const deleteStall = async (req, res) => {
  await Stall.findByIdAndDelete(req.params.id);
  res.json({ message: "Stall deleted" });
};

const updateStall = async (req, res) => {
  const updated = await Stall.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

const getAllStalls = async (req, res) => {
  const stalls = await Stall.find();
  res.json(stalls);
};

// --- Owner Approval ---
const getPendingOwners = async (req, res) => {
  try {
    const pendingOwners = await User.find({ role: "owner", approved: false });
    res.status(200).json(pendingOwners);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pending owners", error: err.message });
  }
};

const approveOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const owner = await User.findById(id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    owner.approved = true;
    await owner.save();
    res.status(200).json({ message: "Owner approved successfully", owner });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error approving owner", error: err.message });
  }
};

// --- View All Orders ---
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("stall user");
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

module.exports = {
  loginAdmin,
  getPendingStalls,
  approveStall,
  createStall,
  deleteStall,
  updateStall,
  getAllStalls,
  getPendingOwners,
  approveOwner,
  getAllOrders,
};
