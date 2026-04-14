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
