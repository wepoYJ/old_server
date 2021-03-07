import { Controller, Get, Query, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PoCreateDto } from './dto/po.create.dto'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PoDocument } from './schemas/po.schema'

@Controller('po')
@ApiTags('po')
export class PoController {

  constructor(
    @InjectModel('Po') private readonly PoModel: Model<PoDocument>
  ) { }

  @Get()
  @ApiOperation({
    summary: '获取列表',
  })
  async index() {
    return await this.PoModel.find()
  }

  @Get(':id')
  async info(@Param('id') id: number) {
    return await this.PoModel.findById(id)
  }

  @Post()
  async create(@Body() createDto: PoCreateDto) {
    await this.PoModel.create<PoCreateDto>(createDto)
    return {
      succ: true
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createDto: PoCreateDto) {
    await this.PoModel.findByIdAndUpdate(id, createDto);
    return {
      succ: true
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除'
  })
  async remove(@Param('id') id: number) {
    await this.PoModel.findByIdAndDelete(id)
    return {
      succ: true
    }
  }
}
