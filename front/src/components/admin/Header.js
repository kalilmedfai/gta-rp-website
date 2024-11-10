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
        <Navbar bg="dark" variant="dark" expand="lg" className="AHeader">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="/admin/dashboard" className="text-light">
                    Admin Dashboard
                </Navbar.Brand>
                <Button variant="danger" onClick={logout} className="logout-button">
                    Se déconnecter
                </Button>
            </Container>
        </Navbar>
    );
};

export default Header;
