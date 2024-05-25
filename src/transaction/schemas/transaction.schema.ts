import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Bank } from '../../bank/schemas/bank.schema';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Number })
  @ApiProperty()
  amount: number;

  @Prop({ required: true, type: String })
  @ApiProperty()
  concept: string;

  @Prop({
    type: Types.ObjectId,
    ref: () => Bank,
  })
  @ApiProperty({ type: Bank })
  bank: Types.ObjectId;

  @Prop({ required: true, type: String })
  @ApiProperty()
  store: string;

  @Prop({ default: Date.now, required: false, type: Date })
  @ApiProperty()
  date: Date;

  @Prop({ default: '', type: String, required: false })
  @ApiProperty()
  additionalComments?: string;

  @Prop({ default: false, type: Boolean })
  @ApiProperty()
  isReserved: boolean;

  @Prop({ default: false, type: Boolean })
  @ApiProperty()
  isPaid: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  @ApiProperty()
  active: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
