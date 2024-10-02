import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { Bank, BankSchema } from './schemas/bank.schema';
import { AuthModule } from '../auth';

@Module({
  controllers: [BankController],
  providers: [BankService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }]),
  ],
  exports: [MongooseModule, BankService],
})
export class BankModule {}
