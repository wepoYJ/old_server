import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoController } from './po/po.controller';
import { PoModule } from './po/po.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsrController } from './usr/usr.controller';
import { UsrModule } from './usr/usr.module';
import { MailService } from './mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { DBConf, EmailConf } from './constants/constants';
import { RedisModule } from 'nestjs-redis';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    PoModule,
    UsrModule,
    // 数据库
    MongooseModule.forRoot(`mongodb://${DBConf.mongodb}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }),
    // redis
    RedisModule.register({
      host: DBConf.redis.host,
      port: DBConf.redis.port,
    }),
    // 邮箱服务
    MailerModule.forRoot({
      transport: {
        host: "smtp.163.com",
        port: 465,
        auth: {
          user: EmailConf.host,
          pass: EmailConf.SMTP_Auth,
        }
      },
      defaults: {
        from: `"WePo official" <${EmailConf.host}>`
      }
    }),
  ],
controllers: [AppController, PoController, UsrController],
  providers: [AppService, MailService, CacheService],
})
export class AppModule { }
