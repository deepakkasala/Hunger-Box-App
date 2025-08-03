// routes/userAuthRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllStalls,
  getItemsByStall,
} = require("../controllers/user");
const { authenticate, authorizeRoles } = require("../middlewares/auth");
const { viewCart, addOrUpdateCartItem } = require("../controllers/cart");
const { placeOrder, getMyOrders } = require("../controllers/order");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(authenticate, authorizeRoles("user")); // All routes below require authentication
router.get("/stalls", getAllStalls);
router.get("/stall/:stallId/items", getItemsByStall);
router.post("/cart", addOrUpdateCartItem);
router.get("/cart", viewCart);
router.post("/order", placeOrder);
router.get("/orders", getMyOrders);

module.exports = router;
