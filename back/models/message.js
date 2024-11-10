const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Message = db.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});


//crée la table si elle n'existe pas (et ne fait rien si elle existe déjà)
// Message.sync()
// crée la table en la supprimant d'abord si elle existait déjà
// Message.sync({force: true})
// vérifie quel est l'état actuel de la table dans la base de données (quelles colonnes elle contient, quels sont leurs types de données, etc.), puis effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
// Message.sync({alter: true})

module.exports = Message;
