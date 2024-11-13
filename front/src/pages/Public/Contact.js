// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { sendContactEmail } from '@/_services/contact.service';
// import './contact.css';

// const ContactForm = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         text: ''
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     // Gestion des modifications dans le formulaire
//     const onChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // Soumission du formulaire
//     const onSubmit = (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         sendContactEmail(formData.subject, formData.text)
//             .then((response) => {
//                 setSuccess("Votre message a été envoyé avec succès !");
//                 setFormData({ subject: '', text: '' }); // Réinitialise les champs après l'envoi
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de l'envoi du message:", error);
//                 setError("Une erreur est survenue. Veuillez réessayer.");
//             });
//     };

//     return (
//         <Container className="contact-form-container py-5">
//             <Row className="justify-content-center">
//                 <Col xs={12} md={10} lg={8}>
//                     <h2 className="text-center mb-4">Contactez-nous</h2>
//                     {error && <p className="text-danger">{error}</p>}
//                     {success && <p className="text-success">{success}</p>}
//                     <Form onSubmit={onSubmit} noValidate>
//                         <Form.Group controlId="subject" className="mb-3">
//                             <Form.Label className="contact-label">Sujet</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="subject"
//                                 value={formData.subject}
//                                 onChange={onChange}
//                                 required
//                                 placeholder="Entrez le sujet de votre message"
//                                 className="contact-input"
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="text" className="mb-4">
//                             <Form.Label className="contact-label">Message</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 name="text"
//                                 value={formData.text}
//                                 onChange={onChange}
//                                 required
//                                 rows={6}
//                                 style={{ resize: 'none', overflowY: 'auto' }}
//                                 placeholder="Entrez votre message"
//                                 className="contact-input"
//                             />
//                         </Form.Group>

//                         <div className="d-grid">
//                             <Button variant="primary" type="submit" className="contact-submit-btn">
//                                 Envoyer le message
//                             </Button>
//                         </div>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default ContactForm;


import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { sendContactEmail } from '@/_services/contact.service';
import {jwtDecode} from 'jwt-decode'; // Pour décoder le JWT
import './contact.css';

// Fonction pour récupérer l'email du JWT
const getEmailFromToken = () => {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    if (token) {
        try {
            const decoded = jwtDecode(token); // Décoder le token
            return decoded.email; // Retourne l'email contenu dans le token
        } catch (error) {
            console.error('Erreur lors du décodage du token JWT:', error);
            return null;
        }
    }
    return null;
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        text: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Gestion des modifications dans le formulaire
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Récupérer l'email depuis le JWT
        const email = getEmailFromToken();

        if (!email) {
            setError('L\'email de l\'utilisateur est introuvable.');
            return;
        }

        // Appeler le service pour envoyer l'email
        sendContactEmail(email, formData.subject, formData.text)
            .then((response) => {
                setSuccess("Votre message a été envoyé avec succès !");
                setFormData({ subject: '', text: '' }); // Réinitialise les champs après l'envoi
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi du message:", error);
                setError("Une erreur est survenue. Veuillez réessayer.");
            });
    };

    return (
        <Container className="contact-form-container py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <h2 className="text-center mb-4">Contactez-nous</h2>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                    <Form onSubmit={onSubmit} noValidate>
                        <Form.Group controlId="subject" className="mb-3">
                            <Form.Label className="contact-label">Sujet</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={onChange}
                                required
                                placeholder="Entrez le sujet de votre message"
                                className="contact-input"
                            />
                        </Form.Group>

                        <Form.Group controlId="text" className="mb-4">
                            <Form.Label className="contact-label">Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="text"
                                value={formData.text}
                                onChange={onChange}
                                required
                                rows={6}
                                style={{ resize: 'none', overflowY: 'auto' }}
                                placeholder="Entrez votre message"
                                className="contact-input"
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" className="contact-submit-btn">
                                Envoyer le message
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactForm;
