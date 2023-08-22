import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, Timestamp } from 'typeorm';

@Entity()
export class LogService {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    subscribeId: ObjectId;

    @Column()
    userId: ObjectId;

    @Column()
    action: string;

    @Column()
    status: string;

    @Column()
    log_details: string;

    @Column()
    created_at: Date;

}
