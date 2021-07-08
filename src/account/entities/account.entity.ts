import { Users } from 'src/users/entities/users.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  balance: number;

  @OneToOne(() => Users, (user) => user.account) // specify inverse side as a second parameter
  user: Users;
}
