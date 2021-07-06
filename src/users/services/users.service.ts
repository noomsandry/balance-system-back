import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';
import { Users } from '../models/users.entity';

@Injectable()
export class UsersService {
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
    return await Users.findOne(id);
  }

  async findByEmail(email: string) {
    return await Users.findOne({
      where: {
        email: email,
      },
    });
  }
}
