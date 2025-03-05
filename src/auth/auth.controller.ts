import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 Rota para registro de usuário
  @Post('register')
  async register(
    @Body() registerDto: { name: string; email: string; password: string },
  ) {
    return this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  // 🔹 Rota para login e geração de token JWT
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
