import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SelectStoreDto {
  @ApiProperty()
  name: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

export class GroupByBanksDto {
  @ApiProperty({ example: null })
  _id: string;

  @ApiProperty({ example: 320 })
  total: number;
}

export class UpdateMultipleRowsDto {
  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  idProcess: number;

  @ApiProperty({
    example: ['1f7b3b3b1f4b4b001f4b4b4b', '5f7b3b3b1f4b4b001f4b4b4c'],
  })
  @IsArray()
  @ArrayNotEmpty()
  rowsToUpdate: string[];
}
