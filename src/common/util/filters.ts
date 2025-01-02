import { Types, isValidObjectId } from 'mongoose';
import { TODO } from '../types';

export const createFilter = <T>(
  query: Partial<T>,
): Partial<Record<string, TODO>> => {
  if (!Object.keys(query).length) return {};

  const filters: Partial<Record<string, TODO>> = {};

  for (const key in query) {
    const value = query[key as keyof T];
    if (!value) continue;

    const isDate = new Date(value as string).toString() !== 'Invalid Date';
    if (isDate) {
      filters[key] = new Date(value as string);
      continue;
    }

    const isBoolean = ['true', 'false'].includes(String(value));
    if (isBoolean) {
      filters[key] = JSON.parse(String(value));
      continue;
    }

    if (isValidObjectId(value)) {
      filters[key] = new Types.ObjectId(String(value));

      continue;
    }

    const hasComma = String(value).includes(',');
    if (hasComma) {
      filters[key] = {
        $in: String(value)
          .split(',')
          .map((item) => new Types.ObjectId(item)),
      };

      continue;
    }

    filters[key] = {
      $regex: new RegExp(String(value), 'i'),
    };
  }

  return filters;
};
