import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(`this.partnerService.findOne(id)`,this.partnerService.findOne(id));
    return this.partnerService.findOne(id);
  }
}
