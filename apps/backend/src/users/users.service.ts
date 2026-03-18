import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../database/database.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findOneByEmail(email: string) {
    const results = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    
    return results[0] || null;
  }

  async create(name: string, email: string, passwordHash: string) {
    const results = await this.db
      .insert(schema.users)
      .values({
        name,
        email,
        passwordHash,
      })
      .returning();
    
    return results[0];
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
