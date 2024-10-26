import React from 'react';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    // Création de la proprieté car il ne peut pas être appelé directement
    let {uid} = useParams()
    console.log(uid)

    return (
        <div className='UserEdit'>
            USER EDIT
        </div>
    );
};

export default UserEdit;