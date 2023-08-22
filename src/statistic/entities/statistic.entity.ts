import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Statistic {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  totalUsers: number;

  @Column()
  totalSubscriptions: number;

  @Column()
  totalSuccessfulSubscriptions: number;

  @Column()
  totalFailedSubscriptions: number;
}