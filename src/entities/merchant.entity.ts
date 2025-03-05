import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.merchants, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, unique: true })
  ifood_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
