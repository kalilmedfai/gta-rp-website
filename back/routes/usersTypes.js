const express = require('express');
const UsersType = require('../models/userType');

const router = express.Router();

// Obtenir tous les types d'utilisateurs
router.get('', (req, res) => {
    UsersType.findAll()
        .then(userTypes => res.json({ data: userTypes }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un type d'utilisateur par ID
router.get('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    UsersType.findOne({ where: { id: typeId }, raw: true })
        .then(userType => {
            if (!userType) return res.status(404).json({ message: 'User type not found' });
            res.json({ data: userType });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau type d'utilisateur
router.put('', (req, res) => {
    const { typeName } = req.body;
    if (!typeName) return res.status(400).json({ message: 'Missing data' });

    UsersType.create(req.body)
        .then(userType => res.json({ message: 'User type created', data: userType }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour un type d'utilisateur
router.patch('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    UsersType.update(req.body, { where: { id: typeId } })
        .then(() => res.json({ message: 'User type updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un type d'utilisateur
router.delete('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    UsersType.destroy({ where: { id: typeId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;