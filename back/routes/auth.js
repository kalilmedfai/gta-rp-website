// Import des module nécessaires
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// Récupération du routeur d'express
let router = express.Router()

// Routage de la ressource Auth

// Si je ne peux pas utiliser un put (pas un ajout) ou patch (pas une modification), c'est un post d'après la règle rest ful (de plus c'est un formulaire)
router.post('/login', (req, res) => {
    // extraire email et password de mon body
    const { email, password } = req.body

    // Validation des données reçues (si je n'ai pas email ou password)
    if(!email || !password) {
        return res.status(400).json({ message: 'Bad email or password'})
    }

    // Il faut que je trouve mon utilisateur
    User.findOne({ where: {email: email}, raw: true})
        // then reçois une data si j'ai trouvé quelque chose
        .then(user => {
            // vérification si l'utilisateur existe
            if(user === null){
                return res.status(401).json({ message: 'This account does non exist !'})
            }

            // SEULEMENT AUTORISER LES ADMIN
            if(user.role !== 'admin'){
                return res.status(401).json({ message: 'This account does non have access !'})
            }

            // vérification du mot de passe : on compare 'password' de mon req.body à 'user.password' de ma base de données
            bcrypt.compare(password, user.password)
                // Ici on dit qu'on a testé la chose, on va donc avoir un retour que l'on va stocker dans la variable 'test'
                .then(test => {
                    // mot de passe pas bon du tout
                    if(!test){
                        return res.status(401).json({ message: 'wrong password'})
                    }

                    // si je ne passe pas dans le if au dessus, je dois renvoyer une réponse avec un token, donc on génère le token pour le renvoyer
                    // Génération du token
                    const token = jwt.sign({
                        // payload
                        id: user.id,
                        pseudo: user.pseudo,
                        email: user.email
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

                    return res.json({access_token: token})
                })
                .catch(err => res.status(500).json({ message: 'Login process failed'}))

        })
        .catch(err => res.status(500).json({message: 'Database error', error: err}))
})

module.exports = router