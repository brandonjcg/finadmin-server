import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto';
import { QueryArgs } from '../common';
import { Bank } from './schemas';
import { PaginationResponse } from '@/common';

@ApiTags('bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  findAll(@Query() queryArgs: QueryArgs) {
    return this.bankService.findAll(queryArgs);
  }

  @Get('/select')
  async select(): Promise<PaginationResponse<Bank>> {
    return this.bankService.select();
  }
}
