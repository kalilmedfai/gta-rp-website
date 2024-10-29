// Import des modules necessaires
const { DataTypes } = require('sequelize');
const db = require('../config/db')

// Définition du modèle User
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true           // validation de données
        }
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        is : /^[0-9a-f]{64}$/i      // contrainte
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    citizenId: {
        type: DataTypes.STRING(6),
        allowNull: true,
        validate: {
            is: /^[A-Z0-9]{6}$/  // Validation : 6 caractères, majuscules, lettres et chiffres
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true              // Active le soft delete
});

// Vérification du citizenId obligatoire pour les utilisateurs, mais non requis pour les admins
// User.beforeCreate((user, options) => {
//     if (user.role === 'user' && !user.citizenId) {
//         throw new Error('Citizen ID est requis pour les utilisateurs.');
//     }
// });

module.exports = User;
