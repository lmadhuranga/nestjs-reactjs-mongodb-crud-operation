import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Subscription {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: ObjectId;

  @Column()
  serviceId: ObjectId;

  @Column()
  subscriptionStatus: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
