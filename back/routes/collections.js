const express = require('express');
const Collection = require('../models/collection');

const router = express.Router();

// Obtenir toutes les collections
router.get('', (req, res) => {
    Collection.findAll()
        .then(collections => res.json({ data: collections }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir une collection par ID
router.get('/:id', (req, res) => {
    const collectionId = parseInt(req.params.id);
    if(!collectionId) return res.status(400).json({ message: 'Missing parameter' });

    Collection.findOne({ where: { id: collectionId }, raw: true })
        .then(collection => {
            if (!collection) return res.status(404).json({ message: 'Collection not found' });
            res.json({ data: collection });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer une nouvelle collection
router.put('', (req, res) => {
    const { transactionId, totalAmount, status, cartId } = req.body;
    if (!transactionId || !totalAmount || !status || !cartId) return res.status(400).json({ message: 'Missing data' });

    Collection.create(req.body)
        .then(collection => res.json({ message: 'Collection created', data: collection }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour une collection
router.patch('/:id', (req, res) => {
    const collectionId = parseInt(req.params.id);
    if(!collectionId) return res.status(400).json({ message: 'Missing parameter' });

    Collection.update(req.body, { where: { id: collectionId } })
        .then(() => res.json({ message: 'Collection updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer une collection
router.delete('/:id', (req, res) => {
    const collectionId = parseInt(req.params.id);
    if(!collectionId) return res.status(400).json({ message: 'Missing parameter' });

    Collection.destroy({ where: { id: collectionId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
