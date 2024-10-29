const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    imageURL,
    regularPrice,
    price,
    color,
  } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  // Create product
  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    imageURL,
    regularPrice,
    price,
    color,
  });

  res.status(201).json(product);
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json(products);
});

// Get a single product by ID
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.destroy();
  res.status(200).json({ message: "Product is deleted" });
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    description,
    imageURL,
    regularPrice,
    price,
    color,
  } = req.body;

  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update product
  const updatedProduct = await product.update({
    name,
    category,
    brand,
    quantity,
    description,
    imageURL,
    regularPrice,
    price,
    color,
  });

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
