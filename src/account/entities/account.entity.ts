import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, type: 'float', default: 0.0 })
  balance: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (t) => t.account, { nullable: false })
  transactions: Transaction[];

  @OneToOne(() => Users)
  user: Users;
}
