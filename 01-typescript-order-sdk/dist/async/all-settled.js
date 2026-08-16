function request(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 2) {
                reject(new Error(`Product ${id} failed`));
                return;
            }
            resolve(`Product ${id} success`);
        }, 500);
    });
}
async function main() {
    const results = await Promise.allSettled([
        request(1),
        request(2),
        request(3),
    ]);
    console.log(results);
}
main();
export {};
//# sourceMappingURL=all-settled.js.map