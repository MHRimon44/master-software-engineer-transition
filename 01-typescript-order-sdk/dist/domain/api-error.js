"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApiError = isApiError;
function isApiError(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    return ("code" in value &&
        "message" in value &&
        typeof value.code === "string" &&
        typeof value.message === "string");
}
const response1 = {
    code: "PAYMENT_FAILED",
    message: "Payment could not be completed",
};
const response2 = {
    code: 500,
    message: "Server error",
};
if (isApiError(response1)) {
    console.log(response1.code);
    console.log(response1.message);
}
console.log(isApiError(response2));
//# sourceMappingURL=api-error.js.map