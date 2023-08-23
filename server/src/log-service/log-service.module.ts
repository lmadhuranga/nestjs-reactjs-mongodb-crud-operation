import { Module } from '@nestjs/common'; 
import { LogServiceController } from './log-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from './entities/log-service.entity';
import { LogServiceService } from './log-service.service';

@Module({
  imports:[TypeOrmModule.forFeature([LogService])],
  controllers: [LogServiceController],
  providers: [LogServiceService],
  exports:[LogServiceService]
})
export class LogServiceModule {}
