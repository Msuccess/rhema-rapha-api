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
exports.AppointmentController = void 0;
const identity_user_dto_1 = require("./../authentication/identity-user/dto/identity-user.dto");
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const appointment_dto_1 = require("./dto/appointment.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../authentication/auth-guard/role.guard");
const role_decorator_1 = require("../authentication/auth-guard/role.decorator");
const query_model_1 = require("../shared/model/query.model");
const current_user_decorator_1 = require("../authentication/auth-guard/current-user.decorator");
let AppointmentController = class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async getAppointments(res, query) {
        const response = await this.appointmentService.getAppointments(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'All Appointments data', data: response });
    }
    async getAppointmentsByUserId(userId, res) {
        const response = await this.appointmentService.getByUserId(userId);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'User Appointments data', data: response });
    }
    async getAppointmentByDoctorId() { }
    async getById(id, res) {
        const response = await this.appointmentService.getAppointment(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Appointment Data', data: response });
    }
    async create(appointment, res) {
        const response = await this.appointmentService.addAppointment(appointment);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Appointment Created', data: response });
    }
    async createPatientAppointment(appointment, res, user) {
        appointment.patientId = user.id;
        const response = await this.appointmentService.addAppointment(appointment);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Appointment Created', data: response });
    }
    async update(id, appointment, res) {
        const response = await this.appointmentService.updateAppointment(id, appointment);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Appointment updated', data: response });
    }
    async cancel(id, res) {
        const response = await this.appointmentService.cancelAppointment(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Appointment updated', data: response });
    }
    async delete(id, res) {
        const response = await this.appointmentService.deleteAppointment(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Appointment deleted', data: response });
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
], AppointmentController.prototype, "getAppointments", null);
__decorate([
    common_1.Get(),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    __param(0, current_user_decorator_1.User()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointmentsByUserId", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getById", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.AppointmentDto, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "create", null);
__decorate([
    common_1.Post('patient'),
    role_decorator_1.Roles('patient'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, current_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.AppointmentPatientDto, Object, identity_user_dto_1.IdentityUserDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "createPatientAppointment", null);
__decorate([
    common_1.Put('/:id'),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, appointment_dto_1.AppointmentDto, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "update", null);
__decorate([
    common_1.Put('cancel/:id'),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "cancel", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin', 'doctor', 'patient'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "delete", null);
AppointmentController = __decorate([
    common_1.Controller('appointment'),
    common_1.UseGuards(passport_1.AuthGuard(), role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map