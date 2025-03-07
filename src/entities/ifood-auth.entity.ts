import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class IfoodToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamp' })
  tokenExpiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
