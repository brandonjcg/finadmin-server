import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bank } from 'src/bank/schemas/bank.schema';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<Bank>) {}

  private async seedBanks(): Promise<Bank[]> {
    const banks = [
      { name: 'BBVA' },
      { name: 'Nu' },
      { name: 'Invex' },
      { name: 'Rappi' },
    ];

    return this.bankModel.insertMany(banks);
  }

  async seed(): Promise<[Bank[]]> {
    try {
      const banks = await this.seedBanks();

      return [banks];
    } catch (error) {
      const errorMessage = error.errors
        ?.map((e) => `${e.message} ${e.value}`)
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
