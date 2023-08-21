import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { Subscribe } from './entities/subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongodbConfig from 'mongodb.config'; 

@Module({
  imports: [
    // TypeOrmModule.forRoot(mongodbConfig), // Use MongoDB config for this module
    TypeOrmModule.forFeature([Subscribe]),
  ],
  controllers: [SubscribeController], 
  providers: [SubscribeService],
  // exports: [SubscribeService]
})
export class SubscribeModule {}
