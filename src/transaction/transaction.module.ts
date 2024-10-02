import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './schemas';
import { BankModule } from '../bank';
import { AuthModule } from '../auth';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    BankModule,
  ],
  exports: [MongooseModule],
})
export class TransactionModule {}
