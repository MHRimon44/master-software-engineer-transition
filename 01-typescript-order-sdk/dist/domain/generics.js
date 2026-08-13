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
async function request(url) {
    console.log(`Requesting: ${url}`);
    // simulate API response
    return {
        status: true,
        message: "Success",
        data: [],
    };
}
async function main() {
    const response = await request("/products");
    console.log(response.status);
    console.log(response.message);
    console.log(response.data);
}
main();
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "Unknown error";
}
console.log(getErrorMessage(new Error("Network failed")));
console.log(getErrorMessage("Timeout"));
console.log(getErrorMessage({ code: 500 }));
// class ApiClient {
//   async post<TRequest, TResponse>(
//     url: string,
//     body: TRequest,
//   ): Promise<ApiResponse<TResponse>> {
//     console.log(`POST ${url}`);
//     console.log("Body:", body);
//     return {
//       status: true,
//       message: "Created successfully",
//       data: {} as TResponse,
//     };
//   }
// }
// async function testApiClient() {
//   const client = new ApiClient();
//   const productsResponse = await client.get<Product[]>("/products");
//   console.log(productsResponse.data);
// }
// testApiClient();
// async function createProduct() {
//   const client = new ApiClient();
//   const response = await client.post<ProductInput, Product>("/products", {
//     id: 101,
//     name: "Cotton Shirt",
//     price: 1200,
//   });
//   console.log(response.data);
// }
// createProduct();
class ApiClient {
    async get(url) {
        console.log(`GET ${url}`);
        return {
            status: true,
            message: "Success",
            data: [],
        };
    }
    async post(url, body) {
        console.log(`POST ${url}`);
        console.log("Body:", body);
        return {
            status: true,
            message: "Created successfully",
            data: {},
        };
    }
}
async function createProduct() {
    const client = new ApiClient();
    const response = await client.post("/products", {
        id: 101,
        name: "Cotton Shirt",
        price: 1200,
    });
    console.log(response);
    console.log(response.data);
}
createProduct();
//# sourceMappingURL=generics.js.map