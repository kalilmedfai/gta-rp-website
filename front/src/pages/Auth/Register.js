import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/_services';

import './auth.css';

const Register = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        citizenId: ''
    });

    const [errors, setErrors] = useState({
        passwordMatch: false,
        citizenIdFormat: false,
    });

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Validation de CitizenID
    const validateCitizenId = (id) => {
        const regex = /^[A-Z0-9]{8}$/; // 8 caractères, majuscules et chiffres uniquement
        return regex.test(id);
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();

        // Vérifications
        const passwordsMatch = formData.password === formData.confirmPassword;
        const validCitizenId = validateCitizenId(formData.citizenId);

        setErrors({
            passwordMatch: !passwordsMatch,
            citizenIdFormat: !validCitizenId,
        });

        if (passwordsMatch && validCitizenId) {
            // Envoi des données au backend avec addUser
            userService.addUser({
                email: formData.email,
                password: formData.password,
                username: formData.username,
                citizenId: formData.citizenId
            })
            .then(() => {
                // Rediriger l'utilisateur après une inscription réussie
                navigate('/login', { replace: true });
            })
            .catch(error => {
                console.log(error);
                // Gérer l'erreur d'inscription ici (par exemple, afficher un message d'erreur)
            });
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={5} className="mx-auto shadow p-4 rounded bg-white login-container">
                    <h3 className="text-center mb-4">Inscription</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Adresse Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Entrez votre adresse email"
                                value={formData.email}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Entrez votre pseudo"
                                value={formData.username}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="citizenId">
                            <Form.Label>CitizenID</Form.Label>
                            <Form.Control
                                type="text"
                                name="citizenId"
                                placeholder="8 caractères en majuscules"
                                value={formData.citizenId}
                                onChange={onChange}
                                isInvalid={errors.citizenIdFormat}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Le CitizenID doit être composé de 8 caractères en majuscules, lettres et chiffres uniquement.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Entrez votre mot de passe"
                                value={formData.password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirmez le mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmez votre mot de passe"
                                value={formData.confirmPassword}
                                onChange={onChange}
                                isInvalid={errors.passwordMatch}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Les mots de passe ne correspondent pas.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                S'inscrire
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
