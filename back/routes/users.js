// Import des modules nécessaires
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { sendWelcomeEmail } = require('../services/emailService');

const router = express.Router();

// Obtenir tous les utilisateurs
router.get('', (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un utilisateur par ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Missing parameter' });

    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ data: user });
        })
        .catch(err => res.status(500).json({ message: 'Database error' }));
});

// Créer un nouvel utilisateur et envoyer un email de bienvenue
router.put('', (req, res) => {
    const { username, email, password, citizenId } = req.body;

    // Validation des données requises
    if (!username || !email || !password || !citizenId) {
        return res.status(400).json({ message: 'Missing data' });
    }

    // Vérifier si l'utilisateur existe déjà
    User.findOne({ where: { email }, raw: true })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: `The user ${username} already exists` });
            }

            // Hash du mot de passe
            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then(hashedPassword => {
                    req.body.password = hashedPassword; // Remplace le mot de passe par le hashé

                    // Création de l'utilisateur
                    User.create(req.body)
                        .then(newUser => {
                            // Envoi de l'email de bienvenue
                            sendWelcomeEmail(newUser.email, newUser.username);
                            res.json({ message: 'User created', data: newUser });
                        })
                        .catch(err => res.status(500).json({ message: 'Database error', error: err }));
                })
                .catch(err => res.status(500).json({ message: 'Hash Process Error', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }));
});

// Mise à jour d'un utilisateur par ID
router.patch('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Missing parameter' });

    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Mettre à jour l'utilisateur
            User.update(req.body, { where: { id: userId } })
                .then(() => res.json({ message: 'User updated' }))
                .catch(err => res.status(500).json({ message: 'Database error' }));
        })
        .catch(err => res.status(500).json({ message: 'Database error' }));
});

// Restaurer un utilisateur supprimé (soft delete)
router.post('/untrash/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Missing parameter' });

    User.restore({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err }));
});

// Suppression douce d'un utilisateur (soft delete)
router.delete('/trash/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Missing parameter' });

    User.destroy({ where: { id: userId } })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database error' }));
});

// Suppression définitive d'un utilisateur
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json({ message: 'Missing parameter' });

    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database error' }));
});

module.exports = router;