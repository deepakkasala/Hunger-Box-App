const express = require("express");
const router = express.Router();
// const adminController = require("../controllers/adminController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");
const {
  getPendingStalls,
  approveStall,
  createStall,
  getAllStalls,
  updateStall,
  deleteStall,
  loginAdmin,
  getPendingOwners,
  approveOwner,
  getAllOrders,
} = require("../controllers/admin");

router.post("/login", loginAdmin);
router.use(authenticate, authorizeRoles("admin"));
router.get("/pending-stalls", getPendingStalls);
router.post("/approve-stall/:id", approveStall);
router.post("/stall", createStall);
router.get("/stalls", getAllStalls);
router.put("/stall/:id", updateStall);
router.delete("/stall/:id", deleteStall);
router.get("/pending-owners", getPendingOwners);
router.post("/approve-owner/:id", approveOwner);
router.get("/all-orders", getAllOrders);

module.exports = router;
