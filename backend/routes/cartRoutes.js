const express = require("express");
const {
  createCart,
  deleteCARTProducts,
  getCartProducts,
  getSingleCartProduct,
} = require("../controllers/cartController");

const router = express.Router();

// Create a cart item
router.post("/", createCart);

// Get all cart items
router.get("/", getCartProducts);

// Get a single cart item by ID (optional)
router.get("/:id", getSingleCartProduct);

// Delete a cart item by ID
router.delete("/:id", deleteCARTProducts);

module.exports = router;
