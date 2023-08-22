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

  @OneToMany(() => Service, service => service.partner)
  services: Service[];
}