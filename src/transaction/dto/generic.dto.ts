import { ApiProperty } from '@nestjs/swagger';

export class SelectStoreDto {
  @ApiProperty()
  message: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
