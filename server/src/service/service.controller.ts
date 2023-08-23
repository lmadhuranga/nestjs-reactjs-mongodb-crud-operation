import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.serviceService.create(createServiceDto);
  // }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    // return this.serviceService.findAll();
    return this.serviceService.findAllWithPartners();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serviceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.serviceService.update(+id, updateServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serviceService.remove(+id);
  // }
}
