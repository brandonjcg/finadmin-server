import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly concept: string;

  @IsString()
  @IsNotEmpty()
  readonly bank: string;

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
