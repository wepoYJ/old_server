import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsrDocument = Usr & Document;

export interface IUsr {
  email: string,
  un: string,
  pwd: string,
}

@Schema()
export class Usr extends Document implements IUsr {
  @Prop({
    required: true
  })
  un: string;

  @Prop({
    required: true
  })
  pwd: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
}

export const UsrSchema = SchemaFactory.createForClass(Usr);