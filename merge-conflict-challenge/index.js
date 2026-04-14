const ShoppingCart = require('./ShoppingCart');

const cart = new ShoppingCart();
cart.addItem({ name: "Laptop", price: 1000 });
console.log(cart.generateReceipt());
