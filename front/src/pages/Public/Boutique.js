// import React, { useEffect, useRef, useState } from 'react';
// import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// import { productService } from '@/_services';
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
import { productService } from '@/_services'; // Import du service pour gérer les produits
import { cartService } from '@/_services/cart.service'; // Import du service pour gérer le panier
import './boutique.css'; // Fichier de style pour la boutique

const Boutique = () => {
    // State pour stocker les produits récupérés depuis l'API
    const [products, setProducts] = useState([]);
    // State pour gérer l'affichage du Toast de confirmation
    const [showToast, setShowToast] = useState(false);
    // Ref utilisé pour éviter les appels multiples à l'API
    const flag = useRef(false);

    // Hook useEffect : Appelé au montage du composant
    useEffect(() => {
        // Vérifie que le flag n'est pas encore activé (pour éviter un double appel de l'API)
        if (flag.current === false) {
            productService.getAllProducts() // Appel à l'API pour récupérer les produits
                .then(res => {
                    setProducts(res.data.data); // Stocke les produits dans le state `products`
                })
                .catch(err => console.log('Erreur lors de la récupération des produits:', err));
        }

        // Méthode de nettoyage (cleanup) : Active le flag pour éviter un nouvel appel à l'API
        return () => {
            flag.current = true;
        };
    }, []); // Le tableau de dépendances vide garantit que cet effet est exécuté uniquement au montage

    // Fonction pour ajouter un produit au panier
    const handleAddToCart = (product) => {
        cartService.addToCart(product); // Appelle le service pour ajouter le produit au panier
        setShowToast(true); // Affiche le Toast pour confirmer l'ajout
    };

    return (
        <Container className="Boutique my-4">
            {/* Titre principal */}
            <h1 className="text-center mb-4">Boutique</h1>
            <Row>
                {/* Parcourt les produits et crée une carte pour chaque produit */}
                {products.map(product => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="product-card h-100">
                            {/* Affichage de l'image du produit avec un placeholder */}
                            <Card.Img 
                                variant="top" 
                                src={`https://via.placeholder.com/150?text=${product.productName}`} // Utilise le nom du produit comme texte de l'image
                                alt={product.productName} 
                                className="product-image"
                            />
                            <Card.Body className="d-flex flex-column">
                                {/* Nom du produit */}
                                <Card.Title>{product.productName}</Card.Title>
                                {/* Description du produit */}
                                <Card.Text className="product-description">{product.description}</Card.Text>
                                {/* Prix du produit, formaté avec deux décimales */}
                                <Card.Text className="product-price">
                                    {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} €
                                </Card.Text>
                                {/* Bouton pour ajouter le produit au panier */}
                                <Button 
                                    variant="primary" 
                                    className="mt-auto"
                                    onClick={() => handleAddToCart(product)} // Appelle la fonction handleAddToCart
                                >
                                    Ajouter au panier
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Toast pour confirmer l'ajout au panier */}
            <Toast 
                onClose={() => setShowToast(false)} // Cache le Toast lorsque l'utilisateur le ferme
                show={showToast} // Contrôle l'affichage du Toast
                delay={3000} // Durée avant disparition automatique (3 secondes)
                autohide // Disparaît automatiquement après le délai
                style={{
                    position: 'fixed', // Position fixe dans la fenêtre
                    bottom: '20px', // 20px du bas de la fenêtre
                    right: '20px', // 20px du bord droit
                    zIndex: 1 // Priorité sur les autres éléments
                }}
            >
                <Toast.Body>Produit ajouté au panier !</Toast.Body>
            </Toast>
        </Container>
    );
};

export default Boutique;

