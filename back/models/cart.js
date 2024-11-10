const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des paniers
const Cart = db.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    }
}, {
    tableName: 'carts',
    timestamps: false,
});

module.exports = Cart;
