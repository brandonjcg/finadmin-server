import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { parse } from 'csv-parse/sync';

import { CsvData } from '../types';

export const validateAndParseToObjectId = ({ value, key }): Types.ObjectId => {
  if (Types.ObjectId.isValid(value.toString())) {
    return new Types.ObjectId(value);
  }
  throw new BadRequestException(`${key} is not a valid MongoId`);
};

export const buildCsv = (buffer: Buffer): CsvData => {
  const data = buffer.toString();
  const csvParsed = parse(data, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const headers = csvParsed.length > 0 ? Object.keys(csvParsed[0]) : [];

  return {
    headers,
    csvParsed,
  };
};
