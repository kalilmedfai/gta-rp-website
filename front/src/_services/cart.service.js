import Axios from './caller.service';

class CartService {
    getCart() {
        // Récupère le panier depuis le localStorage pour les visiteurs non connectés
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    }

    addToCart(product) {
        let cart = this.getCart();
        // Vérifie si le produit existe déjà dans le panier
        if (!cart.find(item => item.id === product.id)) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        return cart;
    }

    removeFromCart(productId) {
        let cart = this.getCart().filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    }

    clearCart() {
        localStorage.removeItem('cart');
    }

    getTotal() {
        return this.getCart().reduce((total, item) => total + item.price * item.quantity, 0);
    }

    syncCartWithServer() {
        // Appel API pour sauvegarder le panier sur le serveur si l'utilisateur est connecté
        return Axios.post('/carts/sync', { items: this.getCart() });
    }
}

export const cartService = new CartService();
