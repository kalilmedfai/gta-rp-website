// Import des modules necessaires
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const sequelize = require('../config/db');

// Définition du modèle User
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    // user_id: {
    //     type: DataTypes.INTEGER(10),
    //     allowNull: false
    // },
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
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
            is: /^[A-Z0-9]{8}$/  // Validation : 8 caractères, majuscules, lettres et chiffres
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: true              // Active le soft delete
});

// Vérification du citizenId obligatoire pour les utilisateurs, mais non requis pour les admins
// User.beforeCreate((user, options) => {
//     if (user.role === 'user' && !user.citizenId) {
//         throw new Error('Citizen ID est requis pour les utilisateurs.');
//     }
// });


// Synchronisation du modèle

//crée la table si elle n'existe pas (et ne fait rien si elle existe déjà)
// User.sync()
// crée la table en la supprimant d'abord si elle existait déjà
// User.sync({force: true})
// vérifie quel est l'état actuel de la table dans la base de données (quelles colonnes elle contient, quels sont leurs types de données, etc.), puis effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
// User.sync({alter: true})

module.exports = User;
