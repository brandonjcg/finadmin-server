import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bank, CreateBankDto } from '@/bank';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<Bank>) {}

  private async seedBanks(): Promise<Bank[]> {
    const banks: CreateBankDto[] = [
      {
        name: 'BBVA',
        logo: 'https://1000marcas.net/wp-content/uploads/2019/12/BBVA-logo.png',
      },
      {
        name: 'Banamex',
        logo: 'https://1000marcas.net/wp-content/uploads/2020/10/Citibanamex-logo-1280x609.png',
      },
      {
        name: 'HSBC',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg',
      },
      {
        name: 'Nu',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/528px-Nubank_logo_2021.svg.png',
      },
    ];

    return this.bankModel.insertMany(banks);
  }

  async seed(): Promise<[Bank[]]> {
    try {
      const banks = await this.seedBanks();

      return [banks];
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
    } catch (error) {
      throw new HttpException(
        `Error resetting database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
