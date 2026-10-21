export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type PaginatedResult<T> = {
  pageNo: number;
  totalPages: number;
  data: T[];
};
