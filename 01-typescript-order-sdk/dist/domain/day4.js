"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchOrder() {
    return {
        id: 101,
        total: 500,
    };
}
async function getOrderTotal() {
    const order = await fetchOrder();
    return order.total;
}
async function retryAsync(operation, attempts) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
        }
    }
    throw lastError;
}
// Test 1: Async return type
async function testGetOrderTotal() {
    const total = await getOrderTotal();
    console.log("Order total:", total);
}
// Test 2: First attempt fails, second succeeds
async function testRetrySuccess() {
    let callCount = 0;
    const operation = async () => {
        callCount++;
        if (callCount === 1) {
            throw new Error("Temporary failure");
        }
        return "success";
    };
    const result = await retryAsync(operation, 2);
    console.log("Retry result:", result);
    console.log("Call count:", callCount);
}
// Test 3: All attempts fail
async function testRetryFailure() {
    let callCount = 0;
    const operation = async () => {
        callCount++;
        throw new Error("API failed");
    };
    try {
        await retryAsync(operation, 2);
    }
    catch (error) {
        console.log("Error:", error);
        console.log("Call count:", callCount);
    }
}
async function main() {
    await testGetOrderTotal();
    await testRetrySuccess();
    await testRetryFailure();
}
main();
//# sourceMappingURL=day4.js.map