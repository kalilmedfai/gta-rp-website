import Axios from "./caller.service";

// Récupérer tous les produits
let getAllProducts = () => {
    return Axios.get('/products'); // Appel GET pour récupérer tous les produits
}

// Récupérer un produit spécifique par ID
let getProduct = (productId) => {
    return Axios.get(`/products/${productId}`);
}

// Ajouter un produit (pour admin ou besoin spécifique)
let addProduct = (product) => {
    return Axios.put('/products', product);
}

// Mettre à jour un produit
let updateProduct = (product) => {
    return Axios.patch(`/products/${product.id}`, product);
}

// Supprimer un produit
let deleteProduct = (productId) => {
    return Axios.delete(`/products/${productId}`);
}

// Exporter les fonctions en tant que service
export const productService = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
};

