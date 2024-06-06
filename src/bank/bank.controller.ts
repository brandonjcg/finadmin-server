import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto';
import { QueryArgs } from '../common';

@ApiTags('bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  async findAll(@Query() queryArgs: QueryArgs) {
    const data = await this.bankService.findAll(queryArgs);

    return {
      data: data.rows,
    };
  }

  @Get('/select')
  async select() {
    const rows = await this.bankService.select();

    return {
      data: rows,
    };
  }
}
