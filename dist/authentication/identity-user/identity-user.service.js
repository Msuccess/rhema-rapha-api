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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityUserService = void 0;
const identity_user_repository_1 = require("./identity-user.repository");
const result_1 = require("../../configuration/exceptions/result");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let IdentityUserService = class IdentityUserService {
    constructor(IdentityUserRepository) {
        this.IdentityUserRepository = IdentityUserRepository;
    }
    async getUserByEmail(email) {
        try {
            return await this.IdentityUserRepository.findOne({ email });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserById(id) {
        try {
            return await this.IdentityUserRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllUser() {
        try {
            return await this.IdentityUserRepository.find();
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(user) {
        try {
            return await this.IdentityUserRepository.save(user);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(userId) {
        try {
            return await this.IdentityUserRepository.delete(userId);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
IdentityUserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(identity_user_repository_1.IdentityUserRepository)),
    __metadata("design:paramtypes", [identity_user_repository_1.IdentityUserRepository])
], IdentityUserService);
exports.IdentityUserService = IdentityUserService;
//# sourceMappingURL=identity-user.service.js.map