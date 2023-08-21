import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Service {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  partnerId: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;
}
