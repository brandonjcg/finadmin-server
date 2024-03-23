import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto';
import { Bank } from './schemas/bank.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BankService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<Bank>) {}

  async create(createBankDto: CreateBankDto) {
    const createdTransaction = new this.bankModel(createBankDto);
    return createdTransaction.save();
  }
}
