import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { PartnerService } from 'src/partner/partner.service';
import { Partner } from 'src/partner/entities/partner.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribesRepository: Repository<Subscribe>,
    private jwtService: JwtService,
    // private partnerService: PartnerService,
  ) { }

  async create(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

    // Todo:: add a log to pending
    // Make subcription is pending
    const { serviceId, _id } = await this.makePendingSubscription(createSubscribeDto, userId);

    // Send external api end endpoint request 
    const payLoad = {
      subscriptionId: serviceId,
      sub: userId,
      subscribeId: _id,
      action: "sub",
      msisdn: '12345'
    }

    // Make api call extern partner api 
    const partnerRes = await this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      const updatedSubscribe = await this.update(_id, { action: 'sub' });
      // Todo:: add a log to with succsess status 
      return { status: "OK", data: updatedSubscribe };
    }

    // Todo:: add a log to with failed, external api call status 
    return { status: 'Failed' };

  }

  findAll() {
    return `This action returns all subscribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
  }

  async update(id: any, updateSubscribeDto: UpdateSubscribeDto) {
    const subscribeM = await this.subscribesRepository.findOne({ where: { _id: id } });

    if (!subscribeM) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    subscribeM.action = "SUBSCRIBED";
    return this.subscribesRepository.save(subscribeM);
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }

  async makePendingSubscription(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    const subscribe = new Subscribe();
    subscribe.action = "PENDING";
    subscribe.serviceId = createSubscribeDto.serviceId;
    subscribe.userId = userId;
    return await this.subscribesRepository.save(subscribe);
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
      
    } */

    return { status: 'OK' }
  }
}
