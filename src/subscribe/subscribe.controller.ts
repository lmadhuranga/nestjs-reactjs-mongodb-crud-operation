import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  create(@Body() createSubscribeDto: CreateSubscribeDto) {
    return this.subscribeService.create(createSubscribeDto);
  }

  @Get()
  findAll() {
    return {msg:this.subscribeService.findAll()};
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return {msg:this.subscribeService.findOne(id)} ;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSubscribeDto: UpdateSubscribeDto) {
    return {msg:this.subscribeService.update(id, updateSubscribeDto)} ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {msg:this.subscribeService.remove(id)} ;
  }
}
