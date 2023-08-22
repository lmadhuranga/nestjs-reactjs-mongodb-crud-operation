import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Subscribe {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: ObjectId;

    @Column()
    serviceId: ObjectId;

    @Column()
    action: string;
 
}
