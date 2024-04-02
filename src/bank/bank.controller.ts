import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto';
import { QueryArgs } from '../common';

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
}
