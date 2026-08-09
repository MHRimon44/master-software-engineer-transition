import { OrderItem } from "./order-item";
import { PaymentStatus } from "./payment";
export interface Order {
    readonly id: number;
    readonly customerId: number;
    items: OrderItem[];
    paymentStatus: PaymentStatus;
    note?: string;
}
export declare function calculateOrderTotal(order: Order): number;
//# sourceMappingURL=order.d.ts.map