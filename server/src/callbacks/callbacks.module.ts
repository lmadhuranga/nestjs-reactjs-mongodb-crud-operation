import { Module } from '@nestjs/common';
import { CallbacksService } from './callbacks.service';
import { CallbacksController } from './callbacks.controller';
import { LogServiceService } from 'src/log-service/log-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { Subscribe } from 'src/subscribe/subscribe.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LogService, Subscribe])],
  controllers: [CallbacksController],
  providers: [CallbacksService, LogServiceService, SubscribeService]
})
export class CallbacksModule {}
