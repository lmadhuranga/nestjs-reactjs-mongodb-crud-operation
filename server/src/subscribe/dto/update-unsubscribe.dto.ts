import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscribeDto } from './create-subscribe.dto';

export class UpdateUnsubscribeDto extends PartialType(CreateSubscribeDto) {
    action?: string;
    subscriptionId?:string;
}
