const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // price: {
    //     type: DataTypes.DECIMAL(10, 2),
    //     allowNull: false,
    //     validate: {
    //         isDecimal: true, // Assure que la valeur est décimale
    //         min: 0.01        // Assure que la valeur est strictement positive
    //     }
    // },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            // Convertit le prix en nombre pour éviter qu'il soit interprété comme une chaîne
            const rawValue = this.getDataValue('price');
            return parseFloat(rawValue);
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
    tableName: 'products',
    timestamps: true,
    paranoid: true
});

// Synchronisation du modèle

//crée la table si elle n'existe pas (et ne fait rien si elle existe déjà)
// Product.sync()
// crée la table en la supprimant d'abord si elle existait déjà
// Product.sync({force: true})
// vérifie quel est l'état actuel de la table dans la base de données (quelles colonnes elle contient, quels sont leurs types de données, etc.), puis effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
// Product.sync({alter: true})

module.exports = Product;
