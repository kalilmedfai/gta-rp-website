import { Navigate } from "react-router-dom";
import { accountService } from "@/_services/account.service";

const AuthGuard = ({children}) => {

    // demande si il est loggé
    if(!accountService.isLogged()) {
        return <Navigate to="/auth/login"/>
    }

    // const userRole = accountService.getUserRole();
    // if (!allowedRoles.includes(userRole)) {
    //     return <Navigate to="/home" />; // Rediriger vers la page d'accueil si le rôle est incorrect
    // }

    // sinon on retourne l'enfant de AuthGuard dans App.js AdminRouter (donc redirection vers la bonne page)
    return children
};

export default AuthGuard;