import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { Bank } from '../bank/schemas/bank.schema';
import { PaginationResponse } from '@common/types/index';
import { QueryArgs, buildPaginationResponse } from '../common';

@Injectable()
export class TransanctionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async create(createTransactionDto: any): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(
    queryArgs: QueryArgs,
  ): Promise<PaginationResponse<Transaction>> {
    const { offset, limit, sort, order } = queryArgs;

    const [total, rows] = await Promise.all([
      this.transactionModel.countDocuments().exec(),
      this.transactionModel
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ [sort]: order })
        .populate([
          {
            path: Bank.name.toLowerCase(),
            select: 'name',
          },
        ])
        .exec(),
    ]);

    return buildPaginationResponse(rows, total, queryArgs);
  }

  async update(id: string, updateTransactionDto: any): Promise<Transaction> {
    return this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Transaction> {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }
}
