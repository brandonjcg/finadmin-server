import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Bank } from '../../bank/schemas/bank.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  concept: string;

  @Prop({
    type: Types.ObjectId,
    ref: () => Bank,
  })
  bank: Types.ObjectId;

  @Prop({ required: true, type: String })
  store: string;

  @Prop({ default: Date.now, required: false, type: Date })
  date: Date;

  @Prop({ default: '', type: String, required: false })
  additionalComments?: string;

  @Prop({ default: false, type: Boolean })
  isReserved: boolean;

  @Prop({ default: false, type: Boolean })
  isPaid: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  active: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
