"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusEnum = void 0;
exports.getPaymentlabel = getPaymentlabel;
function getPaymentlabel(status) {
    return `Payment status: ${status}`;
}
var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["PENDING"] = "PENDING";
    PaymentStatusEnum["PAID"] = "PAID";
    PaymentStatusEnum["FAILED"] = "FAILED";
    PaymentStatusEnum["REFUNDED"] = "REFUNDED";
})(PaymentStatusEnum || (exports.PaymentStatusEnum = PaymentStatusEnum = {}));
const status = PaymentStatusEnum.PAID;
//# sourceMappingURL=payment.js.map