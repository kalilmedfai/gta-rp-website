import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/_services/user.service';

const UserAdd = () => {
    // State pour synchroniser les données du formulaire et les erreurs
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        citizenId: ''
    });
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

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
        if (!user.password) newErrors.password = 'Le mot de passe est requis.';
        if (!user.citizenId) newErrors.citizenId = 'L\'ID Citizen est requis.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) { // Valide le formulaire avant de soumettre
            userService.addUser(user)
                .then(res => {
                    navigate('../index');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='UserAdd'>
            <h2>AJOUTER UN UTILISATEUR</h2>
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='username'>Pseudo</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username' 
                        value={user.username} 
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
                        value={user.email} 
                        onChange={onChange} 
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        value={user.password} 
                        onChange={onChange} 
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='citizenId'>ID Citizen</label>
                    <input 
                        type='text' 
                        name='citizenId' 
                        id='citizenId' 
                        value={user.citizenId} 
                        onChange={onChange} 
                    />
                    {errors.citizenId && <p style={{ color: 'red' }}>{errors.citizenId}</p>}
                </div>
                
                <div className='group'>
                    <button type='submit'>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default UserAdd;
