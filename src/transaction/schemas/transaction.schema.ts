import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  concept: string;

  @Prop({ required: true, type: String })
  bank: string;

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
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
