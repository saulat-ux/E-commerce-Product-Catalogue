const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path as needed
const User = require("./userModel"); // Import the User model

const Cart = sequelize.define(
  "Cart",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a name" },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Decimal for prices to avoid floating-point issues
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a price" },
      },
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

// Define associations
Cart.belongsTo(User, { foreignKey: "userId" }); // Sets up the association to the User model
User.hasMany(Cart, { foreignKey: "userId" }); // Each user can have multiple cart items

module.exports = Cart;
