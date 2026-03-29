import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
}

@Controller('subjects')
@UseGuards(AuthGuard('jwt'))
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.findAll(userId);
  }

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() body: { name: string; teacher?: string; semester?: string }) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.create(userId, body);
  }

  @Patch(':id')
  async update(
    @Req() req: AuthenticatedRequest, 
    @Param('id') id: string, 
    @Body() body: Partial<{ name: string; teacher: string; semester: string; grades: number[]; schedules: Schedule[] }>
  ) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.update(userId, id, body);
  }

  @Delete(':id')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.remove(userId, id);
  }
}
