import React from 'react';
import { Route, Routes } from 'react-router-dom'


import { Layout, Home, Contact, Boutique } from '@/pages/Public'
import Error from '@/_utils/Error';

// Routage du site
const PublicRouter = () => {
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

export default PublicRouter;