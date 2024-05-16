import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBankDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  readonly _id?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly logo: string;
}
