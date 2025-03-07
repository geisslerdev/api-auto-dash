import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { Subscription } from './subscription.entity';
import { IfoodData } from './ifood-data.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password_hash: string;

  @OneToMany(() => IfoodData, (ifoodData) => ifoodData.user)
  ifoodData: IfoodData[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Merchant, (merchant) => merchant.user, { cascade: true })
  merchants: Merchant[];

  @OneToMany(() => Subscription, (subscription) => subscription.user, {
    cascade: true,
  })
  subscriptions: Subscription[];
}
