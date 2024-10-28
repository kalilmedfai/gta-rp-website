// import React from 'react';

import { Navigate } from "react-router-dom";

const AuthGuard = ({children}) => {
    // Simulation système de log
    let logged = false

    // si pas logged redirection vers login
    if(!logged) {
        return <Navigate to="/auth/login"/>
    }

    // sinon on retourne l'enfant de AuthGuard dans App.js AdminRouter (donc redirection vers la bonne page)
    return children
};

export default AuthGuard;