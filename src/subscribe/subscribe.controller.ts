import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSubscribeDto: CreateSubscribeDto, @Request() req) {
    const { user: { sub } } = req; 
    return this.subscribeService.create(createSubscribeDto, sub);
  }

  @Get()
  findAll() {
    return this.subscribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('token') token: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscribeDto: UpdateSubscribeDto) {
    return this.subscribeService.update(+id, updateSubscribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribeService.remove(+id);
  }
}
