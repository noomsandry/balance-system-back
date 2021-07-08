import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = Users.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<Users> {
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
    return await Users.findOne({
      where: {
        email: email,
      },
    });
  }
}
