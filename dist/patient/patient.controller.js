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
exports.PatientController = void 0;
const password_encrypter_service_1 = require("./../authentication/auth-configuration/password-encrypter.service");
const patient_dto_1 = require("./dto/patient.dto");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_decorator_1 = require("../authentication/auth-guard/role.decorator");
const query_model_1 = require("../shared/model/query.model");
const role_guard_1 = require("../authentication/auth-guard/role.guard");
const patient_service_1 = require("./patient.service");
const current_user_decorator_1 = require("../authentication/auth-guard/current-user.decorator");
let PatientController = class PatientController {
    constructor(patientService, passwordEncrypterService) {
        this.patientService = patientService;
        this.passwordEncrypterService = passwordEncrypterService;
    }
    async getPatients(res, query) {
        const response = await this.patientService.getPatients(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'All Patients data', data: response });
    }
    async getByPatientId(user, res) {
        const response = await this.patientService.getPatient(user.id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Patient Data', data: response });
    }
    async getById(id, res) {
        const response = await this.patientService.getPatient(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Patient Data', data: response });
    }
    async update(id, patient, res) {
        const response = await this.patientService.updatePatient(id, patient);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Patient updated', data: response });
    }
    async delete(id, res) {
        const response = await this.patientService.deletePatient(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Patient deleted', data: response });
    }
};
__decorate([
    common_1.Get('all'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_model_1.QueryModel]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatients", null);
__decorate([
    common_1.Get(),
    role_decorator_1.Roles('patient', 'admin'),
    __param(0, current_user_decorator_1.User()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getByPatientId", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getById", null);
__decorate([
    common_1.Put('/:id'),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.PatientDto, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "delete", null);
PatientController = __decorate([
    common_1.Controller('patient'),
    common_1.UseGuards(passport_1.AuthGuard(), role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        password_encrypter_service_1.PasswordEncrypterService])
], PatientController);
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map