import { Navigate } from "react-router-dom";
import { accountService } from "@/_services/account.service";

const AuthGuard = ({children}) => {

    // demande si il est loggé
    if(!accountService.isLogged()) {
        return <Navigate to="/auth/login"/>
    }

    // sinon on retourne l'enfant de AuthGuard dans App.js AdminRouter (donc redirection vers la bonne page)
    return children
};

export default AuthGuard;