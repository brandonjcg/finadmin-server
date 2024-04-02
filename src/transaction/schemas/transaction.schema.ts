import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bank } from '../../bank/schemas/bank.schema';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  concept: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => Bank,
  })
  bank: Bank;

  @Prop({ required: true, type: String })
  store: string;

  @Prop({ default: Date.now, required: false, type: Date })
  date: Date;

  @Prop({ default: '', type: String })
  additionalComments: string;

  @Prop({ default: false, type: Boolean })
  isReserved: boolean;

  @Prop({ default: false, type: Boolean })
  isPaid: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  active: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
