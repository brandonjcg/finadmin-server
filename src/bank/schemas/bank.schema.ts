import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Bank {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Boolean, default: true })
  active: boolean;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
