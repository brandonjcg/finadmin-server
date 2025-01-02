import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateBankDto {
  @IsString()
  @ApiProperty({ type: String, pattern: '^[0-9a-fA-F]{24}$' })
  @IsOptional()
  readonly _id?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly logo: string;
}

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

export class SelectBankDto {
  @ApiProperty({ pattern: '^[0-9a-fA-F]{24}$' })
  _id: string;

  @ApiProperty({ example: 'Name bank' })
  text: string;

  @ApiProperty({ example: 'https://banco.com/logo.png' })
  logo: string;
}
