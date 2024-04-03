import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function validateAndParseToObjectId({ value, key }): Types.ObjectId {
  if (Types.ObjectId.isValid(value.toString())) {
    return new Types.ObjectId(value);
  }
  throw new BadRequestException(`${key} is not a valid MongoId`);
}
