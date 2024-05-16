import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Bank } from '../bank/schemas/bank.schema';
import { ApiTags } from '@nestjs/swagger';
import { Transaction } from '@/transaction';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('run')
  async runSeeds(): Promise<[Bank[], Transaction[]]> {
    return this.seedService.seed();
  }

  @Post('reset')
  async resetSeeds(): Promise<any> {
    return this.seedService.reset();
  }
}
