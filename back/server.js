// Import des modules necessaires
const express = require('express');
const cors = require('cors');

// import de la connexion à la db
const db = require('./config/db');

// initialisation de l'api
const app = express();
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true}))

// Mis en place du routage
// app.get('/', (req, res) => {
//     res.send({ message: 'Serveur opérationnel' });
// });

app.get('/', (req, res) => res.send(`I'm online`))

app.get('*', (req, res) => {
    res.status(501).send({ message: 'What are you doing ?!?'});
});

// Démarrer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
// });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${process.env.SERVER_PORT}`);
});