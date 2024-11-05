import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Bank } from '../bank/schemas/bank.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from '../transaction';
import { GenericEmptyResponse } from '../common';

const MODULE_NAME = 'seed';

@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('run')
  @ApiResponse({
    type: GenericEmptyResponse({
      description: 'Seeds ran successfully',
      url: `${MODULE_NAME}/run`,
    }),
  })
  async runSeeds(): Promise<[Bank[], Transaction[]]> {
    return this.seedService.seed();
  }

  @Post('reset')
  @ApiResponse({
    type: GenericEmptyResponse({
      description: 'Reset seeds successfully',
      url: `${MODULE_NAME}/reset`,
    }),
  })
  async resetSeeds(): Promise<any> {
    return this.seedService.reset();
  }
}
