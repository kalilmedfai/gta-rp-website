import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className="SideMenu">
            <ul>
                <li><Link to="/">Acceuil</Link></li>
                <li>&nbsp;</li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li>
                    Utilisateur
                    <ul>
                        <li><Link to="/admin/user/index">Liste</Link></li>
                        <li><Link to="/admin/user/Add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Boutique
                    <ul>
                        <li><Link to="/admin/store/index">Liste</Link></li>
                        <li><Link to="/admin/store/Add">Ajouter</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;