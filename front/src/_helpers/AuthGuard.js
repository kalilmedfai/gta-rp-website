// import { Navigate } from "react-router-dom";
// import { accountService } from "@/_services/account.service";

// const AuthGuard = ({children}) => {

//     // demande si il est loggé
//     if(!accountService.isLogged()) {
//         return <Navigate to="/auth/login"/>
//     }

//     // const userRole = accountService.getUserRole();
//     // if (!allowedRoles.includes(userRole)) {
//     //     return <Navigate to="/home" />; // Rediriger vers la page d'accueil si le rôle est incorrect
//     // }

//     // sinon on retourne l'enfant de AuthGuard dans App.js AdminRouter (donc redirection vers la bonne page)
//     return children
// };

// export default AuthGuard;

import { Navigate } from "react-router-dom";
import { accountService } from "@/_services/account.service";

const AuthGuard = ({ children, adminOnly = false }) => {
    // Vérifie si l'utilisateur est connecté
    if (!accountService.isLogged()) {
        return <Navigate to="/auth/login" />;
    }

    // Vérifie le usersTypeId pour les pages admin uniquement
    const userTypeId = accountService.getUserTypeId();
    if (adminOnly && userTypeId !== 1) {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export default AuthGuard;


