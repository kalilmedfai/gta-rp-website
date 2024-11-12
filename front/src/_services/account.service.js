import Axios from "./caller.service";
import { jwtDecode } from "jwt-decode";

// Méthode login reçoit les identifiants
let login = (credentials) => {
    return Axios.post('/auth/login', credentials)
        .then(res => {
            saveToken(res.data.access_token);
            return res;
        });
};

// Méthode de connexion utilisateur
let uLogin = (credentials) => {
    return Axios.post('/connexion', credentials)
        .then(res => {
            saveToken(res.data.access_token);
            return res;  // Renvoie la réponse pour permettre une redirection après la connexion
        });
};

// Enregistrement du token dans le local storage
let saveToken = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    localStorage.setItem('usersTypeId', decodedToken.usersTypeId);  // Enregistre le usersTypeId
};

// Récupération du usersTypeId
let getUserTypeId = () => {
    return parseInt(localStorage.getItem('usersTypeId'), 10);
};

// Déconnexion
let logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usersTypeId');
};

// Vérifie si l'utilisateur est connecté
let isLogged = () => {
    return !!localStorage.getItem('token');
};

// Récupération du token
let getToken = () => {
    return localStorage.getItem('token');
};

// Export des méthodes de accountService
export const accountService = {
    login, uLogin, saveToken, getUserTypeId, logout, isLogged, getToken
};
