// // Renommer "ABoutique" ?
// import React from 'react';

// const Store = () => {
//     return (
//         <div className='Store'>
            
//         </div>
//     );
// };

// export default Store;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; //
import { productService } from '@/_services';

const Store = () => {
    const [products, setProducts] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        console.log('Fetching products...');

        if (flag.current === false) {
            // Récupération des produits
            productService.getAllProducts()
                .then(res => {
                    console.log(res.data);
                    setProducts(res.data.data); // Remplir le state avec les données récupérées
                })
                .catch(err => console.log(err));
        }

        // Nettoyage pour éviter un double appel
        return () => flag.current = true;
    }, []);

    const delProduct = (productId) => {
        console.log(productId);
        productService.deleteProduct(productId)
            .then(res => {
                console.log(res);
                setProducts(current => current.filter(product => product.id !== productId));
            })
            .catch(err => console.log(err));
    };

    // Affichage de la liste des produits
    return (
        <div className='Store'>
            <h2>Liste des produits</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Créé le</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price.toFixed(2)} €</td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/admin/store/edit/${product.id}`}><button className='edit_pbtn'>MODIFIER</button></Link></td>
                                <td><button className='del_pbtn' onClick={() => delProduct(product.id)}>SUPPRIMER</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Store;
