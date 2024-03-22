import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransanctionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transanction')
export class TransanctionController {
  constructor(private readonly transanctionService: TransanctionService) {}
  // TODO: implementar paginado
  // TODO: implementar borrado lógico

  @Post()
  create(@Body() createTransanctionDto: CreateTransactionDto) {
    return this.transanctionService.create(createTransanctionDto);
  }

  @Get()
  findAll() {
    return this.transanctionService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransanctionDto: UpdateTransactionDto,
  ) {
    return this.transanctionService.update(id, updateTransanctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transanctionService.remove(id);
  }
}
