import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { Subscribe } from './subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/partner/entities/partner.entity'; 
import { UnsubscribeController } from './unsubscribe.controller';
import { LogServiceService } from 'src/log-service/log-service.service';
import { LogService } from 'src/log-service/entities/log-service.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Subscribe, LogService]),
  ],
  controllers: [SubscribeController, UnsubscribeController],
  providers: [SubscribeService, LogServiceService, ],
  exports: [SubscribeService],
})
export class SubscribeModule {}
