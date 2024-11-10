// Import des modules necessaires
const { Sequelize } = require('sequelize')

// require('dotenv').config();

// Connexion à la base de donnée
let db = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        // l'ajout du port n'est pas obligatoire
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)


// Synchronisation des modèles
// sequelize.sync((err) => {
//     console.log('Database Sync Error', err)
// })

module.exports = db
