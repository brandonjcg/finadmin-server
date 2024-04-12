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
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ type: String })
  readonly bank: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly store: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly additionalComments: string;

  @IsBoolean()
  @ApiProperty()
  readonly isReserved: boolean;

  @IsBoolean()
  @ApiProperty()
  readonly isPaid: boolean;
}
