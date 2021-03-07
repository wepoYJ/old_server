import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoController } from './po/po.controller';
import { PoModule } from './po/po.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsrController } from './usr/usr.controller';
import { UsrModule } from './usr/usr.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://locahost:27017'),
    PoModule,
    UsrModule
  ],
  controllers: [AppController, PoController, UsrController],
  providers: [AppService],
})
export class AppModule {}
