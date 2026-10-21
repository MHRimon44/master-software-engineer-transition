export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export function getPaymentlabel(status: PaymentStatus): string {
  return `Payment status: ${status}`;
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

const status: PaymentStatusEnum = PaymentStatusEnum.PAID;
