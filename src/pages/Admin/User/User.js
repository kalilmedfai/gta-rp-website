// nommé User.js et pas index.js ou Index.js pour mieux s'y retrouver
import React from 'react';
import { useNavigate } from 'react-router-dom'

// Il faudra récupérer les users depuis la db
const User = () => {
    // Création de la proprieté car il ne peut pas être appelé directement
    let navigate = useNavigate()

    const marcel = (userId) => {
        console.log('click')
        navigate('../edit/'+userId)
    }

    return (
        <div className='User'>
            USER LISTE
            <button onClick={(e) => marcel(4)}>User 4</button>
        </div>
    );
};

export default User;