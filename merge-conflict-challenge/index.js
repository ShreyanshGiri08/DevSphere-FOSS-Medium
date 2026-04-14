const ShoppingCart = require('./ShoppingCart');

const cart = new ShoppingCart();
cart.applyPromo('SAVE20');
cart.setCurrency('USD');
cart.addItem({ name: "Laptop", price: 1000 });
console.log(cart.generateReceipt());
