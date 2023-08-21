import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionLogService } from './subscription-log.service';
import { CreateSubscriptionLogDto } from './dto/create-subscription-log.dto';
import { UpdateSubscriptionLogDto } from './dto/update-subscription-log.dto';

@Controller('subscription-log')
export class SubscriptionLogController {
  constructor(private readonly subscriptionLogService: SubscriptionLogService) {}

  @Post()
  create(@Body() createSubscriptionLogDto: CreateSubscriptionLogDto) {
    return this.subscriptionLogService.create(createSubscriptionLogDto);
  }

  @Get()
  findAll() {
    return this.subscriptionLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionLogDto: UpdateSubscriptionLogDto) {
    return this.subscriptionLogService.update(+id, updateSubscriptionLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionLogService.remove(+id);
  }
}
