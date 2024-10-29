const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path as needed

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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

module.exports = Cart;
