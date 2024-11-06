import React, {useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '@/_services';

const UserEdit = () => {
    // State pour être synchronisé avec html
    const [user, setUser] = useState([])
    // flage pour éviter le double appel
    const flag = useRef(false)
    let navigate = useNavigate()

    // Création de la proprieté car il ne peut pas être appelé directement
    const {uid} = useParams()
    //console.log(uid)

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
        userService.updateUser(user)
            .then(res => {
                navigate('../index')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(flag.current === false){
            // Déclenche la récupérations des utilisateurs
            userService.getUser(uid) 
                .then(res => {
                    console.log(res.data)
                    // res.data affiche dans Components => User un objet data d'où le res.data.data
                    setUser(res.data.data)
                })
                .catch(err => console.log(err))
        }
        
        // Methode de nettoyage pour éviter d'avoir 2 fois le double appel
        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='UserEdit'>
            MODIFIER UN UTILISATEUR
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
                    <label htmlFor='citizenId'>ID Citizen</label>
                    <input type='text' name='citizenId' id='citizenId' value={user.citizenId} onChange={onChange}/>
                </div>
                <div className='group'>
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;