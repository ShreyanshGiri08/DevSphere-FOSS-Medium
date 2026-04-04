const ShoppingCart = require('./ShoppingCart');

let passed = 0;
let totalTests = 5;

try {
    const cart = new ShoppingCart();
    cart.addItem({ name: "Apple", price: 10 });
    cart.addItem({ name: "Banana", price: 20 });
    
    try { 
        cart.addItem({ price: 10 }); 
        console.error("❌ Test 1 Failed: Missing name validation"); 
    } catch(e) { passed++; }
    
    try { 
        cart.addItem({ name: "Free", price: -5 }); 
        console.error("❌ Test 2 Failed: Missing negative price validation"); 
    } catch(e) { passed++; }

    cart.applyPromo('SAVE10');
    const total = cart.calculateTotal();
    if (Math.abs(total - 34.16) < 0.01) {
        passed++; 
    } else {
        console.error(`❌ Test 3 Failed: expected total ~34.16, got ${total}`);
    }

    cart.setCurrency('EUR');
    const receipt = cart.generateReceipt();
    const expectedLines = ['Order Receipt (EUR)', '------------------', 'Items: 2', 'Final Total: EUR 34.16'];
    const lines = receipt.split('\n');
    let receiptPass = true;
    for(let i=0; i<expectedLines.length; i++) {
        if(lines[i] !== expectedLines[i]) receiptPass = false;
    }
    if (receiptPass) {
        passed++; 
    } else {
        console.error("❌ Test 4 Failed. Receipt format incorrect.");
        console.error("Expected:");
        console.error(expectedLines.join('\n'));
        console.error("Got:");
        console.error(receipt);
    }
    
    const cart2 = new ShoppingCart();
    cart2.setCurrency('USD');
    cart2.addItem({ name: "Apple", price: 10 });
    const total2 = cart2.calculateTotal();
    if (Math.abs(total2 - 15.8) < 0.01) {
        passed++; 
    } else {
        console.error(`❌ Test 5 Failed: expected total ~15.8 (no promo), got ${total2}`);
    }

} catch (e) {
    if (e.message && e.message.includes('applyPromo is not a function')) {
      console.error("❌ Test script failed because applyPromo is missing. Make sure to merge both methods!");
    } else if (e.message && e.message.includes('setCurrency is not a function')) {
      console.error("❌ Test script failed because setCurrency is missing. Make sure to merge both methods!");
    } else {
      console.error("❌ Test script failed due to Syntax or runtime error:", e);
    }
}

console.log(`\n✅ ${passed}/${totalTests} tests passed.`);
if (passed === totalTests) {
    console.log("🎉 Congratulations! You have successfully resolved the merge conflicts.");
} else {
    console.log("🛠️ Keep trying! Ensure all calculations and validations are merged properly.");
}
