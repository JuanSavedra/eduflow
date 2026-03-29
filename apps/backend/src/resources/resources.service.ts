import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../database/schema';
import { DRIZZLE_PROVIDER } from '../database/database.provider';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll(userId: string) {
    const userResources = await this.db.query.resources.findMany({
      where: eq(schema.resources.userId, userId),
      with: {
        subject: {
          columns: {
            name: true,
          }
        }
      },
      orderBy: (resources, { desc }) => [desc(resources.createdAt)],
    });

    return userResources.map(resource => ({
      ...resource,
      subjectName: resource.subject.name,
    }));
  }

  async create(userId: string, data: { subjectId: string; title: string; url: string }) {
    const [newResource] = await this.db
      .insert(schema.resources)
      .values({
        ...data,
        userId,
      })
      .returning();

    const resourceWithSubject = await this.db.query.resources.findFirst({
      where: eq(schema.resources.id, newResource.id),
      with: {
        subject: {
          columns: {
            name: true,
          }
        }
      }
    });

    return {
      ...resourceWithSubject,
      subjectName: resourceWithSubject?.subject?.name,
    };
  }

  async toggleFavorite(userId: string, id: string, isFavorite: boolean) {
    const [updatedResource] = await this.db
      .update(schema.resources)
      .set({ isFavorite, updatedAt: new Date() })
      .where(and(eq(schema.resources.id, id), eq(schema.resources.userId, userId)))
      .returning();

    if (!updatedResource) {
      throw new NotFoundException('Recurso não encontrado');
    }

    return updatedResource;
  }

  async remove(userId: string, id: string) {
    const [deletedResource] = await this.db
      .delete(schema.resources)
      .where(and(eq(schema.resources.id, id), eq(schema.resources.userId, userId)))
      .returning();

    if (!deletedResource) {
      throw new NotFoundException('Recurso não encontrado');
    }

    return { success: true };
  }
}
