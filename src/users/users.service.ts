import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { Users } from './entities/users.entity';
import { Account } from 'src/account/entities/account.entity';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    /**
     * create user account
     */
    const account = Account.create(<CreateAccountDto>{
      balance: 0,
    });
    const newAccount = await account.save();

    /**
     * create user
     */
    const user = Users.create(createUserDto);
    user.account = newAccount;
    await user.save();

    delete user.password;
    return user;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.account', 'account')
      .where('users.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.account', 'account')
      .where('users.email = :email', { email })
      .getOne();
  }
}
