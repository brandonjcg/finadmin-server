import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto';
import { Bank } from './schemas/bank.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BankService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<Bank>) {}

  async isDuplicated(name: string) {
    return this.bankModel.findOne({ name }).exec();
  }

  async create(createBankDto: CreateBankDto) {
    const bankDuplicated = await this.isDuplicated(createBankDto.name);
    if (bankDuplicated) {
      throw new HttpException('Bank already exists', HttpStatus.BAD_REQUEST);
    }

    const createdTransaction = new this.bankModel(createBankDto);
    return createdTransaction.save();
  }

  async findAll() {
    return this.bankModel.find().exec();
  }
}
