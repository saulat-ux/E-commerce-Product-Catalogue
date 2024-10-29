const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // Assuming this is your Sequelize User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register User

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  console.log("Hashed Password (before saving):", password);

  // Save user with hashed password
  const user = await User.create({
    name,
    email,
    password: password,
  });

  // Generate token and send response
  const token = generateToken(user.id);
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  console.log("Retrieved Hash:", user.password);
  console.log("Input Password:", password);

  // Compare passwords
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Generate token and respond
  const token = generateToken(user.id);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
  });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  });
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Successfully logged out" });
});

// Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (user) {
    const { name, phone, address } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.photo = photo;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
