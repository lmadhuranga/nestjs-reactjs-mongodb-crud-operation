import { ObjectId } from "typeorm";

export class CreateSubscriptionDto {
    serviceId: ObjectId;
    subscriptionStatus: string;
    userId: ObjectId;xwxw
}
