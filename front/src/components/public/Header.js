// import React from 'react';
// import { Link } from 'react-router-dom';

// // Pas @ cette fois ci car par convention je garde le fichier css à côté de son composant
// import './header.css'

// const Header = () => {
//     return (
//         <header className='pheader'>
//            <nav>
//                 <ul>
//                     <li><Link to="/home">Accueil</Link></li>
//                     <li><Link to="/boutique">Boutique</Link></li>
//                     <li><Link to="/contact">Contact</Link></li>
//                 </ul>
//             </nav> 
//         </header>
//     );
// };

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '@/logo.png'; // Chemin correct pour le logo
import './header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" className="px-3">
        {/* Logo et Titre */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="50"
            className="d-inline-block align-top mr-2"
          />
        </Navbar.Brand>

        {/* Bouton pour le menu responsive, avec la classe custom-toggle */}
        <Navbar.Toggle aria-controls="navbarNav" className="ms-auto w-auto custom-toggle" />

        {/* Contenu de la Navbar */}
        <Navbar.Collapse id="navbarNav" className="justify-content-center">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/home">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/boutique">Boutique</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Boutons de connexion/inscription à droite */}
          <div className="d-flex flex-lg-row flex-column align-items-center mt-3 mt-lg-0">
            <Button 
              variant="outline-primary" 
              as={Link} 
              to="/login" 
              className="mb-3 mb-lg-0 me-lg-3"
            >
              Se connecter
            </Button>
            <Button 
              variant="primary" 
              as={Link} 
              to="/register"
            >
              S'inscrire
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
