import { Module } from '@nestjs/common';
import { TursoDatabaseModule } from './turso-database/turso-database.module';

@Module({
  imports: [TursoDatabaseModule],
})
export class InfraestructureModule {}
