// Import des module nécessaires
const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')

// Récupération du routeur d'express
let router = express.Router()

// Routage de la ressource User

// Get pour tous les utilisateurs
router.get('', (req, res) => {
    User.findAll()
    .then( users, res.json({ data: users}))
    .then( err => res.status(500).json({ message: 'Database Error'})) 
})

// Get pour un utilisateur précisé par un id, et l'id est présent dans l'url
router.get('/:id', (req, res) => {
    // si c'est une lettre ou que rien n'est transmis ce sera false et si c'est un chiffre il va le parse
    let user_id = parseInt(req.params.id)

    // vérification si le champ id est présent et cohérent
    // donc si je n'ai pas de user_id (false)
    if(!user_id){
        // 400 pour dire qu'il y a un problème dans la requête
        return res.json(400).json({ message: 'Missing parameter'})
    }

    // Si j'ai bien récupéré quelque chose
    // Récupération de l'utilisateur avec findOne car je veux qu'un seul résultat / where id correspond à user_id / raw car je veux un objet exploitable
    User.findOne({ where: {id: user_id}, raw: true})
        .then(user => {
            if((user === null)){
                return res.status(404).json({message: 'This user does not exist'})
            }

            // Utilisateur trouvé
            return res.json({data: user})
        })
        .catch(err => res.status(500).json({message: 'Database error'}))
})

// Put pour ajouter de données (créer)
router.put('', (req, res) => {
    const {pseudo, email, password, citizenId} = req.body

    // Validation des données reçues
    if(!pseudo || !email || !password || !citizenId) { /************** RAJOUTER D'AUTRES *****************/
        res.status(400).json({message: 'Missing data'}) // Problème dans la requête 400
    }

    User.findOne({ where: { email: email }, raw: true})     // Après le where, le premier "email" est celui de la base de données, le second est celui de la requête
        .then(user => {     // si je trouve qqc je vais le stocker dans la variable user
            // vérification si utilisateur existe déjà
            if(user !== null){      // Si user n'est pas égale à null, ça veut dire qu'on a trouvé qqc dans la base de données, donc ce n'est pas bon
                return res.status(409).json({ message: `The user ${pseudo} already exist`, error: err})
            }

            // hashage mdp utilisateur, le bcrypt_salt_round permet de complexifier avant de le hasher (salage)
            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then(hash => {
                    req.body.password = hash    // on remplace le mdp en clair par le mdp hashé

                    // Si utilisateur n'existe pas, on créé l'utilisateur
                    User.create(req.body)
                    .then(user => res.json({ message : 'User created', data:user}))
                    .catch(err => res.status(500).json({message: 'Database error', error: err}))
                })
                .catch(err => res.status(500).json({message: 'Hash Process Error', error: err}))

        })
        .catch(err => res.status(500).json({message: 'Database error', error: err}))
})

// Patch pour modification d'un utilisateur avec un id dans l'url et les modifications à apporter dans le body de la requête
router.patch('/:id', (req, res) => {
    let user_id = parseInt(req.params.id)

    // Vérifier si le champ id est présent et cohérent
    if(!user_id) {
        return res.status(400).json({message: 'Missing parameter'})
    }

    // Recherche de l'utilisateur
    User.findOne({ where: {id: user_id}, raw: true})
        .then(user => {
            // Vérifier si utilisateur existe
            if(user === null){
                return res.status(404).json({ message: 'This user does not exist'})
            }

            // Mise à jour de l'utilisateur
            User.update(req.body, {where : {id: user_id}})     // NE PAS OUBLIER : params(URL) = on a l'id de l'utilisateur / body = informations à mettre à jour (nom, prénom, email, pseudo, etc)
                .then(user => res.json({message: 'User updated'}))       // user = je vais recevoir utilisateur modifié / on ne rajoute pas de status car je vais envoyer par défaut 200
                .catch(err => res.status(500).json({message: 'Database error'}))      // toujours rajouter un catch au cas où cela se passe mal
        })
        .catch(err => res.status(500).json({message: 'Database error'})) // Si mon findOne ne s'est pas bien passé, on renvoie une erreur
})

// Post pour la restauration car put et patch pas adéquat
router.post('/untrash/:id', (req, res) => {
    let user_id = parseInt(req.params.id)

    // Vérifier si le champ id est présent et cohérent
    if(!user_id) {
        return res.status(400).json({message: 'Missing parameter'})
    }

    User.restore({where: {id: user_id}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: 'Database error', error: err}))
})

// Suppression vers la "corbeille" (soft delete)
router.delete('/trash/:id', (req, res) => {
    // si c'est une lettre ou que rien n'est transmis ce sera false et si c'est un chiffre il va le parse
    let user_id = parseInt(req.params.id)

    // vérification si le champ id est présent et cohérent
    // donc si je n'ai pas de user_id (false)
    if(!user_id){
        // 400 pour dire qu'il y a un problème dans la requête
        return res.json(400).json({ message: 'Missing parameter'})
    }

    // Suppression de l'utilisateur
    User.destroy({where: {id: user_id}})
        .then(() => res.status(204).json({})) // je ne reçois rien dans then / 204 : ok tout est bon mais j'ai aucun message à t'envoyer
        .catch(err => res.status(500).json({message: 'Database error'}))
})

// Suppression définitive ma ligne dans la db
router.delete('/:id', (req, res) => {
    // si c'est une lettre ou que rien n'est transmis ce sera false et si c'est un chiffre il va le parse
    let user_id = parseInt(req.params.id)

    // vérification si le champ id est présent et cohérent
    // donc si je n'ai pas de user_id (false)
    if(!user_id){
        // 400 pour dire qu'il y a un problème dans la requête
        return res.json(400).json({ message: 'Missing parameter'})
    }

    // Suppression de l'utilisateur
    User.destroy({where: {id: user_id}, force: true})
        .then(() => res.status(204).json({})) // je ne reçois rien dans then / 204 : ok tout est bon mais j'ai aucun message à t'envoyer
        .catch(err => res.status(500).json({message: 'Database error'}))
})

module.exports = router