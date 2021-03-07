import { Module } from '@nestjs/common';
import { PoService } from './po.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PoController } from './po.controller';
// import { Po, PoSchema } from './schemas/po.schema'

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: Po.name, schema: PoSchema }
    // ])
  ],
  controllers: [PoController],
  providers: [PoService]
})
export class PoModule {}
