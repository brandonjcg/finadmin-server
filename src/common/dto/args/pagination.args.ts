import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TODO } from '@/common';

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
  @ApiPropertyOptional()
  order?: string;

  @IsOptional()
  @ApiPropertyOptional()
  filters?: Record<string, TODO> = {};
}
