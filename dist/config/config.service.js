"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = exports.ConfigService = void 0;
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            return new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }
    getPort() {
        return this.getValue('PORT', true);
    }
    isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }
    getTypeOrmConfig() {
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
exports.ConfigService = ConfigService;
const configService = new ConfigService(process.env).ensureValues([
    'TYPEORM_HOST',
    'TYPEORM_PORT',
    'TYPEORM_USERNAME',
    'TYPEORM_PASSWORD',
    'TYPEORM_DATABASE',
    '',
]);
exports.configService = configService;
//# sourceMappingURL=config.service.js.map