"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordEncrypterService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
class Bcrypt {
    async hash(password, callback) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt, callback);
    }
    async compare(password, encrypted, callback) {
        return await bcrypt.compare(password, encrypted, callback);
    }
}
let PasswordEncrypterService = class PasswordEncrypterService {
    constructor() {
        this.bcrypt = new Bcrypt();
    }
    async encrypt(password, callback) {
        try {
            return await this.bcrypt.hash(password, callback);
        }
        catch (error) {
            throw new common_1.HttpException('Error Encrypting Password', error);
        }
    }
    async decrypt(password, encrypted, callback) {
        try {
            return await this.bcrypt.compare(password, encrypted, callback);
        }
        catch (error) {
            throw new common_1.HttpException('Error Decrypting Password', error);
        }
    }
};
PasswordEncrypterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PasswordEncrypterService);
exports.PasswordEncrypterService = PasswordEncrypterService;
//# sourceMappingURL=password-encrypter.service.js.map