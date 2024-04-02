import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto';
import { Bank } from './schemas/bank.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from '@common/types/index';
import { QueryArgs, buildPaginationResponse } from '../common';

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

  async findAll(queryArgs: QueryArgs): Promise<PaginationResponse<Bank>> {
    const { offset, limit, sort, order } = queryArgs;

    const [total, rows] = await Promise.all([
      this.bankModel.countDocuments().exec(),
      this.bankModel
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ [sort]: order })
        .exec(),
    ]);

    return buildPaginationResponse(rows, total, queryArgs);
  }
}
