function fetchProduct() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Keyboard");
        }, 1000);
    });
}
async function main() {
    console.log("Start");
    const product = await fetchProduct();
    console.log("Product:", product);
    console.log("End");
}
main();
export {};
//# sourceMappingURL=async-await.js.map