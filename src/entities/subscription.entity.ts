import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: ['monthly', 'annual'] })
  plan: string;

  @Column({ type: 'enum', enum: ['active', 'pending', 'canceled'] })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'date' })
  next_payment_date: Date;
}
