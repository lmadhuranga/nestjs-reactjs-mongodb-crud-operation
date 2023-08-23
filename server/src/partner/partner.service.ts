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
  ) { }

  findAll() {
    return this.partnerRepository.find();
  }

  findOne(nId: string) {
    const id = new ObjectId(nId);
    // console.log(`id`, id);
    this.partnerRepository.findOne({ where:{_id:id} })
      .then(partner => {
        console.log(partner); // Here you can work with the partner object
      })
      .catch(error => {
        console.error(error);
      });
    // return this.partnerRepository.findOne({ where: { id: id } });
  }

  makeExternalSub() {

  }

}
