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
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  FileUploadDto,
  GroupByBanksDto,
  SelectStoreDto,
  UpdateMultipleRowsDto,
} from './dto';
import { QueryArgs, GenericResponse } from '../common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Transaction } from './schemas';
import { BanksIdsDto } from '../bank';

const MODULE_NAME = 'transaction';

@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiResponse({
    type: GenericResponse(CreateTransactionDto, {
      description: 'Transaction created successfully',
      url: MODULE_NAME,
    }),
  })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const data = await this.transactionService.create(createTransactionDto);

    return {
      message: 'Transaction created successfully',
      data,
    };
  }

  @Get()
  @ApiResponse({
    type: GenericResponse(Transaction, {
      isArray: true,
      url: MODULE_NAME,
    }),
  })
  async findAll(@Query() queryArgs: QueryArgs) {
    const { rows, ...rest } = await this.transactionService.findAll(queryArgs);
    return {
      data: rows,
      info: rest,
    };
  }

  @Patch(':id')
  @ApiResponse({
    type: GenericResponse(CreateTransactionDto, {
      description: 'Transaction updated successfully',
      url: MODULE_NAME,
    }),
  })
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
  @ApiResponse({
    type: GenericResponse(Transaction, {
      description: 'Transaction deleted successfully',
      url: MODULE_NAME,
    }),
  })
  async remove(@Param('id') id: string) {
    const row = await this.transactionService.remove(id);

    return {
      data: row,
      message: 'Transaction deleted successfully',
    };
  }

  @Get('store/select')
  @ApiResponse({
    type: GenericResponse(SelectStoreDto, {
      isArray: true,
      description: 'All stores',
      url: 'store/select',
    }),
  })
  async selectStore() {
    const data = await this.transactionService.selectStore();

    return {
      data,
    };
  }

  @Get('bank/group')
  @ApiResponse({
    type: GenericResponse(GroupByBanksDto, {
      isArray: true,
      description: 'Filter transactions by bank and return grouped total',
      url: 'bank/group',
    }),
  })
  async group(@Query() query: BanksIdsDto) {
    const rows = await this.transactionService.group(query);

    return {
      data: rows,
    };
  }

  @Get(':id')
  @ApiResponse({
    type: GenericResponse(Transaction, {
      description: 'Transaction by id',
      url: `${MODULE_NAME}/:id`,
    }),
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
  @ApiResponse({
    type: GenericResponse(FileUploadDto, {
      description: 'Import transactions from csv file',
      url: `${MODULE_NAME}/import`,
    }),
  })
  async import(@UploadedFile() file: Express.Multer.File): Promise<object> {
    const data = await this.transactionService.import(file);

    return {
      message: 'Transactions imported successfully',
      data,
    };
  }

  @Post('run-process')
  @ApiOperation({ summary: 'Execute update to multiple transactions' })
  @ApiResponse({
    type: GenericResponse(UpdateMultipleRowsDto, {
      description: 'Execute update to multiple transactions',
      url: `${MODULE_NAME}/run-process`,
    }),
  })
  async runProcess(
    @Body() updateMultipleRowsDto: UpdateMultipleRowsDto,
  ): Promise<object> {
    const data = await this.transactionService.updateMultiplesRows(
      updateMultipleRowsDto,
    );

    return {
      message: 'Process executed successfully',
      data,
    };
  }
}
