function applyExtraSetup(sequelize) {
	const { Product, Variant } = sequelize.models;

	Product.hasMany(Variant, {foreignKey: 'product_id'});
	Variant.belongsTo(Product, {foreignKey: 'product_id'});
}

module.exports = { applyExtraSetup };