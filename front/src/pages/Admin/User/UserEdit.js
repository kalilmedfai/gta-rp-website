import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '@/_services';

const UserEdit = () => {
    // State pour synchroniser les données du formulaire et les erreurs
    const [user, setUser] = useState({
        username: '',
        email: '',
        citizenId: ''
    });
    const [errors, setErrors] = useState({});
    const flag = useRef(false);
    let navigate = useNavigate();

    // Création de la proprieté car il ne peut pas être appelé directement
    const { uid } = useParams();

    // Gestion des modifications dans le formulaire
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Fonction de validation des champs
    const validateForm = () => {
        const newErrors = {};
        if (!user.username) newErrors.username = 'Le pseudo est requis.';
        if (!user.email) newErrors.email = 'L\'email est requis.';
        if (!user.citizenId) newErrors.citizenId = 'L\'ID Citizen est requis.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retourne true si aucun champ n'a d'erreur
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) { // Valide le formulaire avant de soumettre
            userService.updateUser(user)
                .then(res => {
                    navigate('../index');
                })
                .catch(err => console.log(err));
        }
    };

    // Récupération des données de l'utilisateur lors du chargement du composant
    useEffect(() => {
        if (flag.current === false) {
            // Déclenche la récupération de l'utilisateur
            userService.getUser(uid) 
                .then(res => {
                    if (res.data && res.data.data) {
                        setUser(res.data.data);
                    } else {
                        navigate('../index'); // Redirige si l'utilisateur n'existe pas
                    }
                })
                .catch(err => console.log(err));
        }
        
        // Méthode de nettoyage pour éviter d'avoir un double appel
        return () => flag.current = true;
    }, [uid, navigate]);

    return (
        <div className='UserEdit'>
            <h2>MODIFIER UN UTILISATEUR</h2>
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='username'>Pseudo</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username' 
                        value={user.username || ''} 
                        onChange={onChange} 
                    />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='text' 
                        name='email' 
                        id='email' 
                        value={user.email || ''} 
                        onChange={onChange} 
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='citizenId'>ID Citizen</label>
                    <input 
                        type='text' 
                        name='citizenId' 
                        id='citizenId' 
                        value={user.citizenId || ''} 
                        onChange={onChange} 
                    />
                    {errors.citizenId && <p style={{ color: 'red' }}>{errors.citizenId}</p>}
                </div>
                
                <div className='group'>
                    <button type='submit'>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
