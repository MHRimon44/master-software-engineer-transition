import { ApiClient } from "../day-008/api-client.js";
import { Product } from "../day-002/product.js";
import { ApiResponse } from "./api-response.js";

async function main() {
  const client = new ApiClient();

  const response: ApiResponse<Product[]> =
    await client.get<Product[]>("/products");

  console.log(response.status);
  console.log(response.message);
  console.log(response.data);
}

main();
