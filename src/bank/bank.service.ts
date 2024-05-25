import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankDto } from './dto';
import { Bank } from './schemas';
import {
  QueryArgs,
  buildPaginationResponse,
  getOffsetAndLimit,
  PaginationResponse,
} from '../common';

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
    const { offset, limit, sort, order } = getOffsetAndLimit(queryArgs);

    const [total, rows] = await Promise.all([
      this.bankModel.countDocuments().exec(),
      this.bankModel
        .find()
        .skip(offset)
        .limit(limit)
        .limit(limit)
        .sort({ [sort]: order })
        .exec(),
    ]);

    return buildPaginationResponse(rows, total, queryArgs);
  }

  async select(): Promise<
    {
      _id: string;
      text: string;
      logo: string;
    }[]
  > {
    const rows = await this.bankModel.aggregate([
      {
        $project: {
          text: '$name',
          logo: '$logo',
        },
      },
    ]);

    return rows;
  }
}
