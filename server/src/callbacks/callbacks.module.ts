import { Module } from '@nestjs/common';
import { CallbacksService } from './callbacks.service';
import { CallbacksController } from './callbacks.controller';
import { LogServiceService } from 'src/log-service/log-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { Subscribe } from 'src/subscribe/subscribe.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LogService, Subscribe, User])],
  controllers: [CallbacksController],
  providers: [CallbacksService, LogServiceService, SubscribeService, AuthService, UsersService]
})
export class CallbacksModule {}
