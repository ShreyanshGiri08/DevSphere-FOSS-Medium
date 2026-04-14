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
