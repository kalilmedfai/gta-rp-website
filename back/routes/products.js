const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('', (req, res) => {
    Product.findAll()
        .then(products => res.json({ data: products }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.get('/:id', (req, res) => {
    const product_id = parseInt(req.params.id);
    if(!product_id) return res.status(400).json({ message: 'Missing parameter' });

    Product.findOne({ where: { id: product_id }, raw: true })
        .then(product => {
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json({ data: product });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.put('', (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) return res.status(400).json({ message: 'Missing data' });

    Product.create(req.body)
        .then(product => res.json({ message: 'Product created', data: product }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.patch('/:id', (req, res) => {
    const product_id = parseInt(req.params.id);
    if(!product_id) return res.status(400).json({ message: 'Missing parameter' });

    Product.update(req.body, { where: { id: product_id } })
        .then(() => res.json({ message: 'Product updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.delete('/:id', (req, res) => {
    const product_id = parseInt(req.params.id);
    if(!product_id) return res.status(400).json({ message: 'Missing parameter' });

    Product.destroy({ where: { id: product_id }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
