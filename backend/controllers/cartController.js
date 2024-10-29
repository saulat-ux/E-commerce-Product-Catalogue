const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// Create a cart item
const createCart = asyncHandler(async (req, res) => {
  const { name, quantity, imageURL, price } = req.body;
  const userId = req.user.id;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  // Create cart item
  const cart = await Cart.create({
    name,
    quantity,
    imageURL,
    price,
    userId,
  });

  res.status(201).json(cart);
});

// Get all cart items
const getCartProducts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cartItems = await Cart.findAll({
    where: { userId }, // Filter by userId to get only the logged-in user’s items
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json(cartItems);
});

// Get a single cart item by ID
// const getSingleCartProduct = asyncHandler(async (req, res) => {

// });

// Delete a cart item by ID
const deleteCARTProducts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cartProductId = req.params.id;

  const cartProduct = await Cart.findOne({
    where: { id: cartProductId, userId }, // Ensure item belongs to the user
  });

  if (!cartProduct) {
    res.status(404);
    throw new Error("Cart product not found");
  }

  await cartProduct.destroy();
  res.status(200).json({ message: "Product deleted from cart" });
});

module.exports = {
  createCart,
  getCartProducts,

  deleteCARTProducts,
};
