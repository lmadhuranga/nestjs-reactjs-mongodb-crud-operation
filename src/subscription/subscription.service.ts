import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) { }
  create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.serviceId = createSubscriptionDto.serviceId;
    subscription.subscriptionStatus = createSubscriptionDto.subscriptionStatus;
    subscription.userId = createSubscriptionDto.userId;

    return this.subscriptionRepository.save(subscription);
  }

  findAll() {
    return this.subscriptionRepository.find();
  }

  findOne(nId: number) {
    const id = new ObjectId(nId);
    return this.subscriptionRepository.findOneBy({ id })
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
