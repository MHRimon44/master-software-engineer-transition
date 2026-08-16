export function formatValue(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}
console.log(formatValue("hello"));
console.log(formatValue(125.456));
function handleResponse(response) {
    if ("data" in response) {
        return `Success: ${response.data}`;
    }
    return `Error: ${response.error}`;
}
console.log(handleResponse({ data: "Order created successfully" }));
console.log(handleResponse({ error: "Failed to create order" }));
function getErrorMessage(error) {
    if (error instanceof Error) {
        return `Error object: ${error.message}`;
    }
    return `Error string: ${error}`;
}
console.log(getErrorMessage(new Error("Payment gateway unavailable")));
console.log(getErrorMessage("Invalid payment status"));
function formatPhone(phone) {
    if (phone) {
        return `Phone: ${phone}`;
    }
    return "Phone not available";
}
console.log(formatPhone("01700000000"));
console.log(formatPhone());
//# sourceMappingURL=narrowing.js.map