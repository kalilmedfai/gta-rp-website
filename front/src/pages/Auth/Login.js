// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';


// import { accountService } from '@/_services';

// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import './auth.css'

// const Login = () => {
//     let navigate = useNavigate()

//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     })

//     // Gestion de la modification des champs du formulaire
//     const onChange = (e) => {
//         setCredentials({
//             ...credentials,
//             [e.target.name]: e.target.value
//         })
//     }

//     // Soumission du formulaire
//     const onSubmit = (e) => {
//         e.preventDefault()
//         accountService.login(credentials)
//             .then(res => {
//                 console.log(res)
//                 // permet s'enregistrer le token dans le local storage (f12 + appli + lien en desous de "stockage local")
//                 accountService.saveToken(res.data.access_token)
//                 // demande de navigation vers /admin
//                 navigate('/admin/dashboard', {replace: true})
//             })
//             .catch(error => console.log(error))
//     }

//     return (
//         <Container className="d-flex align-items-center justify-content-center min-vh-100">
//             <Row className="w-100">
//                 <Col xs={12} sm={8} md={6} lg={5} className="mx-auto shadow p-4 rounded bg-white login-container">
//                     <h3 className="text-center mb-4">Connexion Admin</h3>
//                     <Form onSubmit={onSubmit}>
//                         <Form.Group className="mb-3" controlId="email">
//                             <Form.Label>Identifiant</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 placeholder="Entrez votre email"
//                                 value={credentials.email}
//                                 onChange={onChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="password">
//                             <Form.Label>Mot de passe</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 name="password"
//                                 placeholder="Entrez votre mot de passe"
//                                 value={credentials.password}
//                                 onChange={onChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <div className="d-grid">
//                             <Button variant="primary" type="submit">
//                                 Connexion
//                             </Button>
//                         </div>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        accountService.login(credentials)
            .then(res => {
                // Enregistrer le token
                accountService.saveToken(res.data.access_token);
                
                // Vérification du usersTypeId
                const userTypeId = accountService.getUserTypeId();
                if (userTypeId === 1) {
                    // Redirection vers le dashboard admin si l'utilisateur est administrateur
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    // Sinon redirigez vers une page d'erreur ou un autre endroit approprié
                    console.warn("Accès refusé. Utilisateur non administrateur.");
                    navigate('/accueil', { replace: true });
                }
            })
            .catch(error => console.error("Erreur de connexion:", error));
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={5} className="mx-auto shadow p-4 rounded bg-white login-container">
                    <h3 className="text-center mb-4">Connexion Admin</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Entrez votre email"
                                value={credentials.email}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Entrez votre mot de passe"
                                value={credentials.password}
                                onChange={onChange}
                                required
                                autoComplete="current-password"
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Connexion
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
