import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { JwtService } from '@nestjs/jwt';
import {  Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { PartnerService } from 'src/partner/partner.service';
import { Partner } from 'src/partner/entities/partner.entity';
import { CreateUnsubscribeDto } from './dto/create-unsubscribe.dto';
import { UpdateUnsubscribeDto } from './dto/update-unsubscribe.dto';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribesRepository: Repository<Subscribe>,
    private jwtService: JwtService,
    // private partnerService: PartnerService,
  ) { }

  async doSubscribe(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Todo:: add a log to pending

    // Make subcription is pending
    const { serviceId, _id } = await this.makePendingSubscription(createSubscribeDto, userId);

    // Send external api end endpoint request 
    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: "subscribe",
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      const updatedSubscribe = await this.update(_id, { action: 'SUBSCRIBED' });
      // Todo:: add a log to with succsess status 
      return { status: "OK", data: updatedSubscribe };
    }

    // Todo:: add a log to with failed, external api call status 
    return { status: 'Failed' };

  }

  async doUnsubscribe(subscriptionId: string, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Todo:: add a log to pending 

    // Make subcription is pending 
    const { serviceId, _id } = await this.makePendingUnsubscription(subscriptionId);

    // // // Send external api end endpoint request 
    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: "unsubscribe",
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      const updatedSubscribe = await this.update(_id, { action: 'UNSUBSCRIBED' });
      // Todo:: add a log to with succsess status 
      return { status: "OK", data: updatedSubscribe };
    }

    // // Todo:: add a log to with failed, external api call status 

    // return { status: 'Failed' };

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
    subscribe.serviceId = createSubscribeDto.serviceId;
    subscribe.userId = userId;
    return await this.subscribesRepository.save(subscribe);
  }

  async makePendingUnsubscription(subscribeId: string) {
    const subscribeData = new Subscribe();
    subscribeData.action = 'UNSUBSCRIB-PENDING'; 
    return this.update(subscribeId, subscribeData);
  }

  async makeExternalSub(payLoad: any) {
    if (payLoad.msisdn === '') {
      return { status: 'Failed' }
    }
    // jwtToken token
    const jwtToken = this.jwtService.sign(payLoad)

    /* 
     try {
       // Todo:: Make external api call
     } catch (error) {
       
     } 
    */

    return { status: 'OK' }
  }
}
