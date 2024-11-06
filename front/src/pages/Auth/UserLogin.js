// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { accountService } from '@/_services/account.service';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const UserLogin = () => {
//     let navigate = useNavigate();

//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     });

//     const onChange = (e) => {
//         setCredentials({
//             ...credentials,
//             [e.target.name]: e.target.value
//         });
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();
//         accountService.login(credentials)
//             .then(res => {
//                 const { access_token } = res.data;
//                 accountService.saveToken(access_token);
                
//                 // Redirection vers la page d'accueil si le rôle est "user"
//                 const role = accountService.getUserRole();
//                 if (role === 'user') {
//                     navigate('/home', { replace: true });
//                 } else {
//                     navigate('/admin/dashboard', { replace: true });
//                 }
//             })
//             .catch(error => console.log(error));
//     };

//     return (
//         <Container className="d-flex align-items-center justify-content-center min-vh-100">
//             <Row className="w-100">
//                 <Col xs={12} sm={8} md={6} lg={5} className="mx-auto shadow p-4 rounded bg-white login-container">
//                     <h3 className="text-center mb-4">Connexion Utilisateur</h3>
//                     <Form onSubmit={onSubmit}>
//                         <Form.Group className="mb-3" controlId="email">
//                             <Form.Label>Adresse Email</Form.Label>
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
//                                 Se connecter
//                             </Button>
//                         </div>
//                     </Form>
//                     <div className="text-center mt-3">
//                         <p>Pas de compte? <Link to="/register">Cliquez ici pour vous inscrire</Link></p>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default UserLogin;
