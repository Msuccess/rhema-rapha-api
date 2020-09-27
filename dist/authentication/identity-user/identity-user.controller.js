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
exports.IdentityUserController = void 0;
const role_decorator_1 = require("./../auth-guard/role.decorator");
const common_1 = require("@nestjs/common");
const validator_pipe_1 = require("../../shared/pipes/validator.pipe");
const authentication_service_1 = require("../authentication.service");
const passport_1 = require("@nestjs/passport");
const identity_user_service_1 = require("./identity-user.service");
const register_dto_1 = require("./dto/register.dto");
let IdentityUserController = class IdentityUserController {
    constructor(authService, identityUserService) {
        this.authService = authService;
        this.identityUserService = identityUserService;
    }
    async register(user, res) {
        const response = await this.authService.register(user);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Registration Successful', data: response });
    }
    async loginUser(user, res) {
        const response = await this.authService.signIn(user);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Login Successfully', data: response });
    }
    async googleAuth(_req) { }
    googleAuthRedirect(req) {
        return this.authService.googleLogin(req);
    }
    async getUsers(res) {
        const response = await this.identityUserService.getAllUser();
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Identity  Users', data: response });
    }
    async delete(id, res) {
        const response = await this.identityUserService.deleteUser(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Doctor deleted', data: response });
    }
};
__decorate([
    common_1.Post('register'),
    common_1.UsePipes(new validator_pipe_1.ValidatorPipe()),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    common_1.UsePipes(new validator_pipe_1.ValidatorPipe()),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "loginUser", null);
__decorate([
    common_1.Get('google'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "googleAuth", null);
__decorate([
    common_1.Get('google-redirect'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "googleAuthRedirect", null);
__decorate([
    common_1.Get('users'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "getUsers", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IdentityUserController.prototype, "delete", null);
IdentityUserController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        identity_user_service_1.IdentityUserService])
], IdentityUserController);
exports.IdentityUserController = IdentityUserController;
//# sourceMappingURL=identity-user.controller.js.map