// nommé User.js et pas index.js ou Index.js pour mieux s'y retrouver
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { userService } from '@/_services';

// Il faudra récupérer les users depuis la db
const User = () => {
    // Création de la proprieté car il ne peut pas être appelé directement
    let navigate = useNavigate()
    // State pour être synchronisé avec html
    const [users, setUsers] = useState([])
    const flag = useRef(false)

    // chercher tous les utilisateurs / se déclenche à l'affichage
    useEffect(() => {
        console.log('useEffect')

        if(flag.current === false){
            // Déclenche la récupérations des utilisateurs
            userService.getAllUsers() 
            .then(res => {
                console.log(res.data)
                // res.data affiche dans Components => User un objet data d'où le res.data.data
                setUsers(res.data.data) // dès que le state est bon, on rempli avec notre méthode de mutation (voir suite dans tableau)
            })
            .catch(err => console.log(err))
        }
        
        // Methode de nettoyage pour éviter d'avoir 2 fois le double appel
        return () => flag.current = true
    }, [])

    // const marcel = (userId) => {
    //     console.log('click')
    //     navigate('../edit/'+userId)
    // }

    return (
        <div className='User'>
            USER LISTE
            {/* <button onClick={(e) => marcel(4)}>User 4</button> */}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pseudo</th>
                        <th>email</th>
                        <th>citizenId</th>
                        <th>created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // (suite dans tableau) synchronisation et affichage grâche au setUser
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.pseudo}</td>
                                <td>{user.email}</td>
                                <td>{user.citizenId}</td>
                                <td>{user.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;