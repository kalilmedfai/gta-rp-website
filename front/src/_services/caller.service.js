import axios from "axios";
import { accountService } from "./account.service";

const Axios = axios.create({
    baseURL: 'http://localhost:5000'
})

// Intercepteur pour le token
// On reçoit dans la variable request la valeur originelle (on l'attrape au moment où elle sort du front)
Axios.interceptors.request.use(request => {

    // Si je suis loggé j'injecte mon token
    if(accountService.isLogged()) {
        // je dois mettre dans ma requete l'intercepteur (dans la clef Authorization)
        request.headers.Authorization = 'Bearer '+accountService.getToken()
    }
    // puis on retourne la requête pour la ramener vers le back
    return request
})


// Axios.interceptors.response.use(response => {
//     // quand tout se passe bien
//     return response
//     // quand il y a une erreur
// }), error => {

// }

export default Axios