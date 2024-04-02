import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Bank extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Boolean, default: true })
  active: boolean;
}

export const BankSchema = SchemaFactory.createForClass(Bank);

BankSchema.index({ name: 1 }, { unique: true });
