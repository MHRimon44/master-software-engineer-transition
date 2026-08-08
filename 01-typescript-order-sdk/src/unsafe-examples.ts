// 1. Implicit any
function calculateDiscount(price: number): number {
  return price * 0.1;
}

// 2. Optional property
interface Customer {
  id: number;
  name: string;
  phone?: string;
}

const customer: Customer = {
  id: 1,
  name: "Mehedi",
};

console.log(customer.phone?.toUpperCase() ?? "N/A");

// 3. Unsafe array access
const products: string[] = [];
const firstProduct = products[0];
console.log(firstProduct?.toUpperCase() ?? "N/A");

// 4. Possibly undefined function result
function findProduct(id: number) {
  if (id === 1) {
    return {
      id: 1,
      name: "Shirt",
    };
  }

  return undefined;
}
const product = findProduct(99);
if (product) {
  console.log(product.name);
}
// 5. Optional property exactness
interface UpdateCustomer {
  phone?: string;
}

const update: UpdateCustomer = {};

// 6. Unsafe Record lookup
const prices: Record<string, number> = {
  shirt: 500,
};
const shoePrice = prices["shoe"];
if (shoePrice !== undefined) {
  console.log(shoePrice * 2);
}

// 7. Unknown error
try {
  throw new Error("Payment failed");
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

// 8. Unsafe JSON assumption
const json = `{"price":"wrong"}`;

const parsed = JSON.parse(json);

console.log(parsed.price * 2);
