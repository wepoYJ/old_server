import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from 'src/cache/cache.service';
import { MailService } from 'src/mail/mail.service';
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
    UsrService,
    CacheService,
    MailService,
  ],
  exports: [UsrService]
})
export class UsrModule {}
