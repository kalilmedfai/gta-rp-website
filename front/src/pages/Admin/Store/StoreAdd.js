import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/_services'; // Assurez-vous que le service produit est bien configuré

const SAdd = () => {
    // State pour synchroniser le produit avec le formulaire
    const [product, setProduct] = useState({});
    let navigate = useNavigate();

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
        console.log(product);
        productService.addProduct(product)
            .then(res => {
                navigate('/admin/store/index'); // Redirige vers la liste des produits après ajout
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='StoreAdd'>
            AJOUTER UN PRODUIT
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='name'>Nom du produit</label>
                    <input type='text' name='name' id='name' value={product.name || ''} onChange={onChange} />
                </div>

                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description' id='description' value={product.description || ''} onChange={onChange}></textarea>
                </div>

                <div className='group'>
                    <label htmlFor='price'>Prix</label>
                    <input type='number' step="0.01" name='price' id='price' value={product.price || ''} onChange={onChange} />
                </div>

                <div className='group'>
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default SAdd;
