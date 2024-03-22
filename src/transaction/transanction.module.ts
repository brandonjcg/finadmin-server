import { Module } from '@nestjs/common';
import { TransanctionService } from './transaction.service';
import { TransanctionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
  controllers: [TransanctionController],
  providers: [TransanctionService],
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
})
export class TransanctionModule {}
