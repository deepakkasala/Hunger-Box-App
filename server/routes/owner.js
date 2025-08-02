const express = require("express");
const router = express.Router();
// const ownerController = require("../controllers/ownerController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");
const {
  loginOwner,
  registerOwner,
  addFoodItem,
  getFoodItems,
  deleteFoodItem,
  updateFoodItem,
} = require("../controllers/owner");

router.post("/register", registerOwner);
router.post("/login", loginOwner);
router.use(authenticate, authorizeRoles("owner"));
router.post("/food", addFoodItem);
router.get("/foods/:stallId", getFoodItems);
router.delete("/food/:id", deleteFoodItem);
router.put("/food/:id", updateFoodItem);

module.exports = router;
