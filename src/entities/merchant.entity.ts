import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { IfoodData } from './ifood-data.entity';

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

  @OneToMany(() => IfoodData, (ifoodData) => ifoodData.merchant)
  ifoodData: IfoodData[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
