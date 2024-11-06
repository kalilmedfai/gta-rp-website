const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('', (req, res) => {
    Article.findAll()
        .then(articles => res.json({ data: articles }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.get('/:id', (req, res) => {
    const article_id = parseInt(req.params.id);
    if(!article_id) return res.status(400).json({ message: 'Missing parameter' });

    Article.findOne({ where: { id: article_id }, raw: true })
        .then(article => {
            if (!article) return res.status(404).json({ message: 'Article not found' });
            res.json({ data: article });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.put('', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Missing data' });

    Article.create(req.body)
        .then(article => res.json({ message: 'Article created', data: article }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.patch('/:id', (req, res) => {
    const article_id = parseInt(req.params.id);
    if(!article_id) return res.status(400).json({ message: 'Missing parameter' });

    Article.update(req.body, { where: { id: article_id } })
        .then(() => res.json({ message: 'Article updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

router.delete('/:id', (req, res) => {
    const article_id = parseInt(req.params.id);
    if(!article_id) return res.status(400).json({ message: 'Missing parameter' });

    Article.destroy({ where: { id: article_id }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
