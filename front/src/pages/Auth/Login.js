import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { accountService } from '@/_services/accountService';

import './auth.css'

const Login = () => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
        axios.post('http://localhost:5000/auth/login', credentials)
            .then(res => {
                console.log(res)
                // permet s'enregistrer le token dans le local storage (f12 + appli + lien en desous de "stockage local")
                accountService.saveToken(res.data.access_token)
                // demande de navigation vers /admin
                navigate('/admin')
            })
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='group'>
                <label htmlFor='login'>Identifiant</label>
                <input type='text' name='email' id='email' value={credentials.email} onChange={onChange}/>
            </div>
            <div className='group'></div>
                <label htmlFor='password'>Mot de passe</label>
                <input type='text' name='password' id='password' value={credentials.password} onChange={onChange}/>
            <div className='group'>
                <button>Connexion</button>
            </div>
        </form>
    );
};

export default Login;