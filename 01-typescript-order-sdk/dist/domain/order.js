"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderTotal = calculateOrderTotal;
const order = {
    id: 1,
    customerId: 10,
    items: [
        {
            productId: 101,
            productName: "Cotton Shirt",
            unitPrice: 1200,
            quantity: 2,
        },
    ],
    paymentStatus: "PAID",
};
function calculateOrderTotal(order) {
    return order.items.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
    }, 0);
}
console.log(calculateOrderTotal(order));
//# sourceMappingURL=order.js.map