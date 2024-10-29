const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// Create a cart item
const createCart = asyncHandler(async (req, res) => {
  const { name, quantity, imageURL, price } = req.body;

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
  });

  res.status(201).json(cart);
});

// Get all cart items
const getCartProducts = asyncHandler(async (req, res) => {
  const cartProducts = await Cart.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json(cartProducts);
});

// Get a single cart item by ID
const getSingleCartProduct = asyncHandler(async (req, res) => {
  const cartProductSingle = await Cart.findByPk(req.params.id);
  if (!cartProductSingle) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(cartProductSingle);
});

// Delete a cart item by ID
const deleteCARTProducts = asyncHandler(async (req, res) => {
  const cartProduct = await Cart.findByPk(req.params.id);
  if (!cartProduct) {
    res.status(404);
    throw new Error("Cart product not found");
  }
  await cartProduct.destroy();
  res.status(200).json({ message: "Product is deleted" });
});

module.exports = {
  createCart,
  getCartProducts,
  getSingleCartProduct,
  deleteCARTProducts,
};
