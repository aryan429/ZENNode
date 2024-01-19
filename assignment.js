function calculateDiscount(cart, discounts) {
    let maxDiscount = 0;
    let appliedDiscount = null;

    if (cart.total > 200) {
        const flatDiscount = Math.min(10, cart.total);
        if (flatDiscount > maxDiscount) {
            maxDiscount = flatDiscount;
            appliedDiscount = "flat_10_discount";
        }
    }

    for (const product of cart.products) {
        if (product.quantity > 10) {
            const bulkDiscount = product.price * 0.05;
            if (bulkDiscount > maxDiscount) {
                maxDiscount = bulkDiscount;
                appliedDiscount = "bulk_5_discount";
            }
        }
    }

    if (cart.total_quantity > 20) {
        const totalQuantityDiscount = cart.total * 0.1;
        if (totalQuantityDiscount > maxDiscount) {
            maxDiscount = totalQuantityDiscount;
            appliedDiscount = "bulk_10_discount";
        }
    }

    if (cart.total_quantity > 30 && cart.products.some(product => product.quantity > 15)) {
        const tieredDiscount = cart.products.reduce((acc, product) => {
            if (product.quantity > 15) {
                acc += (product.quantity - 15) * product.price * 0.5;
            }
            return acc;
        }, 0);

        if (tieredDiscount > maxDiscount) {
            maxDiscount = tieredDiscount;
            appliedDiscount = "tiered_50_discount";
        }
    }

    return { appliedDiscount, maxDiscount };
}

function main() {
    const products = {
        'Product A': 20,
        'Product B': 40,
        'Product C': 50
    };

    const cart = {
        products: [],
        total: 0,
        total_quantity: 0
    };

    for (const [productName, price] of Object.entries(products)) {
        const quantity = parseInt(prompt(`Enter quantity of ${productName}:`), 10);
        const giftWrap = prompt(`Is ${productName} wrapped as a gift? (yes/no):`).toLowerCase() === 'yes';

        let productTotal = quantity * price;
        if (giftWrap) {
            productTotal += quantity; // Gift wrap fee is $1 per unit
        }

        cart.products.push({
            name: productName,
            quantity: quantity,
            price: price,
            giftWrap: giftWrap
        });

        cart.total += productTotal;
        cart.total_quantity += quantity;
    }

    const { appliedDiscount, maxDiscount } = calculateDiscount(cart, products);
    const shippingFee = Math.floor(cart.total_quantity / 10) * 5;

    const subtotal = cart.total - maxDiscount;
    const total = subtotal + shippingFee;

    console.log("\nOrder Details:");
    cart.products.forEach(product => {
        console.log(`${product.name} - Quantity: ${product.quantity} - Total: $${product.quantity * product.price}`);
    });

    console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);

    if (appliedDiscount) {
        console.log(`\nDiscount Applied (${appliedDiscount}): $${maxDiscount.toFixed(2)}`);
    }

    console.log(`\nShipping Fee: $${shippingFee.toFixed(2)}`);
    console.log(`\nTotal: $${total.toFixed(2)}`);
}

main();


OUTPUT:

Enter quantity of Product A:1
Is Product A wrapped as a gift? (yes/no):yes
Enter quantity of Product B:1
Is Product B wrapped as a gift? (yes/no):yes
Enter quantity of Product C:1
Is Product C wrapped as a gift? (yes/no):yes
Order Details:
Product A - Quantity: 1 - Total: $20
Product B - Quantity: 1 - Total: $40
Product C - Quantity: 1 - Total: $50

Subtotal: $113.00
Shipping Fee: $0.00

Total: $113.00
