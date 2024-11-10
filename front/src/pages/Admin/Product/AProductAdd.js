import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/_services';

const AProductEdit = () => {
    // State pour synchroniser le produit avec le formulaire
    const [product, setProduct] = useState({});
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

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
            productService.addProduct(product)
                .then(res => {
                    navigate('/admin/product/index'); // Redirige vers la liste des produits après ajout
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='AProductAdd'>
            <h2>AJOUTER UN PRODUIT</h2>
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
                    {errors.productName && <p className="error">{errors.productName}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        name='description' 
                        id='description' 
                        value={product.description || ''} 
                        onChange={onChange}
                    ></textarea>
                    {errors.description && <p className="error">{errors.description}</p>}
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
                    {errors.price && <p className="error">{errors.price}</p>}
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
                    {errors.productsTypeId && <p className="error">{errors.productsTypeId}</p>}
                </div>

                <div className='group'>
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AProductEdit;
