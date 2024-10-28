// Import des modules necessaires
const mysql = require('mysql');
require('dotenv').config();

// Connexion à la base de donnée
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    // l'ajout du port n'est pas obligatoire
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        throw err;
    }
    console.log('Connecté à MySQL');
});

module.exports = db;
