export interface Customer {
  readonly id: number;
  name: string;
  email: string;
  phone?: string;
}

const customer: Customer = {
  id: 1,
  name: "Mehedi",
  email: "mehedi@me.com",
};
