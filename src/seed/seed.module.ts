import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BankModule } from '../bank/bank.module';
import { TransactionModule } from '@/transaction';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BankModule, TransactionModule],
})
export class SeedModule {}
