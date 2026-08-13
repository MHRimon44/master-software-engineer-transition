"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_client_1 = require("./api/api-client");
async function main() {
    const client = new api_client_1.ApiClient();
    const response = await client.get("/products");
    console.log(response.status);
    console.log(response.message);
    console.log(response.data);
}
main();
//# sourceMappingURL=module-test.js.map