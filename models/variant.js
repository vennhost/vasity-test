"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Variant.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
    }
  }
  Variant.init(
    {
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      images: DataTypes.STRING,
      price: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Variant",
      timestamps: false
    }
  );
  return Variant;
};
