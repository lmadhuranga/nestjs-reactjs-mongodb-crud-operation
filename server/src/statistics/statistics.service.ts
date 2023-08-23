import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './statistic.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subscribe } from 'src/subscribe/subscribe.entity';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { LogServiceService } from 'src/log-service/log-service.service';

@Injectable()
export class StatisticsService {
  constructor( 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscribe)
    private readonly logServiceRepository: Repository<LogService>, 
  ) { } 

  async getStatistics() {
    const totalUsers = await this.userRepository.count();
    const totalSubscriptions = await this.logServiceRepository.count(); 
    const totalSuccessfulSubscriptions = await this.logServiceRepository.count({
      where: { status: 'SUCCESS', }
    });
    const totalFailedSubscriptions = await this.logServiceRepository.count({
      where: { status: 'FAILURE', }
    });

    return {
      totalUsers,
      totalSubscriptions,
      totalSuccessfulSubscriptions,
      totalFailedSubscriptions,
    };
  }
}
