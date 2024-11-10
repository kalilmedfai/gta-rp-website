// Import des modules necessaires
const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des utilisateurs
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    citizenId: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Z0-9]{8}$/, // 8 caractères, majuscules et chiffres uniquement
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    usersTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: { model: 'usersTypes', key: 'id' }
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
});

module.exports = User;
