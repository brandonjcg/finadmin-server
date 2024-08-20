import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './schemas';
import { Bank, BankService, BanksIdsDto } from '../bank';
import {
  CreateTransactionDto,
  SelectStoreDto,
  UpdateMultipleRowsDto,
} from './dto';
import {
  PaginationResponse,
  QueryArgs,
  buildPaginationResponse,
  convertToOrc,
  createFilter,
  getOffsetAndLimit,
} from '../common';
import { buildCsv } from '@/common';
import { ITransactionCsv } from './types';

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
    const where = createFilter(queryArgs.filters);

    const [total, rows] = await Promise.all([
      this.transactionModel.countDocuments(where).exec(),
      this.transactionModel
        .find(where)
        .skip(offset)
        .limit(limit)
        .sort({
          [sort]: order === 'asc' ? 1 : -1,
        })
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

  async selectStore(): Promise<SelectStoreDto[]> {
    return await this.transactionModel.aggregate([
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
  }

  async findOne(id: string): Promise<Transaction> {
    return await this.transactionModel.findById(id).exec();
  }

  async import(file: Express.Multer.File) {
    if (!file) throw new HttpException('Empty file', HttpStatus.CONFLICT);

    const csvParsed = buildCsv(file?.buffer)
      .csvParsed as unknown as ITransactionCsv[];

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

  async group(query: BanksIdsDto) {
    const { ids } = query;
    const rowsNotExists = await this.bankService.getBanksNotFound(ids);
    if (rowsNotExists.length)
      throw new HttpException(
        `Banks not found: ${rowsNotExists.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );

    const { isPaid, isReserved } = query;
    const rows = await this.transactionModel.aggregate([
      {
        $match: {
          bank: {
            $in: ids.map((id) => new Types.ObjectId(id)),
          },
          ...(isPaid !== undefined && { isPaid }),
          ...(isReserved !== undefined && { isReserved }),
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$amount',
          },
        },
      },
    ]);

    return rows.length ? rows[0] : { total: 0 };
  }

  async updateMultiplesRows(updateMultipleRowsDto: UpdateMultipleRowsDto) {
    const dictionary = {
      '1': {
        isPaid: true,
      },
      '2': {
        isReserved: true,
      },
      '3': {
        isPaid: true,
        isReserved: true,
      },
    };
    const body = dictionary[updateMultipleRowsDto.idProcess];

    const rowsNotExists = await this.transactionModel
      .find({
        _id: {
          $in: updateMultipleRowsDto.rowsToUpdate.map(
            (id) => new Types.ObjectId(id),
          ),
        },
      })
      .select('_id')
      .exec();

    if (rowsNotExists.length !== updateMultipleRowsDto.rowsToUpdate.length)
      throw new HttpException('Some rows not found', HttpStatus.BAD_REQUEST);

    await this.transactionModel.updateMany(
      {
        _id: {
          $in: updateMultipleRowsDto.rowsToUpdate.map(
            (id) => new Types.ObjectId(id),
          ),
        },
      },
      {
        $set: body,
      },
    );
  }

  async createTransactionFromImg(imgs: Express.Multer.File[]) {
    const result = [];

    for (const img of imgs) {
      const test = await convertToOrc(img.buffer);

      const data = test.split('\n').map((line) => line.trim());
      const dataJson = JSON.parse(JSON.stringify(data));

      const amountRegex = /-?\$\d+(\.\d{2})?/;
      const matches = amountRegex.exec(test);
      const amount = matches ? Math.abs(+matches[0].replace('$', '')) : null;

      // TODO: missing add another fields

      result.push({
        ammount: amount,
        dataJson,
      });
    }

    return result;
  }
}
