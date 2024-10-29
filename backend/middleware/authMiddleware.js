const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Ensure this points to your Sequelize User model

// Protect Middleware
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Otherwise, check if token is in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get user by ID from the token
    const user = await User.findByPk(verified.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user; // Add user to req for next middleware
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Admin Only Middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin.");
  }
};

module.exports = {
  protect,
  adminOnly,
};
