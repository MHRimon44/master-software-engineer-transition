export interface Product {
  readonly id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
}

const product: Product = {
  id: 101,
  name: "Cotton Shirt",
  price: 1200,
  stock: 10,
};
