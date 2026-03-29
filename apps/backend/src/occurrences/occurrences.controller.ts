import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OccurrencesService } from './occurrences.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import * as schema from '../database/schema';

type OccurrenceWithSubject = typeof schema.occurrences.$inferSelect & {
  subject: { name: string };
};

@Controller('occurrences')
@UseGuards(JwtAuthGuard)
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    const occurrences = await this.occurrencesService.findAll(userId) as unknown as OccurrenceWithSubject[];
    
    // Formatar para o frontend (mapear subject para subjectName)
    return occurrences.map(occ => ({
      ...occ,
      subjectName: occ.subject?.name || 'N/A',
      date: occ.date.toISOString(),
    }));
  }

  @Post()
  async create(@Request() req: AuthenticatedRequest, @Body() data: { subjectId: string; name: string; description?: string; category: string; date: string }) {
    const userId = req.user.userId;
    const occurrence = await this.occurrencesService.create(userId, data) as unknown as OccurrenceWithSubject;
    
    return {
      ...occurrence,
      subjectName: occurrence.subject?.name || 'N/A',
      date: occurrence?.date.toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.occurrencesService.remove(userId, id);
  }
}
