import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; // Import de l'icône de panier
import logo from '@/logo.png';
import { accountService } from '@/_services/account.service';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLogged = accountService.isLogged();

  const handleLogout = () => {
    accountService.logout();
    navigate('/'); // Redirection vers l'accueil après déconnexion
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="50"
            className="d-inline-block align-top mr-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" className="ms-auto w-auto custom-toggle" />

        <Navbar.Collapse id="navbarNav" className="justify-content-center">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/accueil">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/boutique">Boutique</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <div className="d-flex flex-lg-row flex-column align-items-center mt-3 mt-lg-0">
            {isLogged ? (
              <>
                <Button variant="outline-primary" as={Link} to="/profile" className="mb-3 mb-lg-0 me-lg-3">
                  Mon Profil
                </Button>
                <Button variant="danger" onClick={handleLogout} className="me-lg-3">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary" as={Link} to="/connexion" className="mb-3 mb-lg-0 me-lg-3">
                  Se connecter
                </Button>
                <Button variant="primary" as={Link} to="/inscription" className="mb-3 mb-lg-0 me-lg-3">
                  S'inscrire
                </Button>
              </>
            )}

            {/* Bouton Panier */}
            <Link to="/cart" className="text-decoration-none">
              <Button variant="outline-secondary" className="d-flex align-items-center">
                <FaShoppingCart className="me-2" />
                Panier
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
