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
import { CreateTransactionDto, FileUploadDto, SelectStoreDto } from './dto';
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
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const data = await this.transactionService.create(createTransactionDto);

    return {
      message: 'Transaction created successfully',
      data,
    };
  }

  @Get()
  @ApiOkResponse({
    type: [Transaction],
    description: 'All transactions',
  })
  async findAll(@Query() queryArgs: QueryArgs) {
    const { rows, ...rest } = await this.transactionService.findAll(queryArgs);
    return {
      data: rows,
      info: rest,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: CreateTransactionDto,
  ) {
    const data = await this.transactionService.update(id, updateTransactionDto);

    return {
      message: 'Transaction updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.transactionService.remove(id);

    return {
      message: 'Transaction deleted successfully',
    };
  }

  @Get('store/select')
  @ApiOkResponse({
    type: [SelectStoreDto],
    description: 'All stores',
  })
  async selectStore() {
    const data = await this.transactionService.selectStore();

    return {
      data,
    };
  }

  @Get(':id')
  @ApiOkResponse({
    type: Transaction,
    description: 'Transaction by id',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.transactionService.findOne(id);

    return {
      data,
    };
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
