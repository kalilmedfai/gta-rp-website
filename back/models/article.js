const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Article = db.define('Article', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
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
    tableName: 'articles',
    timestamps: true,
    paranoid: true
});

// Synchronisation du modèle

//crée la table si elle n'existe pas (et ne fait rien si elle existe déjà)
// Article.sync()
// crée la table en la supprimant d'abord si elle existait déjà
// Article.sync({force: true})
// vérifie quel est l'état actuel de la table dans la base de données (quelles colonnes elle contient, quels sont leurs types de données, etc.), puis effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
// Article.sync({alter: true})

module.exports = Article;
