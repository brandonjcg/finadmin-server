import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas';
import { Bank, BankService } from '../bank';
import { CreateTransactionDto, SelectStoreDto } from './dto';
import {
  PaginationResponse,
  QueryArgs,
  buildPaginationResponse,
  getOffsetAndLimit,
} from '../common';
import { buildCsv } from '@/common';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,

    private readonly bankService: BankService,
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

  async import(file: Express.Multer.File) {
    if (!file) throw new HttpException('Empty file', HttpStatus.CONFLICT);

    const csvParsed = buildCsv(file?.buffer).csvParsed as unknown as {
      bank: string;
      concept: string;
      amount: string;
      date: string;
      store: string;
      isReserved: string;
      isPaid: string;
      additionalComments: string;
    }[];

    const banksObjects = await this.bankService.select();

    const dataPrepared = csvParsed.map((row) => {
      const bank = banksObjects.find(
        (bank) =>
          bank.text.toLocaleLowerCase() === row.bank.toLocaleLowerCase(),
      );
      if (!bank) {
        throw new HttpException(
          `Bank ${row.bank} not found`,
          HttpStatus.CONFLICT,
        );
      }
      const timestampFormated = new Date(row.date);
      return {
        bank: bank?._id,
        concept: row.concept,
        amount: +row.amount || 0,
        date: row.date,
        store: row.store,
        isReserved: row.isReserved.toLocaleLowerCase() === 'true',
        isPaid: row.isPaid.toLocaleLowerCase() === 'true',
        aditionalComments:
          row.additionalComments?.trim().length > 0
            ? row.additionalComments.trim()
            : null,
        createdAt: timestampFormated,
        updatedAt: timestampFormated,
      };
    });

    return await this.transactionModel.insertMany(dataPrepared);
  }
}
