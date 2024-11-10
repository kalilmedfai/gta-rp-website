const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des encaissements
const Collection = db.define('Collection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    transactionId: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'carts',
            key: 'id',
        },
    },
}, {
    tableName: 'collections',
    timestamps: false,
});

module.exports = Collection;
