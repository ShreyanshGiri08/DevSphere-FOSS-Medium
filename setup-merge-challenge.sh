#!/bin/bash
set -e

DIR="./merge-conflict-challenge"
rm -rf "$DIR"
mkdir -p "$DIR"
cd "$DIR"

# Base
cat << 'EOF' > ShoppingCart.js
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].price;
        }
        return total;
    }

    generateReceipt() {
        return `Total: $${this.calculateTotal()}`;
    }
}

module.exports = ShoppingCart;
EOF

cat << 'EOF' > index.js
const ShoppingCart = require('./ShoppingCart');

const cart = new ShoppingCart();
cart.addItem({ name: "Laptop", price: 1000 });
console.log(cart.generateReceipt());
EOF

git add .
git commit -m "Initial commit: Basic Shopping Cart and Challenge Setup"

# Feature 1
git checkout -b feature/discounts
cat << 'EOF' > ShoppingCart.js
class ShoppingCart {
    constructor() {
        this.items = [];
        this.promoCode = null;
    }

    applyPromo(code) {
        this.promoCode = code;
    }

    addItem(item) {
        if (item.price < 0) {
            throw new Error("Price cannot be negative");
        }
        this.items.push(item);
    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].price;
        }
        if (this.promoCode === 'SAVE10') {
            total *= 0.9;
        } else if (this.promoCode === 'SAVE20') {
            total *= 0.8;
        }
        return total;
    }

    generateReceipt() {
        let receipt = `Items: ${this.items.length}\n`;
        receipt += `Total: $${this.calculateTotal().toFixed(2)}`;
        return receipt;
    }
}

module.exports = ShoppingCart;
EOF

cat << 'EOF' > index.js
const ShoppingCart = require('./ShoppingCart');

const cart = new ShoppingCart();
cart.applyPromo('SAVE20');
cart.addItem({ name: "Laptop", price: 1000 });
console.log(cart.generateReceipt());
EOF

git add .
git commit -m "feat: Add promo code discounts"

# Feature 2
git checkout main
git checkout -b feature/taxes-and-shipping
cat << 'EOF' > ShoppingCart.js
class ShoppingCart {
    constructor() {
        this.items = [];
        this.currency = 'USD';
    }

    addItem(item) {
        if (!item.name) {
            throw new Error("Item must have a name");
        }
        this.items.push(item);
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].price; // Assumes USD
        }
        
        // Apply 8% tax
        total *= 1.08;
        
        // Add $5 flat shipping
        total += 5;
        
        return total;
    }

    generateReceipt() {
        let receipt = `Order Receipt (${this.currency})\n`;
        receipt += "------------------\n";
        receipt += `Final Total: ${this.currency} ${this.calculateTotal().toFixed(2)}`;
        return receipt;
    }
}

module.exports = ShoppingCart;
EOF

cat << 'EOF' > index.js
const ShoppingCart = require('./ShoppingCart');

const cart = new ShoppingCart();
cart.setCurrency('USD');
cart.addItem({ name: "Laptop", price: 1000 });
console.log(cart.generateReceipt());
EOF

git add .
git commit -m "feat: Add regional taxes and shipping"


echo "Setup complete. Merge conflict challenge ready in $DIR"
