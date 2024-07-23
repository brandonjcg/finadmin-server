import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, type: String })
  @ApiProperty()
  email: string;

  @Prop({ required: true, type: String })
  @ApiProperty()
  fullName: string;

  @Prop({ required: false, type: String })
  @ApiProperty()
  picture: string;

  @Prop({ required: false, type: String })
  @ApiProperty()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
