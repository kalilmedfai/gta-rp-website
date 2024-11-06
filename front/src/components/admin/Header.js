// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { accountService } from '../../_services/account.service';

// const Header = () => {
//     let navigate = useNavigate()

//     const logout = () => {
//         accountService.logout()
//         navigate('/')
//     }

//     return (
//         <div className='AHeader'>
//             ADMIN HEADER
//             <button onClick={logout}>Logout</button>
//         </div>
//     );
// };

// export default Header;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';
import { Navbar, Container, Button } from 'react-bootstrap';
import './admin.css';

const Header = () => {
    let navigate = useNavigate();

    const logout = () => {
        accountService.logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" className="AHeader">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                <Button variant="danger" onClick={logout} className="logout-button">
                    Se déconnecter
                </Button>
            </Container>
        </Navbar>
    );
};

export default Header;
