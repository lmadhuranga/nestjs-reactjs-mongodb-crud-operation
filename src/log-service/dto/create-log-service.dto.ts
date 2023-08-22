import { ObjectId } from "mongodb";
import { Timestamp } from "typeorm";

export class CreateLogServiceDto {
    action?:string;
    userId?:ObjectId;
    status?:string;
    subscribeId?:ObjectId;
    created_at?:Date;
}
