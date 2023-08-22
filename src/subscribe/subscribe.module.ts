import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { Subscribe } from './entities/subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/partner/entities/partner.entity'; 
import { UnsubscribeController } from './unsubscribe.controller';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Subscribe])
  ],
  controllers: [SubscribeController, UnsubscribeController],
  exports: [SubscribeService],
  providers: [SubscribeService]
})
export class SubscribeModule {}
