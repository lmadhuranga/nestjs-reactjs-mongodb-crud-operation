import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Service } from 'src/service/entities/service.entity';

@Entity()
export class Partner {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastUpdate: Date;

  @OneToMany(() => Service, service => service.partner)
  services: Service[];
}