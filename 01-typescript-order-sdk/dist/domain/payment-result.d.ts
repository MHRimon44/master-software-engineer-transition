export type PaymentResult = {
    status: "SUCCESS";
    transactionId: string;
    amount: number;
} | {
    status: "FAILED";
    errorCode: string;
    message: string;
} | {
    status: "CANCELLED";
    reason: string;
};
export declare function formatPaymentResult(result: PaymentResult): string;
//# sourceMappingURL=payment-result.d.ts.map