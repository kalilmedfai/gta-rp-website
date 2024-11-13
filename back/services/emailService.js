const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Fonction pour envoyer un email de bienvenue
const sendWelcomeEmail = (email, pseudo) => {
    const msg = {
        to: email,
        from: 'kalil2a@hotmail.fr',
        subject: 'Bienvenue sur notre plateforme',
        text: `Bonjour ${pseudo},\n\nMerci de vous être inscrit sur notre plateforme !`,
        html: `<strong>Bonjour ${pseudo}</strong>,<br/><br/>Merci de vous être inscrit sur notre plateforme !`
    };
    sgMail.send(msg);
};

// Fonction pour envoyer un email de contact
const sendContactEmail = (email, subject, text) => {
    const msg = {
        to: `kalil2a@hotmail.fr`,  // Email destinataire pour les messages de contact
        from: 'kalil2a@hotmail.fr',
        subject: `${email} : ${subject}`,
        text: text,
        html: `<p>${text}</p>`
    };
    
    return sgMail.send(msg)
        .then(() => {
            console.log('Email envoyé avec succès');
        })
        .catch((error) => {
            console.error('Erreur lors de l\'envoi de l\'email:', error.response ? error.response.body : error);
            throw new Error('Erreur lors de l\'envoi de l\'email');
        });
};


module.exports = { sendWelcomeEmail, sendContactEmail };