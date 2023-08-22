import { Injectable } from '@nestjs/common';
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
    private readonly usersRepository: Repository<Subscribe>,
    // private partnerService: PartnerService,
  ) { }

  async create(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    // Todo:: Check is already send a request  or not 

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
    const partnerRes = this.makeExternalSub(payLoad);

    if (partnerRes.status === 'OK') {
      return partnerRes;
    }

    return {status:'Failed'}

  }

  findAll() {
    return `This action returns all subscribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
  }

  update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    return `This action updates a #${id} subscribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }

  async makePendingSubscription(createSubscribeDto: CreateSubscribeDto, userId: ObjectId) {
    const subscribe = new Subscribe();
    subscribe.action = "PENDING";
    subscribe.serviceId = createSubscribeDto.serviceId;
    subscribe.userId = userId;
    return await this.usersRepository.save(subscribe);
  }

  makeExternalSub(payLoad: any) {
    if (payLoad.msisdn == '') {
      return null
    }

    return { status: 'OK' }
  }
}
