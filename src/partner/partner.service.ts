import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  findAll() {
    return this.partnerRepository.find();
  }

  findOne(nId: number) {
    const id = new ObjectId(nId);
    return this.partnerRepository.findOneBy({id});
  }
 
}
