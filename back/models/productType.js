const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des types de produits
const ProductType = db.define('ProductType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    typeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'productsTypes',
    timestamps: false,
});

module.exports = ProductType;
