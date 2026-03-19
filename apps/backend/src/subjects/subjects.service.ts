import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../database/database.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../database/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(userId: string) {
    return this.db
      .select()
      .from(schema.subjects)
      .where(eq(schema.subjects.userId, userId));
  }

  async create(userId: string, data: { name: string; teacher?: string; semester?: string }) {
    const results = await this.db
      .insert(schema.subjects)
      .values({
        userId,
        name: data.name,
        teacher: data.teacher,
        semester: data.semester,
      })
      .returning();
    
    return results[0];
  }

  async update(userId: string, id: string, data: Partial<{ name: string; teacher: string; semester: string; grades: number[]; absences: number }>) {
    const results = await this.db
      .update(schema.subjects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(schema.subjects.id, id), eq(schema.subjects.userId, userId)))
      .returning();
    
    if (results.length === 0) {
      throw new NotFoundException('Matéria não encontrada.');
    }
    
    return results[0];
  }

  async remove(userId: string, id: string) {
    const results = await this.db
      .delete(schema.subjects)
      .where(and(eq(schema.subjects.id, id), eq(schema.subjects.userId, userId)))
      .returning();
    
    if (results.length === 0) {
      throw new NotFoundException('Matéria não encontrada.');
    }
    
    return { success: true };
  }
}
