import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class QueryArgs {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  offset?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(-1)
  @Max(1)
  order?: 1 | -1 = -1;
}
