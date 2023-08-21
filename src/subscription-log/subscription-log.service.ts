import { Injectable } from '@nestjs/common';
import { CreateSubscriptionLogDto } from './dto/create-subscription-log.dto';
import { UpdateSubscriptionLogDto } from './dto/update-subscription-log.dto';

@Injectable()
export class SubscriptionLogService {
  create(createSubscriptionLogDto: CreateSubscriptionLogDto) {
    return 'This action adds a new subscriptionLog';
  }

  findAll() {
    return `This action returns all subscriptionLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionLog`;
  }

  update(id: number, updateSubscriptionLogDto: UpdateSubscriptionLogDto) {
    return `This action updates a #${id} subscriptionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionLog`;
  }
}
