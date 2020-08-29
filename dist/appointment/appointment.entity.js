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
exports.AppointmentEntity = void 0;
const doctor_entity_1 = require("./../doctor/doctor.entity");
const patient_entity_1 = require("./../patient/patient.entity");
const shared_base_entity_1 = require("../shared/shared-base.entity");
const typeorm_1 = require("typeorm");
let AppointmentEntity = class AppointmentEntity extends shared_base_entity_1.SharedBaseEntity {
};
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '200' }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: Date, nullable: false }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointmentTime", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointmentDay", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, length: '100' }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], AppointmentEntity.prototype, "isCanceled", void 0);
__decorate([
    typeorm_1.ManyToOne(() => doctor_entity_1.DoctorEntity, doctor => doctor.appointment, { eager: true }),
    typeorm_1.JoinColumn({ name: 'doctorId' }),
    __metadata("design:type", doctor_entity_1.DoctorEntity)
], AppointmentEntity.prototype, "doctor", void 0);
__decorate([
    typeorm_1.ManyToOne(() => patient_entity_1.PatientEntity, patient => patient.appointment, { eager: true }),
    typeorm_1.JoinColumn({ name: 'patientId' }),
    __metadata("design:type", patient_entity_1.PatientEntity)
], AppointmentEntity.prototype, "patient", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "doctorId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "patientId", void 0);
AppointmentEntity = __decorate([
    typeorm_1.Entity({ name: 'AppointmentTbl' })
], AppointmentEntity);
exports.AppointmentEntity = AppointmentEntity;
//# sourceMappingURL=appointment.entity.js.map