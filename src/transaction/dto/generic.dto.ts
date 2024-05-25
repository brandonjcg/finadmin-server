import { ApiProperty } from '@nestjs/swagger';

export class SelectStoreDto {
  @ApiProperty()
  message: string;
}
