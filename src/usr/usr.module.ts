import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usr, UsrSchema } from './schemas/usr.schema';
import { UsrController } from './usr.controller';
import { UsrService } from './usr.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usr.name,schema: UsrSchema }
    ])
  ],
  controllers: [
    UsrController
  ],
  providers: [
    AppService,
    UsrService
  ]
})
export class UsrModule {}
