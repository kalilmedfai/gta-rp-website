const express = require('express');
const ProductsType = require('../models/productType');

const router = express.Router();

// Obtenir tous les types de produits
router.get('', (req, res) => {
    ProductsType.findAll()
        .then(productsTypes => res.json({ data: productsTypes }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un type de produit par ID
router.get('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    ProductsType.findOne({ where: { id: typeId }, raw: true })
        .then(productsType => {
            if (!productsType) return res.status(404).json({ message: 'Product type not found' });
            res.json({ data: productsType });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau type de produit
router.put('', (req, res) => {
    const { productsName } = req.body;
    if (!productsName) return res.status(400).json({ message: 'Missing data' });

    ProductsType.create(req.body)
        .then(productsType => res.json({ message: 'Product type created', data: productsType }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour un type de produit
router.patch('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    ProductsType.update(req.body, { where: { id: typeId } })
        .then(() => res.json({ message: 'Product type updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un type de produit
router.delete('/:id', (req, res) => {
    const typeId = parseInt(req.params.id);
    if(!typeId) return res.status(400).json({ message: 'Missing parameter' });

    ProductsType.destroy({ where: { id: typeId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;