const express = require('express');
const Article = require('../models/article');

const router = express.Router();

// Obtenir tous les articles
router.get('', (req, res) => {
    Article.findAll()
        .then(articles => res.json({ data: articles }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Obtenir un article par ID
router.get('/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    if(!articleId) return res.status(400).json({ message: 'Missing parameter' });

    Article.findOne({ where: { id: articleId }, raw: true })
        .then(article => {
            if (!article) return res.status(404).json({ message: 'Article not found' });
            res.json({ data: article });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouvel article
router.put('', (req, res) => {
    const { title, image, description } = req.body;
    if (!title || !image || !description) return res.status(400).json({ message: 'Missing data' });

    Article.create(req.body)
        .then(article => res.json({ message: 'Article created', data: article }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Mettre à jour un article
router.patch('/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    if(!articleId) return res.status(400).json({ message: 'Missing parameter' });

    Article.update(req.body, { where: { id: articleId } })
        .then(() => res.json({ message: 'Article updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un article
router.delete('/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    if(!articleId) return res.status(400).json({ message: 'Missing parameter' });

    Article.destroy({ where: { id: articleId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
