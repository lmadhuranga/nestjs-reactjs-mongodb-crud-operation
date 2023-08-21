import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import mongodbConfig from 'mongodb.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(mongodbConfig), // Use MongoDB config for this module
    TypeOrmModule.forFeature([Partner]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService]
})
export class PartnerModule { }
