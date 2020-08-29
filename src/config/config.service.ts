// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): any {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      return new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('TYPEORM_CONNECTION'),
      host: this.getValue('TYPEORM_HOST'),
      port: parseInt(this.getValue('TYPEORM_PORT')),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),

      entities: ['../**/*.entity.{ts,js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
  '',
]);

export { configService };
