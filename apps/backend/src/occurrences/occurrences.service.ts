import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, and } from 'drizzle-orm';
import * as schema from '../database/schema';
import { DRIZZLE_PROVIDER } from '../database/database.provider';

@Injectable()
export class OccurrencesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(userId: string) {
    return this.db.query.occurrences.findMany({
      where: eq(schema.occurrences.userId, userId),
      with: {
        subject: true,
      },
      orderBy: (occurrences, { desc }) => [desc(occurrences.date)],
    });
  }

  async create(userId: string, data: any) {
    const [occurrence] = await this.db
      .insert(schema.occurrences)
      .values({
        userId: userId,
        subjectId: data.subjectId,
        name: data.name,
        description: data.description || null,
        category: data.category,
        date: new Date(data.date),
      })
      .returning();

    // Buscar com a relação da matéria para retornar no formato esperado
    return this.db.query.occurrences.findFirst({
      where: eq(schema.occurrences.id, occurrence.id),
      with: {
        subject: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    const [result] = await this.db
      .delete(schema.occurrences)
      .where(
        and(
          eq(schema.occurrences.id, id),
          eq(schema.occurrences.userId, userId),
        ),
      )
      .returning();

    if (!result) {
      throw new NotFoundException('Ocorrência não encontrada');
    }

    return result;
  }
}
