import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

export const databaseProvider: FactoryProvider = {
  provide: DRIZZLE_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL não configurada no .env');
    }
    const client = postgres(connectionString);
    return drizzle(client, { schema });
  },
  inject: [ConfigService],
};
