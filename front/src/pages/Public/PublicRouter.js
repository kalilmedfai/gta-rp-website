import React from 'react';
import { Route, Routes } from 'react-router-dom'

import { Layout, Home, Contact, Boutique, Cart } from '@/pages/Public'
import Register from '@/pages/Auth/Register';
import ULogin from '@/pages/Auth/ULogin';
import AuthGuardContact from '@/_helpers/AuthGuardContact';
import Error from '@/_utils/Error';

// Routage du site
const PublicRouter = () => {
    return (
        <Routes>

          <Route element={<Layout/>}>

            <Route index element={<Home/>}/>

            <Route path="/accueil" element={<Home/>}/>
            {/* Protège la page Contact avec AuthGuardContact */}
            <Route path="/contact" element={
              <AuthGuardContact>
                <Contact/>
              </AuthGuardContact>
            }/>
            <Route path="/boutique" element={<Boutique/>}/>
            <Route path="/connexion" element={<ULogin/>} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/panier" element={<Cart />} />


            <Route path='*' element={<Error/>}/>

          </Route>

        </Routes>
    );
};

export default PublicRouter;