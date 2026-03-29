import { Controller, Patch, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req: AuthenticatedRequest, @Body() body: { name?: string }) {
    if (!req.user || !req.user.userId) {
      throw new UnauthorizedException('Sessão inválida.');
    }
    
    const user = await this.usersService.updateProfile(req.user.userId, body);
    
    // Retornar o usuário sem o passwordHash
    const { passwordHash, ...result } = user;
    return result;
  }
}
