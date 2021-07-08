import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/models/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthLoginDto, RegisterDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    delete user.password;
    const payload = {
      userId: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<Users> {
    const { email, password } = authLoginDto;
    console.log('FOUND USER', authLoginDto);

    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
