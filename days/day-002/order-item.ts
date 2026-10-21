export interface OrderItem {
  readonly productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

const orderItem: OrderItem = {
  productId: 101,
  productName: "Cotton Shirt",
  unitPrice: 1200,
  quantity: 2,
};

function calculateItemTotal(item: OrderItem): number {
  return item.unitPrice * item.quantity;
}

console.log(calculateItemTotal(orderItem));
