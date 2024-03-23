import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Bank } from '../bank/schemas/bank.schema';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('run')
  async runSeeds(): Promise<[Bank[]]> {
    return this.seedService.seed();
  }

  @Post('reset')
  async resetSeeds(): Promise<any> {
    return this.seedService.reset();
  }
}
