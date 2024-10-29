// Import des modules necessaires
const { Sequelize } = require('sequelize')

// require('dotenv').config();

// Connexion à la base de donnée
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        // l'ajout du port n'est pas obligatoire
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)


// Synchronisation des modèles
// sequelize.sync()

module.exports = sequelize


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     // l'ajout du port n'est pas obligatoire
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

// db.connect(err => {
//     if (err) {
//         console.error('Erreur de connexion à la base de données :', err);
//         throw err;
//     }
//     console.log('Connecté à MySQL');
// });

// module.exports = db;
