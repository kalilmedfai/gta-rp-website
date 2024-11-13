// Import des modules nécessaires
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UsersType = require('../models/userType'); // Importez le modèle du type utilisateur si besoin

// Récupération du routeur d'express
let router = express.Router();

// Routage de la ressource Auth
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Bad email or password' });
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'This account does not exist!' });
            }

            if (user.usersTypeId !== 1) { // Vérifie si l'utilisateur est admin
                return res.status(401).json({ message: 'This account does not have access!' });
            }

            bcrypt.compare(password, user.password)
                .then(test => {
                    if (!test) {
                        return res.status(401).json({ message: 'Wrong password' });
                    }

                    const token = jwt.sign(
                        {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            usersTypeId: user.usersTypeId
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_DURING }
                    );

                    return res.json({ access_token: token });
                })
                .catch(err => res.status(500).json({ message: 'Login process failed', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }));
});

// Routage de la ressource Auth
// router.post('/connexion', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Bad email or password' });
//     }

//     User.findOne({ where: { email: email }, raw: true })
//         .then(user => {
//             if (user === null) {
//                 return res.status(401).json({ message: 'This account does not exist!' });
//             }

//             // if (user.usersTypeId !== 2) { // Vérifie si l'utilisateur est user
//             //     return res.status(401).json({ message: 'This account does not have access!' });
//             // }

//             bcrypt.compare(password, user.password)
//                 .then(test => {
//                     if (!test) {
//                         return res.status(401).json({ message: 'Wrong password' });
//                     }

//                     const token = jwt.sign(
//                         {
//                             id: user.id,
//                             username: user.username,
//                             email: user.email
//                         },
//                         process.env.JWT_SECRET,
//                         { expiresIn: process.env.JWT_DURING }
//                     );

//                     return res.json({ access_token: token });
//                 })
//                 .catch(err => res.status(500).json({ message: 'Login process failed', error: err }));
//         })
//         .catch(err => res.status(500).json({ message: 'Database error', error: err }));
// });


module.exports = router;
