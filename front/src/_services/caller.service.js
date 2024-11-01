import axios from "axios";

const Axios = axios.create({
    baseURL: 'localhost://localhost:5000'
})

export default Axios