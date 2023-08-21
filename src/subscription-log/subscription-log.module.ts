import { Module } from '@nestjs/common';
import { SubscriptionLogService } from './subscription-log.service';
import { SubscriptionLogController } from './subscription-log.controller';
import mongodbConfig from 'mongodb.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionLog } from './entities/subscription-log.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(mongodbConfig), // Use MongoDB config for this module
    TypeOrmModule.forFeature([SubscriptionLog]),
  ],
  controllers: [SubscriptionLogController],
  providers: [SubscriptionLogService]
})
export class SubscriptionLogModule {}
