function fetchProduct(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Product ${id}`);
        }, 1000);
    });
}
async function main() {
    console.time("Sequential");
    const product1 = await fetchProduct(1);
    const product2 = await fetchProduct(2);
    const product3 = await fetchProduct(3);
    console.log(product1);
    console.log(product2);
    console.log(product3);
    console.timeEnd("Sequential");
}
main();
export {};
//# sourceMappingURL=sequential.js.map