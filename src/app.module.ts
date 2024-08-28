import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';
import { TransactionModule } from './transaction';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommonModule,
    TransactionModule,
    BankModule,
    SeedModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
