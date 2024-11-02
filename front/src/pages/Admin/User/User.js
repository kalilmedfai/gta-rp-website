// nommé User.js et pas index.js ou Index.js pour mieux s'y retrouver
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { userService } from '@/_services';

// Il faudra récupérer les users depuis la db
const User = () => {
    // Création de la proprieté car il ne peut pas être appelé directement
    // let navigate = useNavigate()
    // State pour être synchronisé avec html
    const [users, setUsers] = useState([])
    // flage pour éviter le double appel
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

    // Supprimer un utilisateur
    const delUser = (userId) => {
        console.log(userId)
        userService.deleteUser(userId)
            .then(res => {
                console.log(res)
                // permet de mettre à jour le tableau après avoir supprimé un utilisateur
                setUsers((current) => current.filter(user => user.id !== userId)) // Mise à jour du state / current = state actuel, puis on le filtre, donc on reçois des user et il doit me renvoyer la nouvelle table quand user.id et différent de userId (renvoyer l'entièreté de mon state sans la ligne qui correspond à l'utilisateur userId)
            })
            .catch(err => console.log(err))
    }

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
                        <th></th>
                        <th></th> 
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
                                <td><Link to={`/admin/user/edit/${user.id}`}><button className='edit_ubtn'>MODIFIER</button></Link></td>
                                <td><Link><button className='del_utbn' onClick={() => delUser(user.id)}>SUPPRIMER</button></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;