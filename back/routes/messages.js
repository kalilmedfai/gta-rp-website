const express = require('express');
const Message = require('../models/message');

const router = express.Router();

// Récupérer tous les messages
router.get('', (req, res) => {
    Message.findAll()
        .then(messages => res.json({ data: messages }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Récupérer un message spécifique par ID
router.get('/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    if (!messageId) return res.status(400).json({ message: 'Missing parameter' });

    Message.findOne({ where: { id: messageId }, raw: true })
        .then(message => {
            if (!message) return res.status(404).json({ message: 'Message not found' });
            res.json({ data: message });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau message
router.post('', (req, res) => {
    const { subject, message } = req.body;
    const userId = req.user.id; // Supposons que l'auth middleware ajoute userId dans req.user

    if (!subject || !message) return res.status(400).json({ message: 'Missing data' });

    Message.create({ subject, message, userId })
        .then(newMessage => res.json({ message: 'Message created', data: newMessage }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

// Mettre à jour un message
router.patch('/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    if (!messageId) return res.status(400).json({ message: 'Missing parameter' });

    Message.update(req.body, { where: { id: messageId } })
        .then(() => res.json({ message: 'Message updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un message
router.delete('/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    if (!messageId) return res.status(400).json({ message: 'Missing parameter' });

    Message.destroy({ where: { id: messageId }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
