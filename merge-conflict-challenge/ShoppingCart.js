class ShoppingCart {
    constructor() {
        this.items = [];
        this.promoCode = null;
        this.currency = 'USD';
    }

    applyPromo(code) {
        this.promoCode = code;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    addItem(item) {
        if (!item.name) {
            throw new Error("Item must have a name");
        }
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

        // Apply 8% tax
        total *= 1.08;

        // Add $5 flat shipping
        total += 5;

        return total;
    }

    generateReceipt() {
        let receipt = `Order Receipt (${this.currency})\n`;
        receipt += "------------------\n";
        receipt += `Items: ${this.items.length}\n`;
        receipt += `Total: ${this.currency} ${this.calculateTotal().toFixed(2)}`;
        return receipt;
    }
}

module.exports = ShoppingCart;
