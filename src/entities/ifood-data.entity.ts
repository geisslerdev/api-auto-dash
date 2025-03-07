import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Merchant } from './merchant.entity';

@Entity('ifood_data')
export class IfoodData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ifoodData, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Merchant, (merchant) => merchant.ifoodData, { onDelete: 'CASCADE' })
  merchant: Merchant;

  @Column()
  api_name: string;

  @Column({ type: 'jsonb' })
  response_data: any;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
