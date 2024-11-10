import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '@/_services';

const AProductEdit = () => {
    // Initialiser `product` avec des valeurs par défaut
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        price: '',
        productsTypeId: ''
    });
    const [errors, setErrors] = useState({});
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

    // Fonction de validation des champs
    const validateForm = () => {
        const newErrors = {};
        if (!product.productName) newErrors.productName = 'Le nom du produit est requis.';
        if (!product.description) newErrors.description = 'La description est requise.';
        if (!product.price) newErrors.price = 'Le prix est requis.';
        if (!product.productsTypeId || product.productsTypeId === '') newErrors.productsTypeId = 'Veuillez sélectionner un type de produit.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retourne true si aucun champ n'a d'erreur
    };

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) { // Valide le formulaire avant la soumission
            productService.updateProduct(product)
                .then(() => {
                    navigate('/admin/product/index'); // Redirige vers la liste des produits après la mise à jour
                })
                .catch(err => console.log("Erreur lors de la mise à jour :", err));
        }
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
                        navigate('/admin/product/index'); // Redirige si le produit n'existe pas
                    }
                })
                .catch(err => console.log("Erreur lors de la récupération des données :", err));
            
            flag.current = true; // Marque le ref pour éviter un nouvel appel
        }
    }, [productId, navigate]);

    return (
        <div className='ProductEdit'>
            <h2>Modifier un produit</h2>
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='productName'>Nom du produit</label>
                    <input 
                        type='text' 
                        name='productName' 
                        id='productName' 
                        value={product.productName || ''} 
                        onChange={onChange} 
                    />
                    {errors.productName && <p style={{ color: 'red' }}>{errors.productName}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        name='description' 
                        id='description' 
                        value={product.description || ''} 
                        onChange={onChange}>
                    </textarea>
                    {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
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
                    {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='productsTypeId'>Type de produit</label>
                    <select 
                        name='productsTypeId' 
                        id='productsTypeId' 
                        value={product.productsTypeId || ''} 
                        onChange={onChange}
                    >
                        <option value=''>Sélectionnez un type</option>
                        <option value='1'>Abonnement</option>
                        <option value='2'>Argent</option>
                        <option value='3'>Voiture</option>
                    </select>
                    {errors.productsTypeId && <p style={{ color: 'red' }}>{errors.productsTypeId}</p>}
                </div>

                <div className='group'>
                    <button type='submit'>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default AProductEdit;
