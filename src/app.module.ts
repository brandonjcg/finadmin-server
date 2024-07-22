import { Module } from '@nestjs/common';
import { CommonModule } from '@/common/common.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';
import { TransactionModule } from './transaction';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    TransactionModule,
    BankModule,
    SeedModule,
    UserModule,
  ],
})
export class AppModule {}
