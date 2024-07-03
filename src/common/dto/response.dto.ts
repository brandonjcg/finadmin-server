import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

type Constructor<T = object> = new (...args) => T;

export const GenericResponse = <TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions & {
    error?: boolean;
    description?: string;
    url?: string;
    statusCode?: number;
  },
) => {
  const {
    isArray = false,
    error = false,
    description = '',
    url = 'row',
    statusCode = 200,
  } = options;
  class ResponseDTO {
    @ApiProperty({
      example: error,
    })
    @IsNumber()
    error: number;

    @ApiProperty({
      example: statusCode,
    })
    @IsNumber()
    statusCode: number;

    @ApiProperty({
      example: `/api/v1/${url}`,
    })
    path: string;

    @ApiProperty({
      example: description,
    })
    message: string;

    @ApiProperty({
      isArray,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    data: Array<InstanceType<TBase>>;
  }
  return mixin(ResponseDTO);
};

export const GenericEmptyResponse = (options?: {
  error?: boolean;
  description?: string;
  url?: string;
  statusCode?: number;
}) => {
  const {
    error = false,
    description = '',
    url = 'row',
    statusCode = 200,
  } = options || {};

  class ResponseDTO {
    @ApiProperty({
      example: error,
    })
    @IsNumber()
    error: number;

    @ApiProperty({
      example: statusCode,
    })
    @IsNumber()
    statusCode: number;

    @ApiProperty({
      example: `/api/v1/${url}`,
    })
    path: string;

    @ApiProperty({
      example: description,
    })
    message: string;

    @ApiProperty({
      example: {},
    })
    data: object;
  }

  return ResponseDTO;
};
