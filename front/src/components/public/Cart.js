// // src/components/public/Cart.js

// import React, { useEffect, useState } from 'react';
// import { cartService } from '@/_services/cartService';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container } from 'react-bootstrap';

// const Cart = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         cartService.getCartItems()
//             .then(response => setCartItems(response.data))
//             .catch(error => console.error('Erreur lors de la récupération du panier:', error));
//     }, []);

//     const handleRemove = (productId) => {
//         cartService.removeFromCart(productId)
//             .then(() => {
//                 setCartItems(cartItems.filter(item => item.productId !== productId));
//             })
//             .catch(error => console.error('Erreur lors de la suppression du produit:', error));
//     };

//     const handleCheckout = () => {
//         const isAuthenticated = !!localStorage.getItem('token');
//         if (!isAuthenticated) {
//             navigate('/ulogin', { state: { from: '/cart' } });
//         } else {
//             navigate('/checkout');
//         }
//     };

//     return (
//         <Container>
//             <h2>Mon Panier</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Nom du produit</th>
//                         <th>Quantité</th>
//                         <th>Prix</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cartItems.map(item => (
//                         <tr key={item.productId}>
//                             <td>{item.productName}</td>
//                             <td>{item.quantity}</td>
//                             <td>{item.price} €</td>
//                             <td>
//                                 <Button variant="danger" onClick={() => handleRemove(item.productId)}>
//                                     Supprimer
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Button onClick={handleCheckout} variant="success">
//                 Valider le panier
//             </Button>
//         </Container>
//     );
// };

// export default Cart;
