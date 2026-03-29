import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.resourcesService.findAll(req.user.userId);
  }

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() createData: { subjectId: string; title: string; url: string }) {
    return this.resourcesService.create(req.user.userId, createData);
  }

  @Patch(':id/favorite')
  toggleFavorite(@Request() req: AuthenticatedRequest, @Param('id') id: string, @Body('isFavorite') isFavorite: boolean) {
    return this.resourcesService.toggleFavorite(req.user.userId, id, isFavorite);
  }

  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.resourcesService.remove(req.user.userId, id);
  }
}
