import callerService from './caller.service';
import { accountService } from './account.service';

export const cartService = {
    addToCart,
    getCart,
    syncLocalCartWithServer,
};

function addToCart(productId, quantity) {
    // Vérifie si l'utilisateur est connecté
    if (accountService.isLogged()) {
        return callerService.post('/carts/add', { productId, quantity });
    } else {
        // Stocke le panier localement dans le localStorage pour les utilisateurs non connectés
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        return Promise.resolve(cart);
    }
}

function getCart() {
    if (accountService.isLogged()) {
        return callerService.get('/carts');
    } else {
        return Promise.resolve(JSON.parse(localStorage.getItem('cart')) || []);
    }
}

// Fonction pour synchroniser le panier local avec le serveur après connexion
function syncLocalCartWithServer() {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localCart.length > 0) {
        localCart.forEach(item => {
            callerService.post('/carts/add', item);
        });
        localStorage.removeItem('cart');
    }
}
