import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BankModule } from '../bank/bank.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BankModule],
})
export class SeedModule {}
