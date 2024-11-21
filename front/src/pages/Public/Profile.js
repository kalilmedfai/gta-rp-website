// src/pages/Public/Profile.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service'; // Service pour récupérer et mettre à jour les données de l'utilisateur
import { userService } from '@/_services/user.service'; // Service pour mettre à jour l'email et mot de passe

const Profile = () => {
    const [user, setUser] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const navigate = useNavigate();

    // Récupérer les informations de l'utilisateur au chargement de la page
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await accountService.getUserInfo(); // Appel API pour récupérer les infos de l'utilisateur
                setUser(data); // Mise à jour de l'état avec les informations de l'utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
                alert('Erreur lors de la récupération des informations de l\'utilisateur');
            }
        };
        fetchUserInfo();
    }, []);

    // Gestion de la soumission du formulaire de changement de mot de passe
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            await userService.updatePassword(currentPassword, newPassword); // Appel au backend pour changer le mot de passe
            alert('Mot de passe modifié avec succès');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la modification du mot de passe');
        }
    };

    // Gestion de la soumission du formulaire de modification de l'email
    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            await userService.updateEmail(newEmail); // Appel au backend pour changer l'email
            alert('Email modifié avec succès');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la modification de l\'email');
        }
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h3>Mon Profil</h3>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Pseudo</Form.Label>
                                    <Form.Control type="text" value={user.username || ''} readOnly />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={newEmail || user.email}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" className="mt-3" onClick={handleEmailChange}>Mettre à jour l'email</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Changer de Mot de Passe</h4>
                            <Button variant="link" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                                {showPasswordForm ? "Annuler" : "Changer le mot de passe"}
                            </Button>

                            {showPasswordForm && (
                                <Form onSubmit={handlePasswordChange} className="mt-3">
                                    <Form.Group controlId="formCurrentPassword">
                                        <Form.Label>Mot de passe actuel</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNewPassword" className="mt-3">
                                        <Form.Label>Nouveau mot de passe</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formConfirmPassword" className="mt-3">
                                        <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" className="mt-3" type="submit">Changer le mot de passe</Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
