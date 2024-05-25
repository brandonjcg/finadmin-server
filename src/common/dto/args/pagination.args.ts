import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  page?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  @ApiPropertyOptional()
  limit?: number = 10;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(-1)
  @Max(1)
  @ApiPropertyOptional()
  order?: 1 | -1 = -1;
}
