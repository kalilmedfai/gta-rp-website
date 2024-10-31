// Import des modules necessaires
const express = require('express');
const cors = require('cors');

// import de la connexion à la db
const db = require('./config/db');

// initialisation de l'api
const app = express();

// Middleware
app.use(cors({
    origin: '*', // Autoriser toutes les origines pour le développement
}));
app.use(express.json());
app.use(express.urlencoded({ extend: true}))

// IMPORT MODULE DE ROUTAGE
const user_router = require('./routes/users')

const auth_router = require('./routes/auth')

// Mise en place du routage
app.get('', (req, res) => res.send(`I'm online`))

app.use('/users', user_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => {
    res.status(501).send({ message: 'What are you doing ?!?'});
});

// Démarrage du serveur avec test db
db.authenticate()
    .then( () => console.log('Connexion à la db OK'))
    .then( () => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${process.env.SERVER_PORT}`);
        });
        
    })
    .catch(err => console.log('Erreur db', err))