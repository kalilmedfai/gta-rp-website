const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des produits
const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            // Convertit le prix en nombre pour éviter qu'il soit interprété comme une chaîne
            const rawValue = this.getDataValue('price');
            return parseFloat(rawValue);
        }
    },
    productsTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'productsTypes', key: 'id' }
    }
}, {
    tableName: 'products',
    timestamps: false,
});

module.exports = Product;
