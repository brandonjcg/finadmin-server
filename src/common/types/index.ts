export interface PaginationResponse<T> {
  rows: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  sort: string;
  order: string;
}
