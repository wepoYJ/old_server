import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsrDocument, Usr } from './schemas/usr.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsrService {
  constructor(
    @InjectModel(Usr.name) private readonly UsrModel: Model<UsrDocument>
  ) { }
  

}
