import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../_services/user.service';

const UserAdd = () => {
    // State pour être synchronisé avec html
    const [user, setUser] = useState([])
    let navigate = useNavigate()

    // Handle modification dans le formulaire
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        userService.addUser(user)
            .then(res => {
                navigate('../index')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='UserAdd'>
            USER ADD
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='pseudo'>pseudo</label>
                    <input type='text' name='pseudo' id='pseudo' value={user.pseudo} onChange={onChange}/>
                </div>

                <div className='group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={user.email} onChange={onChange}/>
                </div>

                <div className='group'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input type='password' name='password' id='password' value={user.password} onChange={onChange}/>
                </div>

                <div className='group'>
                    <label htmlFor='citizenId'>ID Citizen</label>
                    <input type='text' name='citizenId' id='citizenId' value={user.citizenId} onChange={onChange}/>
                </div>
                <div className='group'>
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default UserAdd;