import { ObjectId } from "mongodb";

export class CreateSubscribeDto {
    action: string;
    serviceId: ObjectId;
    msisdn?: string;
    subscribeId?: ObjectId;
}
