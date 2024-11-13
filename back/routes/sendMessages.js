const express = require('express');
const SendMessage = require('../models/SendMessage');
const { sendContactEmail } = require('../services/emailService');

const router = express.Router();

// Obtenir tous les messages envoyés
router.get('', (req, res) => {
    SendMessage.findAll()
        .then(sendMessages => res.json({ data: sendMessages }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Envoyer un message de contact
router.post('/', (req, res) => {
    const { email, subject, text } = req.body;
    console.log('Email reçu:', email);
    console.log('Sujet:', subject);
    console.log('Texte:', text);
    
    if (!email || !subject || !text) {
        return res.status(400).json({ message: 'Email, sujet et texte requis.' });
    }

    sendContactEmail(email, subject, text)
        .then(() => res.json({ message: 'Message envoyé avec succès.' }))
        .catch((error) => {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
        });
});

// Obtenir un message envoyé spécifique
router.get('/:userId/:messageId', (req, res) => {
    const { userId, messageId } = req.params;

    SendMessage.findOne({ where: { userId: parseInt(userId), messageId: parseInt(messageId) }, raw: true })
        .then(sendMessage => {
            if (!sendMessage) return res.status(404).json({ message: 'Sent message not found' });
            res.json({ data: sendMessage });
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Envoyer un message
router.put('', (req, res) => {
    const { userId, messageId, createdAt } = req.body;
    if (!userId || !messageId || !createdAt) return res.status(400).json({ message: 'Missing data' });

    SendMessage.create(req.body)
        .then(sendMessage => res.json({ message: 'Message sent', data: sendMessage }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

// Supprimer un message envoyé
router.delete('/:userId/:messageId', (req, res) => {
    const { userId, messageId } = req.params;

    SendMessage.destroy({ where: { userId: parseInt(userId), messageId: parseInt(messageId) }, force: true })
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json({ message: 'Database Error' }));
});

module.exports = router;
