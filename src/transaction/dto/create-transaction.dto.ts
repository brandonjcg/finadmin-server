import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { validateAndParseToObjectId } from '../../common';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly concept: string;

  @IsNotEmpty()
  @Transform(validateAndParseToObjectId)
  @ApiProperty({ type: String, pattern: '^[0-9a-fA-F]{24}$' })
  readonly bank: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly store: string;

  @IsString()
  @ApiProperty()
  readonly date: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly additionalComments?: string;

  @IsBoolean()
  @ApiProperty()
  readonly isReserved: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isPaid: boolean;
}
