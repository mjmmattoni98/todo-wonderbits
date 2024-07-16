import { Logger } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsString,
  validateSync,
} from 'class-validator';

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsBoolean()
  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';

  @IsString()
  readonly DATABASE_URL = process.env.DATABASE_URL as string;

  @IsBoolean()
  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';

  @IsEmail()
  readonly EMAIL = process.env.EMAIL as string;

  @IsInt()
  readonly PORT = Number(process.env.PORT);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
