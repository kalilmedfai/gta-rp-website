import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (uid) => {
    return Axios.get('/users/'+uid)
}

let addUser = (user) => {
    return Axios.put('/users', user)
}

let updateUser = (user) => {   // (user) n'est qu'un nom de variable
    return Axios.patch('/users/'+user.id, user)   // se fier au ficher dans back/routes/users pour le chemin dans patch / et user.id parce que dans ma variable user, il y a id dans mon objet dans le controleur / puis le dernier user et ce que je renvoie
}

let deleteUser = (uid) => {
    return Axios.delete('/users/'+uid)
}

export const userService = {
    getAllUsers, getUser, addUser, updateUser, deleteUser
}