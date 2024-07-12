import { createClient } from '@libsql/client';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/libsql';
import { TURSO_CONNECTION } from 'src/constants';

@Module({
  providers: [
    {
      provide: TURSO_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const tokenString = configService.get<string>('DATABASE_AUTH_TOKEN');
        const client = createClient({
          url: connectionString,
          authToken: tokenString,
        });

        return drizzle(client);
      },
    },
  ],
  exports: [TURSO_CONNECTION],
})
export class TursoDatabaseModule {}
