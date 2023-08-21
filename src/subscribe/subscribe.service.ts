import { Body, Get, Injectable, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Subscribe } from './entities/subscribe.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
  ) {}

  create(createUserDto: CreateSubscribeDto): Promise<Subscribe> {
    const subscribe = new Subscribe();
    subscribe.iat = createUserDto.iat;
    subscribe.sub = createUserDto.sub;

    return this.subscribeRepository.save(subscribe);
  }

  async findAll(): Promise<Subscribe[]> {
    return this.subscribeRepository.find();
  }

  findOne(id: number): Promise<Subscribe> {
    return this.subscribeRepository.findOneBy({ id: id });
  }

  update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    // return this.subscribeRepository.update(id, );
    return 'this is subcriber update'
  }

  async remove(id: string): Promise<void> {
    await this.subscribeRepository.delete(id);
  }
}
