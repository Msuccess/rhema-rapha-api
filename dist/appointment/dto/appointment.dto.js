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
exports.AppointmentPatientDto = exports.AppointmentDto = void 0;
const class_validator_1 = require("class-validator");
class AppointmentDto {
    constructor() {
        this.isCanceled = false;
    }
}
__decorate([
    class_validator_1.IsDateString({ message: 'Date is not valid' }),
    class_validator_1.IsNotEmpty({ message: 'Date is not provided' }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Time is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "appointmentTime", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Type is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Appointment Day is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "appointmentDay", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Doctor Id is not provided' }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "doctorId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Patient Id is not provided' }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "patientId", void 0);
exports.AppointmentDto = AppointmentDto;
class AppointmentPatientDto {
    constructor() {
        this.isCanceled = false;
    }
}
__decorate([
    class_validator_1.IsDateString({ message: 'Date is not valid' }),
    class_validator_1.IsNotEmpty({ message: 'Date is not provided' }),
    __metadata("design:type", Date)
], AppointmentPatientDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Time is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentPatientDto.prototype, "appointmentTime", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Type is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentPatientDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Appointment Day is not provided' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AppointmentPatientDto.prototype, "appointmentDay", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Doctor Id is not provided' }),
    __metadata("design:type", String)
], AppointmentPatientDto.prototype, "doctorId", void 0);
exports.AppointmentPatientDto = AppointmentPatientDto;
//# sourceMappingURL=appointment.dto.js.map