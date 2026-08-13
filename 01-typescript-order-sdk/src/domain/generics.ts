type PaginatedResult<T> = {
  pageNo: number;
  totalPages: number;
  data: T[];
};
type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

const ProductsResponse: ApiResponse<Product[]> = {
  status: true,
  message: "Products fetched successfully",
  data: [{ id: 1, name: "Keyboard", price: 100 }],
};

const paginatedProducts: PaginatedResult<Product> = {
  pageNo: 1,
  totalPages: 10,
  data: [{ id: 1, name: "Keyboard", price: 100 }],
};

function identity<T>(value: T): T {
  return value;
}

const productId = identity(101);
const productName = identity("Keyboard");
const productPrice = identity(100);
function getById<T extends { id: number }>(
  items: T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id);
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const firstProduct = ProductsResponse.data[0];

if (firstProduct) {
  const productNameFromProperty = getProperty<Product, "name">(
    firstProduct,
    "name",
  );

  const productPriceFromProperty = getProperty<Product, "price">(
    firstProduct,
    "price",
  );
}

class Repository<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const productRepository = new Repository<Product>();

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

type RequireFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type Product = {
  id: number;
  name?: string;
  price?: number;
  stock?: number;
};

type ProductInput = RequireFields<Product, "name" | "price">;

function bubbleSort(nums: number[]): number[] {
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
