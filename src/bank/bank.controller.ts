import { Controller, Post, Body, Get } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  findAll() {
    return this.bankService.findAll();
  }
}
