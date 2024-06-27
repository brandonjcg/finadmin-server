import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsMongoId, IsOptional } from 'class-validator';

export class BanksIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Transform(({ value }) => value.split(','))
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isPaid: boolean;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isReserved: boolean;
}
