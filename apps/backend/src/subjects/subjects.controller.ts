import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('subjects')
@UseGuards(AuthGuard('jwt'))
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.findAll(userId);
  }

  @Post()
  async create(@Req() req: any, @Body() body: { name: string; teacher?: string; semester?: string }) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.create(userId, body);
  }

  @Patch(':id')
  async update(
    @Req() req: any, 
    @Param('id') id: string, 
    @Body() body: any
  ) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.update(userId, id, body);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) throw new UnauthorizedException();
    return this.subjectsService.remove(userId, id);
  }
}
