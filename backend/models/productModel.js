const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust this to your sequelize config

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a name" },
      },
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SKU",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "As seen",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    regularPrice: {
      type: DataTypes.DECIMAL(10, 2), // use DECIMAL for prices to avoid floating-point issues
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a price" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a description" },
      },
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.JSONB, // Stores an array of objects in PostgreSQL
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product;
