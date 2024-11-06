import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


import { accountService } from '@/_services';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import './auth.css'

const Login = () => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        accountService.login(credentials)
            .then(res => {
                console.log(res)
                // permet s'enregistrer le token dans le local storage (f12 + appli + lien en desous de "stockage local")
                accountService.saveToken(res.data.access_token)
                // demande de navigation vers /admin
                navigate('/admin/dashboard', {replace: true})
            })
            .catch(error => console.log(error))
    }

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={5} className="mx-auto shadow p-4 rounded bg-white login-container">
                    <h3 className="text-center mb-4">Connexion Admin</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Identifiant</Form.Label>
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