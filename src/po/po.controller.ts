import { Controller, Get, Query, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PoCreateDto } from './dto/po.create.dto'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PoDocument } from './schemas/po.schema'

@Controller('po')
@ApiTags('po')
export class PoController {

}
 