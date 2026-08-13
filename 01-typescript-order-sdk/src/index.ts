export type { Product } from "./domain/product";
export type { Customer } from "./domain/customer";
export type { Order } from "./domain/order";
export type { OrderItem } from "./domain/order-item";
export type { PaymentStatus } from "./domain/payment";

export type { ApiResponse, PaginatedResult } from "./shared";

export type { ApiError } from "./errors/api-error";
export { isApiError } from "./errors/api-error";

export { ApiClient } from "./api/api-client";
