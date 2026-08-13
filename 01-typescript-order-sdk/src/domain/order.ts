import type { OrderItem } from "./order-item";
import type { PaymentStatus } from "./payment";
export interface Order {
  readonly id: number;
  readonly customerId: number;
  items: OrderItem[];
  paymentStatus: PaymentStatus;
  note?: string;
}

const order: Order = {
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

export function calculateOrderTotal(order: Order): number {
  return order.items.reduce((total, item) => {
    return total + item.unitPrice * item.quantity;
  }, 0);
}

console.log(calculateOrderTotal(order));
