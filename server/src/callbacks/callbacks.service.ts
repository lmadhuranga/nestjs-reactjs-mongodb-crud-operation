import { Injectable } from '@nestjs/common';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';
import { Subscribe } from 'src/subscribe/subscribe.entity';
import { ObjectId } from 'mongodb';
import { CreateSubscribeDto } from 'src/subscribe/dto/create-subscribe.dto';
import { LogServiceService } from 'src/log-service/log-service.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';

@Injectable()
export class CallbacksService {
  constructor(
    private logservice: LogServiceService,
    private subscribeService: SubscribeService,
  ) { }

  async doSubscribe(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Add log record
    this.logservice.makeLogRequest("SUBSCRIBE", "PENDING", "CALLBACK", new ObjectId(userId));

    // Make subcription is pending
    const { serviceId, _id } = await this.subscribeService.makePendingSubscription(createSubscribeDto, userId);

    // update the subcription
    const updatedSubscribe = await this.subscribeService.update(_id, { action: 'SUBSCRIBED' });

    // add a log to with succsess status
    this.logservice.makeLogRequest("SUBSCRIBE", "SUCCESS", "CALLBACK", userId, _id);

    return { status: "OK", data: { updatedSubscribe, serviceId } };
  }


  async doUnsubscribe(subscriptionId: ObjectId, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // add a log to pending 
    this.logservice.makeLogRequest("UNSUBSCRIBE", "PENDING", "CALLBACK", userId);

    // Make subcription is pending 
    const { serviceId, _id } = await this.subscribeService.makePendingUnsubscription(subscriptionId);

    // Update database
    const updatedSubscribe = await this.subscribeService.update(_id, { action: 'UNSUBSCRIBED' });

    // Log : with succsess status 
    this.logservice.makeLogRequest("UNSUBSCRIBE", "SUCCESS", "CALLBACK", userId, _id);

    return { status: "OK", data: updatedSubscribe };
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
