import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUnsubscribeDto } from './dto/create-unsubscribe.dto';

@Controller('unsubscribe')
export class UnsubscribeController {
  constructor(private readonly subscribeService: SubscribeService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUnsubscribeDto: CreateUnsubscribeDto, @Request() req) {
    const { user: { sub } } = req;
    const { subscriptionId } = createUnsubscribeDto;
    return this.subscribeService.doUnsubscribe(subscriptionId, sub);
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
