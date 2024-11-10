const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Table des types d'utilisateur
const UserType = db.define('UserType', {
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
    tableName: 'usersTypes',
    timestamps: false,
});

module.exports = UserType;
