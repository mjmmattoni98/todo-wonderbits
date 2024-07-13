import { Module } from '@nestjs/common';
import { TursoDatabaseModule } from './turso-database/turso-database.module';
import { PostgresDatabaseModule } from './postgres-database/postgres-database.module';

@Module({
  imports: [TursoDatabaseModule, PostgresDatabaseModule],
})
export class InfraestructureModule {}
