import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto, RegisterDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('register')
  create(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}
