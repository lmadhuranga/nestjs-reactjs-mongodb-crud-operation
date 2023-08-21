import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;
}