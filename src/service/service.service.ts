import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(nId: number) {
    const id = new ObjectId(nId);
    return this.serviceRepository.findOneBy({id})
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
