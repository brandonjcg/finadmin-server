import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransanctionModule } from './transaction/transanction.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TransanctionModule,
    BankModule,
    SeedModule,
  ],
})
export class AppModule {}
