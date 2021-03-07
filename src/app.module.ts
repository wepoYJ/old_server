import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoController } from './po/po.controller';
import { PoModule } from './po/po.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://locahost:27017'),
    PoModule
  ],
  controllers: [AppController, PoController],
  providers: [AppService],
})
export class AppModule {}
