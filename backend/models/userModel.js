const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please add a name" },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Please enter a valid email" },
      },
    },
    password: {
      type: DataTypes.TEXT, // or VARCHAR(60)
      allowNull: false,
      validate: {
        len: {
          args: [6, 60],
          msg: "Password must be between 6 and 60 characters",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "admin",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "+234",
    },
    address: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = User;
