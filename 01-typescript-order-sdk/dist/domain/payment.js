export function getPaymentlabel(status) {
    return `Payment status: ${status}`;
}
export var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["PENDING"] = "PENDING";
    PaymentStatusEnum["PAID"] = "PAID";
    PaymentStatusEnum["FAILED"] = "FAILED";
    PaymentStatusEnum["REFUNDED"] = "REFUNDED";
})(PaymentStatusEnum || (PaymentStatusEnum = {}));
const status = PaymentStatusEnum.PAID;
//# sourceMappingURL=payment.js.map