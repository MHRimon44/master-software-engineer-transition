import { ApiClient } from "@api/api-client.js";
import { Product } from "@domain/product.js";
import { ApiResponse } from "@shared/api-response.js";

async function main() {
  const client = new ApiClient();

  const response: ApiResponse<Product[]> =
    await client.get<Product[]>("/products");

  console.log(response.status);
  console.log(response.message);
  console.log(response.data);
}

main();
