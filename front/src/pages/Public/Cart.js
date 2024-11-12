// src/pages/Public/Cart.js
import React, { useEffect, useState } from 'react';
import { accountService, cartService } from '@/_services';
// import { cartService } from '@/_services/cart.service';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cartService.getCart()
            .then(items => setCartItems(items))
            .catch(err => console.log('Erreur lors de la récupération du panier:', err));
    }, []);

    const handleCheckout = () => {
        if (accountService.isLogged()) {
            navigate('/checkout');
        } else {
            alert('Veuillez vous connecter pour valider le panier.');
            navigate('/login');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Votre Panier</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price ? `${item.price} €` : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleCheckout}>Valider le panier</Button>
        </Container>
    );
};

export default Cart;
