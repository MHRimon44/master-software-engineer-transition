"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderItem = {
    productId: 101,
    productName: "Cotton Shirt",
    unitPrice: 1200,
    quantity: 2,
};
function calculateItemTotal(item) {
    return item.unitPrice * item.quantity;
}
console.log(calculateItemTotal(orderItem));
//# sourceMappingURL=order-item.js.map