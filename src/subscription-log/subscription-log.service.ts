import { Injectable } from '@nestjs/common';
import { CreateSubscriptionLogDto } from './dto/create-subscription-log.dto';
import { UpdateSubscriptionLogDto } from './dto/update-subscription-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionLog } from './entities/subscription-log.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class SubscriptionLogService {
  constructor(
    @InjectRepository(SubscriptionLog)
    private readonly subscriptionLogRepository: Repository<SubscriptionLog>,
  ) { }
  create(createSubscriptionLogDto: CreateSubscriptionLogDto) {
    const subscriptionLog = new SubscriptionLog();

    return this.subscriptionLogRepository.save(subscriptionLog);
  }

  findAll() {
    return this.subscriptionLogRepository.find();
  }

  findOne(nid: number) {
    const id = new ObjectId(nid);
    return this.subscriptionLogRepository.findOneBy({ id });
  }

  update(id: number, updateSubscriptionLogDto: UpdateSubscriptionLogDto) {
    return `This action updates a #${id} subscriptionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionLog`;
  }
}
