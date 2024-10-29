module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Carts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Name of the table (not the model) being referenced
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Carts", "userId");
  },
};
