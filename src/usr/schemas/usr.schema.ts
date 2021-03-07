import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsrDocument = Usr & Document;

@Schema()
export class Usr extends Document {
  @Prop({
    required: true
  })
  un: string;

  @Prop({
    required: true
  })
  pwd: number;

  @Prop({
    required: true,
    unique: true,
  })
  id: number;
}

export const UsrSchema = SchemaFactory.createForClass(Usr);