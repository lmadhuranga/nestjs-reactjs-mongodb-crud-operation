import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Partner } from 'src/partner/entities/partner.entity';
import { Subscribe } from 'src/subscribe/subscribe.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
  ) { }

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findAllWithPartners(): Promise<Service[]> {
    const services = await this.serviceRepository.find();
    for (const service of services) {
      service.partner = await this.partnerRepository.findOne({ where: { _id: service.partnerId } });
      service.subscribes = await this.subscribeRepository.find({ where: { serviceId: new ObjectId(service._id) } });
    }
    return services;
  }

  findOne(nId: number) {
    const id = new ObjectId(nId);
    return this.serviceRepository.findOneBy({ _id: id })
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
