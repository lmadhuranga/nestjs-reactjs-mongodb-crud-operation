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
    userType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lastUpdate: Date;


}
