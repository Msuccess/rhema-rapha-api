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
exports.DoctorController = void 0;
const password_encrypter_service_1 = require("./../authentication/auth-configuration/password-encrypter.service");
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../authentication/auth-guard/role.decorator");
const query_model_1 = require("../shared/model/query.model");
const doctor_service_1 = require("./doctor.service");
const doctor_dto_1 = require("./dto/doctor.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../authentication/auth-guard/role.guard");
let DoctorController = class DoctorController {
    constructor(doctorService, passwordEncrypterService) {
        this.doctorService = doctorService;
        this.passwordEncrypterService = passwordEncrypterService;
    }
    async getDoctors(res, query) {
        const response = await this.doctorService.getDoctors(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'All Doctors data', data: response });
    }
    async getById(id, res) {
        const response = await this.doctorService.getDoctor(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Doctor Data', data: response });
    }
    async getDoctorsByDepartmentId(id, res) {
        const response = await this.doctorService.getByDepartmentId(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Doctor Data', data: response });
    }
    async update(id, Doctor, res) {
        const response = await this.doctorService.updateDoctor(id, Doctor);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Doctor updated', data: response });
    }
    async delete(id, res) {
        const response = await this.doctorService.deleteDoctor(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Doctor deleted', data: response });
    }
};
__decorate([
    common_1.Get(),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_model_1.QueryModel]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctors", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getById", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorsByDepartmentId", null);
__decorate([
    common_1.Put('/:id'),
    role_decorator_1.Roles('admin', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.DoctorDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "delete", null);
DoctorController = __decorate([
    common_1.Controller('doctor'),
    common_1.UseGuards(passport_1.AuthGuard(), role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService,
        password_encrypter_service_1.PasswordEncrypterService])
], DoctorController);
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctor.controller.js.map