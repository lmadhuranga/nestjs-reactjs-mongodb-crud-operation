import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './statistic.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subscribe } from 'src/subscribe/subscribe.entity';
import { LogService } from 'src/log-service/entities/log-service.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private readonly statisticRepository: Repository<Statistic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscribe)
    private readonly logServiceRepository: Repository<LogService>,
  ) { }
  create(createStatisticDto: CreateStatisticDto) {
    return 'This action adds a new statistic';
  }

  findAll() {
    return `This action returns all statistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return `This action updates a #${id} statistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistic`;
  }

  async getStatistics() {
    const totalUsers = await this.userRepository.count();
    const totalSubscriptions = await this.logServiceRepository.count();
    // const totalSuccessfulSubscriptions = await this.logService.();
    const totalFailedSubscriptions = await this.logServiceRepository.count({
      where: { status: 'FAILURE', }
    });

    return {
      totalUsers,
      totalSubscriptions,
      // totalSuccessfulSubscriptions,
      totalFailedSubscriptions,
    };
  }
}
