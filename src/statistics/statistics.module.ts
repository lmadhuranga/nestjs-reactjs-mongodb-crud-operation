import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { UsersService } from 'src/users/users.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './statistic.entity';
import { User } from 'src/users/user.entity';
import { Subscribe } from 'src/subscribe/subscribe.entity'; 
import { LogServiceService } from 'src/log-service/log-service.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Statistic, User, Subscribe ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
