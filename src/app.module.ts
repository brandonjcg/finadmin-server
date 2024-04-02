import { Module } from '@nestjs/common';
import { CommonModule } from '@/common/common.module';
import { TransanctionModule } from './transaction/transanction.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CommonModule, TransanctionModule, BankModule, SeedModule],
})
export class AppModule {}
