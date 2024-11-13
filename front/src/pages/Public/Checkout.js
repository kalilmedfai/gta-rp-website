// src/pages/Public/Checkout.js
import React from 'react';
import { cartService } from '@/_services/cartService';
import PayPalButton from './PayPalButton'; // Composant fictif pour PayPal

const Checkout = () => {
    const handlePaymentSuccess = (details) => {
        // Envoie les informations de paiement au backend pour enregistrement
        cartService.clearCart();
        alert('Paiement réussi !');
    };

    return (
        <div>
            <h2>Paiement</h2>
            <p>Total: {cartService.getTotal()} €</p>
            <PayPalButton onSuccess={handlePaymentSuccess} />
        </div>
    );
};

export default Checkout;
