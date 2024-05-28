import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, FileUploadDto } from './dto';
import { QueryArgs } from '../common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Transaction } from './schemas';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import transactions' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Csv file',
    type: FileUploadDto,
  })
  async import(@UploadedFile() file: Express.Multer.File): Promise<object> {
    const data = await this.transactionService.import(file);

    return {
      message: 'Transactions imported successfully',
      data,
    };
  }
}
