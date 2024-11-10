const express = require('express');
const ContainProduct = require('../models/containProduct');

const router = express.Router();

// Obtenir tous les produits contenus dans les paniers
router.get('', (req, res) => {
    ContainProduct.findAll()
        .then(containProducts => res.json({ data: containProducts }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un produit spécifique dans un panier
router.get('/:cartId/:productId', (req, res) => {
    const { cartId, productId } = req.params;
    ContainProduct.findOne({ where: { cartId: parseInt(cartId), productId: parseInt(productId) }, raw: true })
        .then(containProduct => {
            if (!containProduct) return res.status(404).json({ message: 'Product in cart not found' });
            res.json({ data: containProduct });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Ajouter un produit dans un panier
router.put('', (req, res) => {
    const { productId, cartId, qty } = req.body;
    if (!productId || !cartId || !qty) return res.status(400).json({ message: 'Missing data' });

    ContainProduct.create(req.body)
        .then(containProduct => res.json({ message: 'Product added to cart', data: containProduct }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour la quantité d'un produit dans un panier
router.patch('/:cartId/:productId', (req, res) => {
    const { cartId, productId } = req.params;
    const { qty } = req.body;

    ContainProduct.update({ qty }, { where: { cartId: parseInt(cartId), productId: parseInt(productId) } })
        .then(() => res.json({ message: 'Cart product quantity updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un produit d'un panier
router.delete('/:cartId/:productId', (req, res) => {
    const { cartId, productId } = req.params;

    ContainProduct.destroy({ where: { cartId: parseInt(cartId), productId: parseInt(productId) }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
