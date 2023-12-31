import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from './subscribe.entity';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { LogServiceService } from 'src/log-service/log-service.service';
import { SubscriptionStatus, UserRole, statusCode } from 'src/subscirbes.enums'; // Import the enums


@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribesRepository: Repository<Subscribe>,
    @InjectRepository(LogService)
    private readonly logServiceRepository: Repository<LogService>,
    private jwtService: JwtService,
    private logservice: LogServiceService,
  ) { }

  async doSubscribe(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    // Check is already send a request  or not 
    const { serviceId } = createSubscribeDto;

    const subscribedData = await this.subscribesRepository.findOne({
      where: {
        action: SubscriptionStatus.SUBSCRIBED,
        userId,
        serviceId: new ObjectId(serviceId)
      }
    });

    if (subscribedData !== null) {
      throw new ConflictException({
        status: 'Already subscribed',
        data: { ...subscribedData },
      });
    }

    // Add log record
    this.logservice.makeLogRequest(SubscriptionStatus.SUBSCRIBE, statusCode.PENDING, UserRole.USER, userId);

    // Make subcription is pending
    const { _id } = await this.makePendingSubscription(createSubscribeDto, userId);

    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: SubscriptionStatus.SUBSCRIBE,
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      const updatedSubscribe = await this.update(_id, { action: SubscriptionStatus.SUBSCRIBED });

      // add a log to with succsess status 
      this.logservice.makeLogRequest(SubscriptionStatus.SUBSCRIBED, statusCode.SUCCESS, UserRole.USER, userId, _id);

      return { statusCode: HttpStatus.CREATED, message: "Subscribed successfully", data: { ...updatedSubscribe, serviceId } };
    }

    // add a log to with FAILED status 
    this.logservice.makeLogRequest(SubscriptionStatus.SUBSCRIBE, "FAILED", UserRole.USER, userId, _id);

    // add a log to with failed, external api call status 
    return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Subscription failed" };

  }


  async doUnsubscribe(subscriptionId: ObjectId, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Log : add a log to pending 
    this.logservice.makeLogRequest(SubscriptionStatus.UNSUBSCRIBE, statusCode.PENDING, UserRole.USER, userId);

    // Make subcription is pending 
    const { serviceId, _id } = await this.makePendingUnsubscription(subscriptionId);

    // Send external api end endpoint request 
    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: SubscriptionStatus.UNSUBSCRIBE,
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      // Update database
      const updatedUnsubscribe = await this.update(_id, { action: SubscriptionStatus.UNSUBSCRIBED });

      // Log : with succsess status 
      this.logservice.makeLogRequest("UNSUBSCRIBE", statusCode.SUCCESS, UserRole.USER, userId, _id);

      return { statusCode: HttpStatus.OK, message: "Unsubscribed successfully", data: { ...updatedUnsubscribe } };
    }

    // Log : with failed, external api call status 
    this.logservice.makeLogRequest(SubscriptionStatus.UNSUBSCRIBE, statusCode.FAILED, UserRole.CALLBACK, userId);

    return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Unsubscribed failed" };

  }
  
  async update(id: any, updateSubscribeDto: UpdateSubscribeDto) {
    const subscribeId = new ObjectId(id);
    const subscribeM = await this.subscribesRepository.findOne({ where: { _id: subscribeId } });
    if (!subscribeM) {
      throw new NotFoundException(`Subscribe with ID ${id} not found`);
    }
    subscribeM.action = updateSubscribeDto.action;
    return this.subscribesRepository.save(subscribeM)
  } 

  async makePendingSubscription(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    const subscribe = new Subscribe();
    subscribe.action = SubscriptionStatus.SUBSCRIBPENDING;
    subscribe.serviceId = new ObjectId(createSubscribeDto.serviceId);
    subscribe.userId = new ObjectId(userId);
    return await this.subscribesRepository.save(subscribe);
  }
  
  async makePendingUnsubscription(subscribeId: ObjectId) {
    const subscribeData = new Subscribe();
    subscribeData.action = SubscriptionStatus.UNSUBSCRIBPENDING;
    return this.update(subscribeId, subscribeData);
  }

  async makeExternalSub(payLoad: any) {
    if (payLoad.msisdn === '') {
      return { status: statusCode.FAILED };
    }
    // jwtToken token
    const jwtToken = this.jwtService.sign(payLoad)
    console.log(`external api call`,);
    /* 
     try {
       // Todo:: Make external api call
     } catch (error) {
       return { status: 'FAILED' }
     } 
    */

    return { status: 'OK' }
  }
}
