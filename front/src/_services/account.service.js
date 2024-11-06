import Axios from "./caller.service"

// methode login reçois les identifiants
let login = (credentials) => {
    return Axios.post('auth/login', credentials)
}

// Enregistrement du token dans le local storage
let saveToken = (token) => {
    localStorage.setItem('token', token)

    // Décoder le token pour extraire le rôle de l'utilisateur et l'enregistrer
    // const decodedToken = jwt_decode(token);
    // localStorage.setItem('user_role', decodedToken.role);
}

// Enregistrement du rôle de l'utilisateur
// let saveUserRole = (role) => {
//     localStorage.setItem('user_role', role);
// };

// Récupération du rôle de l'utilisateur
// let getUserRole = () => {
//     return localStorage.getItem('user_role');
// };

// Déconnexion
let logout = () => {
    localStorage.removeItem('token')
}

// Savoir si on est connecté ou non
let isLogged = () => {
    // Dans le token je récupère ce que j'ai dans le local storage
    let token = localStorage.getItem('token')
    // !!token = "not not token" /  Permet de transformer n'importe quelle variable en boolean => si token pas de token, token = null donc !!token sera égale à false, sinon token = true
    return !!token
}

// Récupération token
let getToken = () => {
    return localStorage.getItem('token')
}

// objet qui contient saveToken, logout, isLoged
export const accountService = {
    login, saveToken, logout, isLogged, getToken
}