import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBankDto, SelectBankDto } from './dto';
import { Bank } from './schemas';
import { JwtGuard } from '../auth';
import { GenericResponse, QueryArgs } from '../common';

const MODULE_NAME = 'bank';

@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
@UseGuards(JwtGuard)
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiResponse({
    type: GenericResponse(CreateBankDto, {
      description: 'Bank created successfully',
      url: MODULE_NAME,
    }),
  })
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  @ApiResponse({
    type: GenericResponse(Bank, {
      isArray: true,
      url: MODULE_NAME,
    }),
  })
  async findAll(@Query() queryArgs: QueryArgs) {
    const data = await this.bankService.findAll(queryArgs);

    return {
      data: data.rows,
    };
  }

  @Get('/select')
  @ApiResponse({
    type: GenericResponse(SelectBankDto, {
      isArray: true,
      url: `/${MODULE_NAME}/select`,
    }),
  })
  async select() {
    const rows = await this.bankService.select();

    return {
      data: rows,
    };
  }
}
