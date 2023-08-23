import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscribeDto } from './create-subscribe.dto';
import { ObjectId } from 'typeorm';

export class UpdateSubscribeDto extends PartialType(CreateSubscribeDto) {
    action?: string;
}
