const express = require('express');
const Message = require('../models/message');
const User = require('../models/user'); // Au cas où vous voudriez vérifier l'utilisateur

const router = express.Router();

// Récupérer tous les messages
router.get('', (req, res) => {
    Message.findAll()
        .then(messages => res.json({ data: messages }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Récupérer un message spécifique par ID
router.get('/:id', (req, res) => {
    const message_id = parseInt(req.params.id);
    if(!message_id) return res.status(400).json({ message: 'Missing parameter' });

    Message.findOne({ where: { id: message_id }, raw: true })
        .then(message => {
            if (!message) return res.status(404).json({ message: 'Message not found' });
            res.json({ data: message });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Créer un nouveau message
router.post('', (req, res) => {
    const { subject, message, userId } = req.body;

    if (!subject || !message || !userId) return res.status(400).json({ message: 'Missing data' });

    // Optionnel : Vérifier si l'utilisateur existe avant de créer le message
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });

            Message.create(req.body)
                .then(newMessage => res.json({ message: 'Message created', data: newMessage }))
                .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

// Mettre à jour un message
router.patch('/:id', (req, res) => {
    const message_id = parseInt(req.params.id);
    if(!message_id) return res.status(400).json({ message: 'Missing parameter' });

    Message.update(req.body, { where: { id: message_id } })
        .then(() => res.json({ message: 'Message updated' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un message
router.delete('/:id', (req, res) => {
    const message_id = parseInt(req.params.id);
    if(!message_id) return res.status(400).json({ message: 'Missing parameter' });

    Message.destroy({ where: { id: message_id }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
