import { QueryArgs } from '../dto';

export interface PaginationResponse<T> {
  rows: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  sort: string;
  order: string;
}

export const buildPaginationResponse = <T>(
  rows: T[],
  total: number,
  args: QueryArgs,
): PaginationResponse<T> => {
  const limit = args.limit;
  const page = Math.floor(args.offset / limit) + 1;

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    sort: args.sort,
    order: args.order === 1 ? 'ASC' : 'DESC',
    rows,
  };
};
