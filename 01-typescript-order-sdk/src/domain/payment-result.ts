export type PaymentResult =
  | {
      status: "SUCCESS";
      transactionId: string;
      amount: number;
    }
  | {
      status: "FAILED";
      errorCode: string;
      message: string;
    }
  | {
      status: "CANCELLED";
      reason: string;
    };

const successResult: PaymentResult = {
  status: "SUCCESS",
  transactionId: "TXN-1001",
  amount: 2500,
};

const failedResult: PaymentResult = {
  status: "FAILED",
  errorCode: "PAYMENT_DECLINED",
  message: "Card was declined",
};

const cancelledResult: PaymentResult = {
  status: "CANCELLED",
  reason: "user cancelled payment",
};

// const invalidResult: PaymentResult = {
//   status: "SUCCESS",
//   errorCode: "FAILED",
//   message: "Something went wrong",
// };

function assertNever(value: never): never {
  throw new Error(`Unhandled payment result: ${JSON.stringify(value)}`);
}

export function formatPaymentResult(result: PaymentResult): string {
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
