import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/public/Header';

// Permet d'afficher le header + le Outlet qui sont les route enfants se trouvant dans App.js
const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Layout;