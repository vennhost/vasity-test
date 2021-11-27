"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Products",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        product_name: {
          type: Sequelize.STRING,
        },
        product_description: {
          type: Sequelize.STRING,
        },
        createdAt: {
          field: 'date_uploaded',
          type: Sequelize.DATE,
      },
      updatedAt: {
          field: 'date_edited',
          type: Sequelize.DATE,
      },
        product_varieties: {
          type: Sequelize.INTEGER,
          reference: {
            model: "Variants",
            key: "id",
            as: "product_id"
          },
        },
      },
      {
        timestamps: true,
        underscored: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
