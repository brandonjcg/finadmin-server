import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bank, CreateBankDto } from '@/bank';
import { CreateTransactionDto, Transaction } from '@/transaction';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Bank.name)
    private bankModel: Model<Bank>,

    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  private async seedBanks(): Promise<Bank[]> {
    const banks: CreateBankDto[] = [
      {
        _id: new Types.ObjectId('62f16a203067606140641234'),
        name: 'BBVA',
        logo: 'https://1000marcas.net/wp-content/uploads/2019/12/BBVA-logo.png',
      },
      {
        _id: new Types.ObjectId('62f16a203067606140641235'),
        name: 'Banamex',
        logo: 'https://1000marcas.net/wp-content/uploads/2020/10/Citibanamex-logo-1280x609.png',
      },
      {
        name: 'HSBC',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg',
      },
      {
        _id: new Types.ObjectId('62f16a203067606140641239'),
        name: 'Nu',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/528px-Nubank_logo_2021.svg.png',
      },
    ];

    return this.bankModel.insertMany(banks);
  }

  private async seedTransactions(): Promise<Transaction[]> {
    const date = new Date();
    const transactions: CreateTransactionDto[] = [
      {
        amount: 25.99,
        concept: 'Groceries at Superstore',
        bank: new Types.ObjectId('62f16a203067606140641234'),
        store: 'Superstore',
        date,
        isReserved: false,
        isPaid: true,
      },
      {
        amount: 100,
        concept: 'Hotel Reservation',
        bank: new Types.ObjectId('62f16a203067606140641235'),
        store: 'Acme Hotels',
        date,
        additionalComments: 'Check-in date',
        isReserved: true,
        isPaid: false,
      },
      {
        amount: 54.99,
        concept: 'Online Shopping at Amazon',
        bank: new Types.ObjectId('62f16a203067606140641235'),
        store: 'Amazon',
        date,
        additionalComments: '',
        isReserved: false,
        isPaid: true,
      },
      {
        amount: 12.5,
        concept: 'Movie Tickets',
        bank: new Types.ObjectId('62f16a203067606140641235'),
        store: 'AMC Cinemas',
        date,
        additionalComments: '',
        isReserved: false,
        isPaid: true,
      },
      {
        amount: 35.0,
        concept: 'Lunch at Cafe Metro',
        bank: new Types.ObjectId('62f16a203067606140641235'),
        store: 'Cafe Metro',
        date,
        additionalComments: '',
        isReserved: false,
        isPaid: true,
      },
      {
        amount: 80.0,
        concept: 'Gym Membership Fee',
        bank: new Types.ObjectId('62f16a203067606140641239'),
        store: 'Fitness Club',
        date,
        additionalComments: 'Monthly payment',
        isReserved: false,
        isPaid: true,
      },
      {
        amount: 22.5,
        concept: 'Haircut at Salon Bliss',
        bank: new Types.ObjectId('62f16a203067606140641239'),
        store: 'Salon Bliss',
        date,
        additionalComments: '',
        isReserved: false,
        isPaid: true,
      },
    ];

    return this.transactionModel.insertMany(transactions);
  }

  async seed(): Promise<[Bank[], Transaction[]]> {
    try {
      const banks = await this.seedBanks();
      const transactions = await this.seedTransactions();

      return [banks, transactions];
    } catch (error) {
      const errorMessage = error.writeErrors
        .map((e) => e.err.errmsg)
        .join(', ');
      throw new HttpException(
        `Error seeding database: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reset(): Promise<any> {
    try {
      await this.bankModel.deleteMany({});
      await this.transactionModel.deleteMany({});
    } catch (error) {
      throw new HttpException(
        `Error resetting database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
