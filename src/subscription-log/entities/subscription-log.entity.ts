import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class SubscriptionLog {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  subscriptionId: ObjectId;

  @Column()
  eventType: string;

  @Column()
  timestamp: Date;

  // Other log-related fields
}
