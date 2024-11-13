// import React, { useEffect, useRef, useState } from 'react';
// import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// import { productService } from '@/_services'; // Assurez-vous que le chemin est correct
// import './boutique.css';

// const Boutique = () => {
//     const [products, setProducts] = useState([]);
//     const flag = useRef(false);

//     useEffect(() => {
//         if (flag.current === false) {
//             // Récupérer tous les produits au chargement
//             productService.getAllProducts()
//                 .then(res => {
//                     setProducts(res.data.data); // Remplit le state `products` avec les données de l'API
//                 })
//                 .catch(err => console.log('Erreur lors de la récupération des produits:', err));
//         }

//         // Méthode de nettoyage pour éviter le double appel
//         return () => {
//             flag.current = true;
//         };
//     }, []);

//     return (
//         <Container className="Boutique my-4">
//             <h1 className="text-center mb-4">Boutique</h1>
//             <Row>
//                 {products.map(product => (
//                     <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                         <Card className="product-card h-100">
//                             <Card.Img 
//                                 variant="top" 
//                                 src={`https://via.placeholder.com/150?text=${product.productName}`} // Placeholder pour l'image
//                                 alt={product.name} 
//                                 className="product-image"
//                             />
//                             <Card.Body className="d-flex flex-column">
//                                 <Card.Title>{product.productName}</Card.Title>
//                                 <Card.Text className="product-description">{product.description}</Card.Text>
//                                 <Card.Text className="product-price">
//                                     {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} €
//                                 </Card.Text>
//                                 <Button variant="primary" className="mt-auto">Ajouter au panier</Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default Boutique;

import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import { productService } from '@/_services'; // Assurez-vous que le chemin est correct
import { cartService } from '@/_services/cart.service'; // Import du service de panier
import './boutique.css';

const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false); // État pour gérer l'affichage du Toast de confirmation
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            // Récupérer tous les produits au chargement
            productService.getAllProducts()
                .then(res => {
                    setProducts(res.data.data); // Remplit le state `products` avec les données de l'API
                })
                .catch(err => console.log('Erreur lors de la récupération des produits:', err));
        }

        // Méthode de nettoyage pour éviter le double appel
        return () => {
            flag.current = true;
        };
    }, []);

    const handleAddToCart = (product) => {
        cartService.addToCart(product); // Ajoute le produit au panier via le cartService
        setShowToast(true); // Affiche le Toast de confirmation
    };

    return (
        <Container className="Boutique my-4">
            <h1 className="text-center mb-4">Boutique</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="product-card h-100">
                            <Card.Img 
                                variant="top" 
                                src={`https://via.placeholder.com/150?text=${product.productName}`} // Placeholder pour l'image
                                alt={product.productName} 
                                className="product-image"
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text className="product-description">{product.description}</Card.Text>
                                <Card.Text className="product-price">
                                    {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} €
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    className="mt-auto"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Ajouter au panier
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Toast pour la confirmation d'ajout au panier */}
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                delay={3000} 
                autohide 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1
                }}
            >
                <Toast.Body>Produit ajouté au panier !</Toast.Body>
            </Toast>
        </Container>
    );
};

export default Boutique;
