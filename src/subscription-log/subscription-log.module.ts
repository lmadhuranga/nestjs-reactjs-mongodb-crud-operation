import { Module } from '@nestjs/common';
import { SubscriptionLogService } from './subscription-log.service';
import { SubscriptionLogController } from './subscription-log.controller';

@Module({
  controllers: [SubscriptionLogController],
  providers: [SubscriptionLogService]
})
export class SubscriptionLogModule {}
