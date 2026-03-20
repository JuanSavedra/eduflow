import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OccurrencesService } from './occurrences.service';

@Controller('occurrences')
@UseGuards(JwtAuthGuard)
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    const occurrences = await this.occurrencesService.findAll(userId);
    
    // Formatar para o frontend (mapear subject para subjectName)
    return occurrences.map(occ => ({
      ...occ,
      subjectName: (occ as any).subject?.name || 'N/A',
      date: occ.date.toISOString(),
    }));
  }

  @Post()
  async create(@Request() req, @Body() data: any) {
    const userId = req.user.userId;
    const occurrence = await this.occurrencesService.create(userId, data);
    
    return {
      ...occurrence,
      subjectName: (occurrence as any).subject?.name || 'N/A',
      date: occurrence?.date.toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.occurrencesService.remove(userId, id);
  }
}
