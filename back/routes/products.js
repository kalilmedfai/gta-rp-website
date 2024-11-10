const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Obtenir tous les produits
router.get('', (req, res) => {
    Product.findAll()
        .then(products => res.json({ data: products }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un produit par ID
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    if(!productId) return res.status(400).json({ message: 'Missing parameter' });

    Product.findOne({ where: { id: productId }, raw: true })
        .then(product => {
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json({ data: product });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau produit
router.put('', (req, res) => {
    const { productName, description, price } = req.body;
    if (!productName || !description || !price) return res.status(400).json({ message: 'Missing data' });

    Product.create(req.body)
        .then(product => res.json({ message: 'Product created', data: product }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour un produit
router.patch('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    if(!productId) return res.status(400).json({ message: 'Missing parameter' });

    Product.update(req.body, { where: { id: productId } })
        .then(() => res.json({ message: 'Product updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un produit
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    if(!productId) return res.status(400).json({ message: 'Missing parameter' });

    Product.destroy({ where: { id: productId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;