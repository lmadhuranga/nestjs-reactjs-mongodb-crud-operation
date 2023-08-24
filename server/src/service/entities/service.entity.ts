import { Entity, ObjectIdColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, OneToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Partner } from 'src/partner/entities/partner.entity';
import { Exclude, Expose } from 'class-transformer';
import { Subscribe } from 'src/subscribe/subscribe.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastUpdate: Date;

  @ManyToOne(() => Partner, partner => partner.services)
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;

  @OneToMany(() => Subscribe, subscribe => subscribe.service)
  subscribes: Subscribe[];
}
