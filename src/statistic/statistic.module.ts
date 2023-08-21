import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import mongodbConfig from 'mongodb.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(mongodbConfig), // Use MongoDB config for this module
    TypeOrmModule.forFeature([Statistic]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
