import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import mongodbConfig from 'mongodb.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Partner } from 'src/partner/entities/partner.entity';
import { Subscribe } from 'src/subscribe/subscribe.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(mongodbConfig), // Use MongoDB config for this module
    TypeOrmModule.forFeature([Service, Partner, Subscribe]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
