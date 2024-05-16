import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TransactionModule {}
