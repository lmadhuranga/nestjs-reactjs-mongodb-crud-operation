import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Partner } from 'src/partner/entities/partner.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findAllWithPartners(): Promise<Service[]> {
    const services = await this.serviceRepository.find();
    for (const service of services) {
      // console.log(`service`,service);
      service.partner = await this.partnerRepository.findOne({where:{_id:service.partnerId}});
      // console.log(`service.partner`,service.partner);
    }
    return services;
  }

  findOne(nId: number) {
    const id = new ObjectId(nId);
    return this.serviceRepository.findOneBy({_id:id})
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
