import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas';
import { Bank } from '../bank';
import { CreateTransactionDto, SelectStoreDto } from './dto';
import {
  PaginationResponse,
  QueryArgs,
  buildPaginationResponse,
  getOffsetAndLimit,
} from '../common';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(
    queryArgs: QueryArgs,
  ): Promise<PaginationResponse<Transaction>> {
    const { offset, limit, sort, order } = getOffsetAndLimit(queryArgs);

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
            select: 'name logo',
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

  async selectStore(): Promise<PaginationResponse<SelectStoreDto>> {
    const stores = await this.transactionModel.aggregate([
      {
        $group: {
          _id: '$store',
        },
      },
      {
        $project: {
          _id: 0,
          text: '$_id',
        },
      },
      {
        $sort: {
          text: 1,
        },
      },
    ]);

    return buildPaginationResponse(stores);
  }

  async findOne(id: string): Promise<PaginationResponse<Transaction>> {
    const row = await this.transactionModel.findById(id).exec();

    return buildPaginationResponse([row]);
  }
}
