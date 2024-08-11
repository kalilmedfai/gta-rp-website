import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Layout from '@/pages/Public/Layout';
import Home from '@/pages/Public/Home';
import Contact from '@/pages/Public/Contact';
import Boutique from '@/pages/Public/Boutique';
import Error from '@/_utils/Error';

// Routage du site
const PublicRoute = () => {
    return (
        <Routes>

          <Route element={<Layout/>}>

            <Route index element={<Home/>}/>

            <Route path="/home" element={<Home/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/boutique" element={<Boutique/>}/>

            <Route path='*' element={<Error/>}/>

          </Route>

        </Routes>
    );
};

export default PublicRoute;