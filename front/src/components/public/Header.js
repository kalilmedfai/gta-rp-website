import React from 'react';
import { Link } from 'react-router-dom';

// Pas @ cette fois ci car par convention je garde le fichier css à côté de son composant
import './header.css'

const Header = () => {
    return (
        <header className='pheader'>
           <nav>
                <ul>
                    <li><Link to="/home">Accueil</Link></li>
                    <li><Link to="/boutique">Boutique</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav> 
        </header>
    );
};

export default Header;