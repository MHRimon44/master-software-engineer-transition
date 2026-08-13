"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsResponse = {
    status: true,
    message: "Products fetched successfully",
    data: [{ id: 1, name: "Keyboard", price: 100 }],
};
const paginatedProducts = {
    pageNo: 1,
    totalPages: 10,
    data: [{ id: 1, name: "Keyboard", price: 100 }],
};
function identity(value) {
    return value;
}
const productId = identity(101);
const productName = identity("Keyboard");
const productPrice = identity(100);
function getById(items, id) {
    return items.find((item) => item.id === id);
}
function getProperty(obj, key) {
    return obj[key];
}
const firstProduct = ProductsResponse.data[0];
if (firstProduct) {
    const productNameFromProperty = getProperty(firstProduct, "name");
    const productPriceFromProperty = getProperty(firstProduct, "price");
}
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getById(id) {
        return this.items.find((item) => item.id === id);
    }
    getAll() {
        return [...this.items];
    }
}
const productRepository = new Repository();
productRepository.add({
    id: 1,
    name: "Keyboard",
    price: 100,
});
productRepository.add({
    id: 2,
    name: "Mouse",
    price: 50,
});
console.log(productRepository.getById(1));
console.log(productRepository.getAll());
const products = productRepository.getAll();
products.pop();
function bubbleSort(nums) {
    const result = [...nums];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            const current = result[j];
            const next = result[j + 1];
            if (current !== undefined && next !== undefined && current > next) {
                result[j] = next;
                result[j + 1] = current;
            }
        }
    }
    return result;
}
console.log(bubbleSort([5, 2, 8, 1, 3]));
//# sourceMappingURL=generics.js.map