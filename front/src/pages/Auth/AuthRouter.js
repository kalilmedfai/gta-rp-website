import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '@/pages/Auth/Login'
import Error from '@/_utils/Error'




const AuthRouter = () => {
    return (
        <Routes>
            {/* Permet de faire en sorte de tomber sur le formulaire en allant dans /auth au lieu de /auth/login  */}
            <Route index element={<Login/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
    );
};

export default AuthRouter;