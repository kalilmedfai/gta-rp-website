import React from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/accountService';

const Header = () => {
    let navigate = useNavigate()

    const logout = () => {
        accountService.logout()
        navigate('/')
    }

    return (
        <div className='AHeader'>
            ADMIN HEADER
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Header;