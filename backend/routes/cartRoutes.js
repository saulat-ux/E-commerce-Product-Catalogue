const express = require("express");
const {
  createCart,
  getCartProducts,
  deleteCARTProducts,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes with the `protect` middleware
router.post("/", protect, createCart);
router.get("/", protect, getCartProducts);
router.delete("/:id", protect, deleteCARTProducts);

module.exports = router;
