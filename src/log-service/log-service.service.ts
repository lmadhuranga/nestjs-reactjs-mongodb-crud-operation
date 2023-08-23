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
  ) {}

  async create(createLogServiceDto: CreateLogServiceDto) {
    const logService = new LogService();
    logService.subscribeId = createLogServiceDto.subscribeId;
    logService.action = createLogServiceDto.action;
    logService.status = createLogServiceDto.status;  
    logService.userId = new ObjectId(createLogServiceDto.userId);
    logService.created_at =  new Date();  
    return await this.logServiceRepository.save(logService);
  }


  findAll() {
    return `This action returns all logService`;
  }

  async getStatisticData() {
   return await this.logServiceRepository.findBy({"status" : "SUCCESS"});
  }

  findOne(id: number) {
    return `This action returns a #${id} logService`;
  }

  update(id: number, updateLogServiceDto: UpdateLogServiceDto) {
    return `This action updates a #${id} logService`;
  }

  remove(id: number) {
    return `This action removes a #${id} logService`;
  }
}
