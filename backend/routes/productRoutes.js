const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct, // Renamed to `deleteProduct` for clarity
  updateProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a product (admin only)
router.post("/", protect, adminOnly, createProduct); // Uncommented protection middleware

// Get all products (public)
router.get("/", getProducts);

// Get a single product by ID (public)
router.get("/:id", getProduct);

// Delete a product by ID (admin only)
router.delete("/:id", protect, adminOnly, deleteProduct); // Changed `POST` to `DELETE`

// Update a product by ID (admin only)
router.patch("/:id", protect, adminOnly, updateProduct);

module.exports = router;
