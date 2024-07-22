import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankDto, SelectBankDto } from './dto';
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
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .exec(),
    ]);

    return buildPaginationResponse(rows, total, queryArgs);
  }

  async select(): Promise<SelectBankDto[]> {
    const rows = await this.bankModel.aggregate([
      {
        $project: {
          text: '$name',
          logo: '$logo',
        },
      },
      {
        $sort: {
          text: 1,
        },
      },
    ]);

    return rows;
  }

  async getBanksNotFound(ids: string[]) {
    const rows = await this.bankModel.find({
      _id: {
        $in: ids,
      },
    });

    const idsDatabase = rows.map((row) => row._id.toString());
    const rowsNotExists = ids.filter((id) => !idsDatabase.includes(id));

    return rowsNotExists;
  }
}
