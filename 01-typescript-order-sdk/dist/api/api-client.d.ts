import type { ApiResponse } from "../shared/index.js";
export declare class ApiClient {
    get<T>(url: string): Promise<ApiResponse<T>>;
    post<TRequest, TResponse>(url: string, body: TRequest): Promise<ApiResponse<TResponse>>;
}
//# sourceMappingURL=api-client.d.ts.map