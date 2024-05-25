import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Bank extends Document {
  @Prop({ required: true, type: String })
  @ApiProperty()
  name: string;

  @Prop({ required: true, type: Boolean, default: true })
  @ApiProperty()
  active: boolean;

  @Prop({ required: false, type: String })
  @ApiProperty()
  logo: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);

BankSchema.index({ name: 1 }, { unique: true });
