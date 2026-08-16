const successResult = {
    status: "SUCCESS",
    transactionId: "TXN-1001",
    amount: 2500,
};
const failedResult = {
    status: "FAILED",
    errorCode: "PAYMENT_DECLINED",
    message: "Card was declined",
};
const cancelledResult = {
    status: "CANCELLED",
    reason: "user cancelled payment",
};
// const invalidResult: PaymentResult = {
//   status: "SUCCESS",
//   errorCode: "FAILED",
//   message: "Something went wrong",
// };
function assertNever(value) {
    throw new Error(`Unhandled payment result: ${JSON.stringify(value)}`);
}
export function formatPaymentResult(result) {
    switch (result.status) {
        case "SUCCESS":
            return `Payment successful. Transaction: ${result.transactionId}, Amount: ${result.amount}`;
        case "FAILED":
            return `Payment failed. Error: ${result.errorCode}, Message: ${result.message}`;
        case "CANCELLED":
            return `Payment cancelled. Reason: ${result.reason}`;
        default:
            return assertNever(result);
    }
}
console.log(formatPaymentResult(successResult));
console.log(formatPaymentResult(failedResult));
console.log(formatPaymentResult(cancelledResult));
//# sourceMappingURL=payment-result.js.map