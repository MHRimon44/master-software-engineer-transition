import { ApiClient } from "./api/api-client";

import type { Product } from "./domain/product";

import type { ApiResponse } from "./shared";

async function main() {
  const client = new ApiClient();

  const response: ApiResponse<Product[]> =
    await client.get<Product[]>("/products");

  console.log(response.status);
  console.log(response.message);
  console.log(response.data);
}

main();
