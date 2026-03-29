import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password?: string }) {
    if (!body.password) {
      throw new UnauthorizedException('Senha é obrigatória.');
    }
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password?: string }) {
    if (!body.password) {
      throw new UnauthorizedException('Senha é obrigatória.');
    }
    return this.authService.register(body.name, body.email, body.password);
  }
}
