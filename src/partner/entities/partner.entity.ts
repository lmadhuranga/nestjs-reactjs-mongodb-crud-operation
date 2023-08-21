import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Partner {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  // Other partner-related fields
}
