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
