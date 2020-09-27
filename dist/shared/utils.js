"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.runDbMigrations = exports.getDbConnection = exports.getDbConnectionOptions = exports.toPromise = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
exports.toPromise = (data) => {
    return new Promise(resolve => {
        resolve(data);
    });
};
exports.getDbConnectionOptions = async (connectionName = 'default') => {
    const options = await typeorm_1.getConnectionOptions(process.env.NODE_ENV || 'development');
    return Object.assign(Object.assign({}, options), { name: connectionName });
};
exports.getDbConnection = async (connectionName = 'default') => {
    return await typeorm_1.getConnection(connectionName);
};
exports.runDbMigrations = async (connectionName = 'default') => {
    const conn = await exports.getDbConnection(connectionName);
    await conn.runMigrations();
};
exports.comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};
//# sourceMappingURL=utils.js.map