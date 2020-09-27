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
exports.AppointmentService = void 0;
const appointment_mail_dto_1 = require("./dto/appointment_mail.dto");
const email_service_1 = require("./../shared/service/email.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_repository_1 = require("./appointment.repository");
const result_1 = require("../configuration/exceptions/result");
const schedule_1 = require("@nestjs/schedule");
const typeorm_2 = require("typeorm");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, emailService) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
    }
    async getByUserId(userId) {
        try {
            return await this.appointmentRepository.find();
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAppointments(query) {
        try {
            return await this.appointmentRepository.find({
                take: query.pageSize,
                skip: query.pageSize * (query.page - 1),
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAppointment(id) {
        try {
            return await this.appointmentRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addAppointment(newAppointment) {
        try {
            return await this.appointmentRepository.save(newAppointment);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAppointment(id, newAppointment) {
        try {
            const dbAppointment = this.getAppointment(id);
            if (dbAppointment) {
                return await this.appointmentRepository.update(id, newAppointment);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancelAppointment(id) {
        try {
            const dbAppointment = await this.getAppointment(id);
            if (dbAppointment) {
                dbAppointment.isCanceled = true;
                return await this.appointmentRepository.update(id, dbAppointment);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAppointment(id) {
        try {
            return await this.appointmentRepository.delete(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAppointNotification() {
        try {
            const yesterday = "NOW() - INTERVAL '1 DAY'";
            const appointments = await this.appointmentRepository.find({
                where: {
                    date: typeorm_2.Raw(alias => `${alias} = ${yesterday}`),
                    isCanceled: false,
                },
            });
            appointments.forEach(appointment => {
                const appointmentMail = new appointment_mail_dto_1.AppointmentMailDto();
                appointmentMail.appointmentTime = appointment.appointmentTime;
                appointmentMail.date = appointment.date;
                appointmentMail.doctorFullName = appointment.doctor.fullName;
                appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
                appointmentMail.patientEmail = appointment.patient.email;
                appointmentMail.patientFullName = appointment.patient.fullName;
                this.emailService.emailSenderWithTemplate(appointmentMail);
            });
            console.log('Appointment', appointments);
            return;
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentService.prototype, "getAppointNotification", null);
AppointmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(appointment_repository_1.AppointmentRepository)),
    __metadata("design:paramtypes", [appointment_repository_1.AppointmentRepository,
        email_service_1.EmailService])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map