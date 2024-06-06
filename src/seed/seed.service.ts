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
        _id: new Types.ObjectId('12346a203067606140641234'),
        name: 'BBVA',
        logo: 'https://1000marcas.net/wp-content/uploads/2019/12/BBVA-logo.png',
      },
      {
        _id: new Types.ObjectId('62f16a203067606140641235'),
        name: 'Coppel',
        logo: 'https://www.coppel.com/images/emarketing/logo.svg',
      },
      {
        _id: new Types.ObjectId('62f16a303027606140641239'),
        name: 'Nu',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/528px-Nubank_logo_2021.svg.png',
      },
      {
        _id: new Types.ObjectId('12f16a203067606140641235'),
        name: 'Plata Card',
        logo: 'https://scontent.ftij3-2.fna.fbcdn.net/v/t39.30808-6/393804319_271041449258277_1204166342224282429_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF589KOVTe68yRX5h1wQJi2Wic2qDovXkdaJzaoOi9eRzfjo5Xbig7fCPz77EJLLhSH1bBsR-ilOozltTC310iU&_nc_ohc=2BrBqVEqvqUQ7kNvgHvJYo6&_nc_ht=scontent.ftij3-2.fna&oh=00_AYAI4l1dmPp3gNp4qp0sBJZt8iqtj8S33q8OyPX3qPwAFg&oe=66583570',
      },
      {
        _id: new Types.ObjectId('32f16a203067606140641230'),
        name: 'Ahorro',
        logo: 'https://www.svgrepo.com/show/27909/money-bag.svg',
      },
      {
        _id: new Types.ObjectId('32f46a203067606140641230'),
        name: 'Egreso',
        logo: 'https://www.svgrepo.com/show/27909/money-bag.svg',
      },
      {
        _id: new Types.ObjectId('32f46a203067396140641230'),
        name: 'Sala',
        logo: 'https://png.pngtree.com/png-clipart/20230428/original/pngtree-living-room-line-icon-png-image_9118708.png',
      },
      {
        _id: new Types.ObjectId('32f46a203067396140641111'),
        name: 'Volaris INVEX',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_de_Invex.svg',
      },
      {
        _id: new Types.ObjectId('34556a203067396140641111'),
        name: 'Sears',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Sears_Mexico_Logo.svg/1280px-Sears_Mexico_Logo.svg.png',
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
      const transactions = [];

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
