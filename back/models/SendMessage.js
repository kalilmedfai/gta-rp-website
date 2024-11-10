const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des messages envoyés
const SendMessage = db.define('SendMessage', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    messageId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'messages',
            key: 'id',
        },
        primaryKey: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'sendMessages',
    timestamps: false,
});

module.exports = SendMessage;
