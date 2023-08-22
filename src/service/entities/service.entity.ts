import { Entity, ObjectIdColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Partner } from 'src/partner/entities/partner.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Service {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  partnerId: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Partner, partner => partner.services)
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;
}
