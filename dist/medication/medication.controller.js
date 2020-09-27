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
exports.MedicationController = void 0;
const medication_service_1 = require("./medication.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../authentication/auth-guard/role.guard");
const role_decorator_1 = require("../authentication/auth-guard/role.decorator");
const query_model_1 = require("../shared/model/query.model");
const medication_dto_1 = require("./dto/medication.dto");
let MedicationController = class MedicationController {
    constructor(medicationService) {
        this.medicationService = medicationService;
    }
    async getMedications(res, query) {
        const response = await this.medicationService.getMedications(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'All Medications data', data: response });
    }
    async getMedicationsByUserId(identityUserId, res) {
        const response = await this.medicationService.getMedicationsByUserId(identityUserId);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Medication Data', data: response });
    }
    async getById(id, res) {
        const response = await this.medicationService.getMedication(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Medication Data', data: response });
    }
    async create(patient, res) {
        const response = await this.medicationService.addMedication(patient);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Medication Created', data: response });
    }
    async update(id, patient, res) {
        const response = await this.medicationService.updateMedication(id, patient);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Medication updated', data: response });
    }
    async delete(id, res) {
        const response = await this.medicationService.deleteMedication(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Medication deleted', data: response });
    }
};
__decorate([
    common_1.Get('/all'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_model_1.QueryModel]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "getMedications", null);
__decorate([
    common_1.Get(''),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "getMedicationsByUserId", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "getById", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medication_dto_1.MedicationDto, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "create", null);
__decorate([
    common_1.Put('/:id'),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, medication_dto_1.MedicationDto, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin', 'doctor'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "delete", null);
MedicationController = __decorate([
    common_1.Controller('medication'),
    common_1.UseGuards(passport_1.AuthGuard(), role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [medication_service_1.MedicationService])
], MedicationController);
exports.MedicationController = MedicationController;
//# sourceMappingURL=medication.controller.js.map