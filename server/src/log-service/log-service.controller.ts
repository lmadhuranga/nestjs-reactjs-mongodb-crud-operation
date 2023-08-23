import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogServiceService } from './log-service.service';
import { CreateLogServiceDto } from './dto/create-log-service.dto';
import { UpdateLogServiceDto } from './dto/update-log-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('log-service')
export class LogServiceController {
  constructor(private readonly logServiceService: LogServiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLogServiceDto: CreateLogServiceDto) {
    return this.logServiceService.create(createLogServiceDto);
  }

  // @Get()
  // findAll() {
  //   return this.logServiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.logServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLogServiceDto: UpdateLogServiceDto) {
  //   return this.logServiceService.update(+id, updateLogServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.logServiceService.remove(+id);
  // }
}
