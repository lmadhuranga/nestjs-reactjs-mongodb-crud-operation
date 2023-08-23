import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallbacksService } from './callbacks.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';
import { CreateSubscribeDto } from 'src/subscribe/dto/create-subscribe.dto';
import { ObjectId } from 'mongodb';

@Controller('callbacks')
export class CallbacksController {
  constructor(private readonly callbacksService: CallbacksService) {}

  @Post('subscribe')
  callbackSubscribe(@Body() createSubscribeDto: CreateSubscribeDto) {
    const id = new ObjectId(111)
    return this.callbacksService.doSubscribe(createSubscribeDto, id);
  }

  @Post('unsubscribe')
  callbackUnsubscribe(@Body() createSubscribeDto: CreateSubscribeDto) {
    const id = new ObjectId(111);
    const subscriptionId = new ObjectId(111);
    return this.callbacksService.doUnsubscribe(subscriptionId, id);
  }

}
