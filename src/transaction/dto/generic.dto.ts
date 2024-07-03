import { ApiProperty } from '@nestjs/swagger';

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
