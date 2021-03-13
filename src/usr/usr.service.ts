import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsrDocument, Usr, IUsr } from './schemas/usr.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsrService {
  constructor(
    @InjectModel(Usr.name) private readonly UsrModel: Model<UsrDocument>
  ) { }

  public async insert(doc: IUsr) {
    return await this.UsrModel.create(doc)
  }

  public async find(query: FilterQuery<UsrDocument>) {
    return await this.UsrModel.findOne(query);
  }
}
