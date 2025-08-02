const FoodItem = require("../models/FoodItem");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerOwner = async (req, res) => {
  try {
    const { email, password, location } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Owner already exists." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new owner
    const newOwner = new User({
      email,
      password: hashedPassword,
      location,
      role: "owner", // important
    });

    await newOwner.save();

    res
      .status(201)
      .json({ message: "Owner registered. Waiting for admin approval." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find owner
    const user = await User.findOne({ email, role: "owner" });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Stall not yet approved?
    const stall = await require("../models/Stall").findOne({ owner: user._id });
    if (!stall || stall.approvalStatus !== "approved") {
      return res
        .status(403)
        .json({ message: "Stall not approved by admin yet." });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addFoodItem = async (req, res) => {
  const stall = await Stall.findById(req.body.stall);
  if (!stall || stall.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }
  const item = new FoodItem(req.body);
  await item.save();
  res.status(201).json(item);
};

const getFoodItems = async (req, res) => {
  const items = await FoodItem.find({ stall: req.params.stallId });
  res.json(items);
};

const deleteFoodItem = async (req, res) => {
  const item = await FoodItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  await item.remove();
  res.json({ message: "Item deleted" });
};

const updateFoodItem = async (req, res) => {
  const updated = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

module.exports = {
  addFoodItem,
  getFoodItems,
  deleteFoodItem,
  updateFoodItem,
  registerOwner,
  loginOwner,
};
