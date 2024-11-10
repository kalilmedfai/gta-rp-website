import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { productService } from '@/_services';
import '@/components/admin/admin.css';

const AProduct = () => {
    const [products, setProducts] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            // Récupération des produits
            productService.getAllProducts()
                .then(res => {
                    setProducts(res.data.data);
                })
                .catch(err => console.log(err));
        }
        // nettoyage pour éviter les doubles appels
        return () => flag.current = true;
    }, []);

    const delProduct = (productId) => {
        productService.deleteProduct(productId)
            .then(() => {
                setProducts(current => current.filter(product => product.id !== productId));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container fluid>
            <h2 className="my-4">Liste des produits</h2>
            {/* Conteneur pour permettre le défilement horizontal */}
            <div className="table-responsive-container">
                <Table striped bordered hover id="admin_body">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix (€)</th>
                            <th>Créé le</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.price.toFixed(2)} €</td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/admin/product/edit/${product.id}`} className="btn btn-primary btn-sm mx-1">Modifier</Link>
                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => delProduct(product.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default AProduct;
