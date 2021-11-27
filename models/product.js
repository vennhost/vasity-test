"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Variant, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      product_name: DataTypes.STRING,
      product_description: DataTypes.STRING,
      product_varieties: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      createdAt: "date_uploaded",
      updatedAt: "date_edited",
      timestamps: true,
      underscored: true,
    }
  );
  return Product;
};
