import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, ObjectIdColumn, OneToMany, OneToOne } from 'typeorm';
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


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lastUpdate: Date;

    @ManyToOne(() => Service, service => service.subscribes)
    @JoinColumn({ name: 'serviceId' })
    service: Service;
}
