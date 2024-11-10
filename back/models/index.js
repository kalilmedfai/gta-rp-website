// models/index.js
const db = require('../config/db'); // Import de la connexion
const User = require('./user');
const Article = require('./article');
const Product = require('./product');
const Message = require('./message');
const Cart = require('./cart');
const ContainProduct = require('./containProduct');
const Collection = require('./collection');
const ProductType = require('./productType');
const UserType = require('./userType');
const SendMessage = require('./SendMessage');

// Associations (définition des relations entre modèles)
User.belongsTo(UserType, { foreignKey: 'userTypeId' });
UserType.hasMany(User, { foreignKey: 'userTypeId' });

Product.belongsTo(ProductType, { foreignKey: 'productTypeId' });
ProductType.hasMany(Product, { foreignKey: 'productTypeId' });

Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });

ContainProduct.belongsTo(Product, { foreignKey: 'productId' });
ContainProduct.belongsTo(Cart, { foreignKey: 'cartId' });
Product.hasMany(ContainProduct, { foreignKey: 'productId' });
Cart.hasMany(ContainProduct, { foreignKey: 'cartId' });

Collection.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.hasOne(Collection, { foreignKey: 'cartId' });

SendMessage.belongsTo(User, { foreignKey: 'userId' });
SendMessage.belongsTo(Message, { foreignKey: 'messageId' });
User.hasMany(SendMessage, { foreignKey: 'userId' });
Message.hasMany(SendMessage, { foreignKey: 'messageId' });

// Export des modèles et de la connexion
module.exports = {
    db, // Expose la connexion Sequelize pour la synchronisation
    User,
    Article,
    Product,
    Message,
    Cart,
    ContainProduct,
    Collection,
    ProductType,
    UserType,
    SendMessage
};
