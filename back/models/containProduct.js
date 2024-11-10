const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table de jointure many-to-many entre Cart et Product
const ContainProduct = db.define('ContainProduct', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' }
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'carts', key: 'id' }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'containProducts',
    timestamps: false,
});

module.exports = ContainProduct;
