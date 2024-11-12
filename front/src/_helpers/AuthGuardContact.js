import { Navigate } from "react-router-dom";
import { accountService } from "@/_services/account.service";

const AuthGuardContact = ({ children }) => {
    // Vérifie si l'utilisateur est connecté
    if (!accountService.isLogged()) {
        // Redirige vers la page de connexion si non connecté
        return <Navigate to="/connexion" />;
    }

    // Si l'utilisateur est connecté, affiche le contenu enfant (la page Contact)
    return children;
};

export default AuthGuardContact;
