const express = require('express');
const Cart = require('../models/cart');

const router = express.Router();

// Obtenir tous les paniers
router.get('', (req, res) => {
    Cart.findAll()
        .then(carts => res.json({ data: carts }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un panier par ID
router.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    if(!cartId) return res.status(400).json({ message: 'Missing parameter' });

    Cart.findOne({ where: { id: cartId }, raw: true })
        .then(cart => {
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.json({ data: cart });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau panier
router.put('', (req, res) => {
    const { createdAt, usersId } = req.body;
    if (!createdAt || !usersId) return res.status(400).json({ message: 'Missing data' });

    Cart.create(req.body)
        .then(cart => res.json({ message: 'Cart created', data: cart }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour un panier
router.patch('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    if(!cartId) return res.status(400).json({ message: 'Missing parameter' });

    Cart.update(req.body, { where: { id: cartId } })
        .then(() => res.json({ message: 'Cart updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un panier
router.delete('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    if(!cartId) return res.status(400).json({ message: 'Missing parameter' });

    Cart.destroy({ where: { id: cartId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
