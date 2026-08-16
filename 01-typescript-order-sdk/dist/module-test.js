import { ApiClient } from "@api/api-client.js";
async function main() {
    const client = new ApiClient();
    const response = await client.get("/products");
    console.log(response.status);
    console.log(response.message);
    console.log(response.data);
}
main();
//# sourceMappingURL=module-test.js.map