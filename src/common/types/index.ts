export type TODO = any;

export interface PaginationResponse<T> {
  rows: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  sort: string | string[];
  order: number;
}

export interface CsvData {
  headers: string[];
  csvParsed: string[][];
}

export interface IGenericResponse {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  [key: string]: TODO;
}
