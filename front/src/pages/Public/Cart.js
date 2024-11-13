// // src/pages/Public/Cart.js
// import React, { useState, useEffect } from 'react';
// import { cartService } from '@/_services/cart.service';
// import { Button, Container, ListGroup } from 'react-bootstrap';

// const Cart = () => {
//     const [cart, setCart] = useState([]);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         setCart(cartService.getCart());
//         setTotal(cartService.getTotal());
//     }, []);

//     const handleRemove = (productId) => {
//         setCart(cartService.removeFromCart(productId));
//         setTotal(cartService.getTotal());
//     };

//     return (
//         <Container>
//             <h2>Votre Panier</h2>
//             <ListGroup>
//                 {cart.map(item => (
//                     <ListGroup.Item key={item.id} className="d-flex justify-content-between">
//                         <span>{item.productName} - {item.price} € x {item.quantity}</span>
//                         <Button variant="danger" onClick={() => handleRemove(item.id)}>Retirer</Button>
//                     </ListGroup.Item>
//                 ))}
//             </ListGroup>
//             <h3>Total: {total} €</h3>
//         </Container>
//     );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { cartService } from '@/_services/cart.service';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';
import './cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les items du panier depuis le service
        const items = cartService.getCart();
        setCartItems(items);
        calculateTotal(items);
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total.toFixed(2)); // Arrondi à deux décimales
    };

    const handleRemoveItem = (productId) => {
        cartService.removeFromCart(productId);
        const updatedCart = cartService.getCart();
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    const handleCheckout = () => {
        // Vérifier si l'utilisateur est connecté
        if (!accountService.isLogged()) {
            navigate('/connexion'); // Redirige vers la page de connexion si non connecté
        } else {
            // Rediriger vers la page de paiement (ou commencer le processus de paiement)
            navigate('/checkout');
        }
    };

    return (
        <Container className="my-4 cart-container">
            <h2>Votre Panier</h2>
            <ListGroup variant="flush">
                {cartItems.map((item) => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{item.productName}</h5>
                            <p>{item.price.toFixed(2)} €</p>
                        </div>
                        <Button 
                            variant="danger" 
                            onClick={() => handleRemoveItem(item.id)}
                        >
                            Retirer
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Row className="mt-4">
                <Col>
                    <h4>Total: {totalPrice} €</h4>
                </Col>
                <Col className="text-end">
                    <Button 
                        variant="success" 
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Valider le panier
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
