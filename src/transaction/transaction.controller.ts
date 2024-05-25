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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto';
import { QueryArgs } from '../common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './schemas';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Transaction],
    description: 'All transactions',
  })
  findAll(@Query() queryArgs: QueryArgs) {
    return this.transactionService.findAll(queryArgs);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }

  @Get('store/select')
  async selectStore() {
    return this.transactionService.selectStore();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Transaction,
    description: 'Transaction by id',
  })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
