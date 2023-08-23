import { Injectable } from '@nestjs/common';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';
import { Subscribe } from 'src/subscribe/subscribe.entity';
import { ObjectId } from 'mongodb';
import { CreateSubscribeDto } from 'src/subscribe/dto/create-subscribe.dto';
import { LogServiceService } from 'src/log-service/log-service.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CallbacksService {
  constructor(
    private logservice: LogServiceService,
    private subscribeService: SubscribeService,
    private authService: AuthService,
  ) { }

  async doSubscribe(token: string) {
    // Todo:: Check is already send a request  or not 
    const { sub, subscribeId, action, msisdn } = await this.authService.verify(token);

    // Add log record
    this.logservice.makeLogRequest("SUBSCRIBE", "PENDING", "CALLBACK", new ObjectId(sub));
    const createSubscribeDto = new CreateSubscribeDto();
    createSubscribeDto.action = action;
    createSubscribeDto.subscribeId = subscribeId;
    createSubscribeDto.msisdn = msisdn;

    // Make subcription is pending
    const { serviceId, _id } = await this.subscribeService.makePendingSubscription(createSubscribeDto, sub);

    // update the subcription
    const updatedSubscribe = await this.subscribeService.update(_id, { action: 'SUBSCRIBED' });

    // add a log to with succsess status
    this.logservice.makeLogRequest("SUBSCRIBE", "SUCCESS", "CALLBACK", sub, _id);

    return { status: "OK", data: { updatedSubscribe, serviceId } };
  }


  async doUnsubscribe(token: string) {
    // Todo:: Check is already send a request  or not 
    const { sub, subscribeId, action, msisdn } = await this.authService.verify(token);

    // Add log record
    this.logservice.makeLogRequest("UNSUBSCRIBE", "PENDING", "CALLBACK", new ObjectId(sub));
 
    // Make subcription is pending
    const { serviceId, _id } = await this.subscribeService.makePendingUnsubscription(subscribeId);

    // update the subcription
    const updatedUnsubscribe = await this.subscribeService.update(_id, { action: 'UNSUBSCRIBE' });

    // add a log to with succsess status
    this.logservice.makeLogRequest("UNSUBSCRIBE", "SUCCESS", "CALLBACK", sub, _id);

    return { status: "OK", data: { updatedUnsubscribe, serviceId } };
  }


  findAll() {
    return `This action returns all callbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} callback`;
  }

  update(id: number, updateCallbackDto: UpdateCallbackDto) {
    return `This action updates a #${id} callback`;
  }

  remove(id: number) {
    return `This action removes a #${id} callback`;
  }
}
