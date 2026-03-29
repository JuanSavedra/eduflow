import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../database/schema';
import { DRIZZLE_PROVIDER } from '../database/database.provider';

@Injectable()
export class AssignmentsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(userId: string) {
    const userAssignments = await this.db.query.assignments.findMany({
      where: eq(schema.assignments.userId, userId),
      with: {
        subject: {
          columns: {
            name: true,
          }
        }
      },
      orderBy: (assignments, { asc }) => [asc(assignments.dueDate)],
    });

    return userAssignments.map(assignment => ({
      ...assignment,
      subjectName: assignment.subject.name,
    }));
  }

  async create(userId: string, data: { subjectId: string; title: string; description?: string; dueDate: Date }) {
    const [newAssignment] = await this.db
      .insert(schema.assignments)
      .values({
        ...data,
        userId,
        dueDate: new Date(data.dueDate),
      })
      .returning();

    const assignmentWithSubject = await this.db.query.assignments.findFirst({
      where: eq(schema.assignments.id, newAssignment.id),
      with: {
        subject: {
          columns: {
            name: true,
          }
        }
      }
    });

    return {
      ...assignmentWithSubject,
      subjectName: assignmentWithSubject?.subject?.name,
    };
  }

  async updateStatus(userId: string, id: string, status: string) {
    const [updatedAssignment] = await this.db
      .update(schema.assignments)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(schema.assignments.id, id), eq(schema.assignments.userId, userId)))
      .returning();

    if (!updatedAssignment) {
      throw new NotFoundException('Assignment not found');
    }

    return updatedAssignment;
  }

  async remove(userId: string, id: string) {
    const [deletedAssignment] = await this.db
      .delete(schema.assignments)
      .where(and(eq(schema.assignments.id, id), eq(schema.assignments.userId, userId)))
      .returning();

    if (!deletedAssignment) {
      throw new NotFoundException('Assignment not found');
    }

    return { success: true };
  }
}
