import { Injectable } from '@nestjs/common';
import { CreateLogServiceDto } from './dto/create-log-service.dto';
import { UpdateLogServiceDto } from './dto/update-log-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogService } from 'src/log-service/entities/log-service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class LogServiceService {
  constructor(
    @InjectRepository(LogService)
    private readonly logServiceRepository: Repository<LogService>,
  ) { }

  async create(createLogServiceDto: CreateLogServiceDto) {
    const logService = new LogService();
    logService.subscribeId = createLogServiceDto.subscribeId;
    logService.action = createLogServiceDto.action;
    logService.status = createLogServiceDto.status;
    logService.userId = new ObjectId(createLogServiceDto.userId); 
    return await this.logServiceRepository.save(logService);
  }
 
  async makeLogRequest(action: string, status: string, userType: string, userId: ObjectId, subscribeId?: ObjectId) {
    const logData = new LogService();
    logData.action = action;
    logData.status = status;
    logData.userId = userId;
    logData.userType = userType;
    logData.subscribeId = subscribeId;
    return await this.create(logData);
  }

}
