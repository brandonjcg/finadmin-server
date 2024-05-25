import { PaginationResponse } from '@common/types/index';
import { QueryArgs } from '../dto';

interface QueryArgsComplete extends QueryArgs {
  offset: number;
}

export const buildPaginationResponse = <T>(
  rows: T[],
  total?: number,
  args?: QueryArgs,
): PaginationResponse<T> => {
  const limit = args?.limit ?? 10;

  return {
    page: args?.page || 0,
    limit,
    total: total || 1,
    totalPages: Math.ceil(total / limit) || 1,
    sort: args?.sort || 'createdAt',
    order: args?.order === 1 ? 'ASC' : 'DESC',
    rows,
  };
};

export const getOffsetAndLimit = (queryArgs: QueryArgs): QueryArgsComplete => {
  const { page, limit } = queryArgs;

  const offset = (page - 1) * limit;

  return {
    offset: offset < 0 ? 0 : offset,
    limit,
    ...queryArgs,
  };
};
