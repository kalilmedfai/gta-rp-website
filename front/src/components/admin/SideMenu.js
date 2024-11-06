import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import './admin.css';

const SideMenu = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="dark"
                onClick={handleShow}
                className={`menu-toggle ${show ? 'hidden' : 'fade-in'}`}
            >
                Menu
            </Button>

            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                scroll={true}
                placement="start"
                className="side-menu-canvas"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Admin Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
                        <Nav.Link as={Link} to="/admin/dashboard" onClick={handleClose}>Dashboard</Nav.Link>
                        <Nav.Item>
                            <h6>Utilisateur</h6>
                            <Nav.Link as={Link} to="/admin/user/index" onClick={handleClose}>Liste</Nav.Link>
                            <Nav.Link as={Link} to="/admin/user/Add" onClick={handleClose}>Ajouter</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <h6>Boutique</h6>
                            <Nav.Link as={Link} to="/admin/store/index" onClick={handleClose}>Liste</Nav.Link>
                            <Nav.Link as={Link} to="/admin/store/Add" onClick={handleClose}>Ajouter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SideMenu;
