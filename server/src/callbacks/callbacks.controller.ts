import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CallbacksService } from './callbacks.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';
import { CreateSubscribeDto } from 'src/subscribe/dto/create-subscribe.dto';
import { ObjectId } from 'mongodb';

@Controller('callbacks')
export class CallbacksController {
  constructor(private readonly callbacksService: CallbacksService) { }

  @Post('subscribe')
  callbackSubscribe(@Body() createSubscribeDto: CreateSubscribeDto, @Request() req) {
    const [type, rowToken] = req.headers.authorization?.split(' ') ?? [];
    const token: string = type === 'Bearer' ? rowToken : undefined;
    return this.callbacksService.doSubscribe(token);
  }

  @Post('unsubscribe')
  callbackUnsubscribe(@Body() createSubscribeDto: CreateSubscribeDto, @Request() req) {
    const [type, rowToken] = req.headers.authorization?.split(' ') ?? [];
    const token: string = type === 'Bearer' ? rowToken : undefined;
    return this.callbacksService.doUnsubscribe(token);
  }

}
