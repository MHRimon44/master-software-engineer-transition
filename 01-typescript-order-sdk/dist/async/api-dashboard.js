function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Keyboard" },
                { id: 2, name: "Mouse" },
            ]);
        }, 1000);
    });
}
function fetchCustomer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 101, name: "Sara" });
        }, 1000);
    });
}
async function getDashboard() {
    try {
        const [products, customer] = await Promise.all([
            fetchProducts(),
            fetchCustomer(),
        ]);
        return {
            products,
            customer,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Dashboard failed: ${error.message}`);
        }
        throw new Error("Dashboard faild");
    }
}
async function main() {
    try {
        console.time("Dashboard");
        const dashboard = await getDashboard();
        console.log("Dashboard:", dashboard);
        console.timeEnd("Dashboard");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
        }
    }
}
main();
export {};
//# sourceMappingURL=api-dashboard.js.map