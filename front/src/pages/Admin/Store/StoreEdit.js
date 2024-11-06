// // Renommer ABoutiqueEdit ?
// import React from 'react';

// const SEdit = () => {
//     return (
//         <div className='SEdit'>
//             StoreEDIT
//         </div>
//     );
// };

// export default SEdit;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '@/_services';

const SEdit = () => {
    // Initialiser `product` avec des valeurs par défaut
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: ''
    });
    const flag = useRef(false); // Utilisé pour éviter un double appel
    const navigate = useNavigate();
    const { productId } = useParams(); // Récupération de l'ID du produit depuis les paramètres d'URL

    // Gestion des modifications dans le formulaire
    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        productService.updateProduct(product)
            .then(() => {
                navigate('/admin/store/index'); // Redirige vers la liste des produits après la mise à jour
            })
            .catch(err => console.log("Erreur lors de la mise à jour :", err));
    };

    // Récupération des données du produit lors du chargement du composant
    useEffect(() => {
        if (flag.current === false) {
            productService.getProduct(productId)
                .then(res => {
                    if (res.data && res.data.data) {
                        setProduct({
                            ...res.data.data,
                            price: parseFloat(res.data.data.price) || '' // Convertit le prix en nombre pour assurer un bon format
                        });
                    } else {
                        navigate('/admin/store/index'); // Redirige si le produit n'existe pas
                    }
                })
                .catch(err => console.log("Erreur lors de la récupération des données :", err));
            
            flag.current = true; // Marque le ref pour éviter un nouvel appel
        }
    }, [productId, navigate]);

    return (
        <div className='StoreEdit'>
            <h2>Modifier un produit</h2>
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='name'>Nom du produit</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        value={product.name || ''} 
                        onChange={onChange} 
                    />
                </div>

                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        name='description' 
                        id='description' 
                        value={product.description || ''} 
                        onChange={onChange}>
                    </textarea>
                </div>

                <div className='group'>
                    <label htmlFor='price'>Prix</label>
                    <input 
                        type='number' 
                        step="0.01" 
                        name='price' 
                        id='price' 
                        value={product.price || ''} 
                        onChange={onChange} 
                    />
                </div>

                <div className='group'>
                    <button type='submit'>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default SEdit;
