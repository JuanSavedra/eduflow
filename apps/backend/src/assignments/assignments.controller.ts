import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.assignmentsService.findAll(req.user.userId);
  }

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() createData: { subjectId: string; title: string; description?: string; dueDate: Date }) {
    return this.assignmentsService.create(req.user.userId, createData);
  }

  @Patch(':id/status')
  updateStatus(@Request() req: AuthenticatedRequest, @Param('id') id: string, @Body('status') status: string) {
    return this.assignmentsService.updateStatus(req.user.userId, id, status);
  }

  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.assignmentsService.remove(req.user.userId, id);
  }
}
