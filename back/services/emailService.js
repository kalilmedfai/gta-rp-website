const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

module.exports = { sendWelcomeEmail };
