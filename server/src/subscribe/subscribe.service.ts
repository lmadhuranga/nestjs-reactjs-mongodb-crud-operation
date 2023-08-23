import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from './subscribe.entity';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { LogServiceService } from 'src/log-service/log-service.service';

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
    // Todo:: Check is already send a request  or not 

    // Add log record
    this.logservice.makeLogRequest("SUBSCRIBE", "PENDING", "USER", userId);

    // Make subcription is pending
    const { serviceId, _id } = await this.makePendingSubscription(createSubscribeDto, userId);

    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: "SUBSCRIBE",
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      const updatedSubscribe = await this.update(_id, { action: 'SUBSCRIBED' });

      // add a log to with succsess status 
      this.logservice.makeLogRequest("SUBSCRIBE", "SUCCESS", "USER", userId, _id);

      return { status: "OK", data: { updatedSubscribe, serviceId } };
    }

    // add a log to with FAILED status 
    this.logservice.makeLogRequest("SUBSCRIBE", "FAILED", "USER", userId, _id);

    // add a log to with failed, external api call status 
    return { status: 'FAILED' };

  }


  async doUnsubscribe(subscriptionId: ObjectId, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Log : add a log to pending 
    this.logservice.makeLogRequest("UNSUBSCRIBE", "PENDING", "USER", userId);

    // Make subcription is pending 
    const { serviceId, _id } = await this.makePendingUnsubscription(subscriptionId);

    // Send external api end endpoint request 
    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: "UNSUBSCRIBE",
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      // Update database
      const updatedSubscribe = await this.update(_id, { action: 'UNSUBSCRIBED' });

      // Log : with succsess status 
      this.logservice.makeLogRequest("UNSUBSCRIBE", "SUCCESS", "USER", userId, _id);

      return { status: "OK", data: { updatedSubscribe } };
    }

    // Log : with failed, external api call status 
    this.logservice.makeLogRequest("UNSUBSCRIBE", "FAILED", "USER", userId);

    return { status: 'FAILED' };

  }

  findAll() {
    return `This action returns all subscribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
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

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }

  async makePendingSubscription(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    const subscribe = new Subscribe();
    subscribe.action = "SUBSCRIB-PENDING";
    subscribe.serviceId = new ObjectId(createSubscribeDto.serviceId);
    subscribe.userId = new ObjectId(userId);
    return await this.subscribesRepository.save(subscribe);
  }

  async makePendingUnsubscription(subscribeId: ObjectId) {
    const subscribeData = new Subscribe();
    subscribeData.action = 'UNSUBSCRIB-PENDING';
    return this.update(subscribeId, subscribeData);
  }

  async makeExternalSub(payLoad: any) {
    if (payLoad.msisdn === '') {
      return { status: 'FAILED' };
    }
    // jwtToken token
    const jwtToken = this.jwtService.sign(payLoad)

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
