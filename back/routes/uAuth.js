// Import des modules nécessaires
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Récupération du routeur d'express
let router = express.Router();

// Routage de la ressource UAuth (authentification utilisateur)
router.post('/', (req, res) => {
    console.log('Tentative de connexion utilisateur:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'Ce compte n\'existe pas.' });
            }

            // Vérifie si l'utilisateur n'est pas un administrateur (donc un utilisateur régulier)
            // if (user.usersTypeId === 1) { // ID 1 pour Admin, car 2 correspond aux utilisateurs
            //     return res.status(401).json({ message: 'Vous n\'avez pas accès ici.' });
            // }

            bcrypt.compare(password, user.password)
                .then(test => {
                    if (!test) {
                        return res.status(401).json({ message: 'Mot de passe incorrect.' });
                    }

                    const token = jwt.sign(
                        {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            usersTypeId: user.usersTypeId
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_DURING }
                    );

                    return res.json({ access_token: token });
                })
                .catch(err => res.status(500).json({ message: 'Erreur lors du processus de connexion.', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Erreur de base de données', error: err }));
});

module.exports = router;
