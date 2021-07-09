import { Account } from 'src/account/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  amount: number;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  balance: number;

  @ManyToOne(() => Account, (a) => a.transactions, { nullable: false })
  @JoinColumn()
  account: Account;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
