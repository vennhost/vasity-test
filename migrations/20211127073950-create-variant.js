"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Variants",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        size: {
          type: Sequelize.STRING,
        },
        color: {
          type: Sequelize.STRING,
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
        images: {
          type: Sequelize.STRING,
          allowNull: false,
          get() {
            return this.getDataValue("images").split(";");
          },
          set(val) {
            this.setDataValue("images", val.join(";"));
          },
        },
        price: {
          type: Sequelize.INTEGER,
        },
        product_id: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Products",
            key: "id",
            as: "product_id",
          },
        },
      },
      { timestamps: false }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Variants");
  },
};
