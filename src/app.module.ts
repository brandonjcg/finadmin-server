import { Module } from '@nestjs/common';
import { CommonModule } from '@/common/common.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';
import { TransactionModule } from './transaction';

@Module({
  imports: [CommonModule, TransactionModule, BankModule, SeedModule],
})
export class AppModule {}
