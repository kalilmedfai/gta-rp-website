// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// initialisation de l'API
const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Autoriser toutes les origines pour le développement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORT DES ROUTES
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');
const productsRouter = require('./routes/products');
const messagesRouter = require('./routes/messages');
const cartsRouter = require('./routes/carts');
const containProductRouter = require('./routes/containProducts');
const collectionsRouter = require('./routes/collections');
const productsTypesRouter = require('./routes/productsTypes');
const usersTypesRouter = require('./routes/usersTypes');
const sendMessagesRouter = require('./routes/sendMessages');

// Configuration du routage
app.get('', (req, res) => res.send(`I'm online`));

// Liaisons des routes CRUD pour chaque ressource
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/articles', articlesRouter);
app.use('/products', productsRouter);
app.use('/messages', messagesRouter);
app.use('/carts', cartsRouter);
app.use('/containProduct', containProductRouter);
app.use('/collections', collectionsRouter);
app.use('/productsTypes', productsTypesRouter);
app.use('/usersTypes', usersTypesRouter);
app.use('/sendMessages', sendMessagesRouter);

// Gestion des routes non définies
app.get('*', (req, res) => {
    res.status(501).send({ message: 'Route non définie' });
});

// Démarrage du serveur avec test db
db.authenticate()
    .then( () => console.log('Connexion à la db OK'))
    .then(() => {
        // Synchronisation de la base de données
        return db.sync({ alter: true }); // alter: true met à jour la base de données sans supprimer les données existantes
    })
    .then( () => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${process.env.SERVER_PORT}`);
        });
        
    })
    .catch(err => console.log('Erreur db', err))