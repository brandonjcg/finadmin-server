import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { validateAndParseToObjectId } from '@common/util/func';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly concept: string;

  @IsNotEmpty()
  @Transform(validateAndParseToObjectId)
  readonly bank: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly store: string;

  @IsOptional()
  @IsString()
  readonly additionalComments: string;

  @IsBoolean()
  readonly isReserved: boolean;

  @IsBoolean()
  readonly isPaid: boolean;
}
