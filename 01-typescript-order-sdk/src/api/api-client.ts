import type { ApiResponse } from "../shared";

export class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    console.log(`GET ${url}`);

    return {
      status: true,
      message: "Success",
      data: [] as T,
    };
  }

  async post<TRequest, TResponse>(
    url: string,
    body: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    console.log(`POST ${url}`);
    console.log("Body:", body);

    return {
      status: true,
      message: "Created successfully",
      data: {} as TResponse,
    };
  }
}
