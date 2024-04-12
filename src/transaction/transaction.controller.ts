import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransanctionService } from './transaction.service';
import { CreateTransactionDto } from './dto';
import { QueryArgs } from '../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transanction')
@Controller('transanction')
export class TransanctionController {
  constructor(private readonly transanctionService: TransanctionService) {}

  @Post()
  create(@Body() createTransanctionDto: CreateTransactionDto) {
    return this.transanctionService.create(createTransanctionDto);
  }

  @Get()
  findAll(@Query() queryArgs: QueryArgs) {
    return this.transanctionService.findAll(queryArgs);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransanctionDto: CreateTransactionDto,
  ) {
    return this.transanctionService.update(id, updateTransanctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transanctionService.remove(id);
  }
}
