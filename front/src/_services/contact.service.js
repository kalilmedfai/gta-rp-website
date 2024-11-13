import Axios from './caller.service';

export const sendContactEmail = ( email, subject, text) => {
    return Axios.post('/contact', { email, subject, text });
};

